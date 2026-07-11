import cn from 'classnames'
import styles from './Button.module.css'
import { useComponentClassName } from '../../theme/useComponentClassName'

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost' | 'iconDanger' | 'unstyled'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant
}

export type ButtonProps = Props

const variantClass: Record<ButtonVariant, string> = {
    primary: styles.Primary,
    secondary: styles.Secondary,
    danger: styles.Danger,
    ghost: styles.Ghost,
    iconDanger: styles.IconDanger,
    unstyled: styles.Unstyled,
}

export function Button({ variant, className, children, ...rest }: Props) {
    const resolvedClassName = useComponentClassName('Button', className)
    return (
        <button
            type="button"
            {...rest}
            className={cn(styles.Btn, variant ? variantClass[variant] : undefined, resolvedClassName)}>
            {children}
        </button>
    )
}
