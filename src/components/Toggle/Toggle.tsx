import cn from 'classnames'
import styles from './Toggle.module.css'
import { useComponentClassName } from '../../theme/useComponentClassName'

interface Props {
    checked: boolean
    onChange: (checked: boolean) => void
    label?: string
    labelPosition?: 'left' | 'right'
    disabled?: boolean
    isLoader?: boolean
    isLoadingLabel?: boolean
    className?: string
}

export type ToggleProps = Props

export function Toggle({ checked, onChange, label, labelPosition = 'right', disabled, isLoader, isLoadingLabel, className }: Props) {
    const hasLabel = !!label || isLoadingLabel
    const resolvedClassName = useComponentClassName('Toggle', className)
    const labelNode = isLoadingLabel
        ? <span className={styles.LabelSkeleton} aria-hidden="true" />
        : label ? <span className={styles.Label}>{label}</span> : null

    if (isLoader) {
        if (!hasLabel) {
            return <div className={cn(styles.Skeleton, resolvedClassName)} aria-hidden="true" />
        }
        return (
            <div className={cn(styles.ToggleContainer, resolvedClassName)}>
                {labelPosition === 'left' && labelNode}
                <div className={styles.Skeleton} aria-hidden="true" />
                {labelPosition === 'right' && labelNode}
            </div>
        )
    }

    return (
        <label className={cn(styles.ToggleContainer, { [styles.disabled]: disabled }, resolvedClassName)}>
            {labelPosition === 'left' && labelNode}
            <button
                role="switch"
                aria-checked={checked}
                className={cn(styles.Track, { [styles.on]: checked })}
                onClick={() => !disabled && onChange(!checked)}
                disabled={disabled}
                type="button"
            >
                <span className={styles.Thumb} />
            </button>
            {labelPosition === 'right' && labelNode}
        </label>
    )
}
