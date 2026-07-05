import { useState } from 'react'
import cn from 'classnames'
import styles from './ConfirmDialog.module.css'

interface Props {
    title: string
    message: string
    confirmLabel?: string
    cancelLabel?: string
    danger?: boolean
    onConfirm: () => void | Promise<void>
    onClose: () => void
}

export type ConfirmDialogProps = Props

export function ConfirmDialog({
    title,
    message,
    confirmLabel = 'Confirm',
    cancelLabel = 'Cancel',
    danger = false,
    onConfirm,
    onClose,
}: Props) {
    const [loading, setLoading] = useState(false)

    function handleConfirm() {
        setLoading(true)
        Promise.resolve(onConfirm())
            .finally(() => {
                setLoading(false)
                onClose()
            })
    }

    return (
        <div className={styles.ConfirmContainer} role="dialog" aria-modal="true">
            <h2 className={styles.ConfirmTitle}>{title}</h2>
            <p className={styles.ConfirmMessage}>{message}</p>
            <div className={styles.ConfirmActions}>
                <button className={styles.BtnCancel} type="button" onClick={onClose} disabled={loading}>
                    {cancelLabel}
                </button>
                <button
                    className={cn(danger ? styles.BtnDanger : styles.BtnConfirm)}
                    type="button"
                    onClick={handleConfirm}
                    disabled={loading}
                >
                    {loading ? '…' : confirmLabel}
                </button>
            </div>
        </div>
    )
}
