import { useEffect, useState } from "react"
import { Button } from "../../src/components/Button"
import type { ButtonVariant } from "../../src/components/Button"
import { useToaster } from "../../src/hooks/toaster/useToaster"
import { useDemoStore } from "../store/useDemoStore"

const VARIANTS: (ButtonVariant | "none")[] = ["none", "default", "primary", "secondary", "danger", "ghost", "iconDanger", "unstyled"]

export function ButtonPage() {
    const [variant, setVariant] = useState<ButtonVariant | "none">("primary")
    const [label, setLabel] = useState("Click me")
    const [disabled, setDisabled] = useState(false)
    const { bake } = useToaster()
    const setControls = useDemoStore((s) => s.setControls)

    useEffect(() => {
        setControls([
            { type: "select", label: "variant", options: VARIANTS, value: variant, onChange: (v) => setVariant(v as ButtonVariant | "none") },
            { type: "input", label: "label", value: label, onChange: setLabel },
            { type: "toggle", label: "disabled", value: disabled, onChange: setDisabled },
        ])
        return () => setControls([])
    }, [variant, label, disabled, setControls])

    return (
        <Button
            variant={variant === "none" ? undefined : variant}
            disabled={disabled}
            onClick={() => bake({ title: "Clicked", description: `Button (${variant}) was clicked.`, level: "Info" })}
        >
            {label}
        </Button>
    )
}
