import { useCallback, useRef, useState } from "react"

interface Props {
    preview: React.ReactNode
    controls: React.ReactNode
}

const DEFAULT_HEIGHT = 260
const MIN_HEIGHT = 80
const MAX_HEIGHT = 680

export function Playground({ preview, controls }: Props) {
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

    return (
        <div className={`playground${dragging ? " playground--dragging" : ""}`}>
            <div className="playground-preview">{preview}</div>
            <div className="playground-controls" style={{ height }}>
                <div className="resize-handle" onMouseDown={onMouseDown}>
                    <button className="resize-handle-btn" tabIndex={-1} aria-hidden>
                        <svg width="16" height="10" viewBox="0 0 16 10" fill="currentColor">
                            <circle cx="2"  cy="2" r="1.5" />
                            <circle cx="8"  cy="2" r="1.5" />
                            <circle cx="14" cy="2" r="1.5" />
                            <circle cx="2"  cy="8" r="1.5" />
                            <circle cx="8"  cy="8" r="1.5" />
                            <circle cx="14" cy="8" r="1.5" />
                        </svg>
                    </button>
                </div>
                <div className="controls-inner">
                    <div className="controls-heading">Props</div>
                    {controls}
                </div>
            </div>
        </div>
    )
}
