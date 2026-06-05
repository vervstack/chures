import {useEffect, useRef, useState} from "react"
import type {TelegramAuthData, TelegramLoginWindow} from "../types"

export type UseTelegramLoginOptions = {
    botId: string
    onSuccess: (data: TelegramAuthData) => void
    redirectUri?: string
    requestAccess?: string
}

export type UseTelegramLoginReturn = {
    login: () => void
    isReady: boolean
    isLoading: boolean
}

const TELEGRAM_SCRIPT_SRC = "https://oauth.telegram.org/js/telegram-login.js?3"

export function useTelegramLogin(options: UseTelegramLoginOptions): UseTelegramLoginReturn {
    const {botId, redirectUri, requestAccess = "write"} = options

    const onSuccessRef = useRef(options.onSuccess)
    onSuccessRef.current = options.onSuccess

    const authFiredRef = useRef(false)

    const [isReady, setIsReady] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(function () {
        if (!botId) return

        const resolvedRedirectUri = redirectUri ?? window.location.origin
        setIsLoading(true)
        setIsReady(false)

        const script = document.createElement("script")
        script.src = TELEGRAM_SCRIPT_SRC
        script.async = true

        script.onload = function () {
            const tg = (window as TelegramLoginWindow).Telegram
            if (tg) {
                tg.Login.init(
                    {client_id: botId, redirect_uri: resolvedRedirectUri},
                    function (data) {
                        if (authFiredRef.current) return
                        authFiredRef.current = true
                        onSuccessRef.current(data)
                    },
                )
                setIsReady(true)
            }
            setIsLoading(false)
        }

        script.onerror = function () {
            setIsLoading(false)
        }

        document.head.appendChild(script)

        return function () {
            if (document.head.contains(script)) document.head.removeChild(script)
            setIsReady(false)
            setIsLoading(false)
        }
    }, [botId, redirectUri])

    function login() {
        const tg = (window as TelegramLoginWindow).Telegram
        if (!isReady || !tg) return
        authFiredRef.current = false
        const resolvedRedirectUri = redirectUri ?? window.location.origin
        tg.Login.auth(
            {client_id: botId, redirect_uri: resolvedRedirectUri, request_access: requestAccess},
            function (data) {
                if (authFiredRef.current) return
                authFiredRef.current = true
                onSuccessRef.current(data)
            },
        )
    }

    return {login, isReady, isLoading}
}
