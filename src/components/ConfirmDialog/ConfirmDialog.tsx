import { useState } from 'react'
import cn from 'classnames'
import styles from './ConfirmDialog.module.css'
import { useComponentClassName } from '../../theme/useComponentClassName'

interface Props {
    title: string
    message: string
    confirmLabel?: string
    cancelLabel?: string
    danger?: boolean
    onConfirm: () => void | Promise<void>
    onClose: () => void
    className?: string
    // Frosted-glass look: translucent background + backdrop blur + a soft glow,
    // themeable via --chures-dialog-glass-* (see theme.css).
    glass?: boolean
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
    className,
    glass = false,
}: Props) {
    const [loading, setLoading] = useState(false)
    const resolvedClassName = useComponentClassName('ConfirmDialog', className)

    function handleConfirm() {
        setLoading(true)
        Promise.resolve(onConfirm())
            .finally(() => {
                setLoading(false)
                onClose()
            })
    }

    return (
        <div className={styles.ConfirmWrapper}>
            <div className={cn(styles.ConfirmContainer, { [styles.Glass]: glass }, resolvedClassName)} role="dialog" aria-modal="true">
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
        </div>
    )
}
