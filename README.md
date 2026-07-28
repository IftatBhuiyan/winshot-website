# WinShot — Website

A static, multi-page pre-release storefront for the Windows capture application currently using
`WinShot` as a provisional working name.

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
- `tools/validate-site.mjs` validates the private static surface without adding a package or
  contacting a network service.

There is intentionally no active download, checkout, waitlist form, or license-key input. Do not
place development or unsigned artifacts in this repository. Public actions remain blocked on name,
publisher, offer, provider, policy, support, signing, and release-manifest approval.

Preview through a local HTTP server using `Setup.md`. Hosting and security-header requirements are
defined in `Plan.md`.

## Inactive historical files

`styles.css`, `app.js`, `assets/favicon.svg`, and the `downloads/` marker are retained only as
unreferenced baseline history. They are not part of the active page dependency graph and must not
be re-enabled or used as release instructions. A customer download requires the immutable signed
artifact, manifest facts, approved production origin, and complete release gate described in
`Plan.md`.

The preview remains self-contained with no build step, external font, CDN, analytics, or active
commerce integration. Serve it only through the local HTTP workflow in `Setup.md`; do not upload
the provisional identity to an arbitrary static host.

Run the repeatable static gate with:

```powershell
node .\tools\validate-site.mjs
```
