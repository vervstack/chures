# Graph Report - chures  (2026-09-16)

## Corpus Check
- 122 files · ~23,367 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 500 nodes · 1011 edges · 36 communities (28 shown, 8 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 6 edges (avg confidence: 0.65)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `ad43e8e5`
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
- compilerOptions
- css-modules.d.ts
- zustand
- zustand
- type
- type
- CSS_DEFAULTS

## God Nodes (most connected - your core abstractions)
1. `useDemoStore` - 39 edges
2. `useComponentClassName()` - 27 edges
3. `useToaster` - 17 edges
4. `Button()` - 12 edges
5. `MenuItem` - 12 edges
6. `DropdownOption` - 11 edges
7. `getOptionLabel()` - 11 edges
8. `compilerOptions` - 11 edges
9. `FloatingMenu` - 10 edges
10. `scripts` - 8 edges

## Surprising Connections (you probably didn't know these)
- `ThemePage()` --calls--> `useToaster`  [EXTRACTED]
  demo/pages/ThemePage.tsx → src/hooks/toaster/useToaster.ts
- `ButtonPage()` --calls--> `useToaster`  [EXTRACTED]
  demo/pages/ButtonPage.tsx → src/hooks/toaster/useToaster.ts
- `ConfirmDialogPage()` --calls--> `useToaster`  [EXTRACTED]
  demo/pages/ConfirmDialogPage.tsx → src/hooks/toaster/useToaster.ts
- `renderCustomOption()` --calls--> `getOptionLabel()`  [EXTRACTED]
  demo/pages/DropdownPage.tsx → src/components/Dropdown/Dropdown.types.ts
- `renderCustomOption()` --references--> `RenderOptionState`  [EXTRACTED]
  demo/pages/DropdownPage.tsx → src/components/Dropdown/Dropdown.types.ts

## Import Cycles
- None detected.

## Communities (36 total, 8 thin omitted)

### Community 0 - "Sidebar Navigation"
Cohesion: 0.06
Nodes (50): FRUITS, FlyoutMenu(), FlyoutMenuProps, MENU_TRANSITION, Props, FlyoutPanel(), Props, MenuList() (+42 more)

### Community 2 - "Telegram Auth & Pages"
Cohesion: 0.07
Nodes (37): SIDES, ThemePage(), ModalClose(), ModalCloseProps, Props, getSideDrawerRoot(), Props, sideClass (+29 more)

### Community 3 - "Dropdown Component"
Cohesion: 0.10
Nodes (37): FRUITS, FRUITS_WITH_DISABLED, GROUPED_FRUITS, mockGroupedSearch(), renderCustomOption(), Dropdown(), DropdownProps, useDropdownClose() (+29 more)

### Community 4 - "Demo Control Widgets"
Cohesion: 0.10
Nodes (13): DragHandleIcon(), ControlItem(), Props, IconButton(), Props, PreviewCard(), Props, PropRow() (+5 more)

### Community 5 - "Loader Component"
Cohesion: 0.08
Nodes (25): VARIANTS, DemoState, ControlBase, ControlDef, ConfirmDialog(), ConfirmDialogProps, Props, InfoDialog() (+17 more)

### Community 6 - "TypeScript Config"
Cohesion: 0.04
Nodes (45): dependencies, classnames, description, devDependencies, framer-motion, react-tooltip, @types/classnames, @types/react (+37 more)

### Community 8 - "Icons & Bottom Controls"
Cohesion: 0.21
Nodes (17): Errors, asString(), GrpcBadRequest, GrpcBadRequestFieldViolation, GrpcErrorDetail, GrpcErrorInfo, GrpcPreconditionFailure, GrpcPreconditionFailureViolation (+9 more)

### Community 9 - "Build TS Config"
Cohesion: 0.20
Nodes (11): AvatarFallbackIcon(), CheckmarkIcon(), CheckmarkIconProps, Props, ChevronDownIcon(), ChevronDownIconProps, Props, EditPencilIcon() (+3 more)

### Community 10 - "Input Component"
Cohesion: 0.05
Nodes (58): App(), useHash(), NAV, NavItem, Props, Sidebar(), ButtonCustomStylesExample(), ButtonPage() (+50 more)

### Community 12 - "Demo Vite Config"
Cohesion: 0.15
Nodes (12): CSS theming, Custom UI (render prop), Drop-in button, Hook only, Install, License, Telegram Auth, `TelegramAuth` props (+4 more)

### Community 13 - "Library Vite Config"
Cohesion: 0.15
Nodes (12): compilerOptions, jsx, lib, module, moduleResolution, noEmit, noUnusedLocals, noUnusedParameters (+4 more)

### Community 14 - "CSS Modules Types"
Cohesion: 0.36
Nodes (9): FloatingWindow(), Props, resolveContainer(), restingPosition(), clamp(), placeToRightOf(), Rect, rectsOverlap() (+1 more)

### Community 15 - "CLAUDE.md"
Cohesion: 0.17
Nodes (10): Architecture, Back-gesture handling for overlays, Codebase Navigation, Commands, Component conventions, Component styling contract, CSS theming, Keep the demo in sync (+2 more)

### Community 17 - "compilerOptions"
Cohesion: 0.25
Nodes (7): compilerOptions, declaration, declarationDir, emitDeclarationOnly, noEmit, outDir, extends

## Knowledge Gaps
- **142 isolated node(s):** `NavItem`, `NAV`, `Props`, `VARIANTS`, `FRUITS` (+137 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **8 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `useComponentClassName()` connect `Loader Component` to `Telegram Auth & Pages`, `Input Component`, `Dropdown Component`?**
  _High betweenness centrality (0.078) - this node is a cross-community bridge._
- **Why does `useDemoStore` connect `Input Component` to `Sidebar Navigation`, `Telegram Auth & Pages`, `Dropdown Component`, `Demo Control Widgets`, `Loader Component`, `Build TS Config`?**
  _High betweenness centrality (0.049) - this node is a cross-community bridge._
- **Why does `Button()` connect `Input Component` to `Sidebar Navigation`, `Telegram Auth & Pages`, `Loader Component`?**
  _High betweenness centrality (0.039) - this node is a cross-community bridge._
- **What connects `NavItem`, `NAV`, `Props` to the rest of the system?**
  _142 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Sidebar Navigation` be split into smaller, more focused modules?**
  _Cohesion score 0.0625694187338023 - nodes in this community are weakly interconnected._
- **Should `Telegram Auth & Pages` be split into smaller, more focused modules?**
  _Cohesion score 0.07467532467532467 - nodes in this community are weakly interconnected._
- **Should `Dropdown Component` be split into smaller, more focused modules?**
  _Cohesion score 0.10196078431372549 - nodes in this community are weakly interconnected._