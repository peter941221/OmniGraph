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
- Continued Phase-2 implementation on acceptance criteria:
  - Mermaid renderer now supports dark/light theme linkage and retry fallback for syntax/render failures.
  - Added Shiki syntax highlighting pipeline for Mermaid source (light + dark themes).
  - Added functional Waitlist modal flow (`Export`/`Fork`) with email validation, submit states, anti-repeat, and analytics hooks.
  - Added global `Cmd/Ctrl + K` search modal in header.
  - Enhanced explore page with category sidebar filtering and counts; homepage now shows category chips.
  - Expanded seed content to include `mlops` and `prompt-engineering`.
- Regression status after Phase-2: `npm run validate`, `npm run lint`, and `npm run build` passed.
