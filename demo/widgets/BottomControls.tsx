import { useCallback, useRef, useState } from "react"
import { DragHandleIcon } from "../assets/icons/DragHandleIcon"
import { IconButton } from "./IconButton"
import { ControlItem } from "./ControlItem"
import { useDemoStore } from "../store/useDemoStore"

const DEFAULT_HEIGHT = 260
const MIN_HEIGHT = 80
const MAX_HEIGHT = 680

export function BottomControls() {
    const controls = useDemoStore((s) => s.controls)
    const [height, setHeight] = useState(DEFAULT_HEIGHT)
    const [dragging, setDragging] = useState(false)
    const drag = useRef({ y: 0, h: 0 })

    const onMouseDown = useCallback((e: React.MouseEvent) => {
        e.preventDefault()
        drag.current = { y: e.clientY, h: height }
        setDragging(true)
        document.body.style.cursor = "ns-resize"
        document.body.style.userSelect = "none"

        const onMove = (ev: MouseEvent) => {
            const delta = drag.current.y - ev.clientY
            setHeight(Math.min(MAX_HEIGHT, Math.max(MIN_HEIGHT, drag.current.h + delta)))
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
    }, [height])

    if (controls.length === 0) return null

    return (
        <div className={`playground-controls${dragging ? " playground--dragging" : ""}`} style={{ height }}>
            <div className="resize-handle" onMouseDown={onMouseDown}>
                <IconButton className="resize-handle-btn" tabIndex={-1} aria-hidden>
                    <DragHandleIcon />
                </IconButton>
            </div>
            <div className="controls-inner">
                <div className="controls-heading">Props</div>
                {controls.map((ctrl, i) => <ControlItem key={i} ctrl={ctrl} />)}
            </div>
        </div>
    )
}
