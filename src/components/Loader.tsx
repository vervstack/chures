import React from 'react'
import cn from 'classnames'
import styles from './Loader.module.css'

interface Props {
    variant?: 'arcs' | 'ripple' | 'dots' | 'wave'
    size?: 'sm' | 'md' | 'lg'
    color?: string
    className?: string
}

export type LoaderProps = Props

function renderInner(variant: NonNullable<Props['variant']>, s: Record<string, string>) {
    switch (variant) {
        case 'ripple':
            return (
                <>
                    <div className={s.Ring1} />
                    <div className={s.Ring2} />
                    <div className={s.Ring3} />
                </>
            )
        case 'dots':
            return (
                <>
                    <div className={s.Dot1} />
                    <div className={s.Dot2} />
                    <div className={s.Dot3} />
                </>
            )
        case 'wave':
            return (
                <>
                    <div className={s.Wave1} />
                    <div className={s.Wave2} />
                    <div className={s.Wave3} />
                    <div className={s.Wave4} />
                    <div className={s.Wave5} />
                </>
            )
        default:
            return (
                <>
                    <div className={s.Arc1} />
                    <div className={s.Arc2} />
                    <div className={s.Arc3} />
                </>
            )
    }
}

export function Loader({ variant = 'arcs', size = 'md', color, className }: Props) {
    return (
        <div
            className={cn(styles.LoaderContainer, styles[size], styles[variant], className)}
            role="status"
            aria-label="Loading"
            style={color ? { '--chures-accent': color } as React.CSSProperties : undefined}
        >
            {renderInner(variant, styles)}
        </div>
    )
}
