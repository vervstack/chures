import { useState } from "react"
import { Input } from "../../src/components/Input"
import { Playground } from "../components/Playground"

export function InputPage() {
    const [value, setValue] = useState("")
    const [type, setType] = useState<"text" | "password" | "email">("text")
    const [isLoader, setIsLoader] = useState(false)
    const [disabled, setDisabled] = useState(false)
    const [showError, setShowError] = useState(false)

    return (
        <Playground controls={[
            { type: "toggleGroup", label: "type", options: ["text", "password", "email"], value: type, onChange: (v) => setType(v as "text" | "password" | "email") },
            { type: "toggleGroup", label: "isLoader", options: ["false", "true"], value: String(isLoader), onChange: (v) => setIsLoader(v === "true") },
            { type: "toggleGroup", label: "disabled", options: ["false", "true"], value: String(disabled), onChange: (v) => setDisabled(v === "true") },
            { type: "toggleGroup", label: "error", options: ["none", "show"], value: showError ? "show" : "none", onChange: (v) => setShowError(v === "show") },
            { type: "display", label: "value", value: value.length > 0 ? `"${value}"` : "(empty)" },
        ]}>
            <div style={{ width: "18rem" }}>
                <Input
                    value={value}
                    setValue={setValue}
                    label="Email address"
                    type={type}
                    isLoader={isLoader}
                    disabled={disabled}
                    error={showError ? "This field is required" : undefined}
                />
            </div>
        </Playground>
    )
}
