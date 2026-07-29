# WinShot Storefront Documentation Log

This is the append-only execution record for the website repository. Entries include the active
work package, files changed, commands and results, decisions, failures/fixes, remaining risk, and
next action. Never include credentials, license keys, customer data, or private captures.

## 2026-07-28 — M0 durable baseline start

**Work package:** Milestone 0, required root documentation and commercial storefront baseline.

**Initial repository state**

- Path: `C:\Users\iftat\OneDrive\Desktop\WinShot Website`
- Branch: `main`, tracking `origin/main`
- `git status --short --branch`: clean before documentation work.
- Existing source: `index.html`, `styles.css`, `app.js`, `README.md`,
  `assets/favicon.svg`, and `downloads/PUT-INSTALLER-HERE.txt`.
- Architecture: static single-page HTML/CSS/JavaScript with no package manifest or build step.

**Source and context reviewed**

- Read the website README, JavaScript, ignore rules, installer placeholder, HTML headings/links and
  commercial claims, and CSS palette/responsive/motion rules.
- Read the desktop application's `Prompt.md`, `PLAN.md`, `Implement.md`, `Setup.md`, and latest
  `Documentation.md` evidence to align release, licensing, privacy, packaging, and naming truth.
- Reviewed the completed website audit supplied to this workstream.

**Audit baseline**

- `index.html:338` points the primary download to a GitHub release asset that does not exist; the
  public repository has no releases.
- `index.html:87`, `index.html:337`, and `index.html:353` claim free/no-account while the
  application uses a 14-day trial and paid one-time license.
- Pricing, checkout, FAQ, changelog, support, privacy, terms/EULA, refund, license management,
  signed provenance, and release history are missing.
- Feature/size/version/startup/overlay/GIF/scrolling/distribution statements need evidence review.
- The audited 390 by 844 render clips core content; measured CTA contrast near 2.87:1 and 1.81:1
  fails WCAG AA for normal text.
- Skip/focus/mobile-menu/no-JavaScript/reduced-motion/SEO/structured-data/security-header coverage
  is incomplete.
- The blue/purple/teal gradient, glow, CSS-mockup, and repeated equal-card language does not meet
  the user's requested restrained, mature quality.
- An active overlapping Windows product uses the exact `WinShot` name at `https://winshot.org/`.
  Public launch and irreversible brand spend are blocked pending professional clearance and likely
  renaming.

**Decision**

- Establish a website-specific durable execution contract before implementation.
- Use a concept-first workflow, real privacy-sanitized product evidence, and a claim register.
- Keep the current public actions unavailable until the name, approved offer, provider
  destinations, policies, and signed release manifest exist.
- This work package does not modify HTML, CSS, JavaScript, assets, README, provider state, hosting,
  or deployment.

**Files assigned**

- `Prompt.md`
- `Plan.md`
- `Implement.md`
- `Setup.md`
- `Documentation.md`

**Remaining risk**

- Name/publisher, domain/host, production checkout/order-management URLs, exact offer terms,
  policies, signed release artifact, support destination, analytics decision, and deployment
  rollback are not yet approved.

**Next action**

- Validate the five root documents and confirm the working tree contains only the expected new
  documentation files, then begin Milestone 1 concept work in a separately assigned scope.

## 2026-07-28 — M0 durable baseline validation

**Files created**

- `Prompt.md`: commercial goal, exact design intent, scope/non-goals, truthful-claim and provisional
  name constraints, success criteria, and authoritative sources.
- `Plan.md`: audit baseline, sitemap/homepage plan, concept-first milestones, accessibility/SEO/
  performance/security/commerce/download gates, validation, rollback, and current status.
- `Implement.md`: editing, claims, accessibility, privacy/security, package, validation,
  documentation, git/worktree, and deployment rules.
- `Setup.md`: clean baseline, local preview, browser matrix, product-media handling, provider and
  release inputs, hosting unknowns, and secret handling.
- `Documentation.md`: live baseline, decisions, risks, commands, and next actions.

**Validation run**

- `git status --short --branch`: exit 0; only the five expected untracked root documents are
  present on `main...origin/main`.
- `git diff --check`: exit 0 with no whitespace errors.
- `Get-Item Prompt.md,Plan.md,Implement.md,Setup.md,Documentation.md`: exit 0; all required files
  exist and are nonempty.
- A targeted secret-pattern scan across the five files returned no matches.
- A coverage scan confirmed that commercial readiness, provisional naming, truthfulness, sitemap,
  concept workflow, accessibility, SEO, performance, security, checkout, download, hosting,
  rollback, and status are represented.

**Failures and fixes**

- None.

**Scope confirmation**

- No HTML, CSS, JavaScript, asset, README, download, provider, hosting, or deployment files were
  changed.

**Remaining risk and next action**

- Milestone 0 is complete for the documentation baseline. Milestone 1 should produce and review
  coordinated desktop/mobile concepts and a verified product-media/claims inventory before
  production implementation. Public launch remains blocked by Milestones 0.5, 4, and 5.

## 2026-07-28 — M1/M3 content truth work started

**Work package**

- Build a source-backed claim register and page-by-page copy deck for the planned storefront.
- This delegated scope creates only new files under `content/` and appends evidence here; it does
  not edit the current HTML, CSS, JavaScript, assets, provider configuration, or deployment state.

**Evidence policy**

- Desktop source, tests, durable project documents, and recorded validation are authoritative.
- Implemented-but-not-manually-validated behavior is qualified; planned behavior is not public
  copy.
- The `WinShot` name, publisher, price, commerce URLs, support identity, legal terms, release
  provenance, and other owner/provider inputs remain explicitly provisional or unavailable.

**Validation planned**

- Review the scoped diff, run `git diff --check`, verify only assigned paths changed, scan the new
  content for unsupported commercial assertions and credential-shaped text, and record remaining
  launch blockers.

**Evidence command failure**

- A combined `rg` source-evidence query exited 1 because PowerShell passed directory globs such as
  `src/WinShot.App/QuickAccess/*.cs` literally and ripgrep rejected them on Windows. The successful
  portions still returned settings, capture, lifecycle, history, editor, recording, and licensing
  evidence. The retry uses directory paths plus `--glob '*.cs'`.
- The corrected directory queries returned the intended Quick Access and licensing evidence. A
  final project-target subquery in that batch still exited 1 for the same literal-glob reason; its
  retry searches from the repository root with `--glob '*.csproj'` instead.
- A distribution-document evidence query exited 1 after returning its requested matches because
  the desktop repository has no root `README.md`. No retry is needed; the authoritative sources
  for that query were `DISTRIBUTION.md`, `SECURITY_REVIEW.md`, and current source.
- The first combined website validation command did not execute because nested quote characters in
  the inline credential-pattern expression caused a PowerShell parser error. The retry separates
  source/diff checks from a simpler, single-quoted credential-shape scan.

## 2026-07-28 — M1/M3 content truth inventory completed

**Files created**

- `content/claim-register.md`: 62 identity, offer, capture, editor, recording, lifecycle,
  licensing, privacy/security, commerce, support, and release claims mapped to source evidence,
  qualifications, and one of four publication states.
- `content/page-copy-deck.md`: preview-safe information architecture and copy for the homepage,
  Features, Pricing, Download/Release Status, FAQ, Changelog, Support, License Help, Privacy,
  Terms, EULA, and Refund Policy surfaces.

**Source review**

- Read the website's five durable root documents and the desktop application's durable prompt,
  plan, implementation rules, setup, and current evidence log.
- Inspected the desktop capture/delivery, Quick Access, history, editor, OCR, recording/media,
  settings, lifecycle/startup, licensing/storage/provider-client, manifest, target, dependency,
  and distribution source in scope.
- Used the desktop's latest recorded integrated evidence—96/96 Release tests and a Release solution
  build with zero warnings and zero errors—to distinguish tested logic from still-open manual,
  hardware, provider, packaging, signing, legal, and installed-path gates.
- Found one important documentation drift condition and handled it conservatively: an older
  security review describes zero network code, while current source contains an unwired Lemon
  Squeezy client. The copy therefore prohibits “zero network” and requires a final-binary network
  and privacy review.

**Content decisions**

- The exact product name remains a provisional working token; all public brand spend and launch
  remain blocked on professional clearance and likely renaming.
- Implemented capabilities may appear in private preview copy only at the specificity the source
  supports. Scrolling, recording/audio/GIF/trim, startup/persistence, recovery, exact compatibility,
  privacy, and security claims remain visibly release-gated where manual or packaged-build proof is
  incomplete.
- No price, currency/tax statement, device count, lifetime-update right, refund window, support
  address/SLA, provider URL, signed status, release version, size, checksum, testimonials, or legal
  terms were invented.
- Pending checkout/download states are non-clickable and explicit. The website never collects a
  license key; future recovery is routed only to an approved provider-hosted surface.
- Privacy copy is an evidence-backed data-map specification, not a pretend legal policy. Terms,
  EULA, and refund sections are structured owner/legal input lists plus honest preview states.

**Validation**

- Page-coverage scan reported 12 required page sections.
- Provisional-name scan found controls at the register/deck introductions, preview identity,
  metadata, and handoff checklist.
- Trailing-whitespace scan across both new content files and `Documentation.md` returned no
  matches after replacing Markdown hard-break spaces with blank lines.
- Credential-shape scan for common live/test API keys, GitHub tokens, private-key headers, and JWT
  shapes returned no matches.
- Unsupported-assertion scan found only explicit editorial prohibitions, pending questions, or
  `Do not claim` register rows; no unqualified public price, guarantee, device, download, privacy,
  testimonial, or compliance assertion remains.
- `git status --short --branch` shows the five website baseline documents plus the new `content/`
  directory only. No HTML, CSS, JavaScript, assets, downloads, provider, hosting, or deployment
  files were changed by this workstream.

**Remaining launch blockers**

- Professional name clearance and final publisher/domain identity.
- Approved offer, provider, device/update/refund/support terms and tested public destinations.
- Qualified privacy/legal review using the completed data-map inputs.
- Signed release manifest and packaged-build compatibility, lifecycle, media, privacy, and
  install/update/rollback/uninstall evidence.

**Next action**

- The website implementation owner can use the deck's preview state immediately, but must update
  the claim register before promoting any release-gated or owner-input statement to production.

## 2026-07-28 - M1 concept selection and implementation start

**Work package**

- Milestone 1 visual system and Milestone 2 homepage shell.

**Selected direction**

- Quiet editorial precision: near-black canvas, warm-white type, cool-gray supporting copy,
  graphite rules and surfaces, and one iris-violet accent.
- Concepts now cover the hero, four-step workflow, three truthful product chapters, local/privacy
  evidence, offer/FAQ, final action, and footer.
- Rejected patterns: gradients, glows, glassmorphism, equal-card feature walls, invented analytics,
  fake testimonials, unsupported counts, fabricated price, and mock interfaces presented as the
  shipped product.
- Generated concept media remains design evidence only. Production product frames will use
  privacy-sanitized screenshots from the current application build.

**Implementation constraints**

- Preserve the static, dependency-free architecture.
- Replace the existing dead download and unsupported commercial claims with an explicit
  pre-release state.
- Core navigation and all substantive content must work without JavaScript.
- Add skip navigation, keyboard-operable disclosure/menu behavior, reduced-motion and
  forced-colors handling, and 320-pixel reflow.
- The exact product name remains a replaceable working label pending clearance.

**Next validation**

- Render desktop and mobile homepage implementations, compare them to the accepted concepts,
  inspect screenshots, run keyboard/no-JavaScript/reduced-motion checks, and document the fidelity
  ledger and remaining production inputs.

### Local preview validation failure

- The first combined PowerShell command that launched the static server and dynamically iterated
  page requests was rejected by the execution policy before it ran.
- No website or process state changed.
- Fix: split the static-server start from explicit read-only page checks and browser automation.
- Playwright's bundled Chromium launcher then failed because its matching browser binary is not
  installed. No package or browser download was performed because the site is dependency-free and
  the environment's release-age/provenance policy applies.
- Fix: run the already-installed Playwright library against the installed Brave Chromium
  executable and record the exact executable used.
- The first attempt to downsample the 1,254-pixel application icon for the website used an invalid
  PowerShell `New-Object` overload. The drawing target was never created, no temporary output
  existed, and the existing website icon remained unchanged.
- Fix: use the typed `System.Drawing.Bitmap` constructor, verify the resulting dimensions and alpha,
  and compare transfer bytes before accepting the optimized asset.

## 2026-07-28 - M1 through M3 local implementation evidence pack

**Files and surfaces**

- Rebuilt `index.html` through targeted section edits into the accepted quiet-precision homepage.
- Added `site.css` and `site.js` as the active dependency-free design and progressive-navigation
  layer.
- Added pricing, changelog, support, license-help, FAQ, privacy-status, terms-status, and
  EULA-status pages. Unapproved legal or commercial language is presented as an explicit pending
  state, not plausible filler.
- Added `content/claim-register.md` with 62 evidence-mapped claims and
  `content/page-copy-deck.md` for 12 market surfaces.
- Added `assets/app-dashboard-preview.jpg`, captured from the app's isolated debug preview. It is
  746 by 613 pixels, 40,485 bytes, uses synthetic empty history, and was visually inspected for
  personal content.
- Added a 256 by 256 web export of the accepted application icon. Downsampling reduced it from
  591,077 to 30,302 bytes without changing the application master.
- Updated `README.md` so old source/download/hosting instructions are visibly deprecated and the
  release gate is authoritative.

**Fidelity ledger**

- Preserved from the selected concepts: near-black canvas, warm-white editorial typography,
  graphite rules/surfaces, one iris-violet accent, large negative space, product-first hero,
  four-step rail, alternating feature chapters, local-control evidence, plain offer, accordion
  FAQ, restrained footer, and no decorative gradient/glow system.
- Intentional truth deviation: the generated hero concept invented a sidebar dashboard, recent
  files, quick actions, and a live purchase action. Production uses the real current dashboard
  with an empty synthetic history, labels conceptual editor media, qualifies release-gated
  behavior, and disables trial/download until a signed artifact exists.
- Testimonials, customer logos/counts, analytics dashboards, numeric price, discount, version,
  installer size, checksum, cloud upload, fake “Buy now,” and security/compliance badges remain
  absent.

**Browser validation**

- Served locally with Python on `127.0.0.1:4173`; all nine HTML pages returned HTTP 200.
- Used the installed Playwright library with installed Brave Chromium because Playwright's bundled
  browser was unavailable; no package or browser was downloaded.
- 1440-pixel homepage: HTTP 200, correct title, zero console/page errors, and
  `scrollWidth == clientWidth == 1440`.
- 390-pixel homepage: zero console/page errors and
  `scrollWidth == clientWidth == 390`; the full-page implementation screenshot was inspected.
- JavaScript-disabled 320-pixel homepage: all 3,236 characters of main content present,
  `scrollWidth == clientWidth == 320`; the menu button is hidden and the seven navigation links
  remain visible.
- Every supporting page reflowed at 320 pixels without horizontal overflow, with one `h1`, one
  `main`, and nonempty content.
- JavaScript mobile menu opens with `aria-expanded=true`, focuses the first link, closes on Escape,
  restores focus to the menu button, and closes when crossing the desktop breakpoint.
- Homepage semantic check: one `h1`, one `main`, `lang=en`, no duplicate IDs, no missing image alt,
  no unnamed buttons, and no dead fragment links.
- All nine internal page destinations returned HTTP 200.
- Muted-text token contrast is approximately 8.37:1 on the canvas. The adjusted faint token is
  approximately 5.03:1 on the canvas and 4.78:1 on the raised surface; the focus token is
  approximately 7.84:1 on the canvas.
- `node --check site.js` and `git diff --check` passed. Active source scans found no gradient/glow,
  dead release URL, fabricated version/size, active legacy CSS/JS reference, or credential-shaped
  value. The only secret-scan text match described the scan itself in this log.
- Uncompressed first-view source assets total 106,379 bytes (`index.html`, `site.css`, `site.js`,
  app icon, and dashboard image), well within the 1 MiB budget before host compression.

**Remaining validation and production gates**

- Firefox, Safari, native Windows forced-colors, a screen-reader smoke path, social/no-image
  previews, production Core Web Vitals, CSP/security headers, robots/sitemap/canonical origin, and
  hosting rollback remain open.
- Name/publisher, domain/support, price/device/update/refund terms, Lemon Squeezy destinations,
  final policies, and a signed release manifest require owner, provider, legal, or release inputs.
- The site remains a local pre-release preview; it was not deployed and accepts no payment,
  license key, support submission, or personal data.

### Sitemap completion addendum

- Added feature detail, download-status, refund-status, privacy-safe 404, and pre-release
  `robots.txt` surfaces after the first evidence pack. `robots.txt` deliberately disallows
  crawling until the name, production origin, policies, and commercial release are approved.
- Final local matrix: all 13 HTML files return HTTP 200; each has one `h1`, one `main`, no missing
  image alt text, and no horizontal overflow at a JavaScript-disabled 320-pixel viewport.
- Every non-fragment destination linked from the homepage now returns HTTP 200, including Features,
  Pricing, Download status, Changelog, FAQ, Support, Manage license, Privacy, Terms, EULA, and
  Refunds.

## 2026-07-28 - Storefront fidelity and truthful-CTA follow-up

- **Work package:** Milestones 2 and 3 rendered browser QA.
- Rechecked the local site in the in-app Chromium browser at 1440 by 900 and 390 by 844. The
  viewport renders have no horizontal overflow, retain the real privacy-sanitized dashboard, keep
  readable hierarchy at both sizes, and expose the mobile navigation as a single keyboard-focused
  overlay.
- The browser's stitched full-page screenshot repeated the sticky first viewport instead of
  representing the actual document flow. DOM geometry and separate scrolled viewport captures
  confirmed that all seven homepage sections occupy distinct positions through the 8,964-pixel
  desktop document. That stitched image is rejected as visual evidence; viewport captures are the
  authoritative review images.
- The first Escape test reused the pre-open accessible name `Open navigation`; after opening, the
  control correctly renames itself `Close navigation`, so the stale locator timed out. A fresh DOM
  snapshot and exact `Close navigation` locator passed: Escape collapsed the menu and restored
  focus to `Open navigation`.
- Visual review found one truthful-copy mismatch: header and hero links said `Start free trial`
  even though they only scroll to the release-blocked status and cannot start a trial. Replace
  those actionable link labels with release-status language while keeping the actual unavailable
  trial button disabled and described by the signed-release gate.
- Replaced those three link labels with `Release status` / `Check release status`; the actual
  `Start free trial` control remains disabled in the offer section. Fresh 1440 by 900 and 390 by
  844 viewport captures were visually inspected. The desktop remains calm and product-led; mobile
  keeps a 343-pixel-wide primary action, readable 58.5-pixel/54.4-pixel headline rhythm, and no
  horizontal overflow. Browser console warning/error log was empty.
- Source and route gate: `node --check site.js` and `git diff --check` passed; all 13 HTML pages
  returned HTTP 200 from the local server. Search confirmed no actionable `Start free trial` link
  remains and the only occurrence is the intentionally disabled offer control.
- Current render evidence:
  `C:\Users\iftat\AppData\Local\Temp\winshot-storefront-desktop-final-1440.png` and
  `C:\Users\iftat\AppData\Local\Temp\winshot-storefront-mobile-final-390.png`. The generated
  section-concept files from the earlier design pass were not retained in this repository, so the
  durable selected-direction/fidelity ledger above remains the concept record; future concept
  iterations should save their source images under a reviewed design-evidence location.

## 2026-07-28 - Commercial gate QA refresh started

- **Work package:** Milestone 3 rendered browser and route refresh after the companion App's
  recovery/performance/install-contract tranche.
- The in-app browser loaded `http://127.0.0.1:8765/index.html`, returned the correct title and a
  meaningful 7,901-character accessibility snapshot, and reported no console warnings/errors.
  Its selected connection did not expose the documented screenshot method, so responsive visual
  and interaction QA fell back to the already-installed Playwright library with installed Brave;
  no package or browser was installed.
- The first fallback run reached desktop screenshot capture, then timed out reading
  `aria-expanded` from the stale pre-click `Open navigation` locator after the button correctly
  renamed itself on open. Reacquire the post-open control by its current accessible name and rerun
  the interaction before accepting this QA refresh.
- A combined source gate then stopped at its visual-style scan because the ad hoc pattern treated
  every colored `box-shadow` as a glow. Inspect the matched declarations and rerun with the
  established gradient/blur/glow criteria; ordinary restrained elevation shadows are not a
  gradient/glow regression.
- The flow under test was: homepage loads -> first meaningful screen renders -> release-status and
  mobile-navigation controls communicate their real state without runtime errors.
- Installed Playwright with installed Brave passed the 1440x900 and 390x844 homepage refresh:
  HTTP 200, correct title, one `h1`, one `main`, meaningful content, no framework overlay, missing
  alt text, unnamed buttons, console warnings/errors, page errors, or horizontal overflow. The
  offer still has one deliberately disabled `Start free trial` control and three truthful
  release-status links.
- Mobile interaction passed after reacquiring the current control name: open changed
  `aria-expanded` to `true` and focused Product; Escape changed it to `false` and restored focus to
  `Open navigation`. Fresh screenshots were visually reviewed at
  `C:\Users\iftat\AppData\Local\Temp\winshot-storefront-gate-desktop-1440.png`,
  `C:\Users\iftat\AppData\Local\Temp\winshot-storefront-gate-mobile-menu-390.png`, and
  `C:\Users\iftat\AppData\Local\Temp\winshot-storefront-gate-mobile-390.png`.
- All 13 HTML routes passed at a JavaScript-disabled 320x844 viewport with HTTP 200, one `h1`, one
  `main`, nonempty main content, no missing image alt, no page error, and no horizontal overflow.
  All 12 distinct non-fragment homepage destinations also returned HTTP 200.
- `node --check site.js`, active legacy-reference, credential-shaped value, actionable
  `Start free trial`/`Buy now`, gradient/blur/glow, first-view budget, and `git diff --check` gates
  passed. The only style matches in the rejected broad scan were two restrained black elevation
  shadows. Current uncompressed first-view assets total 106,535 bytes, below the 1 MiB budget.
- The local HTTP server and fallback browser were stopped after QA. The site remains an undeployed,
  release-blocked preview; production browser diversity, forced colors/screen reader, real origin
  metadata/security headers, Core Web Vitals, checkout, legal approval, and signed-download paths
  remain open.

## 2026-07-28 - Private storefront release-truth and social-preview tranche

- **Work package:** Milestone 3 static commercial-readiness refresh and private social asset.
  No deployment, package installation, browser automation, commerce/download enablement, public
  origin, provider credential, or customer artifact was authorized or created.
- Reviewed all 13 routes against the current application and release evidence. Removed the
  unsupported Windows 10/11/1903 public support claim; qualified native recording as awaiting
  packaged hardware validation; limited recent-history copy to image captures; disclosed bounded
  local history/clipboard backing files and the cloud-synced-folder caveat; and removed implied
  license-transfer rights or enabled provider validation.
- Every route now carries the exact private-preview CSP plus `noindex, nofollow`, strict referrer
  metadata, unique title/description, semantic landmarks/headings, resolved ARIA references, local
  resources, and no external forms/scripts/origins. `robots.txt` still disallows all crawling.
- `site.css` now meets the checked primary control/text contrast boundary, preserves visible focus
  and menu marks in forced colors, and keeps reduced-motion and 320-pixel guards. Historical
  download-placement instructions are explicitly inactive.
- Added zero-dependency `tools/validate-site.mjs`. It validates the fixed 13-route graph,
  fragments, metadata, landmarks/headings/ARIA, image dimensions/alt text, CSP, private indexing,
  no external resources/forms/inline executable code, no credential-shaped values, disabled
  commerce/download state, pending Windows support matrix, contrast tokens, responsive source
  guards, and the 1 MiB first-view budget.
- Generated one restrained, professional 1200x630 social preview using the approved app icon and
  privacy-sanitized dashboard. The reviewed file is
  `assets/social-preview-private.png`, 847,280 bytes, SHA-256
  `592C1ACD67876D91790B56A99FD161AEC671B8E6392255D542C3A6671BA692B7`.
  It remains intentionally unwired because an `og:image` requires the cleared name and approved
  absolute production origin.

### Failures and corrections

- The first social-image resize command placed a pipeline directly after a PowerShell `finally`
  block, causing a parser error before output creation. The corrected, non-destructive resize and
  center-crop produced the reviewed 1200x630 file.
- Three audit-only subagent commands initially failed before correction: an empty PowerShell pipe
  in a metadata collector, bash heredoc syntax used in PowerShell, and a combined `rg` expression
  whose quoting produced an unclosed character class. None changed site state; corrected commands
  completed.
- Root's first installer-text review used Unix-style file globs with `rg` on Windows and failed
  path parsing. The corrected directory-scoped search passed. It did not touch this repository.

### Validation evidence

- `node .\tools\validate-site.mjs`:
  `PASS_STATIC_SITE pages=13`, private indexing and CSP on all 13, external resources/forms zero,
  route graph/accessibility-source/truthful-gate checks passed, and uncompressed first view
  107,377 bytes against the 1,048,576-byte limit.
- `node --check .\site.js` and `node --check .\tools\validate-site.mjs` passed.
- Stale/actionable claim scan and trailing-whitespace scan returned zero matches.
- `git diff --check` passed with only existing LF-to-CRLF notices. No file was staged, committed,
  pushed, or deployed.
- `Plan.md` and `Setup.md` now record the private social asset, active implementation files, and
  repeatable static validation command.

### Remaining gates

- Current changes still require a rendered refresh for native forced colors, reduced motion,
  320/390-pixel and 400% reflow, keyboard/menu/focus, screen reader, Firefox/Safari, and
  production-origin Core Web Vitals.
- Production canonical/OG URLs, sitemap/structured data, response headers, HTTPS,
  compression/cache, monitoring, provider/legal/support identity, checkout/order management, and
  signed installer/checksum wiring remain blocked on owner, provider, legal, signing, and release
  inputs. The site remains private and fail-closed.

## 2026-07-28 - Current rendered private-storefront evidence refresh

- Read-only rendered QA used installed Brave/Chromium `150.0.7871.186` against a loopback-only
  server. The browser plugin exposed no browser binding, so the check used a package-free CDP
  fallback; no browser, package, or dependency was installed and no source file was changed.
- At 1440x900 and 390x844 the homepage returned HTTP 200 with exactly one `main` and `h1`, no
  horizontal overflow, and no console/page errors. Three keyboard Tabs reached the mobile menu;
  Space opened it, exposed navigation and focused Product; Escape closed it and restored focus to
  the menu button.
- The release gate remained truthful: `Start free trial` was a disabled native button, download
  was an `aria-disabled` span with no `href`, and the release note still requires packaged, signed,
  clean install/update/uninstall evidence.
- All 13 routes at 320x844 with JavaScript disabled returned HTTP 200, meaningful core content,
  one `main`, one `h1`, complete image alt text, no overflow, and no console/page errors.
- Observable CSP enforcement blocked an injected inline script and emitted a
  `securitypolicyviolation` for `script-src-elem`. Reduced-motion matched and reduced transitions
  to `0.01ms`; forced colors matched, preserved a 3px solid focus outline, and retained
  system-colored disabled boundaries.
- Reviewed screenshots:
  `%TEMP%\winshot-rendered-qa-desktop-1440x900.png`,
  `%TEMP%\winshot-rendered-qa-mobile-390x844.png`, and
  `%TEMP%\winshot-rendered-qa-nojs-320x844-last-route.png`.
- `git diff --check` passed. The exact `python -m http.server 4173 --bind 127.0.0.1` process,
  PID 11796, was stopped and port 4173 was confirmed closed.
- The raw CDP Enter event did not synthesize a click, while Space verified native button keyboard
  activation. Firefox/Safari, screen-reader output, 400% zoom, real production headers/origin, and
  field Core Web Vitals remain open. The site is still private, undeployed, and fail-closed.

## 2026-07-28 - GitHub Pages private-preview publication started

- The owner explicitly requested that the current storefront be committed and pushed so it can be
  reviewed through GitHub Pages.
- Verified authenticated GitHub access to `IftatBhuiyan/winshot-website`; the public repository's
  Pages source is the root of `main`, HTTPS is enforced, and the current Pages origin is
  `https://iftatbhuiyan.github.io/winshot-website/`.
- This is a review publication, not commercial launch approval. The site retains `noindex,
  nofollow`, robots disallow-all, disabled checkout/download controls, provisional-name warnings,
  local-only resources, and the truthful release gates.
- Pre-push validation passed: JavaScript syntax for `site.js` and `tools/validate-site.mjs`, all
  zero-dependency static-site gates across 13 routes, `git diff --check` with line-ending notices
  only, and a credential-pattern source scan with no credential-shaped value.
- Commit scope is the complete current website worktree only. No desktop-application changes,
  unsigned installer, provider credential, signing material, or private customer data is included.
- The first staged `git diff --cached --check` found one extra blank line at EOF in each of
  `Prompt.md`, `Implement.md`, and `robots.txt`. No content or generated artifact was invalid; the
  three whitespace defects are being removed before the validation rerun and commit.

## 2026-07-28 - Public no-commerce preview governance correction started

- Active work package: Milestones 3 and 5 claim governance for the owner-authorized GitHub Pages
  preview.
- Scope is limited to correcting the current Windows DPAPI license-storage description, replacing
  obsolete private/local-only preview governance with an explicit public no-commerce preview
  boundary, and adding static validator regressions for both classes of drift.
- Checkout, download, indexing, provisional identity, external resources, forms, and production
  launch remain fail-closed. No commerce, provider, release artifact, or application-repository
  state will change.

### Implementation and evidence

- Updated `privacy.html`, `content/claim-register.md`, and `content/page-copy-deck.md` to describe
  the current license record as protected at rest by Windows DPAPI for the current Windows user.
  The qualification explicitly states that current-user protection is not a device/seat limit or
  a boundary against software running as that user.
- Updated `README.md`, `Prompt.md`, `Plan.md`, and `Setup.md` so the owner-authorized GitHub Pages
  publication is consistently described as a public no-commerce review preview, not a private
  local-only site or a commercial launch. Noindex, crawler disallow, provisional identity, disabled
  checkout/download, and production-hosting gates remain unchanged.
- Extended `tools/validate-site.mjs` to require the GitHub Pages review boundary, reject obsolete
  private/local-only preview wording in current governance sources, reject the three stale
  unprotected-license phrases, and require the bounded current-user DPAPI disclosure in both the
  public privacy page and claim register.
- `node --check .\site.js`, `node --check .\tools\validate-site.mjs`,
  `node .\tools\validate-site.mjs`, and `git diff --check` passed. The static gate reported 13
  routes, preview indexing preserved, public no-commerce governance passed, zero external
  resources/forms, complete route/accessibility-source checks, checkout/download disabled, and
  107,377 first-view bytes against the 1 MiB limit.
- A loopback-only HTTP check returned 200 for `privacy.html`. The in-app Browser runtime was
  available but reported no browser binding, so no new rendered screenshot or interaction claim
  is made. This copy/governance-only change does not alter CSS, active JavaScript, layout, or
  interactive controls.
- The first combined final scan failed because it searched `tools/validate-site.mjs` and therefore
  matched the validator's own forbidden-phrase regular expressions. The static validator itself
  passed. The source scan is corrected to exclude the validator implementation while the validator
  continues checking all governed files.
- The corrected stale-governance/DPAPI scan, redacted high-signal credential-pattern scan, all
  JavaScript/static gates, and `git diff --check` passed. Only Git's existing LF-to-CRLF checkout
  notices were emitted.
