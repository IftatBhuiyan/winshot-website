# WinShot Storefront Product Prompt

Last reviewed: 2026-07-28

## Product goal

Create a commercially credible storefront for the Windows screenshot and recording application
currently called WinShot. The site must make a careful buyer understand the product, trust the
publisher, evaluate the trial and one-time purchase, obtain or recover a license, download a
verified release, and get support without encountering invented claims or dead ends.

The experience should feel precise, calm, mature, and product-led. It should have the confidence,
editorial rhythm, real-product proof, and complete purchase journey the user admires in
CleanShot's storefront, while using original composition, copy, assets, identity, and interaction
design.

## Exact user intent

- Replace the current generic, colorful, gradient-heavy single-page presentation with an elegant,
  restrained visual system that feels thoughtfully designed rather than template-derived.
- Reach the commercial completeness of a leading desktop-software storefront: clear product
  value, primary workflows, purchase, download, FAQ, license management, changelog, support, and
  legal/privacy information.
- Use the application as the source of product truth. Product visuals must be real,
  privacy-sanitized application captures or carefully identified conceptual previews.
- Make the site persuasive through hierarchy, specificity, and evidence, not fabricated social
  proof, exaggerated comparisons, urgency, or decorative excess.
- Build a fast, accessible, responsive, secure site whose critical content and navigation remain
  usable without JavaScript.
- Connect Lemon Squeezy purchase and order-management surfaces only after the exact production
  URLs, product/variant identity, price, license terms, and policy language are approved.
- Keep name-dependent content replaceable because `WinShot` is a provisional working name.

## Taste and design direction

The target is quiet confidence: disciplined typography, generous space, high-quality product
media, clear section pacing, subtle depth, and a tightly controlled neutral palette with one
purposeful accent. The first viewport should communicate the product and next action immediately.
Interaction should be calm and useful; motion should clarify state and must respect reduced-motion
preferences.

Avoid:

- blue/purple/teal rainbow gradients, large glow fields, or a colorful icon as the primary proof of
  quality;
- walls of repeated equal-weight cards;
- synthetic CSS application mockups presented as real product evidence;
- copying CleanShot's protected writing, artwork, screenshots, exact layouts, or brand devices;
- macOS chrome used to imply that this Windows application is a Mac product;
- fake testimonials, customer counts, review scores, performance figures, scarcity, or guarantees.

CleanShot is a quality and information-architecture reference, not a source to reproduce.

## Audience and offer

Primary audiences are Windows professionals, creators, developers, support teams, educators, and
anyone who frequently explains work visually. Their evaluation questions are:

1. Can it capture, annotate, record, and deliver the formats I need?
2. Is it dependable and unobtrusive enough to run all day?
3. What does the trial include, what does the license cost, and what updates/devices are covered?
4. Is the installer authentic, signed, current, and compatible with my system?
5. What happens to screenshots, recordings, license data, and support information?
6. How do I recover a purchase, move a license, get help, or see what changed?

The current application uses a 14-day trial and a paid one-time license. Exact public price,
currency/tax treatment, activation count, update entitlement, refund terms, and support promise
remain unapproved until confirmed by the product and commerce owners.

## Scope

- Original responsive visual identity and component system for the storefront.
- Homepage and durable product, pricing, download, changelog, FAQ, support, license-management,
  privacy, terms, EULA, and refund/purchase-policy surfaces.
- Truthful copy, real sanitized product media, release metadata, checksums, requirements, and
  fallback states.
- Accessible keyboard, focus, mobile menu, zoom, forced-colors, reduced-motion, and no-JavaScript
  behavior.
- SEO metadata, canonical/robots/sitemap support, structured data, social previews, semantic HTML,
  and meaningful page titles/descriptions.
- Secure checkout/order-management handoffs and signed release download handoffs. No provider
  secrets belong in browser code.
- Production hosting, redirects, caching, compression, security headers, error pages, monitoring,
  and rollback once ownership and provider choices are approved.

## Non-goals

- Do not present the owner-authorized public no-commerce preview as a commercial product launch,
  accept payment, buy name-dependent media, or promote the working name before professional
  name/trademark clearance.
- Do not publish a purchase or download action until its destination exists and the offered signed
  artifact has passed the application release gate.
- Do not claim cloud sharing, automatic updates, perpetual updates, a file size, a version,
  overlay exclusion, scrolling quality, GIF duration/quality, startup reliability, performance,
  privacy, signing, or compatibility beyond current validation evidence.
- Do not build account credentials, payment collection, license-key handling, or entitlement logic
  in static frontend code. Use provider-hosted flows and least-privilege server-side components if
  later required.
- Do not add analytics, trackers, chat widgets, marketing pixels, or third-party fonts merely
  because they are common.
- Do not deploy as part of concept or local implementation work unless the active work package
  explicitly authorizes deployment.

## Durable constraints

- `WinShot` is provisional. An active Windows screenshot/annotation product uses the exact name at
  `https://winshot.org/`, creating direct category-confusion risk. Public launch and irreversible
  brand spend are blocked pending professional clearance and likely renaming.
- Every public factual claim needs a source in application code, release evidence, approved
  commercial terms, or provider configuration. Unknowns render as honest pending/unavailable
  states, never plausible filler.
- Product screenshots and recordings must use synthetic data and must not reveal personal
  screenshots, clipboard contents, paths, license keys, email addresses, tokens, or machine data.
- Browser code must contain no private Lemon Squeezy key, Azure credential, signing secret, access
  token, or unredacted license key.
- Core content and links must work without JavaScript. Enhancements must be additive.
- The site must support current Chrome, Edge, Firefox, and Safari; responsive behavior begins at
  320 CSS pixels and must survive 400% zoom without loss of content or function.
- Target WCAG 2.2 AA. Visible focus, skip navigation, semantic landmarks, accessible names, logical
  order, keyboard operability, contrast, reduced motion, and forced-colors are release gates.
- Target Core Web Vitals at p75: LCP at most 2.5 seconds, INP at most 200 milliseconds, and CLS at
  most 0.1.
- Keep diffs scoped and reviewable. Never perform full-file replace/delete-style edits on existing
  files. Preserve unrelated and user-owned changes.
- Respect package provenance and any configured `minimumReleaseAge`; do not install an arbitrary
  latest package just to run a convenience check.
- Commits use the next sequential subject prefix `Commit #N - `.

## Success criteria

- A first-time visitor can explain the product, supported platform, trial model, purchase model,
  and primary action after the first viewport and one short scroll.
- The purchase, success/cancel, receipt/order lookup, activation help, signed download, unavailable
  download, release notes, support, and refund paths are explicit and tested.
- No primary CTA is broken and no page conflicts with current application or release evidence.
- Mobile at 320 and 390 pixels, desktop, keyboard-only, 400% zoom, reduced-motion, forced-colors,
  no-JavaScript, and current-browser checks retain all core content and actions.
- The accepted visual concept and rendered implementation match in typography, spacing, media
  treatment, hierarchy, and interaction without relying on decorative excess.
- Accessibility, SEO, structured data, security headers, caching/compression, release provenance,
  privacy disclosures, and rollback have recorded evidence in `Documentation.md`.

## Current authoritative sources

- This repository's `index.html`, `styles.css`, `app.js`, `README.md`, and `assets/`.
- `Plan.md`, `Implement.md`, `Setup.md`, and `Documentation.md` in this repository.
- The desktop application's durable project files at
  `C:\Users\iftat\OneDrive\Desktop\WinShot\Prompt.md`,
  `C:\Users\iftat\OneDrive\Desktop\WinShot\PLAN.md`,
  `C:\Users\iftat\OneDrive\Desktop\WinShot\Implement.md`,
  `C:\Users\iftat\OneDrive\Desktop\WinShot\Setup.md`, and
  `C:\Users\iftat\OneDrive\Desktop\WinShot\Documentation.md`.
- The current signed release manifest and approved commercial/legal terms once those exist.
- The production Lemon Squeezy product, variant, checkout, order-management, and policy
  configuration once supplied by the owner.
