# WinShot Storefront Setup

Last verified: 2026-07-28 on the current Windows workstation

This file documents reproducible local website work without credentials, customer data, signing
material, license keys, or private product captures.

## Repository baseline

```text
C:\Users\iftat\OneDrive\Desktop\WinShot Website
branch: main
upstream: origin/main
initial working tree: clean
```

The current site is static and has no package manifest, build step, external font, CDN dependency,
or server component. Its implementation files are:

- `index.html`
- the twelve supporting `.html` routes listed in `Plan.md`;
- `site.css` and `site.js`;
- `assets/app-icon.png` and `assets/app-dashboard-preview.jpg`;
- the intentionally unwired `assets/social-preview-private.png`; and
- the zero-dependency `tools/validate-site.mjs` source gate.

`styles.css`, `app.js`, `assets/favicon.svg`, and `downloads/PUT-INSTALLER-HERE.txt` are unreferenced
historical baseline files only. Their old download instructions are explicitly inactive and must
not be restored. No production download currently exists.

The owner-authorized public review preview is published from the root of `main` at
`https://iftatbhuiyan.github.io/winshot-website/`. It is intentionally no-commerce and
non-indexable; GitHub Pages publication is not production storefront approval.

## Local prerequisites

- Windows, PowerShell, and Git.
- A current browser; use current Edge/Chrome plus Firefox and Safari coverage before launch.
- Python 3 for a simple local static server, or another already-approved static server.
- Node.js only for syntax checks or a future reviewed/pinned validation toolchain.
- Browser developer tools for responsive, network, accessibility, performance, and no-JavaScript
  checks.
- Product-media work requires a validated WinShot build and synthetic sample content. Never use
  personal captures or real license/customer data.

Verify tools without installing packages:

```powershell
git --version
python --version
node --version
```

If a tool is absent, document the missing prerequisite rather than running an unreviewed latest
package installer. Respect the environment's `minimumReleaseAge` policy for any future dependency.

## Read-before-work sequence

From the website repository root:

```powershell
Get-Content -Raw .\Prompt.md
Get-Content -Raw .\Plan.md
Get-Content -Raw .\Implement.md
Get-Content -Raw .\Setup.md
Get-Content .\Documentation.md -Tail 80
git status --short --branch
```

Also read the actual files in the active work package and the desktop application's current
durable docs/release evidence before adding product claims.

## Local preview

Serve the repository instead of opening `index.html` directly so relative URLs, navigation, and
fetch behavior match a web origin:

```powershell
Set-Location "C:\Users\iftat\OneDrive\Desktop\WinShot Website"
python -m http.server 4173
```

Open `http://127.0.0.1:4173/`. Do not expose this development server to the public network.

Focused source checks that require no package installation:

```powershell
node --check .\site.js
node --check .\tools\validate-site.mjs
node .\tools\validate-site.mjs
git diff --check
git status --short --branch
```

The checked-in validator covers static route, metadata, semantics, ARIA, local-resource, CSP,
preview-indexing, public no-commerce governance, truthful-gate, 320-pixel source-guard,
contrast-token, and first-view-budget
invariants. Rendered keyboard, zoom, screen-reader, forced-colors, browser-diversity, performance,
and production-header validation remain manual gates. Record the exact tool/version and command
in `Documentation.md`.

## Manual viewport and interaction matrix

For each meaningful UI change, validate:

- 320 by 568 and 390 by 844 CSS-pixel mobile viewports;
- 768-pixel tablet and 1280/1440-pixel desktop viewports;
- keyboard-only navigation from browser chrome through the footer;
- 200% text enlargement and 400% browser zoom/reflow;
- reduced motion and forced-colors/high-contrast;
- JavaScript disabled and images disabled;
- slow-network loading and failed media;
- current Edge/Chrome and Firefox; Safari before production launch.

Capture only synthetic, privacy-safe evidence. Record clipping, overflow, focus order, names/states,
contrast, layout shift, and broken-link results.

## Product media setup

- Use a release-candidate or explicitly identified concept build, never an unrelated mockup
  presented as shipping UI.
- Create a synthetic desktop/profile with fabricated names, paths, documents, URLs, and license
  state.
- Remove notification content, account avatars, browser profiles, file paths, emails, tokens,
  machine identifiers, and third-party personal data.
- Preserve legibility at intended render sizes and provide meaningful alt text or a text
  alternative.
- Optimize source PNG/WebP/AVIF/video deliberately and retain reproducible originals outside the
  public web output when they contain layered/editable data.

## Checkout and license-management setup

Production wiring requires owner-supplied, approved public values:

- Lemon Squeezy store/product/variant identity;
- hosted checkout URL and success/cancel behavior;
- receipt/order lookup or customer portal URL;
- approved price, currency/tax wording, trial, activation/device, update, refund, and support
  terms.

Only public provider URLs or public identifiers may appear in frontend files. Lemon Squeezy API
keys, signing secrets, Azure credentials, private license keys, and privileged webhook/server
configuration must live in an approved secret store and server-side environment, never this
repository.

Use provider test mode where available. Do not create a real paid transaction during routine
validation. Record production handoff ownership and rollback before enabling the live CTA.

## Download and release setup

A production download must be derived from the desktop application's signed release manifest and
include:

- exact public version and release date;
- supported Windows edition/architecture requirements;
- signed installer URL hosted at an approved immutable release location;
- byte size and SHA-256 checksum computed from that exact artifact;
- release notes/changelog URL and a working fallback/support path.

Do not place unsigned development installers in this repository or its startup path. If release
evidence is missing, the website must present a waitlist/status state rather than a clickable
download that can fail.

## Public preview and production-hosting unknowns

The owner has approved GitHub Pages as a public review host for the no-commerce preview. No
production hosting contract, domain, DNS ownership, canonical origin, deployment credential,
analytics decision, or production rollback command is configured in this repository. Before
commercial deployment, the owner must approve:

- cleared product name, publisher/legal entity, domain, DNS account, and registrar ownership;
- production host and plan, source integration, preview/prod separation, and access control;
- canonical `www`/apex policy and legacy redirect map;
- deploy and rollback commands plus the person authorized to use them;
- security headers, compression, cache rules, error pages, logs, uptime monitoring, and retention;
- support email/system and privacy/legal policy owner;
- whether analytics is necessary and, if so, its privacy/consent configuration.

Do not infer these values, deploy to an arbitrary provider, or spend on name-dependent
infrastructure while name clearance is blocked.

## Worktrees and subagents

- Assign non-overlapping scopes before parallel work. One agent should own shared root docs at a
  time.
- Use a `codex/`-prefixed branch and focused worktree for risky experiments, framework changes,
  provider integrations, or deployment work.
- Never merge until focused/broad validation passes, the diff is reviewed, and
  `Documentation.md` is current.
- Verify absolute paths before worktree cleanup and never remove a worktree containing uncommitted
  work.

## Secret and privacy handling

Never commit or expose:

- Azure, Lemon Squeezy, hosting, DNS, analytics, email, or GitHub access credentials;
- signing certificates/private keys, license keys, webhook secrets, customer data, receipts, or
  support transcripts;
- real screenshots/recordings containing personal content;
- local absolute paths in public site content or telemetry.

If a credential is exposed, stop using it, revoke/rotate it through the provider, remove it from
current source and history using an approved incident plan, and document only redacted evidence.
