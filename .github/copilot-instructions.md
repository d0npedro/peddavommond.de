# GitHub Copilot instructions — peddavommond.de

Read and follow the repository root **`AGENTS.md`**.

- Primary UX: Windows 11 shell in `public/win11/` (not PeddaOS).
- Register product apps in `public/win11/js/apps/catalog.js`.
- Production: static `vercel-build` into `public/`; do not assume vinext SSR is live.
- Never commit secrets; use Secretstore docs only.
