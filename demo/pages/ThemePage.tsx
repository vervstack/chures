import { useEffect, useState } from "react"
import { TelegramSignInButton } from "../../src/components/TelegramSignInButton"
import { useToaster } from "../../src/hooks/toaster/useToaster"
import { PropRow } from "../components/PropRow"

type VarMap = Record<string, string>

const DEFAULTS: VarMap = {
    "--chures-accent":    "#229ED9",
    "--chures-btn-from":  "#2AABEE",
    "--chures-btn-to":    "#229ED9",
    "--chures-error":     "#ef4444",
    "--chures-warn":      "#f59e0b",
    "--chures-fg":        "#ffffff",
    "--chures-fg-muted":  "#9ca3af",
    "--chures-surface":   "#000000",
}

const LABELS: Record<string, string> = {
    "--chures-accent":    "accent",
    "--chures-btn-from":  "btn-from",
    "--chures-btn-to":    "btn-to",
    "--chures-error":     "error",
    "--chures-warn":      "warn",
    "--chures-fg":        "fg",
    "--chures-fg-muted":  "fg-muted",
    "--chures-surface":   "surface",
}

export function ThemePage() {
    const [vars, setVars] = useState<VarMap>(DEFAULTS)
    const { bake } = useToaster()

    useEffect(() => {
        const root = document.documentElement
        Object.entries(vars).forEach(([k, v]) => root.style.setProperty(k, v))
        return () => Object.keys(vars).forEach((k) => root.style.removeProperty(k))
    }, [vars])

    function set(key: string, value: string) {
        setVars((prev) => ({ ...prev, [key]: value }))
    }

    function reset() {
        setVars(DEFAULTS)
    }

    return (
        <div className="playground">
            <div className="playground-preview">
                <div className="preview-card">
                    <span className="preview-label">Preview</span>
                    <TelegramSignInButton onClick={() => {}} />
                    <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
                        <button className="fire-btn" onClick={() => bake({ title: "Info toast", description: "Info level", level: "Info" })}>
                            Info
                        </button>
                        <button className="fire-btn" onClick={() => bake({ title: "Warning toast", description: "Warn level", level: "Warn" })}>
                            Warn
                        </button>
                        <button className="fire-btn" onClick={() => bake({ title: "Error toast", description: "Error level", level: "Error" })}>
                            Error
                        </button>
                    </div>
                </div>
            </div>

            <div className="playground-controls">
                <div className="controls-heading" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span>CSS Variables</span>
                    <button className="fire-btn" style={{ fontSize: "0.75rem", padding: "0.25rem 0.75rem" }} onClick={reset}>
                        Reset
                    </button>
                </div>

                {Object.entries(vars).map(([key, value]) => (
                    <PropRow key={key} label={LABELS[key]}>
                        <input
                            type="color"
                            className="prop-input"
                            value={value}
                            onChange={(e) => set(key, e.target.value)}
                            style={{ width: "3rem", height: "2rem", padding: "0.125rem", cursor: "pointer" }}
                        />
                        <input
                            type="text"
                            className="prop-input"
                            value={value}
                            onChange={(e) => set(key, e.target.value)}
                            style={{ width: "6rem" }}
                        />
                    </PropRow>
                ))}

                <div style={{ marginTop: "1.5rem", padding: "1rem", background: "rgba(255,255,255,0.04)", borderRadius: "0.5rem" }}>
                    <div className="controls-heading" style={{ marginBottom: "0.5rem" }}>Consumer CSS</div>
                    <pre style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.5)", margin: 0, overflowX: "auto" }}>
{`:root {\n${Object.entries(vars)
    .filter(([k, v]) => v !== DEFAULTS[k])
    .map(([k, v]) => `  ${k}: ${v};`)
    .join("\n") || "  /* no overrides yet */"}
}`}
                    </pre>
                </div>
            </div>
        </div>
    )
}
