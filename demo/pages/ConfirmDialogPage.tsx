import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { Button } from "../../src/components/Button"
import { ConfirmDialog } from "../../src/components/ConfirmDialog"
import { useToaster } from "../../src/hooks/toaster/useToaster"
import { useDemoStore } from "../store/useDemoStore"

export function ConfirmDialogPage() {
    const [isOpen, setIsOpen] = useState(false)
    const [title, setTitle] = useState("Delete item?")
    const [message, setMessage] = useState("This action cannot be undone.")
    const [confirmLabel, setConfirmLabel] = useState("")
    const [cancelLabel, setCancelLabel] = useState("")
    const [danger, setDanger] = useState(true)
    const [simulateAsync, setSimulateAsync] = useState(true)
    const [glass, setGlass] = useState(false)
    const { bake } = useToaster()
    const setControls = useDemoStore((s) => s.setControls)

    useEffect(() => {
        setControls([
            { type: "input", label: "title", value: title, onChange: setTitle },
            { type: "input", label: "message", value: message, onChange: setMessage },
            { type: "input", label: "confirmLabel", value: confirmLabel, onChange: setConfirmLabel, placeholder: "(default) Confirm" },
            { type: "input", label: "cancelLabel", value: cancelLabel, onChange: setCancelLabel, placeholder: "(default) Cancel" },
            { type: "toggle", label: "danger", value: danger, onChange: setDanger },
            { type: "toggle", label: "simulate async onConfirm", value: simulateAsync, onChange: setSimulateAsync },
            { type: "toggle", label: "glass", value: glass, onChange: setGlass },
        ])
        return () => setControls([])
    }, [title, message, confirmLabel, cancelLabel, danger, simulateAsync, glass, setControls])

    function handleConfirm() {
        if (!simulateAsync) {
            bake({ title: "Confirmed", description: message, level: "Info" })
            return
        }
        return new Promise<void>((resolve) => {
            setTimeout(() => {
                bake({ title: "Confirmed", description: message, level: "Info" })
                resolve()
            }, 800)
        })
    }

    return (
        <>
            <Button onClick={() => setIsOpen(true)}>Open ConfirmDialog</Button>
            {isOpen && createPortal(
                <div className="dialog-backdrop">
                    <ConfirmDialog
                        title={title}
                        message={message}
                        confirmLabel={confirmLabel || undefined}
                        cancelLabel={cancelLabel || undefined}
                        danger={danger}
                        glass={glass}
                        onConfirm={handleConfirm}
                        onClose={() => setIsOpen(false)}
                    />
                </div>,
                document.body
            )}
        </>
    )
}
