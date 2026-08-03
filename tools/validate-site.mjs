import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const pages = [
  "index.html",
  "features.html",
  "pricing.html",
  "download.html",
  "changelog.html",
  "faq.html",
  "support.html",
  "manage-license.html",
  "privacy.html",
  "terms.html",
  "eula.html",
  "refund-policy.html",
  "404.html",
];
const previewCsp =
  "default-src 'none'; base-uri 'none'; form-action 'none'; img-src 'self'; style-src 'self'; script-src 'self'";
const errors = [];

function fail(file, message) {
  errors.push(`${file}: ${message}`);
}

function count(text, expression) {
  return [...text.matchAll(expression)].length;
}

function attribute(tag, name) {
  const match = tag.match(
    new RegExp(`\\b${name}\\s*=\\s*(?:\"([^\"]*)\"|'([^']*)')`, "i"),
  );
  return match ? (match[1] ?? match[2]) : null;
}

function plainText(markup) {
  return markup
    .replace(/<[^>]+>/g, " ")
    .replace(/&(?:amp|#38);/gi, "&")
    .replace(/&(?:quot|#34);/gi, '"')
    .replace(/&(?:apos|#39);/gi, "'")
    .replace(/&(?:lt|#60);/gi, "<")
    .replace(/&(?:gt|#62);/gi, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function localTarget(currentPage, rawReference) {
  const withoutQuery = rawReference.split("?")[0];
  const [rawPath, fragment = ""] = withoutQuery.split("#", 2);
  const targetPage = rawPath
    ? path.normalize(path.join(path.dirname(currentPage), rawPath))
    : currentPage;
  return { targetPage, fragment };
}

function imageDimensions(filePath) {
  const bytes = fs.readFileSync(filePath);
  if (
    bytes.length >= 24 &&
    bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))
  ) {
    return { width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20) };
  }

  if (bytes.length >= 4 && bytes[0] === 0xff && bytes[1] === 0xd8) {
    let offset = 2;
    while (offset + 9 < bytes.length) {
      if (bytes[offset] !== 0xff) {
        offset += 1;
        continue;
      }
      const marker = bytes[offset + 1];
      if (marker === 0xd8 || marker === 0xd9) {
        offset += 2;
        continue;
      }
      if (offset + 4 > bytes.length) break;
      const segmentLength = bytes.readUInt16BE(offset + 2);
      if (segmentLength < 2 || offset + 2 + segmentLength > bytes.length) break;
      if (
        (marker >= 0xc0 && marker <= 0xc3) ||
        (marker >= 0xc5 && marker <= 0xc7) ||
        (marker >= 0xc9 && marker <= 0xcb) ||
        (marker >= 0xcd && marker <= 0xcf)
      ) {
        return {
          width: bytes.readUInt16BE(offset + 7),
          height: bytes.readUInt16BE(offset + 5),
        };
      }
      offset += 2 + segmentLength;
    }
  }
  return null;
}

const pageSources = new Map();
for (const page of pages) {
  const pagePath = path.join(root, page);
  if (!fs.existsSync(pagePath)) {
    fail(page, "expected route file is missing");
    continue;
  }
  pageSources.set(page, fs.readFileSync(pagePath, "utf8"));
}

const titles = new Map();
const descriptions = new Map();
for (const [page, source] of pageSources) {
  if (!/^<!doctype html>/i.test(source)) fail(page, "must begin with an HTML doctype");
  if (!/<html\b[^>]*\blang="en"/i.test(source)) fail(page, "missing html[lang=en]");
  if (!/<meta\s+charset="utf-8"\s*\/?>/i.test(source.slice(0, 1024))) {
    fail(page, "UTF-8 declaration must appear in the first 1024 bytes");
  }
  if (!/<meta\s+name="viewport"\s+content="width=device-width, initial-scale=1"\s*\/?>/i.test(source)) {
    fail(page, "missing safe viewport declaration");
  }

  const title = source.match(/<title>([^<]+)<\/title>/i)?.[1]?.trim();
  const description = source.match(
    /<meta\s+name="description"\s+content="([^"]+)"\s*\/?>/i,
  )?.[1]?.trim();
  if (!title) fail(page, "missing nonempty title");
  if (!description) fail(page, "missing nonempty description");
  if (/\bWinShot\b/i.test(source)) {
    fail(page, "obsolete public product name remains after Relic Screenshot migration");
  }
  if (!source.includes("Relic Screenshot")) {
    fail(page, "selected Relic Screenshot product name is missing");
  }
  if (title) {
    if (titles.has(title)) fail(page, `duplicates title from ${titles.get(title)}`);
    titles.set(title, page);
  }
  if (description) {
    if (descriptions.has(description)) {
      fail(page, `duplicates description from ${descriptions.get(description)}`);
    }
    descriptions.set(description, page);
  }

  if (!/<meta\s+name="theme-color"\s+content="#0b0b0d"\s*\/?>/i.test(source)) {
    fail(page, "missing preview theme color");
  }
  if (!/<meta\s+name="color-scheme"\s+content="dark"\s*\/?>/i.test(source)) {
    fail(page, "missing dark color-scheme declaration");
  }
  if (
    !/<meta\s+name="referrer"\s+content="strict-origin-when-cross-origin"\s*\/?>/i.test(
      source,
    )
  ) {
    fail(page, "missing strict referrer policy");
  }
  if (!/<meta\s+name="robots"\s+content="noindex, nofollow"\s*\/?>/i.test(source)) {
    fail(page, "public no-commerce preview must remain noindex, nofollow");
  }
  const csp = source.match(
    /<meta\s+http-equiv="Content-Security-Policy"\s+content="([^"]+)"\s*\/?>/i,
  )?.[1];
  if (csp !== previewCsp) fail(page, "missing or unexpected preview CSP");
  if (/<link\b[^>]*\brel="canonical"/i.test(source)) {
    fail(page, "canonical URL must wait for the approved production origin");
  }
  if (/<script\b[^>]*\btype="application\/ld\+json"/i.test(source)) {
    fail(page, "structured data must wait for cleared identity and production facts");
  }

  if (count(source, /<main(?:\s|>)/gi) !== 1) fail(page, "must contain exactly one main");
  if (count(source, /<h1(?:\s|>)/gi) !== 1) fail(page, "must contain exactly one h1");
  if (page !== "404.html" && !/<a\b[^>]*\bclass="skip-link"[^>]*\bhref="#main"/i.test(source)) {
    fail(page, "missing skip link to #main");
  }
  const headingLevels = [...source.matchAll(/<h([1-6])(?:\s|>)/gi)].map((match) =>
    Number(match[1]),
  );
  if (headingLevels[0] !== 1) fail(page, "first heading must be h1");
  for (let index = 1; index < headingLevels.length; index += 1) {
    if (headingLevels[index] > headingLevels[index - 1] + 1) {
      fail(
        page,
        `heading level jumps from h${headingLevels[index - 1]} to h${headingLevels[index]}`,
      );
    }
  }

  const ids = new Set();
  for (const match of source.matchAll(/\bid\s*=\s*"([^"]+)"/gi)) {
    if (ids.has(match[1])) fail(page, `duplicate id "${match[1]}"`);
    ids.add(match[1]);
  }
  for (const match of source.matchAll(
    /\b(?:aria-controls|aria-describedby|aria-labelledby)\s*=\s*"([^"]+)"/gi,
  )) {
    for (const id of match[1].trim().split(/\s+/)) {
      if (!ids.has(id)) fail(page, `ARIA reference points to missing id "${id}"`);
    }
  }

  for (const match of source.matchAll(/<a\b[^>]*\bhref="([^"]+)"[^>]*>/gi)) {
    const href = match[1].trim();
    if (/^(?:https?:|\/\/|javascript:|data:)/i.test(href)) {
      fail(page, `external or executable link is not allowed in the no-commerce preview: ${href}`);
      continue;
    }
    if (/^(?:mailto:|tel:)/i.test(href)) {
      fail(page, `unapproved contact link is not allowed: ${href}`);
      continue;
    }
    const { targetPage, fragment } = localTarget(page, href);
    const targetPath = path.resolve(root, targetPage);
    if (!targetPath.startsWith(`${root}${path.sep}`) || !fs.existsSync(targetPath)) {
      fail(page, `broken local link "${href}"`);
      continue;
    }
    if (fragment) {
      const targetSource = pageSources.get(targetPage) ?? fs.readFileSync(targetPath, "utf8");
      const escapedFragment = fragment.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      if (!new RegExp(`\\bid="${escapedFragment}"`, "i").test(targetSource)) {
        fail(page, `fragment "${href}" does not resolve`);
      }
    }
  }

  for (const match of source.matchAll(/<(?:img|script)\b[^>]*\bsrc="([^"]+)"[^>]*>/gi)) {
    const reference = match[1];
    if (/^(?:https?:|\/\/|data:)/i.test(reference)) {
      fail(page, `nonlocal resource is not allowed: ${reference}`);
      continue;
    }
    const resource = path.resolve(root, path.dirname(page), reference.split("?")[0]);
    if (!resource.startsWith(`${root}${path.sep}`) || !fs.existsSync(resource)) {
      fail(page, `missing resource "${reference}"`);
    }
  }
  for (const match of source.matchAll(
    /<link\b[^>]*\brel="(?:stylesheet|icon)"[^>]*\bhref="([^"]+)"[^>]*>/gi,
  )) {
    const reference = match[1];
    const resource = path.resolve(root, path.dirname(page), reference.split("?")[0]);
    if (!resource.startsWith(`${root}${path.sep}`) || !fs.existsSync(resource)) {
      fail(page, `missing linked resource "${reference}"`);
    }
  }

  for (const match of source.matchAll(/<img\b[^>]*>/gi)) {
    const tag = match[0];
    const sourceName = attribute(tag, "src");
    const alt = attribute(tag, "alt");
    const width = Number(attribute(tag, "width"));
    const height = Number(attribute(tag, "height"));
    if (alt === null) fail(page, `image "${sourceName ?? "[unknown]"}" is missing alt`);
    if (!Number.isInteger(width) || width <= 0 || !Number.isInteger(height) || height <= 0) {
      fail(page, `image "${sourceName ?? "[unknown]"}" is missing valid dimensions`);
      continue;
    }
    if (sourceName && !/^(?:https?:|\/\/|data:)/i.test(sourceName)) {
      const imagePath = path.resolve(root, path.dirname(page), sourceName);
      if (fs.existsSync(imagePath)) {
        const intrinsic = imageDimensions(imagePath);
        if (
          intrinsic &&
          Math.abs(width / height - intrinsic.width / intrinsic.height) > 0.01
        ) {
          fail(page, `image "${sourceName}" declares the wrong aspect ratio`);
        }
      }
    }
  }
  for (const match of source.matchAll(/<(?:a|button)\b[^>]*>([\s\S]*?)<\/(?:a|button)>/gi)) {
    if (!plainText(match[1])) fail(page, "link or button has no textual accessible name");
  }
  for (const match of source.matchAll(/<nav\b([^>]*)>/gi)) {
    if (!/\baria-label\s*=\s*"[^"]+"/i.test(match[1])) {
      fail(page, "navigation landmark is missing an aria-label");
    }
  }
  for (const match of source.matchAll(/<details\b[^>]*>([\s\S]*?)<\/details>/gi)) {
    if (!/^\s*<summary(?:\s|>)/i.test(match[1])) {
      fail(page, "details element must begin with summary");
    }
  }

  if (/<(?:form|iframe|object|embed|base)\b/i.test(source)) {
    fail(page, "forms, frames, embedded objects, and base URL mutation are not allowed");
  }
  if (/\son[a-z]+\s*=/i.test(source)) fail(page, "inline event handler found");
  if (/<style(?:\s|>)/i.test(source)) fail(page, "inline style block found");
  for (const match of source.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
    if (!/\bsrc=/i.test(match[1]) && match[2].trim()) fail(page, "inline script found");
  }
  if (/\btarget\s*=\s*"_blank"/i.test(source)) fail(page, "unexpected new-window target");

  for (const match of source.matchAll(/<a\b[^>]*>([\s\S]*?)<\/a>/gi)) {
    const label = plainText(match[1]).toLowerCase();
    if (/^(?:buy now|purchase now|download now|start free trial)$/.test(label)) {
      fail(page, `actionable gated CTA "${label}" is linked`);
    }
  }
  for (const match of source.matchAll(/<button\b([^>]*)>([\s\S]*?)<\/button>/gi)) {
    const label = plainText(match[2]).toLowerCase();
    if (label === "start free trial" && !/\bdisabled\b/i.test(match[1])) {
      fail(page, "trial CTA must remain disabled");
    }
  }

  if (/\b(?:Windows 10|Windows 11|version 1903|version 2004)\b/i.test(source)) {
    fail(page, "exact public Windows support claim precedes the approved compatibility matrix");
  }
  if (/\bhref\s*=\s*"[^"]*\.(?:exe|msi|msix|zip)(?:[?#"][^>]*)?/i.test(source)) {
    fail(page, "customer-facing artifact link found before signed release approval");
  }
  if (/\b(?:sk_live_|sk_test_|ghp_|github_pat_|AKIA[0-9A-Z]{16})/i.test(source)) {
    fail(page, "credential-shaped value found");
  }
}

const siteCss = fs.readFileSync(path.join(root, "site.css"), "utf8");
const siteJs = fs.readFileSync(path.join(root, "site.js"), "utf8");
const governanceFiles = [
  "README.md",
  "Prompt.md",
  "Plan.md",
  "Setup.md",
  "content/claim-register.md",
  "content/page-copy-deck.md",
  "privacy.html",
];
const governanceSources = new Map(
  governanceFiles.map((file) => [file, fs.readFileSync(path.join(root, file), "utf8")]),
);
const readme = governanceSources.get("README.md");
if (
  !readme.includes("public, no-commerce pre-release storefront") ||
  !readme.includes("https://iftatbhuiyan.github.io/winshot-website/") ||
  !readme.includes("publication is not commercial launch approval")
) {
  fail("README.md", "public GitHub Pages no-commerce preview boundary is missing");
}
for (const [file, source] of governanceSources) {
  if (/\b(?:private\/local preview|private preview|selected local preview)\b/i.test(source)) {
    fail(file, "obsolete private/local-only preview governance found");
  }
  if (
    /\b(?:not currently protected with Windows-backed encryption at rest|without Windows-backed at-rest protection|not currently Windows-encrypted at rest)\b/i.test(
      source,
    )
  ) {
    fail(file, "stale unprotected-license-record claim found");
  }
}
const privacyCopy = governanceSources.get("privacy.html");
if (
  !privacyCopy.includes("Windows DPAPI") ||
  !privacyCopy.includes("current Windows user") ||
  !privacyCopy.includes("does not enforce a device or seat limit")
) {
  fail("privacy.html", "bounded current-user DPAPI disclosure is missing");
}
const claimRegister = governanceSources.get("content/claim-register.md");
if (
  !claimRegister.includes("Windows DPAPI in current-user scope") ||
  !claimRegister.includes("not a device or seat limit")
) {
  fail("content/claim-register.md", "current-user DPAPI claim qualification is missing");
}
for (const marker of [
  "@media (prefers-reduced-motion: reduce)",
  "@media (forced-colors: active)",
  "@media (max-width: 420px)",
  ":focus-visible",
]) {
  if (!siteCss.includes(marker)) fail("site.css", `missing required guard "${marker}"`);
}
for (const match of siteCss.matchAll(/\bmin-width:\s*(\d+)px/gi)) {
  if (Number(match[1]) > 320) {
    fail("site.css", `fixed minimum width ${match[1]}px exceeds the 320px floor`);
  }
}
if (/\b(?:eval|new Function|document\.write|innerHTML|outerHTML)\b/.test(siteJs)) {
  fail("site.js", "unsafe dynamic code or HTML injection primitive found");
}
if (/\b(?:fetch|XMLHttpRequest|WebSocket|sendBeacon|window\.open|alert)\b/.test(siteJs)) {
  fail("site.js", "network, popup, or alert behavior found in the active script");
}

function luminance(hex) {
  const channels = [1, 3, 5].map((offset) => Number.parseInt(hex.slice(offset, offset + 2), 16) / 255);
  const linear = channels.map((channel) =>
    channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4,
  );
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
}

function contrast(first, second) {
  const firstLuminance = luminance(first);
  const secondLuminance = luminance(second);
  return (
    (Math.max(firstLuminance, secondLuminance) + 0.05) /
    (Math.min(firstLuminance, secondLuminance) + 0.05)
  );
}

const colorTokens = new Map(
  [...siteCss.matchAll(/^\s*--([\w-]+):\s*(#[0-9a-f]{6});/gim)].map((match) => [
    match[1],
    match[2],
  ]),
);
for (const [foreground, background, minimum] of [
  ["ink", "canvas", 4.5],
  ["ink-muted", "canvas", 4.5],
  ["ink-faint", "canvas", 4.5],
  ["ink-muted", "surface", 4.5],
  ["ink-faint", "surface", 4.5],
  ["focus", "canvas", 3],
  ["control-border", "canvas", 3],
  ["control-border", "surface-soft", 3],
]) {
  const foregroundColor = colorTokens.get(foreground);
  const backgroundColor = colorTokens.get(background);
  if (!foregroundColor || !backgroundColor) {
    fail("site.css", `missing contrast token ${foreground} or ${background}`);
  } else if (contrast(foregroundColor, backgroundColor) < minimum) {
    fail("site.css", `${foreground}/${background} contrast is below ${minimum}:1`);
  }
}
for (const token of ["iris", "iris-hover"]) {
  const color = colorTokens.get(token);
  if (!color || contrast("#ffffff", color) < 4.5) {
    fail("site.css", `white/${token} text contrast is below 4.5:1`);
  }
}

const robots = fs.readFileSync(path.join(root, "robots.txt"), "utf8").replace(/\r/g, "").trim();
if (robots !== "User-agent: *\nDisallow: /") {
  fail("robots.txt", "public no-commerce preview must disallow all crawling");
}
if (fs.existsSync(path.join(root, "sitemap.xml"))) {
  fail("sitemap.xml", "sitemap must wait for the approved production origin");
}

const firstViewFiles = new Set([
  "index.html",
  "site.css",
  "site.js",
  "assets/app-icon.png",
  "assets/app-dashboard-preview.jpg",
]);
const firstViewBytes = [...firstViewFiles].reduce(
  (total, file) => total + fs.statSync(path.join(root, file)).size,
  0,
);
if (firstViewBytes > 1024 * 1024) {
  fail("performance", `uncompressed first-view bytes ${firstViewBytes} exceed 1 MiB`);
}

const socialPreview = path.join(root, "assets", "social-preview-private.png");
if (fs.existsSync(socialPreview)) {
  const dimensions = imageDimensions(socialPreview);
  if (!dimensions || dimensions.width !== 1200 || dimensions.height !== 630) {
    fail("assets/social-preview-private.png", "social preview must be 1200x630");
  }
}

if (errors.length > 0) {
  console.error(`FAIL_STATIC_SITE (${errors.length} finding${errors.length === 1 ? "" : "s"})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log(`PASS_STATIC_SITE pages=${pages.length}`);
  console.log(`PASS_PREVIEW_INDEXING pages=${pages.length} robots=disallow-all`);
  console.log("PASS_PUBLIC_NO_COMMERCE_GOVERNANCE github-pages=review-only");
  console.log(`PASS_STATIC_SECURITY csp=${pages.length} external-resources=0 forms=0`);
  console.log("PASS_ACCESSIBILITY_SOURCE landmarks=headings, aria-refs, image-alt, focus/reflow media");
  console.log("PASS_ROUTE_GRAPH internal-links-and-fragments");
  console.log("PASS_TRUTHFUL_GATES checkout=disabled download=disabled support-matrix=pending");
  console.log(`PASS_FIRST_VIEW_BUDGET bytes=${firstViewBytes} limit=1048576`);
  console.log(
    `INFO_SOCIAL_PREVIEW ${fs.existsSync(socialPreview) ? "ready-unwired-pending-production-origin" : "absent"}`,
  );
  console.log("INFO_STATIC_SCOPE browser, screen-reader, forced-colors, and Core Web Vitals remain manual");
}
