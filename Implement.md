# Relic Screenshot Storefront Implementation Rules

Read `Prompt.md`, `Plan.md`, this file, `Setup.md` when environment, hosting, tools, checkout, or
deployment are involved, the latest 80 lines of `Documentation.md`, and the source files in scope
before substantial work.

## Before implementation

1. Identify the active milestone and work package in `Plan.md`.
2. Confirm its acceptance, validation, performance/accessibility budgets, and rollback condition.
3. Append a short start entry to `Documentation.md`.
4. Inspect `git status` and preserve user-owned or unrelated changes.
5. Resolve factual questions from desktop source, release evidence, provider configuration, and
   approved policy language before writing public claims.
6. For visual work, complete the concept-first evidence, concept, review, and selection steps
   before production implementation.

## Editing rules

- Keep each diff focused and reviewable; avoid unrelated cleanup or framework migration.
- Never full-file replace, delete and recreate, or broadly rewrite an existing file. Apply targeted
  patches that preserve unrelated content and history.
- Prefer semantic HTML, design tokens, resilient CSS, and progressive enhancement over complex
  client-side abstractions.
- Core navigation, content, offer explanation, support information, and legal links must work
  without JavaScript.
- Do not hide meaningful content behind entrance animation. The unenhanced initial state must be
  readable, and reduced motion must disable nonessential movement.
- Avoid fixed intrinsic widths that can clip at 320 pixels, user zoom, long translations, or large
  text. Test actual reflow rather than relying on breakpoints.
- Use one controlled accent and restrained depth. Product media and typography establish
  hierarchy; decorative gradients/glows and repeated equal cards do not.
- Real application media uses synthetic data and passes privacy review. Conceptual previews are
  explicitly labeled and cannot substitute for release proof.
- Add/update tests or repeatable manual checks whenever behavior, routing, checkout, download,
  accessibility, or structured data changes.

## Truthful claims and content governance

- Maintain a claim register during content implementation. Each factual claim maps to desktop
  source/tests, signed release metadata, approved provider configuration, or approved commercial
  terms.
- Never invent price, savings, tax treatment, seats/devices, trial limits, update entitlement,
  support response, refund terms, version, size, checksum, signed status, compatibility,
  performance, privacy, reliability, testimonials, customer counts, ratings, or guarantees.
- When evidence is missing, use a neutral pending/unavailable state or omit the claim.
- `Relic Screenshot` is the owner-selected public token. Keep it maintainable and do not treat the
  migration as professional trademark clearance or bake unreviewed identity into new raster art.
- Do not reproduce CleanShot copy, artwork, screenshots, proprietary assets, or exact page
  compositions.

## Accessibility and responsive rules

- Target WCAG 2.2 AA and current browser/platform accessibility APIs.
- Use semantic landmarks and heading order, a skip link, visible focus, accessible names and
  states, adequate target sizes, logical DOM/tab order, and useful alt text.
- Verify normal and interactive-state contrast; never approve contrast from appearance alone.
- Menus, disclosures, modals, carousels, and media controls must support keyboard, focus return,
  Escape behavior where expected, and assistive-technology announcements.
- Support 320/390-pixel mobile, 400% zoom, text enlargement, reduced-motion, forced-colors/high
  contrast, no-image, slow-network, and JavaScript-disabled use.
- Do not make hover, color, animation, or pointer precision the only way to understand or perform
  an action.

## Security, privacy, and commerce

- Treat provider configuration, redirects, release files, checksums, license recovery, support
  forms, analytics, cookies, logs, and deployment credentials as security/privacy surfaces.
- No browser bundle, HTML, repository file, screenshot, log, or documentation may contain Lemon
  Squeezy private keys, Azure credentials, signing secrets, access tokens, private license keys, or
  personal customer data.
- Use provider-hosted checkout/order management unless an approved server-side architecture is
  required. Never collect card data in this static frontend.
- Validate and minimize external scripts, origins, redirects, permissions, referrer leakage, and
  submitted fields. Prefer no third-party runtime code.
- Do not add analytics until purpose, event schema, consent/legal basis, retention, access, and
  processor terms are approved and documented.
- Publish only signed release-manifest-backed downloads. If the file or provider is unavailable,
  render an honest disabled/status path rather than a dead CTA.
- Configure security headers at the production host, including a tested Content Security Policy,
  frame protections, referrer policy, content-type protection, and permissions policy appropriate
  to actual functionality.

## Dependencies and tools

- Preserve the current no-build architecture unless `Plan.md` authorizes a reviewed change.
- Do not install or execute an unpinned arbitrary latest npm package through `npx` for convenience.
- Respect any environment `minimumReleaseAge` policy. An exception requires package-specific
  provenance, release date, ownership, advisories, dependency diff, lockfile review, and a recorded
  reason before installation.
- Prefer browser-native audits and already-installed tools. If a persistent dependency is needed,
  pin it, review its source/provenance and transitive graph, and commit the lockfile.
- Never disable a security, accessibility, lint, or audit check merely to make validation green.

## Validation loop

- Run focused checks first, then the complete milestone gate.
- When a validation command fails, append the command and concise failure to `Documentation.md`
  before fixing it. Record the fix and rerun result.
- For visual work, compare the rendered implementation against the accepted concept at desktop and
  mobile sizes. Record material deviations and why they improve accuracy or accessibility.
- Performance claims require reproducible before/after measurements. Report environment, samples,
  p75/p95 as appropriate, transfer size, LCP, INP, CLS, and any budget exception.
- Automated accessibility scores do not replace keyboard, zoom, screen reader, forced-colors,
  reduced-motion, no-JavaScript, and content review.
- Validate checkout/download/support/license recovery against safe provider test modes and release
  fixtures before production.

## Documentation loop

- Append to `Documentation.md` after every meaningful subtask.
- Record the work package, files changed, commands, output summary, visual/metric deltas, failures,
  fixes, decisions, remaining risks, and next action.
- Update `Prompt.md` when goals, scope, non-goals, durable constraints, or authoritative sources
  change.
- Update `Plan.md` when status, acceptance, validation, metrics, sequence, or rollback changes.
- Update `Setup.md` when toolchain, provider, hosting, preview, deployment, DNS, automation, or
  environment assumptions change.
- Never claim a milestone complete without a `Documentation.md` evidence pack mapping each
  acceptance criterion to proof.

## Git, worktrees, and deployment

- Inspect status before and after work. Stage explicit paths only and review working/staged diffs.
- Use non-overlapping subagent ownership and a focused worktree for risky redesign experiments,
  framework migrations, production integrations, or independent deployment work.
- Do not merge worktree output until tests pass, documentation is current, and the diff is
  reviewed.
- Do not reset, discard, rewrite, force-push, or delete user work without explicit authorization.
- Commit subjects start with the next sequential `Commit #N - ` prefix.
- Do not deploy unless the active work package explicitly authorizes it and the target, ownership,
  domain, secrets, preview/prod distinction, and rollback command are known.
- Do not create deployment/monitoring automations until the manual workflow passes and its prompt
  names required docs, exact commands, output, log destination, and failure behavior.

## Done definition

Work is done only when acceptance passes; focused and broad checks are recorded; claims, privacy,
security, accessibility, performance, SEO, commerce, and release effects are assessed; durable
documents are current; and the final diff is scoped. A polished local render is not a commercial
launch until name, policy, checkout, signed-download, hosting, and rollback gates also pass.
