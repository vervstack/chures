import { useCallback, useEffect, useRef, useState } from "react"
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

const PAGE_VARS: Record<string, VarDef[]> = {
    "#/button": [
        { name: "--chures-accent",    label: "accent",    kind: "color" },
        { name: "--chures-button-bg", label: "button-bg", kind: "color" },
        { name: "--chures-fg",        label: "fg",        kind: "color" },
        { name: "--chures-fg-muted",  label: "fg-muted",  kind: "color" },
        { name: "--chures-error",     label: "error",     kind: "color" },
    ],
    "#/telegram-button": [
        { name: "--chures-btn-from",  label: "btn-from",  kind: "color" },
        { name: "--chures-btn-to",    label: "btn-to",    kind: "color" },
        { name: "--chures-accent",    label: "accent",    kind: "color" },
    ],
    "#/toaster": [
        { name: "--chures-accent",    label: "accent",    kind: "color" },
        { name: "--chures-error",     label: "error",     kind: "color" },
        { name: "--chures-warn",      label: "warn",      kind: "color" },
        { name: "--chures-surface",   label: "surface",   kind: "color" },
        { name: "--chures-fg",        label: "fg",        kind: "color" },
        { name: "--chures-fg-muted",  label: "fg-muted",  kind: "color" },
        { name: "--chures-font-sm",   label: "font-sm",   kind: "rem" },
        { name: "--chures-font-xs",   label: "font-xs",   kind: "rem" },
    ],
    "#/loader": [
        { name: "--chures-accent",    label: "accent",    kind: "color" },
        { name: "--chures-bg",        label: "bg",        kind: "color" },
    ],
    "#/loading-wrapper": [
        { name: "--chures-accent",    label: "accent",    kind: "color" },
        { name: "--chures-bg",        label: "bg",        kind: "color" },
    ],
    "#/input": [
        { name: "--chures-input-bg",      label: "input-bg",      kind: "color" },
        { name: "--chures-accent",        label: "accent",        kind: "color" },
        { name: "--chures-fg",            label: "fg",            kind: "color" },
        { name: "--chures-fg-muted",      label: "fg-muted",      kind: "color" },
        { name: "--chures-input-radius",  label: "input-radius",  kind: "rem" },
        { name: "--chures-input-height",  label: "input-height",  kind: "rem" },
        { name: "--chures-font-sm",       label: "font-sm",       kind: "rem" },
    ],
    "#/toggle": [
        { name: "--chures-accent",         label: "accent",         kind: "color" },
        { name: "--chures-toggle-width",   label: "toggle-width",   kind: "rem" },
        { name: "--chures-toggle-height",  label: "toggle-height",  kind: "rem" },
        { name: "--chures-toggle-thumb",   label: "toggle-thumb",   kind: "rem" },
    ],
    "#/dropdown": [
        { name: "--chures-input-bg",         label: "input-bg",         kind: "color" },
        { name: "--chures-accent",           label: "accent",           kind: "color" },
        { name: "--chures-fg",               label: "fg",               kind: "color" },
        { name: "--chures-fg-muted",         label: "fg-muted",         kind: "color" },
        { name: "--chures-dropdown-radius",  label: "dropdown-radius",  kind: "rem" },
        { name: "--chures-input-height",     label: "input-height",     kind: "rem" },
    ],
    "#/confirm-dialog": [
        { name: "--chures-accent",    label: "accent",    kind: "color" },
        { name: "--chures-button-bg", label: "button-bg", kind: "color" },
        { name: "--chures-error",     label: "error",     kind: "color" },
        { name: "--chures-fg",        label: "fg",        kind: "color" },
        { name: "--chures-fg-muted",  label: "fg-muted",  kind: "color" },
        { name: "--chures-surface",   label: "surface",   kind: "color" },
    ],
    "#/info-dialog": [
        { name: "--chures-accent",    label: "accent",    kind: "color" },
        { name: "--chures-button-bg", label: "button-bg", kind: "color" },
        { name: "--chures-fg",        label: "fg",        kind: "color" },
        { name: "--chures-fg-muted",  label: "fg-muted",  kind: "color" },
        { name: "--chures-surface",   label: "surface",   kind: "color" },
    ],
    "#/modal-actions": [
        { name: "--chures-accent",    label: "accent",    kind: "color" },
        { name: "--chures-fg-muted",  label: "fg-muted",  kind: "color" },
        { name: "--chures-error",     label: "error",     kind: "color" },
    ],
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
            { name: "--chures-bg",        label: "bg",        kind: "color" },
            { name: "--chures-fg",        label: "fg",        kind: "color" },
            { name: "--chures-fg-muted",  label: "fg-muted",  kind: "color" },
            { name: "--chures-surface",   label: "surface",   kind: "color" },
            { name: "--chures-input-bg",  label: "input-bg",  kind: "color" },
            { name: "--chures-button-bg", label: "button-bg", kind: "color" },
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

function useHash() {
    const [hash, setHash] = useState(location.hash || "#/button")
    useEffect(() => {
        const handler = () => setHash(location.hash || "#/button")
        window.addEventListener("hashchange", handler)
        return () => window.removeEventListener("hashchange", handler)
    }, [])
    return hash
}

const MIN_CONSUMER_H = 64
const MAX_CONSUMER_H = 320
const DEFAULT_CONSUMER_H = 112

export function ThemeVariables() {
    const cssVars = useDemoStore((s) => s.cssVars)
    const setCssVar = useDemoStore((s) => s.setCssVar)
    const resetCssVars = useDemoStore((s) => s.resetCssVars)
    const themeOpen = useDemoStore((s) => s.themeOpen)
    const toggleTheme = useDemoStore((s) => s.toggleTheme)
    const hash = useHash()

    const [consumerHeight, setConsumerHeight] = useState(DEFAULT_CONSUMER_H)
    const [dragging, setDragging] = useState(false)
    const dragStartRef = useRef<{ y: number; h: number } | null>(null)

    useEffect(() => {
        const root = document.documentElement
        Object.entries(cssVars).forEach(([k, v]) => root.style.setProperty(k, v))
        return () => Object.keys(CSS_DEFAULTS).forEach((k) => root.style.removeProperty(k))
    }, [cssVars])

    const pageVars = PAGE_VARS[hash] ?? []

    const pageVarNames = new Set(pageVars.map((v) => v.name))
    const pageModified = Object.entries(cssVars).filter(
        ([k, v]) => pageVarNames.has(k) && v !== CSS_DEFAULTS[k]
    )
    const globalModified = Object.entries(cssVars).filter(
        ([k, v]) => !pageVarNames.has(k) && v !== CSS_DEFAULTS[k]
    )

    const componentName = hash.replace("#/", "")
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ")

    const cssParts: string[] = []
    if (pageVars.length > 0) {
        const body = pageModified.length > 0
            ? pageModified.map(([k, v]) => `  ${k}: ${v};`).join("\n")
            : "  /* no changes */"
        cssParts.push(`// ${componentName} overrides\n:root {\n${body}\n}`)
    }
    if (globalModified.length > 0) {
        cssParts.push(`// Global variables\n:root {\n${globalModified.map(([k, v]) => `  ${k}: ${v};`).join("\n")}\n}`)
    }
    const cssOutput = cssParts.length > 0 ? cssParts.join("\n\n") : `:root {\n  /* no changes */\n}`

    const onDividerMouseDown = useCallback((e: React.MouseEvent) => {
        e.preventDefault()
        dragStartRef.current = { y: e.clientY, h: consumerHeight }
        setDragging(true)

        const onMove = (me: MouseEvent) => {
            if (!dragStartRef.current) return
            const delta = dragStartRef.current.y - me.clientY
            setConsumerHeight(Math.max(MIN_CONSUMER_H, Math.min(MAX_CONSUMER_H, dragStartRef.current.h + delta)))
        }
        const onUp = () => {
            dragStartRef.current = null
            setDragging(false)
            window.removeEventListener("mousemove", onMove)
            window.removeEventListener("mouseup", onUp)
        }
        window.addEventListener("mousemove", onMove)
        window.addEventListener("mouseup", onUp)
    }, [consumerHeight])

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
                    <div className="theme-panel-tweaks">
                        {pageVars.length > 0 && (
                            <div className="var-group var-group--page">
                                <div className="var-group-heading">Current page</div>
                                {pageVars.map((v) => {
                                    const value = cssVars[v.name] ?? CSS_DEFAULTS[v.name]
                                    const isModified = value !== CSS_DEFAULTS[v.name]
                                    return (
                                        <div key={v.name} className="var-row">
                                            <span className={`var-label${isModified ? " var-label--modified" : ""}`}>
                                                {v.label}
                                            </span>
                                            {v.kind === "color" ? (
                                                <div className="var-color-control">
                                                    <input
                                                        type="color"
                                                        className="var-color-swatch"
                                                        value={value}
                                                        onChange={(e) => setCssVar(v.name, e.target.value)}
                                                    />
                                                    <input
                                                        type="text"
                                                        className="var-text-input"
                                                        value={value}
                                                        onChange={(e) => setCssVar(v.name, e.target.value)}
                                                    />
                                                </div>
                                            ) : (
                                                <input
                                                    type="text"
                                                    className="var-text-input"
                                                    value={value}
                                                    onChange={(e) => setCssVar(v.name, e.target.value)}
                                                />
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
                        )}
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
                    </div>
                    <div
                        className={`theme-panel-divider${dragging ? " theme-panel-divider--dragging" : ""}`}
                        onMouseDown={onDividerMouseDown}
                    >
                        <span className="theme-panel-divider-grip" />
                    </div>
                    <div className="theme-panel-consumer" style={{ height: consumerHeight }}>
                        <div className="var-group-heading">Consumer CSS</div>
                        <pre className="var-css-output">{cssOutput}</pre>
                    </div>
                </div>
            )}
        </div>
    )
}
