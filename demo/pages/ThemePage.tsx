import { TelegramSignInButton } from "../../src/components/TelegramSignInButton"
import { useToaster } from "../../src/hooks/toaster/useToaster"

export function ThemePage() {
    const { bake } = useToaster()
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
            <TelegramSignInButton onClick={() => {}} />
            <div style={{ display: "flex", gap: "0.5rem" }}>
                <button className="fire-btn" onClick={() => bake({ title: "Info toast", description: "Info level", level: "Info" })}>Info</button>
                <button className="fire-btn" onClick={() => bake({ title: "Warning toast", description: "Warn level", level: "Warn" })}>Warn</button>
                <button className="fire-btn" onClick={() => bake({ title: "Error toast", description: "Error level", level: "Error" })}>Error</button>
            </div>
        </div>
    )
}
