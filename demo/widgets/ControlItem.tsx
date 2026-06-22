import type { ControlDef } from "./ControlDef"
import { PropRow, Switch, ToggleGroup } from "./PropRow"

function ToggleControl({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
    return (
        <PropRow label={label}>
            <Switch checked={value} onChange={onChange} />
        </PropRow>
    )
}

function ToggleGroupControl({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (v: string) => void }) {
    return (
        <PropRow label={label}>
            <ToggleGroup options={options} value={value} onChange={onChange} />
        </PropRow>
    )
}

function InputControl({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
    return (
        <PropRow label={label}>
            <input
                className="prop-input"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
            />
        </PropRow>
    )
}

function ColorControl({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
    return (
        <PropRow label={label}>
            <input
                type="color"
                className="prop-input"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                style={{ width: "3rem", height: "2rem", padding: "0.125rem", cursor: "pointer" }}
            />
            <input
                type="text"
                className="prop-input"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                style={{ width: "6rem" }}
            />
        </PropRow>
    )
}

function SelectControl({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (v: string) => void }) {
    return (
        <PropRow label={label}>
            <select
                className="prop-select"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            >
                {options.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                ))}
            </select>
        </PropRow>
    )
}

function DisplayControl({ label, value }: { label: string; value: string }) {
    return (
        <PropRow label={label}>
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
    if (ctrl.type === "toggle") return <ToggleControl label={ctrl.label} value={ctrl.value} onChange={ctrl.onChange} />
    if (ctrl.type === "toggleGroup") return <ToggleGroupControl label={ctrl.label} options={ctrl.options} value={ctrl.value} onChange={ctrl.onChange} />
    if (ctrl.type === "input") return <InputControl label={ctrl.label} value={ctrl.value} onChange={ctrl.onChange} placeholder={ctrl.placeholder} />
    if (ctrl.type === "color") return <ColorControl label={ctrl.label} value={ctrl.value} onChange={ctrl.onChange} />
    if (ctrl.type === "select") return <SelectControl label={ctrl.label} options={ctrl.options} value={ctrl.value} onChange={ctrl.onChange} />
    if (ctrl.type === "display") return <DisplayControl label={ctrl.label} value={ctrl.value} />
    if (ctrl.type === "node") return <div>{ctrl.node}</div>
    return null
}
