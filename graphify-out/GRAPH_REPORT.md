# Graph Report - .  (2026-06-26)

## Corpus Check
- Corpus is ~7,881 words - fits in a single context window. You may not need a graph.

## Summary
- 213 nodes · 350 edges · 15 communities
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Sidebar Navigation|Sidebar Navigation]]
- [[_COMMUNITY_Package Config & Exports|Package Config & Exports]]
- [[_COMMUNITY_Telegram Auth & Pages|Telegram Auth & Pages]]
- [[_COMMUNITY_Dropdown Component|Dropdown Component]]
- [[_COMMUNITY_Demo Control Widgets|Demo Control Widgets]]
- [[_COMMUNITY_Loader Component|Loader Component]]
- [[_COMMUNITY_TypeScript Config|TypeScript Config]]
- [[_COMMUNITY_Dev Dependencies|Dev Dependencies]]
- [[_COMMUNITY_Icons & Bottom Controls|Icons & Bottom Controls]]
- [[_COMMUNITY_Build TS Config|Build TS Config]]
- [[_COMMUNITY_Input Component|Input Component]]

## God Nodes (most connected - your core abstractions)
1. `useDemoStore` - 19 edges
2. `compilerOptions` - 11 edges
3. `useToaster` - 11 edges
4. `scripts` - 7 edges
5. `DropdownOption` - 7 edges
6. `compilerOptions` - 6 edges
7. `ControlDef` - 5 edges
8. `getOptionLabel()` - 5 edges
9. `Dropdown()` - 5 edges
10. `LoaderProps` - 5 edges

## Surprising Connections (you probably didn't know these)
- `ToasterPage()` --calls--> `useToaster`  [EXTRACTED]
  demo/pages/ToasterPage.tsx → src/hooks/toaster/useToaster.ts
- `ThemePage()` --calls--> `useToaster`  [EXTRACTED]
  demo/pages/ThemePage.tsx → src/hooks/toaster/useToaster.ts
- `ButtonPage()` --calls--> `useToaster`  [EXTRACTED]
  demo/pages/ButtonPage.tsx → src/hooks/toaster/useToaster.ts
- `ButtonPage()` --calls--> `useDemoStore`  [EXTRACTED]
  demo/pages/ButtonPage.tsx → demo/store/useDemoStore.ts
- `InputPage()` --calls--> `useDemoStore`  [EXTRACTED]
  demo/pages/InputPage.tsx → demo/store/useDemoStore.ts

## Import Cycles
- None detected.

## Communities (15 total, 0 thin omitted)

### Community 0 - "Sidebar Navigation"
Cohesion: 0.10
Nodes (25): NAV, NavItem, Props, Sidebar(), App(), useHash(), DropdownPage(), DemoVariant (+17 more)

### Community 1 - "Package Config & Exports"
Cohesion: 0.06
Nodes (31): dependencies, classnames, description, exports, files, homepage, import, keywords (+23 more)

### Community 2 - "Telegram Auth & Pages"
Cohesion: 0.15
Nodes (17): useTelegramLogin(), UseTelegramLoginOptions, UseTelegramLoginReturn, Toast(), Toaster(), ButtonPage(), ThemePage(), TelegramAuthData (+9 more)

### Community 3 - "Dropdown Component"
Cohesion: 0.15
Nodes (17): Dropdown(), DropdownProps, useDropdownClose(), useSearchResults(), Props, DropdownOption, getOptionId(), getOptionLabel() (+9 more)

### Community 4 - "Demo Control Widgets"
Cohesion: 0.16
Nodes (7): Props, PropRow(), Props, ToggleGroup(), ToggleGroupProps, Props, Switch()

### Community 5 - "Loader Component"
Cohesion: 0.22
Nodes (9): Loader(), LoaderProps, Props, renderInner(), LoadingWrapper(), LoadingWrapperProps, Props, LoadingWrapperPage() (+1 more)

### Community 6 - "TypeScript Config"
Cohesion: 0.15
Nodes (12): compilerOptions, jsx, lib, module, moduleResolution, noEmit, noUnusedLocals, noUnusedParameters (+4 more)

### Community 7 - "Dev Dependencies"
Cohesion: 0.17
Nodes (12): devDependencies, framer-motion, react-tooltip, @types/classnames, @types/react, @types/react-dom, typescript, vite (+4 more)

### Community 8 - "Icons & Bottom Controls"
Cohesion: 0.24
Nodes (7): DragHandleIcon(), BottomControls(), ControlItem(), IconButton(), Props, PreviewCard(), Props

### Community 9 - "Build TS Config"
Cohesion: 0.25
Nodes (7): compilerOptions, declaration, declarationDir, emitDeclarationOnly, noEmit, outDir, extends

### Community 10 - "Input Component"
Cohesion: 0.43
Nodes (4): Input(), InputProps, Props, InputPage()

## Knowledge Gaps
- **78 isolated node(s):** `name`, `version`, `description`, `license`, `type` (+73 more)
  These have ≤1 connection - possible missing edges or undocumented components.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `useDemoStore` connect `Sidebar Navigation` to `Telegram Auth & Pages`, `Dropdown Component`, `Loader Component`, `Icons & Bottom Controls`, `Input Component`?**
  _High betweenness centrality (0.057) - this node is a cross-community bridge._
- **Why does `useToaster` connect `Telegram Auth & Pages` to `Sidebar Navigation`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._
- **Why does `ControlDef` connect `Sidebar Navigation` to `Demo Control Widgets`, `Loader Component`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._
- **What connects `name`, `version`, `description` to the rest of the system?**
  _78 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Sidebar Navigation` be split into smaller, more focused modules?**
  _Cohesion score 0.09523809523809523 - nodes in this community are weakly interconnected._
- **Should `Package Config & Exports` be split into smaller, more focused modules?**
  _Cohesion score 0.06451612903225806 - nodes in this community are weakly interconnected._
- **Should `Telegram Auth & Pages` be split into smaller, more focused modules?**
  _Cohesion score 0.1471264367816092 - nodes in this community are weakly interconnected._