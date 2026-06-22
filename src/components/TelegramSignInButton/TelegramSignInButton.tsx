import {useEffect} from "react"
import s from "./TelegramSignInButton.module.css"

const LABELS: Record<"en" | "ru", string> = {
    en: "Continue with Telegram",
    ru: "Войти через Telegram",
}

export interface TelegramSignInButtonProps {
    onClick: () => void
    disabled?: boolean
    lang?: "en" | "ru"
    title?: string
    label?: string
    fullSize?: boolean
    className?: string
}

function TelegramIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="currentColor"
            aria-hidden="true"
            className={s.Icon}
        >
            <path d="M22 3.5L2.5 11l5 1.7L18 6 9.7 14l-.4 5.5 3.4-3.2 5.5 4c.9.5 1.5.2 1.7-.8L22 4.3c.2-.7-.2-1.1-.9-.8z" />
        </svg>
    )
}

export function TelegramSignInButton({
    onClick,
    disabled,
    lang = "en",
    title,
    label,
    fullSize,
    className,
}: TelegramSignInButtonProps) {
    useEffect(function () {
        const id = "comfortaa-font"
        if (document.getElementById(id)) return
        const link = document.createElement("link")
        link.id = id
        link.rel = "stylesheet"
        link.href =
            "https://fonts.googleapis.com/css2?family=Comfortaa:wght@600&display=swap"
        document.head.appendChild(link)
    }, [])

    const text = label ?? title ?? LABELS[lang]
    const cls = [s.TelegramSignInButtonContainer, fullSize && s.FullSize, className].filter(Boolean).join(" ")

    return (
        <button type="button" className={cls} onClick={onClick} disabled={disabled}>
            <TelegramIcon />
            {text}
        </button>
    )
}
