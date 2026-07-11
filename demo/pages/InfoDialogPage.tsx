import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { Button } from "../../src/components/Button"
import { InfoDialog } from "../../src/components/InfoDialog"
import { useDemoStore } from "../store/useDemoStore"

export function InfoDialogPage() {
    const [isOpen, setIsOpen] = useState(false)
    const [title, setTitle] = useState("Update available")
    const [message, setMessage] = useState("A new version of the app is ready to install.")
    const [glass, setGlass] = useState(false)
    const setControls = useDemoStore((s) => s.setControls)

    useEffect(() => {
        setControls([
            { type: "input", label: "title", value: title, onChange: setTitle },
            { type: "input", label: "message", value: message, onChange: setMessage },
            { type: "toggle", label: "glass", value: glass, onChange: setGlass },
        ])
        return () => setControls([])
    }, [title, message, glass, setControls])

    return (
        <>
            <Button
                onClick={() => setIsOpen(true)}>Open InfoDialog</Button>
            {isOpen && createPortal(
                <div className="dialog-backdrop">
                    <InfoDialog title={title} message={message} glass={glass} onClose={() => setIsOpen(false)} />
                </div>,
                document.body
            )}
        </>
    )
}
