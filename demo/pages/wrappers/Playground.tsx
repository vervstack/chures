import {useCallback, useRef, useState} from "react"
import {DragHandleIcon} from "../../assets/icons/DragHandleIcon"
import {SidePanelIcon} from "../../assets/icons/SidePanelIcon"
import type {ControlDef} from "../../widgets/ControlDef"
import {ControlItem} from "../../widgets/ControlItem"
import {IconButton} from "../../widgets/IconButton"
import {PreviewCard} from "../../widgets/PreviewCard"

interface Props {
    children: React.ReactNode
    controls: ControlDef[]
    sideControls?: ControlDef[]
    heading?: React.ReactNode
    sideHeading?: React.ReactNode
    defaultSideOpen?: boolean
}

const DEFAULT_HEIGHT = 260
const MIN_HEIGHT = 80
const MAX_HEIGHT = 680

export function Playground({
                               children,
                               controls,
                               sideControls,
                               heading = "Props",
                               sideHeading = "Styles",
                               defaultSideOpen = false
                           }: Props) {
    const [height, setHeight] = useState(DEFAULT_HEIGHT)
    const [dragging, setDragging] = useState(false)
    const [sideOpen, setSideOpen] = useState(defaultSideOpen)
    const drag = useRef({y: 0, h: 0})

    const onMouseDown = useCallback((e: React.MouseEvent) => {
        e.preventDefault()
        drag.current = {y: e.clientY, h: height}
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

    const hasBottomControls = controls.length > 0

    return (
        <div className={`playground${dragging ? " playground--dragging" : ""}`}>
            <div className="playground-body">
                <div className="playground-preview">
                    {sideControls && (
                        <IconButton
                            className={`side-toggle${sideOpen ? " side-toggle--active" : ""}`}
                            onClick={() => setSideOpen((v) => !v)}
                            aria-label="Toggle style panel"
                        >
                            <SidePanelIcon/>
                        </IconButton>
                    )}
                    <PreviewCard>{children}</PreviewCard>
                </div>
                {sideOpen && sideControls && (
                    <div className="playground-side">
                        <div className="controls-heading">{sideHeading}</div>
                        {sideControls.map((ctrl, i) =>
                            <ControlItem key={i} ctrl={ctrl}/>)}
                    </div>
                )}
            </div>
            {hasBottomControls && (
                <div className="playground-controls" style={{height}}>
                    <div className="resize-handle" onMouseDown={onMouseDown}>
                        <IconButton className="resize-handle-btn" tabIndex={-1} aria-hidden>
                            <DragHandleIcon/>
                        </IconButton>
                    </div>
                    <div className="controls-inner">
                        <div className="controls-heading">{heading}</div>
                        {controls.map((ctrl, i) => <ControlItem key={i} ctrl={ctrl}/>)}
                    </div>
                </div>
            )}
        </div>
    )
}
