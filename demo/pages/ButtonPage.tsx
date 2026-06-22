import { useState } from "react"
import { TelegramSignInButton } from "../../src/components/TelegramSignInButton"
import { useToaster } from "../../src/hooks/toaster/useToaster"
import { Playground } from "../components/Playground"

export function ButtonPage() {
    const [lang, setLang] = useState<"en" | "ru">("en")
    const [label, setLabel] = useState("")
    const [disabled, setDisabled] = useState(false)
    const [fullSize, setFullSize] = useState(false)
    const { bake } = useToaster()

    return (
        <Playground controls={[
            { type: "toggleGroup", label: "lang", options: ["en", "ru"], value: lang, onChange: (v) => setLang(v as "en" | "ru") },
            { type: "input", label: "label", value: label, onChange: setLabel, placeholder: "overrides lang label" },
            { type: "toggle", label: "disabled", value: disabled, onChange: setDisabled },
            { type: "toggle", label: "fullSize", value: fullSize, onChange: setFullSize },
        ]}>
            <TelegramSignInButton
                onClick={() => bake({ title: "Clicked", description: "TelegramSignInButton was clicked.", level: "Info" })}
                lang={lang}
                label={label || undefined}
                disabled={disabled}
                fullSize={fullSize}
            />
        </Playground>
    )
}
