import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { KeyboardEvent, ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import cn from 'classnames'
import styles from './SegmentedControl.module.css'
import { useComponentClassName } from '../../theme/useComponentClassName'

export interface SegmentedControlOption {
    value: string
    content: ReactNode
    disabled?: boolean
}

interface Props {
    options: SegmentedControlOption[]
    value: string
    onChange: (value: string) => void
    disabled?: boolean
    className?: string
}

export type SegmentedControlProps = Props

interface Rect {
    left: number
    width: number
}

interface HighlightFrame {
    left: number[]
    width: number[]
    duration: number
}

const FLOW_DURATION = 0.35

export function SegmentedControl({ options, value, onChange, disabled, className }: Props) {
    const resolvedClassName = useComponentClassName('SegmentedControl', className)
    const isReducedMotion = useReducedMotion()
    const optionRefs = useRef(new Map<string, HTMLButtonElement>())
    const previousRect = useRef<Rect | null>(null)
    const previousValue = useRef(value)
    const [frame, setFrame] = useState<HighlightFrame | null>(null)

    const measure = useCallback((): Rect | null => {
        const element = optionRefs.current.get(value)
        if (!element) return null
        return { left: element.offsetLeft, width: element.offsetWidth }
    }, [value])

    const place = useCallback((isAnimated: boolean) => {
        const next = measure()
        if (!next) {
            previousRect.current = null
            setFrame(null)
            return
        }
        const previous = previousRect.current
        previousRect.current = next
        if (!isAnimated || !previous || isReducedMotion) {
            setFrame({ left: [next.left], width: [next.width], duration: 0 })
            return
        }
        const spanLeft = Math.min(previous.left, next.left)
        const spanRight = Math.max(previous.left + previous.width, next.left + next.width)
        setFrame({
            left: [previous.left, spanLeft, next.left],
            width: [previous.width, spanRight - spanLeft, next.width],
            duration: FLOW_DURATION,
        })
    }, [measure, isReducedMotion])

    useLayoutEffect(() => {
        const isValueChange = previousValue.current !== value
        previousValue.current = value
        place(isValueChange)
    }, [value, options, place])

    useEffect(() => {
        const observer = new ResizeObserver(() => place(false))
        optionRefs.current.forEach((element) => observer.observe(element))
        return () => observer.disconnect()
    }, [options, place])

    const enabledOptions = options.filter((option) => !option.disabled)
    const focusableValue = enabledOptions.some((option) => option.value === value)
        ? value
        : enabledOptions[0]?.value

    function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
        if (disabled) return
        const isForward = event.key === 'ArrowRight' || event.key === 'ArrowDown'
        const isBackward = event.key === 'ArrowLeft' || event.key === 'ArrowUp'
        if (!isForward && !isBackward) return
        event.preventDefault()
        const currentIndex = enabledOptions.findIndex((option) => option.value === value)
        const step = isForward ? 1 : -1
        const nextIndex = currentIndex === -1
            ? 0
            : (currentIndex + step + enabledOptions.length) % enabledOptions.length
        const next = enabledOptions[nextIndex]
        if (!next) return
        onChange(next.value)
        optionRefs.current.get(next.value)?.focus()
    }

    function handleSelect(option: SegmentedControlOption) {
        if (disabled || option.disabled || option.value === value) return
        onChange(option.value)
    }

    return (
        <div
            role="radiogroup"
            aria-disabled={disabled || undefined}
            className={cn(styles.SegmentedControlContainer, { [styles.Disabled]: disabled }, resolvedClassName)}
            onKeyDown={handleKeyDown}
        >
            {frame && (
                <motion.span
                    className={styles.Highlight}
                    aria-hidden="true"
                    initial={false}
                    animate={{ left: frame.left, width: frame.width }}
                    transition={{ duration: frame.duration, ease: 'easeInOut' }}
                />
            )}
            {options.map((option) => (
                <button
                    key={option.value}
                    ref={(element) => {
                        if (element) optionRefs.current.set(option.value, element)
                        else optionRefs.current.delete(option.value)
                    }}
                    type="button"
                    role="radio"
                    aria-checked={option.value === value}
                    tabIndex={option.value === focusableValue ? 0 : -1}
                    disabled={disabled || option.disabled}
                    className={cn(styles.Option, {
                        [styles.Selected]: option.value === value,
                        [styles.OptionDisabled]: option.disabled,
                    })}
                    onClick={() => handleSelect(option)}
                >
                    {option.content}
                </button>
            ))}
        </div>
    )
}
