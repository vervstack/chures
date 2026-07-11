import { useCallback, useEffect, useRef, useState } from "react"
import cls from "./FloatingWindow.module.css"
import { placeToRightOf, rectsOverlap, type Rect } from "./windowPlacement"

const GAP = 24
const REPOSITION_MS = 330

interface Props {
    title: string
    onClose: () => void
    children: React.ReactNode
    avoidRect?: Rect | null
    containerRef?: React.RefObject<HTMLDivElement | null>
    defaultPosition?: { x: number; y: number }
    defaultSize?: { width: number; height: number }
}

function resolveContainer(containerRef: React.RefObject<HTMLDivElement | null> | undefined, fallback: { width: number; height: number }) {
    return containerRef?.current?.getBoundingClientRect() ?? fallback
}

function restingPosition(
    avoidRect: Rect | null,
    size: { width: number; height: number },
    container: { width: number; height: number },
    defaultPosition: { x: number; y: number }
) {
    if (!avoidRect) return defaultPosition
    return placeToRightOf(avoidRect, size, container, GAP)
}

export function FloatingWindow({
    title,
    onClose,
    children,
    avoidRect = null,
    containerRef,
    defaultPosition = { x: 120, y: 96 },
    defaultSize = { width: 460, height: 380 },
}: Props) {
    const [size, setSize] = useState(defaultSize)
    const [pos, setPos] = useState(() => {
        // Start just past the right edge of the container so the window slides into
        // view on open (see the mount effect below), instead of popping in already in place.
        const container = resolveContainer(containerRef, {
            width: (avoidRect?.x ?? 0) + (avoidRect?.width ?? 0) + defaultSize.width + GAP,
            height: (avoidRect?.y ?? 0) + (avoidRect?.height ?? 0) + defaultSize.height + GAP,
        })
        const rest = restingPosition(avoidRect, defaultSize, container, defaultPosition)
        return { x: container.width, y: rest.y }
    })
    const [isAnimating, setIsAnimating] = useState(false)
    const drag = useRef({ startX: 0, startY: 0, posX: 0, posY: 0 })
    const resize = useRef({ startX: 0, startY: 0, width: 0, height: 0 })
    const posRef = useRef(pos)
    posRef.current = pos
    const sizeRef = useRef(size)
    sizeRef.current = size
    const animTimeout = useRef<ReturnType<typeof setTimeout>>()

    const animateTo = useCallback((next: { x: number; y: number }) => {
        clearTimeout(animTimeout.current)
        setIsAnimating(true)
        setPos(next)
        animTimeout.current = setTimeout(() => setIsAnimating(false), REPOSITION_MS)
    }, [])

    // Slide from the entry position into its resting spot once, on open.
    useEffect(() => {
        const container = resolveContainer(containerRef, { width: posRef.current.x, height: posRef.current.y + sizeRef.current.height })
        animateTo(restingPosition(avoidRect, sizeRef.current, container, defaultPosition))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Reposition later if the preview card moves under the window while it's open.
    // Keyed only on `avoidRect` (via latest-value refs for pos/size) so it doesn't
    // also re-run on every drag/resize mousemove tick.
    useEffect(() => {
        if (!avoidRect) return
        const current: Rect = { x: posRef.current.x, y: posRef.current.y, width: sizeRef.current.width, height: sizeRef.current.height }
        if (!rectsOverlap(current, avoidRect)) return
        const container = resolveContainer(containerRef, { width: current.x + current.width, height: current.y + current.height })
        const next = placeToRightOf(avoidRect, sizeRef.current, container, GAP)
        if (next.x === posRef.current.x && next.y === posRef.current.y) return
        animateTo(next)
    }, [avoidRect, containerRef, animateTo])

    useEffect(() => () => clearTimeout(animTimeout.current), [])

    const onDragStart = useCallback((e: React.MouseEvent) => {
        e.preventDefault()
        clearTimeout(animTimeout.current)
        setIsAnimating(false)
        drag.current = { startX: e.clientX, startY: e.clientY, posX: pos.x, posY: pos.y }
        document.body.style.userSelect = "none"

        const onMove = (ev: MouseEvent) => {
            setPos({
                x: drag.current.posX + (ev.clientX - drag.current.startX),
                y: drag.current.posY + (ev.clientY - drag.current.startY),
            })
        }
        const onUp = () => {
            document.body.style.userSelect = ""
            window.removeEventListener("mousemove", onMove)
            window.removeEventListener("mouseup", onUp)
        }
        window.addEventListener("mousemove", onMove)
        window.addEventListener("mouseup", onUp)
    }, [pos.x, pos.y])

    const onResizeStart = useCallback((e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        resize.current = { startX: e.clientX, startY: e.clientY, width: size.width, height: size.height }
        document.body.style.userSelect = "none"

        const onMove = (ev: MouseEvent) => {
            setSize({
                width: Math.max(280, resize.current.width + (ev.clientX - resize.current.startX)),
                height: Math.max(180, resize.current.height + (ev.clientY - resize.current.startY)),
            })
        }
        const onUp = () => {
            document.body.style.userSelect = ""
            window.removeEventListener("mousemove", onMove)
            window.removeEventListener("mouseup", onUp)
        }
        window.addEventListener("mousemove", onMove)
        window.addEventListener("mouseup", onUp)
    }, [size.width, size.height])

    return (
        <div
            className={isAnimating ? `${cls.FloatingWindow} ${cls.Animating}` : cls.FloatingWindow}
            style={{ left: pos.x, top: pos.y, width: size.width, height: size.height }}
        >
            <div className={cls.TitleBar} onMouseDown={onDragStart}>
                <span className={cls.Title}>{title}</span>
                <button className={cls.CloseButton} onClick={onClose} aria-label="Close" type="button">
                    &times;
                </button>
            </div>
            <div className={cls.Body}>{children}</div>
            <div className={cls.ResizeHandle} onMouseDown={onResizeStart} />
        </div>
    )
}
