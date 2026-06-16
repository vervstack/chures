import { useState } from "react"
import { Toggle } from "../../src/components/Toggle"
import { PropRow, ToggleGroup } from "../components/PropRow"

export function TogglePage() {
    const [checked, setChecked] = useState(false)
    const [isLoader, setIsLoader] = useState(false)
    const [isLoadingLabel, setIsLoadingLabel] = useState(false)
    const [disabled, setDisabled] = useState(false)
    const [showLabel, setShowLabel] = useState(false)
    const [labelPosition, setLabelPosition] = useState<'left' | 'right'>('right')

    return (
        <div className="playground">
            <div className="playground-preview">
                <div className="preview-card">
                    <span className="preview-label">Preview</span>
                    <Toggle
                        checked={checked}
                        onChange={setChecked}
                        label={showLabel ? "Enable notifications" : undefined}
                        labelPosition={labelPosition}
                        isLoader={isLoader}
                        isLoadingLabel={isLoadingLabel}
                        disabled={disabled}
                    />
                </div>
            </div>

            <div className="playground-controls">
                <div className="controls-heading">Props</div>

                <PropRow label="checked">
                    <ToggleGroup
                        options={["false", "true"]}
                        value={String(checked)}
                        onChange={(v) => setChecked(v === "true")}
                    />
                </PropRow>

                <PropRow label="label">
                    <ToggleGroup
                        options={["none", "show"]}
                        value={showLabel ? "show" : "none"}
                        onChange={(v) => setShowLabel(v === "show")}
                    />
                </PropRow>

                <PropRow label="labelPosition">
                    <ToggleGroup
                        options={["right", "left"]}
                        value={labelPosition}
                        onChange={(v) => setLabelPosition(v as 'left' | 'right')}
                    />
                </PropRow>

                <PropRow label="isLoader">
                    <ToggleGroup
                        options={["false", "true"]}
                        value={String(isLoader)}
                        onChange={(v) => setIsLoader(v === "true")}
                    />
                </PropRow>

                <PropRow label="isLoadingLabel">
                    <ToggleGroup
                        options={["false", "true"]}
                        value={String(isLoadingLabel)}
                        onChange={(v) => setIsLoadingLabel(v === "true")}
                    />
                </PropRow>

                <PropRow label="disabled">
                    <ToggleGroup
                        options={["false", "true"]}
                        value={String(disabled)}
                        onChange={(v) => setDisabled(v === "true")}
                    />
                </PropRow>
            </div>
        </div>
    )
}
