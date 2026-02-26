# Repository Guidelines

## Project Structure & Module Organization
This repository is currently planning-first, with the product spec in `MVP_Plan.txt`. Implementation should follow the planned Next.js layout:
- `app/` for routes and page-level layouts
- `components/` for reusable UI
- `content/<category>/*.mdx` for graph source content
- `lib/` for parsing, indexing, and analytics helpers
- `scripts/validate-content.ts` for prebuild content checks

Keep each MDX filename, frontmatter `slug`, and parent `category` folder aligned (for example: `content/rag/naive-rag-flow.mdx` with `slug: "naive-rag-flow"` and `category: "rag"`).

## Build, Test, and Development Commands
Use the npm workflow defined in the MVP plan:
- `npm install` installs dependencies.
- `npm run dev` starts local development (`http://localhost:3000`).
- `npm run validate` checks frontmatter and required MDX blocks (`<Mermaid>`, `<Explain>`).
- `npm run build` runs `prebuild` then produces the static Next.js build.

Before opening a PR, run: `npm run validate && npm run build`.

## Coding Style & Naming Conventions
- Stack: TypeScript + React (Next.js App Router).
- Indentation: 2 spaces; keep imports ordered external to internal.
- Components/pages: `PascalCase` (for example `MermaidRenderer.tsx`).
- Hooks: `camelCase` with `use` prefix (for example `useTheme.ts`).
- Content files: lowercase `kebab-case` slugs (for example `advanced-rag-pipeline.mdx`).
- Category names must match the defined enum values (`llm-basics`, `rag`, `agent`, `mlops`, `prompt-engineering`).

Use standard Next.js ESLint/Prettier configuration once scaffolded; do not hand-format inconsistently.

## Testing Guidelines
No dedicated unit/e2e framework is committed yet. Current quality gates are:
1. Content validation (`npm run validate`)
2. Production build pass (`npm run build`)

For UI changes, manually verify Mermaid rendering, tab switching, and responsive behavior on desktop and mobile.

## Commit & Pull Request Guidelines
The repository currently has no commit history. Adopt Conventional Commits from the first commit:
- `feat(content): add transformer architecture graph`
- `fix(ui): prevent mermaid overflow on mobile`

PRs should include:
- A short scope summary with changed paths
- Validation/build results
- Screenshots or recordings for UI changes
- Linked issue or task reference when available

## Security & Configuration Tips
Store local secrets only in `.env.local` and never commit them. Required runtime variables include:
- `NEXT_PUBLIC_FORMSPREE_ID`
- `NEXT_PUBLIC_SITE_URL`
