import { useState } from 'react'
import cn from 'classnames'
import styles from './Input.module.css'

interface Props {
    value: string
    setValue: (v: string) => void
    label: string
    isLoader?: boolean
    type?: 'text' | 'password' | 'email' | 'number'
    disabled?: boolean
    error?: string
    className?: string
}

export type InputProps = Props

export function Input({ value, setValue, label, isLoader, type = 'text', disabled, error, className }: Props) {
    const [focused, setFocused] = useState(false)
    const lifted = focused || value.length > 0

    if (isLoader) {
        return <div className={cn(styles.Skeleton, className)} aria-hidden="true" />
    }

    return (
        <div className={cn(styles.InputContainer, { [styles.hasError]: !!error, [styles.disabled]: disabled }, className)}>
            <input
                className={styles.InputField}
                type={type}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                disabled={disabled}
            />
            <label className={cn(styles.Label, { [styles.lifted]: lifted })}>{label}</label>
            {error && <span className={styles.ErrorText}>{error}</span>}
        </div>
    )
}
