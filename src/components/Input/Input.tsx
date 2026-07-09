import { forwardRef, useState } from 'react'
import cn from 'classnames'
import styles from './Input.module.css'

type NativeInputProps = Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'value' | 'onChange' | 'type' | 'className' | 'disabled'
>

interface Props extends NativeInputProps {
    value: string
    setValue: (v: string) => void
    // Omit label for a plain input (e.g. use `placeholder` instead) - the
    // floating label only renders when a label is given.
    label?: string
    isLoader?: boolean
    type?: 'text' | 'password' | 'email' | 'number'
    disabled?: boolean
    error?: string
    className?: string
}

export type InputProps = Props

export const Input = forwardRef<HTMLInputElement, Props>(function Input(
    { value, setValue, label, isLoader, type = 'text', disabled, error, className, ...rest },
    ref
) {
    const [focused, setFocused] = useState(false)
    const lifted = focused || value.length > 0

    if (isLoader) {
        return <div className={cn(styles.Skeleton, className)} aria-hidden="true" />
    }

    return (
        <div className={cn(styles.InputContainer, { [styles.hasError]: !!error, [styles.disabled]: disabled }, className)}>
            <input
                ref={ref}
                className={styles.InputField}
                type={type}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                disabled={disabled}
                {...rest}
            />
            {label && <label className={cn(styles.Label, { [styles.lifted]: lifted })}>{label}</label>}
            {error && <span className={styles.ErrorText}>{error}</span>}
        </div>
    )
})
