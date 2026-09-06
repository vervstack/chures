import { useEffect, useRef } from 'react'
import { popOverlayBack, pushOverlayBack } from './overlayBackStack'

// Thin React binding over overlayBackStack -- registers `depth` overlay levels
// (0 = closed, 1 = one dialog/drawer open, 2 = a second one stacked on top, ...)
// with the shared global back-gesture stack, so a mobile edge-swipe or the
// hardware back button closes exactly the topmost open overlay on the page,
// innermost first, instead of every overlay reacting to the same gesture. Most
// components only ever have depth 0/1 -- pass `open ? 1 : 0`. A component that
// keeps its own internal back/forward stack of swapped contents can pass a larger
// depth and step it down one level per pop instead.
export function useBackableOverlay(depth: number, onPopLevel: () => void) {
    const handlesRef = useRef<number[]>([])
    const onPopLevelRef = useRef(onPopLevel)
    onPopLevelRef.current = onPopLevel

    useEffect(() => {
        const handles = handlesRef.current

        while (handles.length < depth) {
            handles.push(pushOverlayBack(() => onPopLevelRef.current()))
        }
        while (handles.length > depth) {
            const handle = handles.pop()
            if (handle !== undefined) popOverlayBack(handle)
        }
    }, [depth])

    useEffect(() => {
        return () => {
            const handles = handlesRef.current
            while (handles.length > 0) {
                const handle = handles.pop()
                if (handle !== undefined) popOverlayBack(handle)
            }
        }
    }, [])
}
