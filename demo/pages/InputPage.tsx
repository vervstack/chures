import { useEffect, useRef, useState } from "react"
import { Button } from "../../src/components/Button"
import { Input } from "../../src/components/Input"
import { useToaster } from "../../src/hooks/toaster/useToaster"
import { useDemoStore } from "../store/useDemoStore"
import cls from "./InputPage.module.css"

export function InputPage() {
    const [value, setValue] = useState("")
    const [type, setType] = useState<"text" | "password" | "email">("text")
    const [showLabel, setShowLabel] = useState(true)
    const [placeholder, setPlaceholder] = useState("Email address")
    const [isLoader, setIsLoader] = useState(false)
    const [disabled, setDisabled] = useState(false)
    const [showError, setShowError] = useState(false)
    const [highlightInput, setHighlightInput] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)
    const { bake } = useToaster()
    const setControls = useDemoStore((s) => s.setControls)

    useEffect(() => {
        setControls([
            { type: "toggleGroup", label: "type", options: ["text", "password", "email"], value: type, onChange: (v) => setType(v as "text" | "password" | "email") },
            { type: "toggleGroup", label: "label", options: ["none", "show"], value: showLabel ? "show" : "none", onChange: (v) => setShowLabel(v === "show") },
            { type: "input", label: "placeholder", value: placeholder, onChange: setPlaceholder },
            { type: "toggleGroup", label: "isLoader", options: ["false", "true"], value: String(isLoader), onChange: (v) => setIsLoader(v === "true") },
            { type: "toggleGroup", label: "disabled", options: ["false", "true"], value: String(disabled), onChange: (v) => setDisabled(v === "true") },
            { type: "toggleGroup", label: "error", options: ["none", "show"], value: showError ? "show" : "none", onChange: (v) => setShowError(v === "show") },
            { type: "toggleGroup", label: "inputClassName", options: ["none", "highlight"], value: highlightInput ? "highlight" : "none", onChange: (v) => setHighlightInput(v === "highlight") },
            { type: "display", label: "value", value: value.length > 0 ? `"${value}"` : "(empty)" },
            {
                type: "node",
                node: (
                    <Button
                        variant="secondary"
                        onClick={() => {
                            inputRef.current?.focus()
                            bake({ title: "Focused", description: "Called ref.current.focus() on the Input.", level: "Info" })
                        }}
                    >
                        Focus input (ref)
                    </Button>
                ),
            },
        ])
        return () => setControls([])
    }, [type, showLabel, placeholder, isLoader, disabled, showError, highlightInput, value, bake, setControls])

    return (
        <div style={{ width: "18rem" }}>
            <Input
                ref={inputRef}
                value={value}
                setValue={setValue}
                label={showLabel ? "Email address" : undefined}
                placeholder={showLabel ? undefined : placeholder}
                type={type}
                isLoader={isLoader}
                disabled={disabled}
                error={showError ? "This field is required" : undefined}
                inputClassName={highlightInput ? cls.DemoInputHighlight : undefined}
            />
        </div>
    )
}
