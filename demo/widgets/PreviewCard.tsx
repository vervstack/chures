import { useCallback, useRef, useState } from "react"
import { DragHandleIcon } from "../assets/icons/DragHandleIcon"

interface Props {
    children: React.ReactNode
}

export function PreviewCard({ children }: Props) {
    const [pos, setPos] = useState({ x: 0, y: 0 })
    const [dragging, setDragging] = useState(false)
    const drag = useRef({ startX: 0, startY: 0, posX: 0, posY: 0 })

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
        }
        window.addEventListener("mousemove", onMove)
        window.addEventListener("mouseup", onUp)
    }, [pos.x, pos.y])

    return (
        <div
            className={`preview-card${dragging ? " preview-card--dragging" : ""}`}
            style={{ transform: `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px))` }}
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
