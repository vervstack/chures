import { useEffect, useState } from "react"
import { Button } from "../../src/components/Button"
import { ModalClose } from "../../src/components/ModalClose"
import { SideDrawer, type SideDrawerSide } from "../../src/components/SideDrawer"
import { useDemoStore } from "../store/useDemoStore"

const SIDES: SideDrawerSide[] = ["top", "right", "bottom", "left"]

export function SideDrawerPage() {
    const [isOpen, setIsOpen] = useState(false)
    const [side, setSide] = useState<SideDrawerSide>("right")
    const [backdropBlur, setBackdropBlur] = useState(0)
    const setControls = useDemoStore((s) => s.setControls)

    useEffect(() => {
        setControls([
            { type: "toggleGroup", label: "side", options: SIDES, value: side, onChange: (v) => setSide(v as SideDrawerSide) },
            {
                type: "toggleGroup",
                label: "backdropBlur (rem)",
                options: ["0", "0.5", "1", "2"],
                value: String(backdropBlur),
                onChange: (v) => setBackdropBlur(Number(v)),
            },
        ])
        return () => setControls([])
    }, [side, backdropBlur, setControls])

    return (
        <>
            <Button onClick={() => setIsOpen(true)}>Open SideDrawer</Button>
            <SideDrawer open={isOpen} onClose={() => setIsOpen(false)} side={side} backdropBlur={backdropBlur}>
                <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: "1.25rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <strong style={{ color: "var(--chures-fg)" }}>SideDrawer</strong>
                        <ModalClose onClick={() => setIsOpen(false)} />
                    </div>
                    <p style={{ color: "var(--chures-fg-muted)", marginTop: "0.75rem" }}>
                        Slides in from the {side} edge. Swipe-from-edge / hardware back closes it via
                        useBackableOverlay instead of navigating the page away.
                    </p>
                </div>
            </SideDrawer>
        </>
    )
}
