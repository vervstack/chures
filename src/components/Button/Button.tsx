import cn from 'classnames'
import styles from './Button.module.css'
import { useComponentClassName } from '../../theme/useComponentClassName'

export type ButtonVariant = 'default' | 'primary' | 'secondary' | 'danger' | 'ghost' | 'iconDanger' | 'unstyled'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant
}

export type ButtonProps = Props

const variantClass: Partial<Record<ButtonVariant, string>> = {
    primary: styles.Primary,
    secondary: styles.Secondary,
    danger: styles.Danger,
    ghost: styles.Ghost,
    iconDanger: styles.IconDanger,
}

export function Button({ variant = 'default', className, children, ...rest }: Props) {
    const resolvedClassName = useComponentClassName('Button', className)
    const isUnstyled = variant === 'unstyled'
    return (
        <button
            type="button"
            {...rest}
            className={cn(!isUnstyled && styles.Btn, !isUnstyled && variantClass[variant], resolvedClassName)}>
            {children}
        </button>
    )
}
