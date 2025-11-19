# Repository Guidelines

## Project Structure & Module Organization
- `src/` contains app code: `components/TodoList*` for the UI, `features/todos/` for data (API, model, React Query hook), `index.css` for Tailwind entry, `main.tsx`/`App.tsx` for bootstrapping.
- `.storybook/` houses Storybook config (`main.ts`, `preview.tsx`, `vitest.setup.ts`) and defines global mocks with `sb.mock`.
- `public/` holds static assets; Vite copies them as-is.
- Config roots: `vite.config.ts` (Vite + Storybook Vitest plugin), `eslint.config.js`, `tsconfig*.json`, `pnpm-lock.yaml`.

## Build, Test, and Development Commands
- Install: `pnpm install` (lockfile is pnpm; avoid npm/yarn).
- Dev server: `pnpm dev` (Vite at http://localhost:5173).
- Production build: `pnpm build` (type-check via `tsc -b`, then bundle).
- Preview build: `pnpm preview` (serves the production build).
- Storybook: `pnpm storybook` for live stories, `pnpm build-storybook` for static export.
- Lint: `pnpm lint` (ESLint flat config for TS/React hooks/refresh).
- Tests: `pnpm test` runs Vitest in browser mode with Storybook stories; `pnpm test:watch` for interactive runs; add `--coverage` to gather V8 coverage.

## Coding Style & Naming Conventions
- Language: TypeScript + React 19, modules are ESM.
- Formatting: 2-space indent, LF line endings, prefer double quotes in TS/JS; keep semicolons consistent within a file (run lint before push).
- Components and files: PascalCase for components (`TodoList`), camelCase for utilities and hooks; colocate feature logic under `src/features/<feature>/`.
- Styling: Tailwind CSS via `@tailwindcss/vite`; prefer utility classes over ad‑hoc CSS.
- Data fetching: favor React Query hooks; keep keys descriptive (e.g., `["todos"]`).

## Testing Guidelines
- Stories double as test targets; Vitest picks up Storybook stories through `@storybook/addon-vitest` in `vite.config.ts`.
- For module mocking in stories, call `sb.mock(import('../path/to/module'))` in `.storybook/preview.tsx`, then stub return values in each story’s `beforeEach`.
- Place component/integration tests beside the subject (`*.test.tsx`) and use the `storybook` project config if you need Storybook context.
- Keep additions deterministic: disable retries in queries unless required; prefer mock data over live requests.

## Commit & Pull Request Guidelines
- Use short, imperative titles (e.g., `fix: handle empty todos`, `chore: add lint rule`). Current history is terse; let’s standardize on `<type>: <scope>` where helpful.
- PRs should include: summary of changes, test commands run, Storybook notes (new stories or updated mocks), and linked issue/Linear ID if applicable. Add screenshots/GIFs for UI adjustments.
- Keep diffs small and focused; update or add stories/tests when changing UI or data flow.

## Storybook Mocking & Configuration Tips
- `sb.mock` in `preview.tsx` already automocks `src/features/todos/queries.ts`; add additional modules there when introducing new data sources.
- When a story needs distinct API states, stub the mocked hook in `beforeEach` (see `TodoList.stories.tsx` for loading/error/empty scenarios).
- Accessibility runs with `@storybook/addon-a11y` are set to `test: 'todo'`; elevate to `error` before shipping if introducing new components.
