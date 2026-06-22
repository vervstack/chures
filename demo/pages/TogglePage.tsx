import { useState } from "react"
import { Toggle } from "../../src/components/Toggle"
import { Playground } from "./wrappers/Playground"

export function TogglePage() {
    const [checked, setChecked] = useState(false)
    const [isLoader, setIsLoader] = useState(false)
    const [isLoadingLabel, setIsLoadingLabel] = useState(false)
    const [disabled, setDisabled] = useState(false)
    const [showLabel, setShowLabel] = useState(false)
    const [labelPosition, setLabelPosition] = useState<"left" | "right">("right")

    return (
        <Playground controls={[
            { type: "toggleGroup", label: "checked", options: ["false", "true"], value: String(checked), onChange: (v) => setChecked(v === "true") },
            { type: "toggleGroup", label: "label", options: ["none", "show"], value: showLabel ? "show" : "none", onChange: (v) => setShowLabel(v === "show") },
            { type: "toggleGroup", label: "labelPosition", options: ["right", "left"], value: labelPosition, onChange: (v) => setLabelPosition(v as "left" | "right") },
            { type: "toggleGroup", label: "isLoader", options: ["false", "true"], value: String(isLoader), onChange: (v) => setIsLoader(v === "true") },
            { type: "toggleGroup", label: "isLoadingLabel", options: ["false", "true"], value: String(isLoadingLabel), onChange: (v) => setIsLoadingLabel(v === "true") },
            { type: "toggleGroup", label: "disabled", options: ["false", "true"], value: String(disabled), onChange: (v) => setDisabled(v === "true") },
        ]}>
            <Toggle
                checked={checked}
                onChange={setChecked}
                label={showLabel ? "Enable notifications" : undefined}
                labelPosition={labelPosition}
                isLoader={isLoader}
                isLoadingLabel={isLoadingLabel}
                disabled={disabled}
            />
        </Playground>
    )
}
