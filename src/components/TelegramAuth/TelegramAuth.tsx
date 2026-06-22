import type {ReactNode} from "react"
import type {TelegramAuthData} from "../../types"
import {useTelegramLogin} from "../../hooks/useTelegramLogin"
import {TelegramSignInButton} from "../TelegramSignInButton"

export type TelegramAuthProps = {
    botId: string
    onSuccess: (data: TelegramAuthData) => void
    lang?: "en" | "ru"
    title?: string
    redirectUri?: string
    requestAccess?: string
    children?: (props: {login: () => void; isReady: boolean}) => ReactNode
    className?: string
}

export function TelegramAuth({
    botId,
    onSuccess,
    lang,
    title,
    redirectUri,
    requestAccess,
    children,
    className,
}: TelegramAuthProps) {
    const {login, isReady} = useTelegramLogin({botId, onSuccess, redirectUri, requestAccess})

    if (children) {
        return <>{children({login, isReady})}</>
    }

    return (
        <TelegramSignInButton
            onClick={login}
            disabled={!isReady}
            lang={lang}
            title={title}
            className={className}
        />
    )
}
