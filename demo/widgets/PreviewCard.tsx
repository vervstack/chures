import { useCallback, useEffect, useRef, useState } from "react"
import { DragHandleIcon } from "../assets/icons/DragHandleIcon"

interface Props {
    children: React.ReactNode
    onRectChange?: (rect: DOMRect) => void
    shiftX?: number
}

export function PreviewCard({ children, onRectChange, shiftX = 0 }: Props) {
    const [pos, setPos] = useState({ x: 0, y: 0 })
    const [dragging, setDragging] = useState(false)
    const drag = useRef({ startX: 0, startY: 0, posX: 0, posY: 0 })
    const cardRef = useRef<HTMLDivElement>(null)

    const reportRect = useCallback(() => {
        if (cardRef.current) onRectChange?.(cardRef.current.getBoundingClientRect())
    }, [onRectChange])

    useEffect(() => {
        reportRect()
    }, [reportRect])

    // shiftX changes animate via CSS transition (see .preview-card), not a drag —
    // re-report the rect once that transition settles so it stays accurate.
    useEffect(() => {
        const t = setTimeout(reportRect, 340)
        return () => clearTimeout(t)
    }, [shiftX, reportRect])

    const onMouseDown = useCallback((e: React.MouseEvent) => {
        e.preventDefault()
        drag.current = { startX: e.clientX, startY: e.clientY, posX: pos.x, posY: pos.y }
        setDragging(true)
        document.body.style.cursor = "grabbing"
        document.body.style.userSelect = "none"

        const onMove = (ev: MouseEvent) => {
            setPos({
                x: drag.current.posX + (ev.clientX - drag.current.startX),
                y: drag.current.posY + (ev.clientY - drag.current.startY),
            })
        }
        const onUp = () => {
            setDragging(false)
            document.body.style.cursor = ""
            document.body.style.userSelect = ""
            window.removeEventListener("mousemove", onMove)
            window.removeEventListener("mouseup", onUp)
            reportRect()
        }
        window.addEventListener("mousemove", onMove)
        window.addEventListener("mouseup", onUp)
    }, [pos.x, pos.y, reportRect])

    return (
        <div
            ref={cardRef}
            className={`preview-card${dragging ? " preview-card--dragging" : ""}`}
            style={{ transform: `translate(calc(-50% + ${pos.x + shiftX}px), calc(-50% + ${pos.y}px))` }}
        >
            <div className="preview-card-handle" onMouseDown={onMouseDown}>
                <div className="resize-handle-btn">
                    <DragHandleIcon />
                </div>
            </div>
            <div className="preview-card-content">
                {children}
            </div>
        </div>
    )
}
