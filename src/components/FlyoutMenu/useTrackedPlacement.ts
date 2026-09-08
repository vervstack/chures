import {useLayoutEffect, useRef, useState} from "react"

// Keeps a placement value glued to a moving anchor. `compute` reads live geometry
// (getBoundingClientRect, scrollHeight, ...) and returns the placement, or null when
// it cannot be measured yet. It runs once synchronously on activation — so the first
// paint is already positioned — then re-runs every animation frame while active.
//
// The animation-frame loop is what makes this correct: an anchor moved by a
// transform-based ancestor animation (Framer Motion `layout`, a resizing split pane)
// is invisible to both ResizeObserver and scroll listeners, so a snapshot taken on
// open silently goes stale. `eq` gates the state commit, so a stationary menu drives
// zero re-renders even though the loop keeps ticking.
export function useTrackedPlacement<T>(
    active: boolean,
    compute: () => T | null,
    eq: (a: T, b: T) => boolean,
): T | null {
    const [placement, setPlacement] = useState<T | null>(null)

    // Read-latest refs so a fresh `compute`/`eq` closure every render doesn't restart
    // the loop — the effect depends only on `active`. This is React's useEvent shape.
    const computeRef = useRef(compute)
    const eqRef = useRef(eq)
    computeRef.current = compute
    eqRef.current = eq

    const committedRef = useRef<T | null>(null)

    useLayoutEffect(() => {
        if (!active) {
            committedRef.current = null
            setPlacement(null)
            return
        }

        let frame = 0
        function tick() {
            const next = computeRef.current()
            if (next !== null) {
                const prev = committedRef.current
                if (prev === null || !eqRef.current(prev, next)) {
                    committedRef.current = next
                    setPlacement(next)
                }
            }
            frame = requestAnimationFrame(tick)
        }

        tick()
        return () => {
            cancelAnimationFrame(frame)
            committedRef.current = null
            setPlacement(null)
        }
    }, [active])

    return placement
}
