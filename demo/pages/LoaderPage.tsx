import { useState } from "react"
import { Loader } from "../../src/components/Loader"
import { Playground } from "../components/Playground"

const LOADER_VARIANTS = ["arcs", "ripple", "dots", "wave"] as const
type LoaderVariant = (typeof LOADER_VARIANTS)[number]
type DemoVariant = LoaderVariant | "all"

const DEFAULT_COLOR = "#229ED9"

export function LoaderPage() {
    const [variant, setVariant] = useState<DemoVariant>("ripple")
    const [size, setSize] = useState<"sm" | "md" | "lg">("md")
    const [color, setColor] = useState(DEFAULT_COLOR)

    return (
        <Playground controls={[
            { type: "toggleGroup", label: "variant", options: [...LOADER_VARIANTS, "all"], value: variant, onChange: (v) => setVariant(v as DemoVariant) },
            { type: "toggleGroup", label: "size", options: ["sm", "md", "lg"], value: size, onChange: (v) => setSize(v as "sm" | "md" | "lg") },
            { type: "color", label: "color", value: color, onChange: setColor },
        ]}>
            {variant === "all" ? (
                <div style={{ display: "flex", gap: "2.5rem", alignItems: "center" }}>
                    {LOADER_VARIANTS.map((v) => <Loader key={v} variant={v} size={size} color={color} />)}
                </div>
            ) : (
                <Loader variant={variant} size={size} color={color} />
            )}
        </Playground>
    )
}
