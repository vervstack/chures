# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun run demo        # dev server for the interactive demo (http://localhost:5173)
bun run build       # build the library → dist/chures.js + dist/chures.umd.cjs
bun run type-check  # tsc --noEmit (what CI runs)
bun run dev         # watch mode build (lib only, no server)
bun run build:demo  # production build of the demo → dist-demo/
```

Use **bun** for all installs and script runs (not npm/yarn).

Publishing: `bun run patch` bumps the patch version and publishes to npm. CI publishes automatically on every push to `master` via `.github/workflows/release.yaml`.

## Architecture

This is a **Vite library build** (`"lib"` mode), not an app. `src/index.ts` is the public API — everything exported there is part of the package surface.

Two separate Vite configs:
- `vite.config.ts` — library build, externalizes `react`, `react-dom`, `react/jsx-runtime`, `zustand`, `framer-motion`. Injects CSS via `vite-plugin-css-injected-by-js` (no separate `.css` file in dist). Emits `.d.ts` via `vite-plugin-dts`.
- `vite.config.demo.ts` — standalone SPA build of `demo/main.tsx` → `dist-demo/`.

### Source layout

```
src/
  index.ts                          # public API; imports theme.css first
  theme.css                         # :root defaults for all --chures-* variables
  types.ts                          # shared TypeScript types
  components/
    TelegramAuth.tsx                # container: wires hook → button or render prop
    TelegramSignInButton.tsx        # presentational button with Telegram branding
    notifications/
      Toaster.tsx                   # fixed-position toast list (Framer Motion)
      Toast.module.css              # theming via --chures-* CSS custom properties
  hooks/
    useTelegramLogin.ts             # loads Telegram OAuth script, manages state
    toaster/
      useToaster.ts                 # Zustand store: bake / dismiss, 5s auto-dismiss
```

### CSS theming

Defaults live in `src/theme.css` (a `:root {}` block injected with the library bundle). Consumers override variables at `:root` in their own stylesheet:

```css
:root {
  --chures-accent: hotpink;
}
```

| Variable | Default | Meaning |
|---|---|---|
| `--chures-accent` | `#229ED9` | info border |
| `--chures-btn-from` | `#2AABEE` | button gradient top |
| `--chures-btn-to` | `#229ED9` | button gradient bottom |
| `--chures-error` | `#ef4444` | error border + title |
| `--chures-warn` | `#f59e0b` | warning border + title |
| `--chures-fg` | `#ffffff` | title text |
| `--chures-fg-muted` | `#9ca3af` | description text |
| `--chures-surface` | `#000000` | toast background |
| `--chures-font-sm` | `0.875rem` | title size |
| `--chures-font-xs` | `0.75rem` | description size |

### Component conventions
- Named function declarations (not arrow functions) for all components
- One component per file; `interface Props` at the top of each file
- CSS Modules (`.module.css`) for all styles; class names use `PascalCase`
- Root element class suffix: `***Container`; wrapper divs: `***Wrapper`
- CSS units: `rem` only; values via CSS variables, never hardcoded hex/px
