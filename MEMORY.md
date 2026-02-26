# Project Memory

## 2026-02-26
- Created `AGENTS.md` as the repository contributor guide titled **Repository Guidelines**, based on the current `MVP_Plan.txt` architecture and workflow.
- Initialized OmniGraph as an independent Git repository (separated from parent mono workspace).
- Completed MVP construction baseline with Next.js 14 + TypeScript + Tailwind:
  - Added route skeleton (`/`, `/explore`, `/about`, `/graph/[category]/[slug]`, `sitemap`, `robots`, `not-found`).
  - Added core module layers (`components/`, `lib/`, `hooks/`, `scripts/validate-content.ts`).
  - Added content pipeline (`content/*/*.mdx`) with parser + build-time validation rules.
  - Added prebuild quality gate: `npm run validate` runs before `npm run build`.
- Validation status: `npm run validate`, `npm run lint`, and `npm run build` all passed.
- First construction commit created: `db59a85` (`feat: bootstrap omnigraph mvp foundation`).
- Linked remote repository `origin` to `https://github.com/peter941221/OmniGraph.git` and completed first push (`master` -> `origin/master`) on 2026-02-26.
