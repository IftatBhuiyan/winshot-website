import * as accountApi from './account-api.js';

const $ = id => document.getElementById(id);
const message = $('account-message');
let signedInUser = null;
let email = '';
let requestBusy = false;
let viewRevision = 0;
let resendAt = 0;
let deviceToRemove = null;
let deviceButton = null;
let removeBusy = false;
let lastAccount = null;
let publicConfig = { checkoutEnabled: false };
let authEventRevision = 0;
// A return URL is navigation context only; licenses always come from the authenticated API.
let checkoutReturn = new URL(window.location.href).searchParams.get('checkout');

function el(tag, text, className) {
  const item = document.createElement(tag);
  if (text !== undefined) item.textContent = text;
  if (className) item.className = className;
  return item;
}
function tell(text = '', error = false) {
  message.textContent = text;
  message.hidden = !text;
  message.dataset.kind = error ? 'error' : 'info';
}
function friendly(error, fallback) {
  const code = error?.code ?? '';
  if (code === 'over_email_send_rate_limit') return 'Email delivery has reached its temporary limit. A new code cannot be sent yet. If you already received a code, enter it below. Otherwise, try later or contact support.';
  if (code.includes('rate_limit') || error?.status === 429) return 'Too many requests. Please try again later, or use the code from your latest email. Requesting repeatedly will not make a new code arrive sooner.';
  if (code === 'otp_expired') return 'That code has expired. Request a new one and try again.';
  if (error?.name === 'AbortError' || error?.name === 'TimeoutError') return 'The connection took too long. Please try again.';
  return fallback;
}
function date(value) {
  const parsed = new Date(value);
  return Number.isFinite(parsed.getTime()) ? new Intl.DateTimeFormat('en-US', { dateStyle: 'long', timeZone: 'UTC' }).format(parsed) : 'Unavailable';
}
function setSignInState(session) {
  signedInUser = session?.user?.id ?? null;
  $('sign-in-view').hidden = !!session;
  $('signed-in-view').hidden = !session;
  $('sign-out').hidden = !session;
  $('signed-in-email').hidden = !session;
  $('signed-in-email').textContent = session?.user?.email ?? '';
  $('account-title').textContent = session ? 'Your license.' : 'A home for your license.';
  $('account-lead').textContent = session ? 'Your app, updates, and computers. All in one place.' : 'Sign in or create your account with your email.';
  if (!session) {
    viewRevision++;
    lastAccount = null;
    $('licenses').replaceChildren();
    $('email-step').hidden = false;
    $('code-step').hidden = true;
    $('email-code').value = '';
    $('account-loading').hidden = true;
    $('account-retry').hidden = true;
  }
}
function beginRequest(button, busyText) {
  requestBusy = true;
  const previous = button.textContent;
  button.disabled = true;
  button.textContent = busyText;
  tell();
  return () => { requestBusy = false; button.disabled = false; button.textContent = previous; };
}

function showCodeEntry() {
  $('code-email').textContent = email;
  $('email-step').hidden = true;
  $('code-step').hidden = false;
  $('email-code').focus();
}
function sendingTooSoon() {
  const seconds = Math.ceil((resendAt - Date.now()) / 1000);
  if (seconds <= 0) return false;
  tell(`You can request another code in ${seconds} seconds. You can enter an existing code now.`);
  return true;
}
$('existing-code').addEventListener('click', () => {
  if (requestBusy || !$('email-form').reportValidity()) return;
  email = $('account-email').value.trim().toLowerCase();
  tell();
  showCodeEntry();
});
$('email-form').addEventListener('submit', async event => {
  event.preventDefault();
  if (requestBusy || !$('email-form').reportValidity()) return;
  if (sendingTooSoon()) return;
  email = $('account-email').value.trim().toLowerCase();
  const finish = beginRequest($('send-code'), 'Sending your code…');
  try {
    await accountApi.requestEmailCode(email);
    resendAt = Date.now() + 60_000;
    showCodeEntry();
  } catch (error) { tell(friendly(error, 'We couldn’t send your code. Please check your email address and try again. If this continues, contact support.'), true); }
  finally { finish(); }
});
$('code-form').addEventListener('submit', async event => {
  event.preventDefault();
  if (requestBusy || !$('code-form').reportValidity()) return;
  const finish = beginRequest($('verify-code'), 'Signing you in…');
  try {
    const session = await accountApi.verifyEmailCode(email, $('email-code').value);
    if (!session) throw new Error('No session');
    setSignInState(session);
    await loadAccount();
    $('account-title').focus();
  } catch (error) { tell(friendly(error, 'That code didn’t work. Check the code in your latest email, or request a new one.'), true); }
  finally { finish(); }
});
$('change-email').addEventListener('click', () => {
  if (requestBusy) return;
  $('email-step').hidden = false;
  $('code-step').hidden = true;
  $('email-code').value = '';
  tell();
  $('account-email').focus();
});
$('resend-code').addEventListener('click', async () => {
  if (requestBusy) return;
  if (sendingTooSoon()) return;
  const finish = beginRequest($('resend-code'), 'Sending…');
  try { await accountApi.requestEmailCode(email); resendAt = Date.now() + 60_000; tell('A new code is on its way. Use the code in your latest email.'); }
  catch (error) { tell(friendly(error, 'We couldn’t resend your code. Please try again.'), true); }
  finally { finish(); }
});
$('sign-out').addEventListener('click', async () => {
  if (requestBusy || removeBusy) return;
  const finish = beginRequest($('sign-out'), 'Signing out…');
  try { await accountApi.signOut(); setSignInState(null); tell('You’re signed out of this browser.'); $('account-email').focus(); }
  catch (error) { tell(friendly(error, 'We couldn’t sign you out. Please try again.'), true); }
  finally { finish(); }
});

function eligibleReleases(license, releases) {
  if (license.status !== 'paid') return [];
  const cutoff = new Date(license.updatesUntil).getTime();
  return releases.filter(release => {
    const released = new Date(release.releasedAt).getTime();
    return Number.isFinite(released) && released < cutoff && released <= Date.now();
  }).sort((a, b) => new Date(b.releasedAt) - new Date(a.releasedAt));
}
function downloadLink(release, label, className) {
  const link = el('a', label, className);
  link.href = release.downloadUrl;
  link.referrerPolicy = 'no-referrer';
  return link;
}
function renderLicense(license, releases) {
  const article = el('article', undefined, 'license-card');
  const summary = el('div', undefined, 'license-summary');
  const details = el('div');
  details.append(el('h2', license.isTest ? 'Your Stillmark test license' : 'Your Stillmark license'), el('p', license.isTest ? 'Sandbox license · No real payment' : 'One computer · One-time purchase', 'license-meta'));
  if (license.isTest) details.append(el('p', 'For integration testing only. This license cannot activate the released app.', 'account-note'));
  details.append(el('p', `Purchased ${date(license.purchasedAt)}`, 'account-note'), el('p', `Updates included until ${date(license.updatesUntil)} (UTC)`, 'account-note'));
  const available = eligibleReleases(license, releases);
  const actions = el('div', undefined, 'license-actions');
  if (available.length) actions.append(downloadLink(available[0], 'Download for Windows', 'button'));
  else actions.append(el('p', license.status === 'paid' ? 'Your eligible downloads will appear here when a release is available.' : 'This license is currently inactive. Contact support if you need help.', 'account-note'));
  actions.append(el('p', 'Eligible versions are yours to keep. No automatic renewal.', 'account-note'));
  summary.append(details, actions);
  article.append(summary);
  const computers = el('section', undefined, 'account-section');
  computers.append(el('h2', 'Your computer'));
  const devices = Array.isArray(license.devices) ? license.devices : [];
  if (!devices.length) computers.append(el('p', license.status === 'paid' ? 'No computer activated yet. Open Stillmark on your Windows computer and sign in to activate it.' : 'There are no active computers on this license.', 'account-note'));
  for (const device of devices) {
    const row = el('div', undefined, 'device-row');
    const icon = el('span', undefined, 'computer-symbol'); icon.setAttribute('aria-hidden', 'true');
    const content = el('div'); content.append(el('strong', device.name || 'Windows computer'), el('p', `Activated ${date(device.activatedAt)}`));
    const button = el('button', 'Deactivate', 'link-button'); button.type = 'button';
    button.setAttribute('aria-label', `Deactivate ${device.name || 'Windows computer'}`);
    button.addEventListener('click', () => { deviceToRemove = device; deviceButton = button; $('remove-name').textContent = device.name || 'this computer'; $('remove-device').showModal(); });
    row.append(icon, content, button); computers.append(row);
  }
  computers.append(el('p', 'Moving to a new computer? Deactivate the old one here, then sign in to the app on your new computer.', 'account-note'));
  computers.append(el('p', 'Stillmark checks activation periodically and can work offline for up to 30 days after a successful check.', 'account-note'));
  article.append(computers);
  const downloads = el('section', undefined, 'account-section');
  downloads.append(el('h2', 'Downloads'));
  if (available.length) {
    const table = el('table', undefined, 'download-table');
    const caption = el('caption', 'Versions included with this license', 'sr-only');
    const head = el('thead'); const headRow = el('tr');
    for (const label of ['Version', 'Released', 'Download']) { const th = el('th', label); th.scope = 'col'; headRow.append(th); }
    head.append(headRow);
    const body = el('tbody');
    for (const release of available) { const row = el('tr'); const linkCell = el('td'); linkCell.append(downloadLink(release, 'Windows installer')); row.append(el('td', release.version), el('td', date(release.releasedAt)), linkCell); body.append(row); }
    table.append(caption, head, body); downloads.append(table);
  } else downloads.append(el('p', 'No eligible downloads are available yet.', 'account-note'));
  article.append(downloads);
  return article;
}
async function loadAccount() {
  const revision = ++viewRevision;
  $('account-loading').hidden = false;
  $('account-retry').hidden = true;
  $('licenses').setAttribute('aria-busy', 'true');
  try {
    const results = await Promise.allSettled([accountApi.getAccount(), accountApi.getReleases(), accountApi.getConfig()]);
    if (revision !== viewRevision || !signedInUser) return;
    if (results[0].status === 'rejected') throw results[0].reason;
    const account = results[0].value;
    if (!Array.isArray(account?.licenses)) throw new Error('Invalid account');
    lastAccount = account;
    publicConfig = results[2].status === 'fulfilled' ? results[2].value : { checkoutEnabled: false };
    const releases = results[1].status === 'fulfilled' ? results[1].value.releases : [];
    $('licenses').replaceChildren(...account.licenses.map(license => renderLicense(license, releases)));
    $('empty-account').hidden = account.licenses.length > 0;
    $('purchase-license').disabled = !(publicConfig.checkoutEnabled || account.testCheckoutEnabled);
    $('purchase-license').textContent = account.testCheckoutEnabled ? 'Run test purchase' : 'Buy for $30';
    $('purchase-note').textContent = account.testCheckoutEnabled ? 'Stripe sandbox. No real charge. Test licenses cannot activate the released app.' : publicConfig.checkoutEnabled ? '$30 USD once. One computer. A 30-day money-back guarantee.' : 'Purchases will open when Stillmark launches.';
    if (results[1].status === 'rejected') tell('Your license is loaded, but downloads couldn’t be checked. Please refresh to try again.', true);
    else if (checkoutReturn === 'success') {
      tell(account.licenses.length
        ? 'Your account is up to date. Your licenses are shown below.'
        : 'We’re waiting for payment confirmation. Choose Refresh in a moment to check for your license. You don’t need to purchase again.');
      checkoutReturn = null;
      const cleanUrl = new URL(window.location.href);
      cleanUrl.searchParams.delete('checkout');
      cleanUrl.searchParams.delete('session_id');
      window.history.replaceState(null, '', cleanUrl);
    } else if (checkoutReturn === 'cancelled') {
      tell('Checkout was closed. Your existing licenses are shown below.');
      checkoutReturn = null;
    }
  } catch (error) {
    if (revision === viewRevision) { tell(friendly(error, 'We couldn’t load your license. Your account is still signed in. Please try again.'), true); $('account-retry').hidden = false; }
  } finally {
    if (revision === viewRevision) { $('account-loading').hidden = true; $('licenses').setAttribute('aria-busy', 'false'); }
  }
}
$('account-retry').addEventListener('click', () => { tell(); void loadAccount(); });
$('refresh-account').addEventListener('click', () => { tell(); void loadAccount(); });
$('purchase-license').addEventListener('click', async () => {
  if (requestBusy || !(publicConfig.checkoutEnabled || lastAccount?.testCheckoutEnabled)) return;
  const finish = beginRequest($('purchase-license'), 'Opening secure checkout…');
  try { const result = await accountApi.checkout(); window.location.assign(result.url); }
  catch (error) { tell(friendly(error, 'Checkout couldn’t be opened. Please try again.'), true); finish(); }
});
$('cancel-remove').addEventListener('click', () => { if (!removeBusy) $('remove-device').close(); });
$('remove-device').addEventListener('cancel', event => { if (removeBusy) event.preventDefault(); });
$('remove-device').addEventListener('close', () => { deviceButton?.focus(); deviceToRemove = null; });
$('confirm-remove').addEventListener('click', async () => {
  if (!deviceToRemove || removeBusy) return;
  removeBusy = true;
  $('confirm-remove').disabled = true;
  $('cancel-remove').disabled = true;
  $('confirm-remove').textContent = 'Deactivating…';
  $('remove-error').hidden = true;
  try {
    await accountApi.deactivateDevice(deviceToRemove.id);
    $('remove-device').close();
    await loadAccount();
    tell('Computer deactivated. You can now activate Stillmark on another computer.');
    $('account-title').focus();
  } catch (error) { $('remove-error').textContent = friendly(error, 'We couldn’t deactivate this computer. Please try again.'); $('remove-error').hidden = false; }
  finally { removeBusy = false; $('confirm-remove').disabled = false; $('cancel-remove').disabled = false; $('confirm-remove').textContent = 'Deactivate computer'; }
});

async function start() {
  try {
    const session = await accountApi.getSession();
    setSignInState(session);
    $('initial-loading').hidden = true;
    await accountApi.onAuthStateChange(({ event, session: next }) => {
      if (event === 'SIGNED_OUT' || (event === 'INITIAL_SESSION' && !next && signedInUser)) {
        const revision = ++authEventRevision;
        setTimeout(() => {
          if (revision !== authEventRevision) return;
          setSignInState(null);
          tell('You’re signed out.');
        }, 0);
      } else if ((event === 'SIGNED_IN' || event === 'INITIAL_SESSION') && next?.user?.id !== signedInUser) {
        const revision = ++authEventRevision;
        setTimeout(() => {
          if (revision !== authEventRevision) return;
          setSignInState(next);
          void loadAccount();
        }, 0);
      }
    });
    if (session) await loadAccount();
  } catch (error) {
    $('initial-loading').hidden = true;
    setSignInState(null);
    tell(friendly(error, 'The account service couldn’t be reached. Please refresh the page and try again.'), true);
  }
}
void start();
