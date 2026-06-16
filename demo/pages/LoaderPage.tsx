import { useState } from "react"
import { Loader } from "../../src/components/Loader"
import { PropRow, ToggleGroup } from "../components/PropRow"

const LOADER_VARIANTS = ["arcs", "ripple", "dots", "wave"] as const
type LoaderVariant = (typeof LOADER_VARIANTS)[number]
type DemoVariant = LoaderVariant | "all"

const DEFAULT_COLOR = "#229ED9"

export function LoaderPage() {
    const [variant, setVariant] = useState<DemoVariant>("ripple")
    const [size, setSize] = useState<"sm" | "md" | "lg">("md")
    const [color, setColor] = useState(DEFAULT_COLOR)

    return (
        <div className="playground">
            <div className="playground-preview">
                <div className="preview-card">
                    <span className="preview-label">Preview</span>
                    {variant === "all" ? (
                        <div style={{ display: "flex", gap: "2.5rem", alignItems: "center" }}>
                            {LOADER_VARIANTS.map((v) => (
                                <Loader key={v} variant={v} size={size} color={color} />
                            ))}
                        </div>
                    ) : (
                        <Loader variant={variant} size={size} color={color} />
                    )}
                </div>
            </div>

            <div className="playground-controls">
                <div className="controls-heading">Props</div>

                <PropRow label="variant">
                    <ToggleGroup
                        options={[...LOADER_VARIANTS, "all"]}
                        value={variant}
                        onChange={(v) => setVariant(v as DemoVariant)}
                    />
                </PropRow>

                <PropRow label="size">
                    <ToggleGroup
                        options={["sm", "md", "lg"]}
                        value={size}
                        onChange={(v) => setSize(v as "sm" | "md" | "lg")}
                    />
                </PropRow>

                <PropRow label="color">
                    <input
                        type="color"
                        className="prop-input"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        style={{ width: "3rem", height: "2rem", padding: "0.125rem", cursor: "pointer" }}
                    />
                    <input
                        type="text"
                        className="prop-input"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        style={{ width: "6rem" }}
                    />
                    {color !== DEFAULT_COLOR && (
                        <button
                            className="fire-btn"
                            style={{ fontSize: "0.75rem", padding: "0.25rem 0.75rem" }}
                            onClick={() => setColor(DEFAULT_COLOR)}
                        >
                            Reset
                        </button>
                    )}
                </PropRow>
            </div>
        </div>
    )
}
