import cn from 'classnames'
import styles from './InfoDialog.module.css'
import { useComponentClassName } from '../../theme/useComponentClassName'

interface Props {
    title: string
    message: string
    onClose: () => void
    className?: string
    // Frosted-glass look: translucent background + backdrop blur + a soft glow,
    // themeable via --chures-dialog-glass-* (see theme.css).
    glass?: boolean
}

export type InfoDialogProps = Props

export function InfoDialog({ title, message, onClose, className, glass = false }: Props) {
    const resolvedClassName = useComponentClassName('InfoDialog', className)

    return (
        <div className={cn(styles.InfoContainer, { [styles.Glass]: glass }, resolvedClassName)} role="dialog" aria-modal="true">
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
