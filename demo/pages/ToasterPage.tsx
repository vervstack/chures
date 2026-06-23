import { useEffect, useState } from "react"
import { useToaster } from "../../src/hooks/toaster/useToaster"
import { useDemoStore } from "../store/useDemoStore"

type Level = "Info" | "Warn" | "Error"

export function ToasterPage() {
    const [title, setTitle] = useState("Info")
    const [description, setDescription] = useState("This is a toast notification.")
    const [level, setLevel] = useState<Level>("Info")
    const [isDismissable, setIsDismissable] = useState(false)
    const { bake } = useToaster()
    const setControls = useDemoStore((s) => s.setControls)

    useEffect(() => {
        setControls([
            { type: "input", label: "title", value: title, onChange: setTitle },
            { type: "input", label: "description", value: description, onChange: setDescription },
            { type: "select", label: "level", options: ["Info", "Warn", "Error"], value: level, onChange: (v) => setLevel(v as Level) },
            { type: "toggle", label: "isDismissable", value: isDismissable, onChange: setIsDismissable },
        ])
        return () => setControls([])
    }, [title, description, level, isDismissable, setControls])

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem" }}>
            <button className="fire-btn" onClick={() => bake({ title, description, level, isDismissable })}>
                Fire Toast
            </button>
            <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.25)", textAlign: "center" }}>
                Toast appears in the top-right corner
            </p>
        </div>
    )
}
