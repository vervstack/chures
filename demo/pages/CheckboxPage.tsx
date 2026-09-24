import { useEffect, useState } from "react"
import { Checkbox } from "../../src/components/Checkbox"
import { useDemoStore } from "../store/useDemoStore"

export function CheckboxPage() {
    const [checked, setChecked] = useState(false)
    const [disabled, setDisabled] = useState(false)
    const [showLabel, setShowLabel] = useState(true)
    const setControls = useDemoStore((s) => s.setControls)

    useEffect(() => {
        setControls([
            { type: "toggleGroup", label: "checked", options: ["false", "true"], value: String(checked), onChange: (v) => setChecked(v === "true") },
            { type: "toggleGroup", label: "label", options: ["none", "show"], value: showLabel ? "show" : "none", onChange: (v) => setShowLabel(v === "show") },
            { type: "toggleGroup", label: "disabled", options: ["false", "true"], value: String(disabled), onChange: (v) => setDisabled(v === "true") },
        ])
        return () => setControls([])
    }, [checked, showLabel, disabled, setControls])

    return (
        <Checkbox
            checked={checked}
            onChange={setChecked}
            label={showLabel ? "Also apply workspace system prompt" : undefined}
            disabled={disabled}
        />
    )
}
