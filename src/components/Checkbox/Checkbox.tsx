import cn from 'classnames'
import { CheckmarkIcon } from '../icons/CheckmarkIcon'
import styles from './Checkbox.module.css'
import { useComponentClassName } from '../../theme/useComponentClassName'

interface Props {
    checked: boolean
    onChange: (checked: boolean) => void
    label?: string
    disabled?: boolean
    className?: string
}

export type CheckboxProps = Props

export function Checkbox({ checked, onChange, label, disabled, className }: Props) {
    const resolvedClassName = useComponentClassName('Checkbox', className)

    return (
        <label className={cn(styles.CheckboxContainer, { [styles.disabled]: disabled }, resolvedClassName)}>
            <span className={styles.BoxWrapper}>
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => onChange(e.target.checked)}
                    disabled={disabled}
                />
                <span className={styles.Box}>
                    <CheckmarkIcon size={11} strokeWidth={3} shrink={false} />
                </span>
            </span>
            {label && <span className={styles.Label}>{label}</span>}
        </label>
    )
}
