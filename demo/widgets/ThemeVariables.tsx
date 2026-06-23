import { useEffect } from "react"
import { CSS_DEFAULTS, useDemoStore } from "../store/useDemoStore"

interface VarDef {
    name: string
    label: string
    kind: "color" | "rem"
}

interface Group {
    heading: string
    vars: VarDef[]
}

const GROUPS: Group[] = [
    {
        heading: "Brand",
        vars: [
            { name: "--chures-accent",   label: "accent",   kind: "color" },
            { name: "--chures-btn-from", label: "btn-from", kind: "color" },
            { name: "--chures-btn-to",   label: "btn-to",   kind: "color" },
        ],
    },
    {
        heading: "Status",
        vars: [
            { name: "--chures-error", label: "error", kind: "color" },
            { name: "--chures-warn",  label: "warn",  kind: "color" },
        ],
    },
    {
        heading: "Surface",
        vars: [
            { name: "--chures-bg",       label: "bg",       kind: "color" },
            { name: "--chures-fg",       label: "fg",       kind: "color" },
            { name: "--chures-fg-muted", label: "fg-muted", kind: "color" },
            { name: "--chures-surface",  label: "surface",  kind: "color" },
            { name: "--chures-input-bg", label: "input-bg", kind: "color" },
        ],
    },
    {
        heading: "Typography",
        vars: [
            { name: "--chures-font-sm", label: "font-sm", kind: "rem" },
            { name: "--chures-font-xs", label: "font-xs", kind: "rem" },
        ],
    },
    {
        heading: "Shape",
        vars: [
            { name: "--chures-input-radius",    label: "input-radius",    kind: "rem" },
            { name: "--chures-input-height",    label: "input-height",    kind: "rem" },
            { name: "--chures-toggle-width",    label: "toggle-width",    kind: "rem" },
            { name: "--chures-toggle-height",   label: "toggle-height",   kind: "rem" },
            { name: "--chures-toggle-thumb",    label: "toggle-thumb",    kind: "rem" },
            { name: "--chures-dropdown-radius", label: "dropdown-radius", kind: "rem" },
        ],
    },
]

export function ThemeVariables() {
    const cssVars = useDemoStore((s) => s.cssVars)
    const setCssVar = useDemoStore((s) => s.setCssVar)
    const resetCssVars = useDemoStore((s) => s.resetCssVars)
    const themeOpen = useDemoStore((s) => s.themeOpen)
    const toggleTheme = useDemoStore((s) => s.toggleTheme)

    useEffect(() => {
        const root = document.documentElement
        Object.entries(cssVars).forEach(([k, v]) => root.style.setProperty(k, v))
        return () => Object.keys(CSS_DEFAULTS).forEach((k) => root.style.removeProperty(k))
    }, [cssVars])

    const modified = Object.entries(cssVars).filter(([k, v]) => v !== CSS_DEFAULTS[k])
    const cssOutput = modified.length > 0
        ? `:root {\n${modified.map(([k, v]) => `  ${k}: ${v};`).join("\n")}\n}`
        : `:root {\n  /* no overrides yet */\n}`

    return (
        <div className={`theme-panel${themeOpen ? "" : " theme-panel--collapsed"}`}>
            <div className="theme-panel-header">
                {themeOpen && <span className="theme-panel-title">Theme</span>}
                {themeOpen && <button className="theme-reset-btn" onClick={resetCssVars}>Reset</button>}
                <button
                    className="theme-toggle-btn"
                    onClick={toggleTheme}
                    title={themeOpen ? "Hide theme panel" : "Show theme panel"}
                >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                        {themeOpen
                            ? <polyline points="8,2 4,6 8,10" />
                            : <polyline points="4,2 8,6 4,10" />}
                    </svg>
                </button>
            </div>
            {themeOpen && (
                <div className="theme-panel-body">
                    {GROUPS.map((group) => (
                        <div key={group.heading} className="var-group">
                            <div className="var-group-heading">{group.heading}</div>
                            {group.vars.map((v) => (
                                <div key={v.name} className="var-row">
                                    <span className="var-label">{v.label}</span>
                                    {v.kind === "color" ? (
                                        <div className="var-color-control">
                                            <input
                                                type="color"
                                                className="var-color-swatch"
                                                value={cssVars[v.name] ?? CSS_DEFAULTS[v.name]}
                                                onChange={(e) => setCssVar(v.name, e.target.value)}
                                            />
                                            <input
                                                type="text"
                                                className="var-text-input"
                                                value={cssVars[v.name] ?? CSS_DEFAULTS[v.name]}
                                                onChange={(e) => setCssVar(v.name, e.target.value)}
                                            />
                                        </div>
                                    ) : (
                                        <input
                                            type="text"
                                            className="var-text-input"
                                            value={cssVars[v.name] ?? CSS_DEFAULTS[v.name]}
                                            onChange={(e) => setCssVar(v.name, e.target.value)}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}
                    <div className="var-group">
                        <div className="var-group-heading">Consumer CSS</div>
                        <pre className="var-css-output">{cssOutput}</pre>
                    </div>
                </div>
            )}
        </div>
    )
}
