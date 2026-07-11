import styles from './Switch.module.css'

interface Props {
    checked: boolean
    onChange: (v: boolean) => void
    disabled?: boolean
}

export function Switch({ checked, onChange, disabled }: Props) {
    return (
        <label className={styles.Switch}>
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                disabled={disabled}
            />
            <span className={styles.Track} />
            <span className={styles.Thumb} />
        </label>
    )
}
