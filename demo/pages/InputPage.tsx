import { useState } from "react"
import { Tooltip } from "react-tooltip"
import { Input } from "../../src/components/Input"
import { PropRow, ToggleGroup } from "../components/PropRow"

export function InputPage() {
    const [value, setValue] = useState("")
    const [type, setType] = useState<"text" | "password" | "email">("text")
    const [isLoader, setIsLoader] = useState(false)
    const [disabled, setDisabled] = useState(false)
    const [showError, setShowError] = useState(false)

    return (
        <div className="playground">
            <div className="playground-preview">
                <div className="preview-card">
                    <span className="preview-label">Preview</span>
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
                </div>
            </div>

            <div className="playground-controls">
                <div className="controls-heading">Props</div>

                <PropRow label="type">
                    <div className="toggle-group">
                        {(["text", "password", "email"] as const).map((opt) => (
                            <button
                                key={opt}
                                className={type === opt ? "active" : ""}
                                onClick={() => setType(opt)}
                                data-tooltip-id={opt === "email" ? "email-tip" : undefined}
                            >
                                {opt}
                            </button>
                        ))}
                    </div>
                    <Tooltip
                        id="email-tip"
                        place="top"
                        content="Shows email keyboard on mobile, enables browser format validation on submit, and triggers email autofill"
                    />
                </PropRow>

                <PropRow label="isLoader">
                    <ToggleGroup
                        options={["false", "true"]}
                        value={String(isLoader)}
                        onChange={(v) => setIsLoader(v === "true")}
                    />
                </PropRow>

                <PropRow label="disabled">
                    <ToggleGroup
                        options={["false", "true"]}
                        value={String(disabled)}
                        onChange={(v) => setDisabled(v === "true")}
                    />
                </PropRow>

                <PropRow label="error">
                    <ToggleGroup
                        options={["none", "show"]}
                        value={showError ? "show" : "none"}
                        onChange={(v) => setShowError(v === "show")}
                    />
                </PropRow>

                <PropRow label="value">
                    <span style={{ fontSize: "0.75rem", color: "var(--c-muted)" }}>
                        {value.length > 0 ? `"${value}"` : "(empty)"}
                    </span>
                </PropRow>
            </div>
        </div>
    )
}
