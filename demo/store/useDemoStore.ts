import { create } from "zustand"
import type { ControlDef } from "../widgets/ControlDef"

export const CSS_DEFAULTS: Record<string, string> = {
    "--chures-accent":    "#229ED9",
    "--chures-btn-from":  "#2AABEE",
    "--chures-btn-to":    "#229ED9",
    "--chures-button-bg": "#1a1a1a",
    "--chures-error":     "#ef4444",
    "--chures-warn":      "#f59e0b",
    "--chures-bg":        "#000000",
    "--chures-fg":        "#ffffff",
    "--chures-fg-muted":  "#9ca3af",
    "--chures-surface":   "#000000",
    "--chures-input-bg":  "#111111",
    "--chures-font-sm":   "0.875rem",
    "--chures-font-xs":   "0.75rem",
    "--chures-input-radius":    "0.75rem",
    "--chures-input-height":    "3rem",
    "--chures-toggle-width":    "2.75rem",
    "--chures-toggle-height":   "1.5rem",
    "--chures-toggle-thumb":    "1.125rem",
    "--chures-dropdown-radius": "0.75rem",
}

interface DemoState {
    controls: ControlDef[]
    setControls: (controls: ControlDef[]) => void
    cssVars: Record<string, string>
    setCssVar: (name: string, value: string) => void
    resetCssVars: () => void
    themeOpen: boolean
    toggleTheme: () => void
}

export const useDemoStore = create<DemoState>((set) => ({
    controls: [],
    setControls: (controls) => set({ controls }),
    cssVars: { ...CSS_DEFAULTS },
    setCssVar: (name, value) => set((s) => ({ cssVars: { ...s.cssVars, [name]: value } })),
    resetCssVars: () => set({ cssVars: { ...CSS_DEFAULTS } }),
    themeOpen: true,
    toggleTheme: () => set((s) => ({ themeOpen: !s.themeOpen })),
}))
