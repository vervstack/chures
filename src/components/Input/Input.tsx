import { forwardRef, useState } from 'react'
import cn from 'classnames'
import styles from './Input.module.css'
import { useComponentClassName } from '../../theme/useComponentClassName'

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
    // Applied to the actual <input> element, not the outer wrapper div. Use this
    // for anything that must reach the rendered text/box itself (border, padding,
    // border-radius, font, color) — `className` only ever lands on the wrapper.
    inputClassName?: string
    // Rendered inside the input box, left of the text (e.g. a search icon).
    // Not combinable with `label` — floating labels assume no leading content.
    startIcon?: React.ReactNode
    // Rendered inside the input box, right of the text (e.g. a hint/tooltip
    // trigger icon). Unlike `startIcon`, this combines fine with `label` —
    // the floating label lives on the left, so there's no overlap.
    endIcon?: React.ReactNode
}

export type InputProps = Props

export const Input = forwardRef<HTMLInputElement, Props>(function Input(
    { value, setValue, label, isLoader, type = 'text', disabled, error, className, inputClassName, startIcon, endIcon, ...rest },
    ref
) {
    const [focused, setFocused] = useState(false)
    const lifted = focused || value.length > 0
    const resolvedClassName = useComponentClassName('Input', className)
    const { onFocus: consumerOnFocus, onBlur: consumerOnBlur, ...restProps } = rest

    if (isLoader) {
        return <div className={cn(styles.Skeleton, resolvedClassName)} aria-hidden="true" />
    }

    return (
        <div className={cn(styles.InputContainer, { [styles.hasError]: !!error, [styles.disabled]: disabled }, resolvedClassName)}>
            {startIcon && <span className={styles.StartIcon}>{startIcon}</span>}
            <input
                ref={ref}
                className={cn(styles.InputField, { [styles.hasStartIcon]: !!startIcon, [styles.hasEndIcon]: !!endIcon }, inputClassName)}
                type={type}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onFocus={(e) => {
                    setFocused(true)
                    consumerOnFocus?.(e)
                }}
                onBlur={(e) => {
                    setFocused(false)
                    consumerOnBlur?.(e)
                }}
                disabled={disabled}
                {...restProps}
            />
            {label && <label className={cn(styles.Label, { [styles.lifted]: lifted })}>{label}</label>}
            {endIcon && <span className={styles.EndIcon}>{endIcon}</span>}
            {error && <span className={styles.ErrorText}>{error}</span>}
        </div>
    )
})
