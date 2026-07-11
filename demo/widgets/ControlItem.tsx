import type { ControlDef } from "./ControlDef"
import { PropRow, Switch, ToggleGroup } from "./PropRow"

function ToggleControl({ label, value, onChange, disabled, tooltip }: { label: string; value: boolean; onChange: (v: boolean) => void; disabled?: boolean; tooltip?: string }) {
    return (
        <PropRow label={label} disabled={disabled} tooltip={tooltip}>
            <Switch checked={value} onChange={onChange} disabled={disabled} />
        </PropRow>
    )
}

function ToggleGroupControl({ label, options, value, onChange, disabled, tooltip }: { label: string; options: string[]; value: string; onChange: (v: string) => void; disabled?: boolean; tooltip?: string }) {
    return (
        <PropRow label={label} disabled={disabled} tooltip={tooltip}>
            <ToggleGroup options={options} value={value} onChange={onChange} disabled={disabled} />
        </PropRow>
    )
}

function InputControl({ label, value, onChange, placeholder, disabled, tooltip }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; disabled?: boolean; tooltip?: string }) {
    return (
        <PropRow label={label} disabled={disabled} tooltip={tooltip}>
            <input
                className="prop-input"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                disabled={disabled}
            />
        </PropRow>
    )
}

function ColorControl({ label, value, onChange, disabled, tooltip }: { label: string; value: string; onChange: (v: string) => void; disabled?: boolean; tooltip?: string }) {
    return (
        <PropRow label={label} disabled={disabled} tooltip={tooltip}>
            <input
                type="color"
                className="prop-input"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                style={{ width: "3rem", height: "2rem", padding: "0.125rem", cursor: "pointer" }}
                disabled={disabled}
            />
            <input
                type="text"
                className="prop-input"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                style={{ width: "6rem" }}
                disabled={disabled}
            />
        </PropRow>
    )
}

function SelectControl({ label, options, value, onChange, disabled, tooltip }: { label: string; options: string[]; value: string; onChange: (v: string) => void; disabled?: boolean; tooltip?: string }) {
    return (
        <PropRow label={label} disabled={disabled} tooltip={tooltip}>
            <select
                className="prop-select"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                disabled={disabled}
            >
                {options.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                ))}
            </select>
        </PropRow>
    )
}

function DisplayControl({ label, value, disabled, tooltip }: { label: string; value: string; disabled?: boolean; tooltip?: string }) {
    return (
        <PropRow label={label} disabled={disabled} tooltip={tooltip}>
            <span style={{ fontSize: "0.75rem", color: "var(--chures-fg-muted)" }}>
                {value || "(none)"}
            </span>
        </PropRow>
    )
}

interface Props {
    ctrl: ControlDef
}

export function ControlItem({ ctrl }: Props) {
    if (ctrl.type === "toggle") return <ToggleControl label={ctrl.label} value={ctrl.value} onChange={ctrl.onChange} disabled={ctrl.disabled} tooltip={ctrl.tooltip} />
    if (ctrl.type === "toggleGroup") return <ToggleGroupControl label={ctrl.label} options={ctrl.options} value={ctrl.value} onChange={ctrl.onChange} disabled={ctrl.disabled} tooltip={ctrl.tooltip} />
    if (ctrl.type === "input") return <InputControl label={ctrl.label} value={ctrl.value} onChange={ctrl.onChange} placeholder={ctrl.placeholder} disabled={ctrl.disabled} tooltip={ctrl.tooltip} />
    if (ctrl.type === "color") return <ColorControl label={ctrl.label} value={ctrl.value} onChange={ctrl.onChange} disabled={ctrl.disabled} tooltip={ctrl.tooltip} />
    if (ctrl.type === "select") return <SelectControl label={ctrl.label} options={ctrl.options} value={ctrl.value} onChange={ctrl.onChange} disabled={ctrl.disabled} tooltip={ctrl.tooltip} />
    if (ctrl.type === "display") return <DisplayControl label={ctrl.label} value={ctrl.value} disabled={ctrl.disabled} tooltip={ctrl.tooltip} />
    if (ctrl.type === "node") return <div>{ctrl.node}</div>
    return null
}
