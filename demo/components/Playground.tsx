import { useCallback, useRef, useState } from "react"
import type { ControlDef } from "./ControlDef"
import { PreviewCard } from "./PreviewCard"
import { PropRow, Switch, ToggleGroup } from "./PropRow"

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

function renderControl(ctrl: ControlDef, i: number) {
    if (ctrl.type === "toggle") {
        return (
            <PropRow key={i} label={ctrl.label}>
                <Switch checked={ctrl.value} onChange={ctrl.onChange} />
            </PropRow>
        )
    }
    if (ctrl.type === "toggleGroup") {
        return (
            <PropRow key={i} label={ctrl.label}>
                <ToggleGroup options={ctrl.options} value={ctrl.value} onChange={ctrl.onChange} />
            </PropRow>
        )
    }
    if (ctrl.type === "input") {
        return (
            <PropRow key={i} label={ctrl.label}>
                <input
                    className="prop-input"
                    value={ctrl.value}
                    onChange={(e) => ctrl.onChange(e.target.value)}
                    placeholder={ctrl.placeholder}
                />
            </PropRow>
        )
    }
    if (ctrl.type === "color") {
        return (
            <PropRow key={i} label={ctrl.label}>
                <input
                    type="color"
                    className="prop-input"
                    value={ctrl.value}
                    onChange={(e) => ctrl.onChange(e.target.value)}
                    style={{ width: "3rem", height: "2rem", padding: "0.125rem", cursor: "pointer" }}
                />
                <input
                    type="text"
                    className="prop-input"
                    value={ctrl.value}
                    onChange={(e) => ctrl.onChange(e.target.value)}
                    style={{ width: "6rem" }}
                />
            </PropRow>
        )
    }
    if (ctrl.type === "select") {
        return (
            <PropRow key={i} label={ctrl.label}>
                <select
                    className="prop-select"
                    value={ctrl.value}
                    onChange={(e) => ctrl.onChange(e.target.value)}
                >
                    {ctrl.options.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                    ))}
                </select>
            </PropRow>
        )
    }
    if (ctrl.type === "display") {
        return (
            <PropRow key={i} label={ctrl.label}>
                <span style={{ fontSize: "0.75rem", color: "var(--chures-fg-muted)" }}>
                    {ctrl.value || "(none)"}
                </span>
            </PropRow>
        )
    }
    if (ctrl.type === "node") {
        return <div key={i}>{ctrl.node}</div>
    }
    return null
}

export function Playground({ children, controls, sideControls, heading = "Props", sideHeading = "Styles", defaultSideOpen = false }: Props) {
    const [height, setHeight] = useState(DEFAULT_HEIGHT)
    const [dragging, setDragging] = useState(false)
    const [sideOpen, setSideOpen] = useState(defaultSideOpen)
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

    const hasBottomControls = controls.length > 0

    return (
        <div className={`playground${dragging ? " playground--dragging" : ""}`}>
            <div className="playground-body">
                <div className="playground-preview">
                    {sideControls && (
                        <button
                            className={`side-toggle${sideOpen ? " side-toggle--active" : ""}`}
                            onClick={() => setSideOpen((v) => !v)}
                            aria-label="Toggle style panel"
                        >
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="4.5,1 1,1 1,11 4.5,11" />
                                <polyline points="7.5,1 11,1 11,11 7.5,11" />
                            </svg>
                        </button>
                    )}
                    <PreviewCard>{children}</PreviewCard>
                </div>
                {sideOpen && sideControls && (
                    <div className="playground-side">
                        <div className="controls-heading">{sideHeading}</div>
                        {sideControls.map((ctrl, i) => renderControl(ctrl, i))}
                    </div>
                )}
            </div>
            {hasBottomControls && (
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
                        <div className="controls-heading">{heading}</div>
                        {controls.map((ctrl, i) => renderControl(ctrl, i))}
                    </div>
                </div>
            )}
        </div>
    )
}
