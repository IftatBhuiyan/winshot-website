# Relic Screenshot Storefront Plan

Last reviewed: 2026-08-03

This plan is the execution source of truth for the website repository. The desktop application's
release gate remains authoritative for claims about product behavior and downloadable artifacts.

## Current status

- Repository state before documentation work: clean `main` tracking `origin/main`.
- Current implementation: static multi-page HTML/CSS/JavaScript storefront with no build step or
  third-party runtime dependency.
- Audit: complete; findings are recorded below and in `Documentation.md`.
- Milestones 0 and 1: complete.
- Milestones 2 and 3: core local implementation and Chromium browser QA complete; remaining
  cross-browser, forced-colors, social/SEO, and production-origin checks are open.
- Active milestone: Milestone 4 inputs and Milestone 5 hosting/release preparation.
- Public review preview: published from `main` to GitHub Pages with no commerce or download,
  `noindex, nofollow`, crawler disallow, and provisional release/identity warnings.
- Owner-selected public rebrand to `Relic Screenshot`: in progress across the application,
  website, commerce provider, and signing configuration. Professional clearance remains open.
- Commercial launch: blocked by professional name clearance, approved offer terms, signed release evidence,
  working checkout/order-management destinations, and complete policies.

## Baseline findings

- The primary download at `index.html:338` targets a GitHub release asset that does not exist; the
  public repository currently has no release.
- `index.html:87`, `index.html:337`, and `index.html:353` describe the offer as free/no-account,
  conflicting with the application's 14-day trial and paid one-time license.
- Pricing, checkout, FAQ, changelog, support, privacy, terms/EULA, refund policy, license
  management, release history, signed provenance, and checksum surfaces are absent.
- GIF, scrolling, overlay exclusion, launch-at-sign-in, compatibility, version, size, and other
  product claims exceed current validation evidence.
- At 390 by 844 CSS pixels, fixed/intrinsic widths and overflow clipping hide primary content.
  Primary CTA contrast measurements of approximately 2.87:1 and 1.81:1 fail WCAG AA for normal
  text.
- Skip navigation, robust visible focus, mobile-menu keyboard behavior, no-JavaScript behavior,
  reduced-motion behavior, complete SEO/structured data, and production security headers are
  incomplete.
- Blue/purple/teal gradients, glow fields, CSS mockups, and repeated equal cards read as a generic
  template rather than the requested restrained, product-led quality.
- `Relic Screenshot` replaces the conflicting `WinShot` public token. The old name remains only
  in legacy repository paths, URLs, historical records, and unchanged pre-rebrand media.

## Information architecture

The intended sitemap is:

```text
/
├── features/
├── pricing/
├── download/
├── changelog/
├── faq/
├── support/
├── license/
├── privacy/
├── terms/
├── eula/
└── refund-policy/
```

The homepage should present:

1. restrained global navigation with Product, Pricing, Changelog, FAQ, Support, Log in/Manage
   license, and one primary purchase or honest waitlist action;
2. an evidence-led hero with one clear promise, supported-platform/trial context, and a real
   privacy-sanitized application visual;
3. a compact credibility row using verified facts only, never fabricated logos or testimonials;
4. three or four narrative workflow sections showing capture, annotate/deliver, record, and
   tray-first access through real product media;
5. a concise feature index that supports scanning without becoming an equal-card wall;
6. a truthful offer summary linked to full pricing and licensing terms;
7. selected FAQ answers and direct support/license-recovery paths;
8. a final CTA whose purchase/download/waitlist state matches release readiness;
9. a complete footer with product, resources, purchase, support, legal, release, system
   requirements, and publisher identity.

Testimonials may be added only after genuine permission and attributable source evidence exist.
Until then, product proof and precise explanations carry the persuasion.

## Milestone 0 — Durable baseline and audit

**Status:** Complete.

**Work packages**

- Create `Prompt.md`, `Plan.md`, `Implement.md`, `Setup.md`, and `Documentation.md`.
- Preserve the clean baseline and record current architecture, audit findings, constraints,
  validation, hosting unknowns, and launch blockers.
- Keep desktop-application and storefront claims synchronized.

**Acceptance**

- All five required documents exist, agree on scope and gates, and contain no credentials.
- No HTML, CSS, JavaScript, asset, README, hosting, checkout, or deployment state changes.
- Git status shows only the five expected documentation files.

**Validation**

```powershell
git status --short --branch
Get-Item Prompt.md,Plan.md,Implement.md,Setup.md,Documentation.md
git diff --check
git diff -- Prompt.md Plan.md Implement.md Setup.md Documentation.md
```

**Rollback condition:** if the documents conflict with the desktop product's release truth,
correct them before website implementation starts.

## Milestone 0.5 — Product name, publisher, and offer decision

**Status:** Owner-selected name approved for migration; professional legal review and remaining
commercial identity inputs are still open.

**Work packages**

- Migrate the owner-selected product name `Relic Screenshot` and approve its legal
  owner/publisher identity.
- Approve domain, support identity, price/currency, tax display, 14-day trial terms, device/seat
  count, activation/deactivation behavior, update entitlement, refund policy, and support promise.
- Create one replaceable brand-token/content source so a rename does not require scattered edits.

**Acceptance**

- Written approval identifies the selected name, publisher, production domain, full offer terms,
  Lemon Squeezy product/variant, and migration scope; professional clearance evidence separately
  satisfies the public-launch gate.

**Validation**

- Professional clearance evidence is stored outside the public repository before launch.
- A repository search shows no obsolete public-facing name or offer terms after migration.

**Rollback condition:** retain the public no-commerce preview/status state and stop commercial
launch or paid brand spend if clearance or commercial terms remain incomplete.

## Milestone 1 — Concept-first visual and content system

**Status:** Complete for the selected public no-commerce preview direction.

**Workflow**

1. Build an evidence inventory: verified product capabilities, approved offer terms, and a shot
   list using synthetic data.
2. Produce coordinated visual concepts for the homepage as one system, including desktop and
   mobile first viewport, workflow storytelling, pricing transition, and footer/navigation.
3. Review concepts side-by-side for hierarchy, restraint, readability, originality, Windows
   authenticity, media feasibility, and name replaceability.
4. Select and document one direction before production layout/CSS work.
5. Define typography, neutral/accent palette, spacing, grid, media framing, buttons, focus,
   borders, elevation, motion, and content voice as reusable tokens.

**Acceptance**

- The selected concept is demonstrably quieter and more product-led than the baseline.
- Desktop and 390-pixel mobile concepts include the same core content and CTA state.
- Every depicted application state can be reproduced with real sanitized media or is clearly
  labeled as conceptual.
- The direction is original and does not copy CleanShot layouts or assets.

**Validation**

- Side-by-side concept review against the attached audit screenshots.
- Contrast checks for text, controls, focus indicators, and non-text boundaries.
- Owner acceptance recorded in `Documentation.md`.

**Rollback condition:** do not implement a direction that depends on unverified claims, unavailable
media, inaccessible contrast, or copied expression.

## Milestone 2 — Semantic responsive foundation

**Status:** Core implementation complete. Current Chromium desktop/mobile/no-JavaScript,
keyboard menu/focus, CSP, reduced-motion, and forced-colors checks pass. Firefox/Safari, screen
reader, 400% zoom, and production-origin checks remain open.

**Work packages**

- Implement reusable design tokens and semantic document structure through targeted edits.
- Build resilient navigation, skip link, footer, typography, spacing, media, buttons, and layout.
- Ensure all content/links work without JavaScript; add JavaScript only for progressive
  enhancement.
- Implement 320-pixel through wide-desktop layouts without fixed-width clipping or hidden content.
- Respect reduced motion, forced colors, user font sizing, and 400% zoom.

**Acceptance**

- No horizontal clipping or inaccessible core content at 320/390 pixels or 400% zoom.
- All actions are keyboard reachable with visible focus and correct names/states/order.
- Navigation and core content remain available when JavaScript fails or is disabled.
- Current Chrome, Edge, Firefox, and Safari complete the defined smoke path.

**Validation**

```powershell
node --check .\site.js
python -m http.server 4173
```

Then perform browser matrix checks at 320, 390, 768, 1280, and 1440 CSS pixels; keyboard-only,
400% zoom, reduced-motion, forced-colors/high-contrast, and JavaScript-disabled checks. Use an
already-approved local accessibility tool or browser audit; do not install an unreviewed latest
package for convenience.

**Rollback condition:** preserve the previous working revision if core navigation, content,
keyboard use, or responsive layout regresses.

## Milestone 3 — Product-led pages, media, and truthful copy

**Status:** Core pages, claim register, privacy-safe dashboard media, a private 1200x630 social
preview, unique metadata, and internal link checks complete. The social asset is deliberately
unwired; canonical/social URLs, sitemap, structured data, and final release media remain gated on
the cleared identity and approved production origin.

**Work packages**

- Implement the sitemap and homepage sequence defined above.
- Capture and optimize real application media with synthetic data and privacy review.
- Create a claim register mapping every public product fact to source/test/release evidence.
- Add per-page titles, descriptions, canonical policy, social images, semantic heading structure,
  robots, sitemap, and appropriate structured data.
- Provide honest pending/unavailable states where commercial or release inputs are missing.

**Acceptance**

- No unsupported feature, price, file size, version, compatibility, performance, signing, privacy,
  update, or guarantee claim remains.
- Product media is sharp, useful, optimized, accessible, and privacy-sanitized.
- Pages expose unique titles/descriptions, canonical URLs after domain approval, valid heading
  order, and accurate structured data.
- No broken internal link or empty destination remains.

**Validation**

- Claim-register review against desktop source, tests, `Documentation.md`, and release manifest.
- Automated internal-link and markup validation using reviewed/pinned tools.
- Manual social-preview, search-snippet, image-alt, and no-image checks.

**Rollback condition:** remove or qualify any claim/media whose evidence cannot be reproduced.

## Milestone 4 — Commerce, licensing, download, and support gates

**Status:** Pending; blocked on owner/provider inputs and the signed application release.

**Work packages**

- Connect provider-hosted Lemon Squeezy checkout with approved product/variant URLs.
- Provide success, cancel, receipt/order lookup, license recovery, activation/deactivation help,
  and provider order-management paths.
- Publish pricing, update entitlement, activation count, tax/currency, refund, privacy, terms,
  EULA, and support expectations exactly as approved.
- Publish only a release-manifest-backed signed installer with version, release date, supported
  systems, size, SHA-256 checksum, release notes, and a working fallback.
- Ensure unavailable checkout/download states cannot become broken links.

**Security constraints**

- Frontend code may contain public checkout/order-management URLs but no API secrets, signing
  material, license keys, or privileged endpoints.
- Validate every external redirect destination; apply `rel` and referrer behavior deliberately.
- Do not accept payment information directly in this static site.

**Acceptance**

- Purchase success/cancel, receipt recovery, order management, license help, download unavailable,
  download success, checksum, support, and refund paths pass end-to-end tests.
- Offered product/variant and public terms match licensing validation behavior.
- The installer and public checksum match the signed artifact that passed the desktop release gate.

**Rollback condition:** replace commerce/download CTAs with an honest waitlist/status state if any
provider, policy, signed artifact, or release destination is unavailable or inconsistent.

## Milestone 5 — Production performance, security, and launch

**Status:** Public review hosting is active on GitHub Pages; production hosting, origin, and launch
controls remain pending.

**Work packages**

- Select production host/domain/DNS ownership and document deploy/preview/rollback workflows.
- Configure HTTPS, canonical redirects, compression, immutable fingerprinted asset caching where
  applicable, HTML revalidation, 404/500 behavior, and security headers.
- Establish a privacy-safe analytics decision; default to no analytics until purpose, fields,
  retention, consent/legal basis, and processor terms are approved.
- Meet accessibility, SEO, Core Web Vitals, asset, and browser budgets.
- Rehearse deploy and rollback from a clean checkout before public launch.

**Budgets**

- p75 LCP at most 2.5 seconds, INP at most 200 milliseconds, CLS at most 0.1.
- Lighthouse targets under production-like throttling: Accessibility 100 and Performance, Best
  Practices, and SEO at least 95, with manual checks taking precedence over scores.
- Avoid render-blocking third-party scripts. Keep the first viewport transfer under 1 MiB on the
  target production encoding unless recorded evidence justifies an exception.

**Acceptance**

- Production HTTPS, redirects, headers, caching/compression, sitemap/robots, canonical URLs, error
  pages, checkout/download/support paths, monitoring decision, and rollback all have evidence.
- Desktop, 320/390 mobile, 400% zoom, keyboard, reduced-motion, forced-colors, no-JavaScript, and
  current-browser gates pass.
- No secret, private customer data, development URL, unsigned artifact, or broken primary CTA is
  present.

**Rollback condition:** return traffic to the last verified deployment or an honest status page if
checkout, download, legal, security, accessibility, or availability checks fail.

## Completion definition

A website milestone is complete only when its acceptance criteria pass, commands and manual checks
are recorded in `Documentation.md`, failures are fixed or explicitly accepted, changed setup or
goals are reflected in durable documents, and the final diff is scoped. Commercial launch is not
complete until both this plan and the desktop application's release gate pass.
