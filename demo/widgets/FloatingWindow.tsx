import { useCallback, useRef, useState } from "react"
import cls from "./FloatingWindow.module.css"

interface Props {
    title: string
    onClose: () => void
    children: React.ReactNode
    defaultPosition?: { x: number; y: number }
    defaultSize?: { width: number; height: number }
}

export function FloatingWindow({
    title,
    onClose,
    children,
    defaultPosition = { x: 120, y: 96 },
    defaultSize = { width: 460, height: 380 },
}: Props) {
    const [pos, setPos] = useState(defaultPosition)
    const [size, setSize] = useState(defaultSize)
    const drag = useRef({ startX: 0, startY: 0, posX: 0, posY: 0 })
    const resize = useRef({ startX: 0, startY: 0, width: 0, height: 0 })

    const onDragStart = useCallback((e: React.MouseEvent) => {
        e.preventDefault()
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
        <div className={cls.FloatingWindow} style={{ left: pos.x, top: pos.y, width: size.width, height: size.height }}>
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
