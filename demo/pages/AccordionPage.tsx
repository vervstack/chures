import { useEffect, useState } from "react"
import { Accordion } from "../../src/components/Accordion"
import { useDemoStore } from "../store/useDemoStore"

export function AccordionPage() {
    const [isOpen, setIsOpen] = useState(false)
    const [showMeta, setShowMeta] = useState(true)
    const setControls = useDemoStore((s) => s.setControls)

    useEffect(() => {
        setControls([
            { type: "toggleGroup", label: "isOpen", options: ["false", "true"], value: String(isOpen), onChange: (v) => setIsOpen(v === "true") },
            { type: "toggleGroup", label: "meta", options: ["none", "show"], value: showMeta ? "show" : "none", onChange: (v) => setShowMeta(v === "show") },
        ])
        return () => setControls([])
    }, [isOpen, showMeta, setControls])

    return (
        <Accordion
            title="Models"
            meta={showMeta ? "2 of 5 selected" : undefined}
            isOpen={isOpen}
            onToggle={setIsOpen}>
            <p>Panel content folds in and out.</p>
            <p>Closed content leaves the focus order.</p>
        </Accordion>
    )
}
