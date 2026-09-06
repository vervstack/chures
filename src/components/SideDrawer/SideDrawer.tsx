import { ReactNode, useEffect, useLayoutEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import cn from 'classnames'
import styles from './SideDrawer.module.css'
import { useComponentClassName } from '../../theme/useComponentClassName'
import { useBackableOverlay } from '../../hooks/overlayBack/useBackableOverlay'

export type SideDrawerSide = 'top' | 'right' | 'bottom' | 'left'

interface Props {
    open: boolean
    onClose: () => void
    children: ReactNode
    // Which edge the panel slides in from. Defaults to 'right'. The panel always
    // spans the full length of the perpendicular axis -- left/right take the full
    // viewport height, top/bottom take the full viewport width.
    side?: SideDrawerSide
    // Backdrop blur radius in rem. 0 (default) renders a plain dimmed backdrop with
    // no backdrop-filter, for browsers/perf budgets that would rather skip it.
    backdropBlur?: number
    className?: string
}

export type SideDrawerProps = Props

const sideClass: Record<SideDrawerSide, string> = {
    top: styles.Top,
    right: styles.Right,
    bottom: styles.Bottom,
    left: styles.Left,
}

// Module-level lazy-created portal target, re-appended to document.body last
// whenever a drawer opens -- so it paints above any earlier-portaled overlay by
// DOM order alone, no z-index needed. Reference-counted across instances so two
// SideDrawers open at once (e.g. on two different parts of a page) don't tear the
// shared root down from under each other on unmount.
let sideDrawerRootElement: HTMLDivElement | null = null
let mountedInstanceCount = 0

function getSideDrawerRoot(): HTMLDivElement {
    if (!sideDrawerRootElement) {
        sideDrawerRootElement = document.createElement('div')
        sideDrawerRootElement.setAttribute('data-chures-side-drawer-root', '')
        document.body.appendChild(sideDrawerRootElement)
    }
    return sideDrawerRootElement
}

export function SideDrawer({ open, onClose, children, side = 'right', backdropBlur = 0, className }: Props) {
    const [animateOpen, setAnimateOpen] = useState(false)
    const resolvedClassName = useComponentClassName('SideDrawer', className)

    useBackableOverlay(open ? 1 : 0, onClose)

    // Moving the root and flipping the open class must land in separate paints.
    // Doing both in the same tick discards the browser's "before" style snapshot
    // for the panel, so the slide-in transition never runs -- it just snaps open.
    // Reparenting first, then flipping the class a frame later, gives the
    // transition a real "before" frame to animate from. Closing doesn't reparent,
    // so it can flip the class immediately.
    useLayoutEffect(() => {
        if (!open) {
            setAnimateOpen(false)
            return
        }

        document.body.appendChild(getSideDrawerRoot())
        const raf = requestAnimationFrame(() => setAnimateOpen(true))
        return () => cancelAnimationFrame(raf)
    }, [open])

    useEffect(() => {
        mountedInstanceCount += 1
        return () => {
            mountedInstanceCount -= 1
            if (mountedInstanceCount === 0 && sideDrawerRootElement) {
                sideDrawerRootElement.remove()
                sideDrawerRootElement = null
            }
        }
    }, [])

    const backdropStyle = backdropBlur > 0
        ? { backdropFilter: `blur(${backdropBlur}rem)`, WebkitBackdropFilter: `blur(${backdropBlur}rem)` }
        : undefined

    return createPortal(
        <>
            <div
                className={cn(styles.Backdrop, animateOpen && styles.BackdropOpen)}
                style={backdropStyle}
                onClick={onClose}
            />
            <div className={cn(styles.Panel, sideClass[side], animateOpen && styles.PanelOpen, resolvedClassName)}>
                {children}
            </div>
        </>,
        getSideDrawerRoot()
    )
}
