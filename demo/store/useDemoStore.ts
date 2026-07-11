import { create } from "zustand"
import type { ControlDef } from "../widgets/ControlDef"

// Names of every --chures-* var the demo exposes controls for. Values are never
// duplicated here — they're read live from theme.css via getComputedStyle so the
// panel can never drift from the shipped defaults.
export const CSS_VAR_NAMES = [
    "--chures-accent",
    "--chures-btn-from",
    "--chures-btn-to",
    "--chures-button-bg",
    "--chures-error",
    "--chures-warn",
    "--chures-bg",
    "--chures-fg",
    "--chures-fg-muted",
    "--chures-surface",
    "--chures-input-bg",
    "--chures-font-sm",
    "--chures-font-xs",
    "--chures-input-radius",
    "--chures-input-height",
    "--chures-toggle-width",
    "--chures-toggle-height",
    "--chures-toggle-thumb",
    "--chures-dropdown-radius",
] as const

// Vars declared in theme.css as `var(--x)` of another exposed var. getComputedStyle
// resolves var() at computed-value time, so this can't be sniffed at runtime — it's
// kept in sync with theme.css by hand.
const DERIVED_FROM: Record<string, string> = {
    "--chures-button-bg": "--chures-accent",
}

export interface CssDefaults {
    // literal baseline value for every var (a var() reference resolved down to its leaf)
    values: Record<string, string>
    // var name -> the var it's declared as `var(--x)` of in theme.css, if any
    derivedFrom: Record<string, string>
}

const EMPTY_DEFAULTS: CssDefaults = { values: {}, derivedFrom: {} }

export function readCssDefaults(): CssDefaults {
    const computed = getComputedStyle(document.documentElement)
    const values: Record<string, string> = {}
    for (const name of CSS_VAR_NAMES) {
        values[name] = computed.getPropertyValue(name).trim()
    }
    return { values, derivedFrom: DERIVED_FROM }
}

// The value a control should show/apply right now: an explicit user override,
// else whatever its source var currently resolves to (tracks live edits, same
// as the real CSS cascade would), else the shipped literal default.
export function effectiveValue(
    name: string,
    cssVars: Record<string, string>,
    defaults: CssDefaults,
    seen = new Set<string>()
): string {
    if (cssVars[name] !== undefined) return cssVars[name]
    const source = defaults.derivedFrom[name]
    if (source && !seen.has(source)) {
        seen.add(source)
        return effectiveValue(source, cssVars, defaults, seen)
    }
    return defaults.values[name]
}

interface DemoState {
    controls: ControlDef[]
    setControls: (controls: ControlDef[]) => void
    cssDefaults: CssDefaults
    cssVars: Record<string, string>
    loadCssDefaults: () => void
    setCssVar: (name: string, value: string) => void
    resetCssVars: () => void
    themeOpen: boolean
    toggleTheme: () => void
    customStylesOpen: boolean
    toggleCustomStyles: () => void
}

export const useDemoStore = create<DemoState>((set, get) => ({
    controls: [],
    setControls: (controls) => set({ controls }),
    cssDefaults: EMPTY_DEFAULTS,
    cssVars: {},
    loadCssDefaults: () => {
        if (Object.keys(get().cssDefaults.values).length > 0) return
        set({ cssDefaults: readCssDefaults() })
    },
    setCssVar: (name, value) => set((s) => ({ cssVars: { ...s.cssVars, [name]: value } })),
    resetCssVars: () => set({ cssVars: {} }),
    themeOpen: true,
    toggleTheme: () => set((s) => ({ themeOpen: !s.themeOpen })),
    customStylesOpen: false,
    toggleCustomStyles: () => set((s) => ({ customStylesOpen: !s.customStylesOpen })),
}))
