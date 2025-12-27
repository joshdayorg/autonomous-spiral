# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Overview

This is a single-package Next.js 16 + React 19 application using the App Router and TypeScript. Styling is handled via Tailwind CSS v4 using the `@import "tailwindcss";` entrypoint and an `@theme inline` block in `app/globals.css`. Fonts are configured with `next/font` using the Geist sans/mono families.

The main entrypoints are:
- `app/layout.tsx` — Root layout, metadata, and global font variables.
- `app/page.tsx` — Home page (default route), currently the stock create-next-app landing page.
- `app/globals.css` — Global styles and Tailwind theme configuration.

The project is managed with `pnpm-workspace.yaml` (monorepo-ready), but currently only the root package (`.`) is used.

## Tooling and configuration

- Package manager: `pnpm` (preferred), but `npm`, `yarn`, or `bun` also work per the README.
- Framework: Next.js 16 (`next`), App Router with TypeScript (`next.config.ts`, `tsconfig.json`).
- Linting: ESLint 9 with `eslint-config-next`.
- Styling: Tailwind CSS 4, configured via `app/globals.css`.
- TypeScript: Strict mode, bundler module resolution, JSX set to `react-jsx`, and a path alias `@/*` → `./*`.

## Common commands

All commands are run from the repository root (`/Users/joshmusk/Desktop/every/every`). Replace `pnpm` with `npm`, `yarn`, or `bun` if you prefer another package manager.

### Install dependencies

```bash
pnpm install
```

### Development server

Starts the Next.js dev server on port 3000 (by default):

```bash
pnpm dev
```

Open `http://localhost:3000` in a browser. Edit `app/page.tsx` to see hot-reloaded changes.

### Production build and start

```bash
pnpm build
pnpm start
```

This produces an optimized production build and serves it using `next start`.

### Linting

Runs ESLint with Next.js’s config over the project:

```bash
pnpm lint
```

If you add additional lint configs or directories, keep this command as the primary entrypoint.

### Testing

There is currently **no test script or test framework configured** in `package.json` (no `test` script). If you introduce a test runner (e.g., Jest, Vitest, Playwright):
- Add an appropriate `test` script to `package.json`.
- Document how to run a single test (e.g., `pnpm test path/to/file.test.ts`), and update this section accordingly.

## Project structure and architecture

High-level structure (omitting generated and dependency folders like `.next` and `node_modules`):

- `app/`
  - `layout.tsx`: Root layout component. Sets `Metadata` (title/description) and wraps all pages with `<html>` / `<body>` tags. It imports `./globals.css` and configures Geist fonts via `next/font/google` using CSS variables (`--font-geist-sans`, `--font-geist-mono`). Any global providers, layouts, or top-level wrappers should be added here.
  - `page.tsx`: Home route component. Uses `next/image` and Tailwind utility classes to render the default landing page with links to templates and docs. Additional routes should be created as new files/directories under `app/` following Next.js App Router conventions (e.g., `app/dashboard/page.tsx`).
  - `globals.css`: Global CSS entrypoint. Imports Tailwind, defines light/dark `--background` / `--foreground` variables, configures an inline Tailwind theme (`@theme inline { ... }`), and sets base `body` styles.
- `next.config.ts`: Typed Next.js configuration (`NextConfig`). Currently uses the default generated config with a placeholder comment for future options.
- `tsconfig.json`: TypeScript configuration tuned for Next.js. Notable settings:
  - `strict: true` and `noEmit: true` for type safety and no direct TS emit.
  - `moduleResolution: "bundler"` and `module: "esnext"` for modern bundler-based resolution.
  - Includes all `**/*.ts`, `**/*.tsx`, and `.next` type output, while excluding `node_modules`.
  - Path alias `@/*` pointing to the project root (`./*`) for cleaner imports.
- `pnpm-workspace.yaml`: Declares a workspace with a single package `.` and marks some dependencies as `ignoredBuiltDependencies` (`sharp`, `unrs-resolver`) to avoid native build steps.
- `package.json`: Defines app metadata, scripts, and dependencies.

## Guidance for future agents

- When adding new routes or features, follow Next.js App Router conventions under `app/` and keep shared UI in dedicated components (e.g., create `app/components/` or `components/` as needed).
- Prefer using the existing `@/*` path alias for imports once additional modules are introduced.
- If you introduce tests, CI workflows, or additional tooling (Playwright, Storybook, etc.), extend the **Common commands** and **Project structure and architecture** sections instead of duplicating information.
