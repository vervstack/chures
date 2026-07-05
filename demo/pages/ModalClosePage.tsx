import { useEffect, useState } from "react"
import { ModalClose } from "../../src/components/ModalClose"
import { useDemoStore } from "../store/useDemoStore"

export function ModalClosePage() {
    const [disabled, setDisabled] = useState(false)
    const [clicks, setClicks] = useState(0)
    const setControls = useDemoStore((s) => s.setControls)

    useEffect(() => {
        setControls([
            { type: "toggle", label: "disabled", value: disabled, onChange: setDisabled },
            { type: "display", label: "clicks", value: String(clicks) },
        ])
        return () => setControls([])
    }, [disabled, clicks, setControls])

    return (
        <ModalClose
            onClick={() => setClicks((c) => c + 1)}
            disabled={disabled}
            className="modal-close-demo-btn"
        />
    )
}
