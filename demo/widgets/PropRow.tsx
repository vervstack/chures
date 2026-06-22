interface Props {
    label: string
    children: React.ReactNode
}

export function PropRow({ label, children }: Props) {
    return (
        <div className="prop-row">
            <span className="prop-label">{label}</span>
            <div className="prop-control">{children}</div>
        </div>
    )
}

interface ToggleGroupProps {
    options: string[]
    value: string
    onChange: (v: string) => void
}

export function ToggleGroup({ options, value, onChange }: ToggleGroupProps) {
    return (
        <div className="toggle-group">
            {options.map((opt) => (
                <button
                    key={opt}
                    className={value === opt ? "active" : ""}
                    onClick={() => onChange(opt)}
                >
                    {opt}
                </button>
            ))}
        </div>
    )
}

export { Switch } from './Switch'
