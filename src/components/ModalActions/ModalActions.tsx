import { useComponentClassName } from '../../theme/useComponentClassName'

interface ButtonConfig {
    label: string
    onClick: () => void
    className: string
    disabled?: boolean
}

interface Props {
    buttons: ButtonConfig[]
    containerClassName?: string
}

export type ModalActionsProps = Props

export function ModalActions({ buttons, containerClassName }: Props) {
    const resolvedClassName = useComponentClassName('ModalActions', containerClassName)
    return (
        <div className={resolvedClassName}>
            {buttons.map((btn, idx) => (
                <button
                    key={idx}
                    className={btn.className}
                    type="button"
                    onClick={btn.onClick}
                    disabled={btn.disabled}
                >
                    {btn.label}
                </button>
            ))}
        </div>
    )
}
