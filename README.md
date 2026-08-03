# Relic Screenshot — Website

A public, no-commerce pre-release storefront for the Windows capture application named
`Relic Screenshot`. It is published for review through the legacy GitHub Pages repository URL at
`https://iftatbhuiyan.github.io/winshot-website/`; publication is not commercial launch approval.

## Current implementation

- `index.html` is the product landing page.
- `features.html`, `pricing.html`, `download.html`, `changelog.html`, `support.html`,
  `manage-license.html`, `faq.html`, `privacy.html`, `terms.html`, `eula.html`, and
  `refund-policy.html` are the product, commercial, and trust surfaces.
- `site.css` and `site.js` are the active design and progressive-navigation files.
- `assets/app-icon.png` and `assets/app-dashboard-preview.jpg` are the current identity and
  privacy-sanitized product media.
- `content/claim-register.md` governs factual claims; `content/page-copy-deck.md` governs
  preview-state copy.
- `tools/validate-site.mjs` validates the public no-commerce surface without adding a package or
  contacting a network service.

There is intentionally no active download, checkout, waitlist form, or license-key input. Do not
place development or unsigned artifacts in this repository. Commercial actions remain blocked on
professional name clearance, publisher, offer, provider, policy, support, signing, and
release-manifest approval. The
public preview retains `noindex, nofollow`, disallows crawlers, and labels the identity and release
state as pre-release. The owner-selected product name does not remove the professional clearance
gate.

Use the local HTTP workflow in `Setup.md` while editing. GitHub Pages is the owner-approved public
review host; production domain, headers, monitoring, commerce, and rollback requirements remain
defined in `Plan.md`.

## Inactive historical files

`styles.css`, `app.js`, `assets/favicon.svg`, and the `downloads/` marker are retained only as
unreferenced baseline history. They are not part of the active page dependency graph and must not
be re-enabled or used as release instructions. A customer download requires the immutable signed
artifact, manifest facts, approved production origin, and complete release gate described in
`Plan.md`.

The preview remains self-contained with no build step, external font, CDN, analytics, or active
commerce integration. Do not mirror the selected identity to another host or present this GitHub
Pages review surface as a finished commercial storefront before professional clearance and the
remaining release gates pass.

Run the repeatable static gate with:

```powershell
node .\tools\validate-site.mjs
```
