import { createClient } from "@supabase/supabase-js";

const CONFIG_PATH = "../site-config.json";
const REQUEST_TIMEOUT_MS = 15_000;
const MAX_RESPONSE_BYTES = 128 * 1024;
const SUPABASE_HOST_PATTERN = /^[a-z0-9]{20,40}\.supabase\.co$/i;

let configPromise;
let supabaseClient;
let refreshPromise;

function loadConfig() {
  configPromise ??= fetchJson(new URL(CONFIG_PATH, import.meta.url), {
    cache: "no-store",
  }).then(async ({ response, result }) => {
    if (!response.ok) throw new Error("Account service configuration is unavailable.");
    return validateConfig(result);
  });
  return configPromise;
}

function validateConfig(config) {
  if (!config || typeof config !== "object") throw new Error("Invalid account service configuration.");
  const supabase = new URL(String(config.supabaseUrl ?? ""));
  const api = new URL(String(config.apiUrl ?? ""));
  if (supabase.protocol !== "https:" || !SUPABASE_HOST_PATTERN.test(supabase.hostname) ||
      supabase.port || supabase.pathname !== "/" || supabase.search || supabase.hash ||
      supabase.username || supabase.password) {
    throw new Error("Invalid account service configuration.");
  }
  if (api.protocol !== "https:" || api.hostname !== supabase.hostname ||
      api.port || api.pathname !== "/functions/v1/relic-api" || api.search || api.hash ||
      api.username || api.password) {
    throw new Error("Invalid account service configuration.");
  }
  const publishableKey = String(config.publishableKey ?? "");
  if (!publishableKey.startsWith("sb_publishable_") || publishableKey.length > 256) {
    throw new Error("Invalid account service configuration.");
  }
  return { ...config, supabaseUrl: supabase.origin, apiUrl: api.origin + api.pathname, publishableKey };
}

async function client() {
  if (!supabaseClient) {
    const config = await loadConfig();
    supabaseClient = createClient(config.supabaseUrl, config.publishableKey, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
      global: { fetch: timedFetch },
    });
  }
  return supabaseClient;
}

function timedFetch(input, options = {}) {
  const timeoutSignal = AbortSignal.timeout(REQUEST_TIMEOUT_MS);
  const signal = options.signal
    ? AbortSignal.any([options.signal, timeoutSignal])
    : timeoutSignal;
  return fetch(input, { ...options, signal });
}

async function readJson(response) {
  const text = await readBounded(response);
  if (!text) return null;
  try { return JSON.parse(text); } catch { throw new Error("Account service returned invalid data."); }
}

async function fetchJson(url, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    const result = await readJson(response);
    return { response, result };
  } finally { clearTimeout(timeout); }
}

async function readBounded(response) {
  if (response.status === 204) return "";
  const declared = Number(response.headers.get("content-length") ?? "0");
  if (declared > MAX_RESPONSE_BYTES) throw new Error("Account service response is too large.");
  if (!response.body) {
    const text = await response.text();
    if (new TextEncoder().encode(text).byteLength > MAX_RESPONSE_BYTES) {
      throw new Error("Account service response is too large.");
    }
    return text;
  }
  const reader = response.body.getReader();
  const chunks = [];
  let total = 0;
  try {
    while (true) {
      const next = await reader.read();
      if (next.done) break;
      total += next.value.byteLength;
      if (total > MAX_RESPONSE_BYTES) {
        await reader.cancel();
        throw new Error("Account service response is too large.");
      }
      chunks.push(next.value);
    }
  } finally { reader.releaseLock(); }
  const bytes = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
  return new TextDecoder().decode(bytes);
}

async function sessionForRequest() {
  const sdk = await client();
  const current = await sdk.auth.getSession();
  if (current.error) throw current.error;
  if (!current.data.session) throw new Error("Sign in is required.");
  const expiresAt = current.data.session.expires_at ?? 0;
  if (expiresAt > Math.floor(Date.now() / 1000) + 60) return current.data.session;
  refreshPromise ??= sdk.auth.refreshSession().finally(() => { refreshPromise = undefined; });
  const refreshed = await refreshPromise;
  if (refreshed.error) throw refreshed.error;
  return refreshed.data.session ?? current.data.session;
}

async function apiRequest(path, { method = "GET", body, authenticated = true } = {}) {
  const config = await loadConfig();
  const headers = new Headers({ apikey: config.publishableKey });
  if (body !== undefined) headers.set("content-type", "application/json");
  if (authenticated) headers.set("authorization", `Bearer ${(await sessionForRequest()).access_token}`);
  const { response, result } = await fetchJson(new URL(path, `${config.apiUrl}/`), {
    method, headers, body: body === undefined ? undefined : JSON.stringify(body),
    credentials: "omit",
  });
  if (!response.ok) throw new Error(typeof result?.error === "string" ? result.error : "Account service request failed.");
  return result;
}

function validEmail(email) {
  const value = String(email ?? "").trim().toLowerCase();
  if (value.length > 320 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) throw new Error("Enter a valid email address.");
  return value;
}

export async function requestEmailCode(email) {
  const sdk = await client();
  const { error } = await sdk.auth.signInWithOtp({ email: validEmail(email), options: { shouldCreateUser: true } });
  if (error) throw error;
}

export async function verifyEmailCode(email, code) {
  const value = String(code ?? "").trim();
  if (!/^\d{6,8}$/.test(value)) throw new Error("Enter the email code.");
  const sdk = await client();
  const result = await sdk.auth.verifyOtp({ email: validEmail(email), token: value, type: "email" });
  if (result.error) throw result.error;
  return result.data.session;
}

export async function getSession() {
  const sdk = await client();
  const { data, error } = await sdk.auth.getSession();
  if (error) throw error;
  return data.session;
}

export async function signOut() {
  const sdk = await client();
  const { error } = await sdk.auth.signOut({ scope: "local" });
  if (error) throw error;
}

export async function onAuthStateChange(callback) {
  const sdk = await client();
  const { data } = sdk.auth.onAuthStateChange((event, session) => callback({ event, session }));
  return () => data.subscription.unsubscribe();
}

export async function getAccount() { return await apiRequest("account"); }
export async function getReleases() {
  const result = await apiRequest("releases", { authenticated: false });
  const releases = Array.isArray(result?.releases) ? result.releases.map((release) => {
    const downloadUrl = String(release.downloadUrl ?? release.download_url ?? "");
    const parsed = new URL(downloadUrl);
    if (parsed.protocol !== "https:" || parsed.username || parsed.password) {
      throw new Error("Release service returned an unsafe download URL.");
    }
    return {
      version: release.version,
      releasedAt: release.releasedAt ?? release.released_at,
      downloadUrl: parsed.href,
      sha256: release.sha256,
    };
  }) : [];
  return { releases };
}
export async function getConfig() { return await apiRequest("config", { authenticated: false }); }

export async function checkout() {
  const result = await apiRequest("checkout", { method: "POST", body: {} });
  const url = new URL(String(result?.url ?? ""));
  if (url.protocol !== "https:" || url.hostname !== "checkout.stripe.com" || url.username || url.password) {
    throw new Error("Checkout service returned an unsafe URL.");
  }
  return { url: url.href };
}

export async function deactivateDevice(activationId) {
  const value = String(activationId ?? "");
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value)) throw new Error("Invalid activation.");
  return await apiRequest(`activations/${encodeURIComponent(value)}`, { method: "DELETE" });
}
