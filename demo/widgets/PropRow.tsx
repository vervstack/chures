interface Props {
    label: string
    children: React.ReactNode
    disabled?: boolean
    tooltip?: string
}

export function PropRow({ label, children, disabled, tooltip }: Props) {
    return (
        <div
            className={disabled ? "prop-row prop-row-disabled" : "prop-row"}
            title={disabled ? tooltip : undefined}
        >
            <span className="prop-label">{label}</span>
            <div className="prop-control">{children}</div>
        </div>
    )
}

interface ToggleGroupProps {
    options: string[]
    value: string
    onChange: (v: string) => void
    disabled?: boolean
}

export function ToggleGroup({ options, value, onChange, disabled }: ToggleGroupProps) {
    return (
        <div className="toggle-group">
            {options.map((opt) => (
                <button
                    key={opt}
                    className={value === opt ? "active" : ""}
                    disabled={disabled}
                    onClick={() => onChange(opt)}
                >
                    {opt}
                </button>
            ))}
        </div>
    )
}

export { Switch } from './Switch'
