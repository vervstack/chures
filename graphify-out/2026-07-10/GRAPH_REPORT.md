# Graph Report - chures  (2026-07-10)

## Corpus Check
- 81 files · ~11,527 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 325 nodes · 538 edges · 37 communities (29 shown, 8 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `197556ae`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Sidebar Navigation
- Package Config & Exports
- Telegram Auth & Pages
- Dropdown Component
- Demo Control Widgets
- Loader Component
- TypeScript Config
- Dev Dependencies
- Icons & Bottom Controls
- Build TS Config
- Input Component
- Demo Vite Config
- Library Vite Config
- CSS Modules Types
- CLAUDE.md
- ModalActionsPage.tsx
- compilerOptions
- TogglePage.tsx
- css-modules.d.ts
- zustand
- zustand
- type
- type
- CSS_DEFAULTS

## God Nodes (most connected - your core abstractions)
1. `useDemoStore` - 31 edges
2. `useToaster` - 17 edges
3. `DropdownOption` - 12 edges
4. `compilerOptions` - 11 edges
5. `scripts` - 7 edges
6. `getOptionLabel()` - 7 edges
7. `Button()` - 6 edges
8. `DropdownPanel()` - 6 edges
9. `compilerOptions` - 6 edges
10. `Telegram Auth` - 6 edges

## Surprising Connections (you probably didn't know these)
- `ButtonPage()` --calls--> `useToaster`  [EXTRACTED]
  demo/pages/ButtonPage.tsx → src/hooks/toaster/useToaster.ts
- `ConfirmDialogPage()` --calls--> `useToaster`  [EXTRACTED]
  demo/pages/ConfirmDialogPage.tsx → src/hooks/toaster/useToaster.ts
- `InputPage()` --calls--> `useToaster`  [EXTRACTED]
  demo/pages/InputPage.tsx → src/hooks/toaster/useToaster.ts
- `ThemePage()` --calls--> `useToaster`  [EXTRACTED]
  demo/pages/ThemePage.tsx → src/hooks/toaster/useToaster.ts
- `TelegramSignInButtonPage()` --calls--> `useToaster`  [EXTRACTED]
  demo/pages/TelegramSignInButtonPage.tsx → src/hooks/toaster/useToaster.ts

## Import Cycles
- None detected.

## Communities (37 total, 8 thin omitted)

### Community 0 - "Sidebar Navigation"
Cohesion: 0.15
Nodes (13): CSS_VAR_NAMES, CssDefaults, DemoState, DERIVED_FROM, effectiveValue(), EMPTY_DEFAULTS, ControlDef, Group (+5 more)

### Community 2 - "Telegram Auth & Pages"
Cohesion: 0.13
Nodes (19): TelegramSignInButtonPage(), ThemePage(), Level, ToasterPage(), Toast(), Toaster(), TelegramAuth(), TelegramAuthProps (+11 more)

### Community 3 - "Dropdown Component"
Cohesion: 0.12
Nodes (25): DropdownPage(), FRUITS, Dropdown(), DropdownProps, useDropdownClose(), useDropdownOpenState(), useSearchResults(), Props (+17 more)

### Community 4 - "Demo Control Widgets"
Cohesion: 0.16
Nodes (7): Props, PropRow(), Props, ToggleGroup(), ToggleGroupProps, Props, Switch()

### Community 5 - "Loader Component"
Cohesion: 0.15
Nodes (13): DemoVariant, LOADER_VARIANTS, LoaderPage(), LoaderVariant, LoadingWrapperPage(), VARIANTS, Loader(), LoaderProps (+5 more)

### Community 6 - "TypeScript Config"
Cohesion: 0.06
Nodes (31): dependencies, classnames, description, exports, files, homepage, import, keywords (+23 more)

### Community 8 - "Icons & Bottom Controls"
Cohesion: 0.11
Nodes (17): App(), useHash(), DragHandleIcon(), NAV, NavItem, Props, Sidebar(), ModalClosePage() (+9 more)

### Community 9 - "Build TS Config"
Cohesion: 0.25
Nodes (8): AvatarFallbackIcon(), CheckmarkIcon(), CheckmarkIconProps, Props, ChevronDownIcon(), ChevronDownIconProps, Props, EditPencilIcon()

### Community 10 - "Input Component"
Cohesion: 0.10
Nodes (22): ButtonPage(), VARIANTS, ConfirmDialogPage(), IconsPage(), InfoDialogPage(), InputPage(), useDemoStore, Button() (+14 more)

### Community 12 - "Demo Vite Config"
Cohesion: 0.15
Nodes (12): CSS theming, Custom UI (render prop), Drop-in button, Hook only, Install, License, Telegram Auth, `TelegramAuth` props (+4 more)

### Community 13 - "Library Vite Config"
Cohesion: 0.15
Nodes (12): compilerOptions, jsx, lib, module, moduleResolution, noEmit, noUnusedLocals, noUnusedParameters (+4 more)

### Community 14 - "CSS Modules Types"
Cohesion: 0.17
Nodes (12): devDependencies, framer-motion, react-tooltip, @types/classnames, @types/react, @types/react-dom, typescript, vite (+4 more)

### Community 15 - "CLAUDE.md"
Cohesion: 0.20
Nodes (8): Architecture, Codebase Navigation, Commands, Component conventions, CSS theming, Keep the demo in sync, Source layout, Testing / verification policy

### Community 16 - "ModalActionsPage.tsx"
Cohesion: 0.36
Nodes (5): ModalActionsPage(), ButtonConfig, ModalActions(), ModalActionsProps, Props

### Community 17 - "compilerOptions"
Cohesion: 0.25
Nodes (7): compilerOptions, declaration, declarationDir, emitDeclarationOnly, noEmit, outDir, extends

### Community 18 - "TogglePage.tsx"
Cohesion: 0.43
Nodes (4): TogglePage(), Props, Toggle(), ToggleProps

## Knowledge Gaps
- **114 isolated node(s):** `NavItem`, `NAV`, `Props`, `VARIANTS`, `FRUITS` (+109 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **8 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `useDemoStore` connect `Input Component` to `Sidebar Navigation`, `Telegram Auth & Pages`, `Dropdown Component`, `Loader Component`, `Icons & Bottom Controls`, `Build TS Config`, `ModalActionsPage.tsx`, `TogglePage.tsx`?**
  _High betweenness centrality (0.059) - this node is a cross-community bridge._
- **Why does `useToaster` connect `Telegram Auth & Pages` to `Input Component`?**
  _High betweenness centrality (0.017) - this node is a cross-community bridge._
- **What connects `NavItem`, `NAV`, `Props` to the rest of the system?**
  _114 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Telegram Auth & Pages` be split into smaller, more focused modules?**
  _Cohesion score 0.13068181818181818 - nodes in this community are weakly interconnected._
- **Should `Dropdown Component` be split into smaller, more focused modules?**
  _Cohesion score 0.12012012012012012 - nodes in this community are weakly interconnected._
- **Should `TypeScript Config` be split into smaller, more focused modules?**
  _Cohesion score 0.06451612903225806 - nodes in this community are weakly interconnected._
- **Should `Icons & Bottom Controls` be split into smaller, more focused modules?**
  _Cohesion score 0.1111111111111111 - nodes in this community are weakly interconnected._