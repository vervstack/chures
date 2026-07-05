import { useEffect, useState } from "react"
import buttonStyles from "../../src/components/Button/Button.module.css"
import { ModalActions } from "../../src/components/ModalActions"
import { useDemoStore } from "../store/useDemoStore"

export function ModalActionsPage() {
    const [count, setCount] = useState<"1" | "2" | "3">("2")
    const [lastDisabled, setLastDisabled] = useState(false)
    const [lastClicked, setLastClicked] = useState("(none)")
    const setControls = useDemoStore((s) => s.setControls)

    useEffect(() => {
        setControls([
            { type: "toggleGroup", label: "buttons", options: ["1", "2", "3"], value: count, onChange: (v) => setCount(v as "1" | "2" | "3") },
            { type: "toggle", label: "last button disabled", value: lastDisabled, onChange: setLastDisabled },
            { type: "display", label: "last clicked", value: lastClicked },
        ])
        return () => setControls([])
    }, [count, lastDisabled, lastClicked, setControls])

    const allButtons = [
        { label: "Cancel", className: `${buttonStyles.Btn} ${buttonStyles.Secondary}` },
        { label: "Save", className: `${buttonStyles.Btn} ${buttonStyles.Primary}` },
        { label: "Delete", className: `${buttonStyles.Btn} ${buttonStyles.Danger}`, disabled: lastDisabled },
    ]
    const buttons = allButtons.slice(0, Number(count)).map((btn) => ({
        ...btn,
        onClick: () => setLastClicked(btn.label),
    }))

    return <ModalActions buttons={buttons} containerClassName="modal-actions-demo-row" />
}
