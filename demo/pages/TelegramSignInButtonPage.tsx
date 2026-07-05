import { useEffect, useState } from "react"
import { TelegramSignInButton } from "../../src/components/TelegramSignInButton"
import { useToaster } from "../../src/hooks/toaster/useToaster"
import { useDemoStore } from "../store/useDemoStore"

export function TelegramSignInButtonPage() {
    const [lang, setLang] = useState<"en" | "ru">("en")
    const [label, setLabel] = useState("")
    const [disabled, setDisabled] = useState(false)
    const [fullSize, setFullSize] = useState(false)
    const { bake } = useToaster()
    const setControls = useDemoStore((s) => s.setControls)

    useEffect(() => {
        setControls([
            { type: "toggleGroup", label: "lang", options: ["en", "ru"], value: lang, onChange: (v) => setLang(v as "en" | "ru") },
            { type: "input", label: "label", value: label, onChange: setLabel, placeholder: "overrides lang label" },
            { type: "toggle", label: "disabled", value: disabled, onChange: setDisabled },
            { type: "toggle", label: "fullSize", value: fullSize, onChange: setFullSize },
        ])
        return () => setControls([])
    }, [lang, label, disabled, fullSize, setControls])

    return (
        <TelegramSignInButton
            onClick={() => bake({ title: "Clicked", description: "TelegramSignInButton was clicked.", level: "Info" })}
            lang={lang}
            label={label || undefined}
            disabled={disabled}
            fullSize={fullSize}
        />
    )
}
