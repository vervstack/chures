import styles from './Switch.module.css'

interface Props {
    checked: boolean
    onChange: (v: boolean) => void
}

export function Switch({ checked, onChange }: Props) {
    return (
        <label className={styles.Switch}>
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
            />
            <span className={styles.Track} />
            <span className={styles.Thumb} />
        </label>
    )
}
