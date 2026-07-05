import styles from './InfoDialog.module.css'

interface Props {
    title: string
    message: string
    onClose: () => void
}

export type InfoDialogProps = Props

export function InfoDialog({ title, message, onClose }: Props) {
    return (
        <div className={styles.InfoContainer} role="dialog" aria-modal="true">
            <h2 className={styles.InfoTitle}>{title}</h2>
            <p className={styles.InfoMessage}>{message}</p>
            <div className={styles.InfoActions}>
                <button className={styles.BtnClose} type="button" onClick={onClose}>
                    Got it
                </button>
            </div>
        </div>
    )
}
