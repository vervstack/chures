import { useCallback, useEffect, useRef, useState } from "react"
import Toaster from "../src/components/notifications/Toaster"
import { Sidebar } from "./components/Sidebar"
import { BottomControls } from "./widgets/BottomControls"
import { PreviewCard } from "./widgets/PreviewCard"
import { FloatingWindow } from "./widgets/FloatingWindow"
import { ThemeVariables } from "./widgets/ThemeVariables"
import { useDemoStore } from "./store/useDemoStore"
import { ButtonPage, ButtonCustomStylesExample } from "./pages/ButtonPage"
import { TelegramSignInButtonPage } from "./pages/TelegramSignInButtonPage"
import { LoaderPage } from "./pages/LoaderPage"
import { InputPage } from "./pages/InputPage"
import { TogglePage } from "./pages/TogglePage"
import { LoadingWrapperPage } from "./pages/LoadingWrapperPage"
import { ToasterPage } from "./pages/ToasterPage"
import { DropdownPage } from "./pages/DropdownPage"
import { ConfirmDialogPage } from "./pages/ConfirmDialogPage"
import { InfoDialogPage } from "./pages/InfoDialogPage"
import { ModalActionsPage } from "./pages/ModalActionsPage"
import { ModalClosePage } from "./pages/ModalClosePage"
import { IconsPage } from "./pages/IconsPage"
import { ComponentDefaultsPage } from "./pages/ComponentDefaultsPage"

// Roughly half of FloatingWindow's default width + gap — shifts the preview card
// left to make room when the custom-styles panel opens, instead of the panel
// merely dodging the card wherever it happens to be.
const PANEL_SHIFT = 240

function useHash() {
    const [hash, setHash] = useState(location.hash || "#/button")
    useEffect(() => {
        const handler = () => setHash(location.hash || "#/button")
        window.addEventListener("hashchange", handler)
        return () => window.removeEventListener("hashchange", handler)
    }, [])
    return hash
}

export function App() {
    const hash = useHash()
    const customStylesOpen = useDemoStore((s) => s.customStylesOpen)
    const toggleCustomStyles = useDemoStore((s) => s.toggleCustomStyles)
    const previewAreaRef = useRef<HTMLDivElement>(null)
    const [previewRect, setPreviewRect] = useState<{ x: number; y: number; width: number; height: number } | null>(null)

    const handlePreviewRectChange = useCallback((domRect: DOMRect) => {
        const container = previewAreaRef.current?.getBoundingClientRect()
        if (!container) return
        setPreviewRect({
            x: domRect.left - container.left,
            y: domRect.top - container.top,
            width: domRect.width,
            height: domRect.height,
        })
    }, [])

    const previewShiftX = hash === "#/button" && customStylesOpen ? -PANEL_SHIFT : 0

    let page: React.ReactNode
    if (hash === "#/toaster") {
        page = <ToasterPage />
    } else if (hash === "#/loader") {
        page = <LoaderPage />
    } else if (hash === "#/loading-wrapper") {
        page = <LoadingWrapperPage />
    } else if (hash === "#/input") {
        page = <InputPage />
    } else if (hash === "#/toggle") {
        page = <TogglePage />
    } else if (hash === "#/dropdown") {
        page = <DropdownPage />
    } else if (hash === "#/telegram-button") {
        page = <TelegramSignInButtonPage />
    } else if (hash === "#/confirm-dialog") {
        page = <ConfirmDialogPage />
    } else if (hash === "#/info-dialog") {
        page = <InfoDialogPage />
    } else if (hash === "#/modal-actions") {
        page = <ModalActionsPage />
    } else if (hash === "#/modal-close") {
        page = <ModalClosePage />
    } else if (hash === "#/icons") {
        page = <IconsPage />
    } else if (hash === "#/component-defaults") {
        page = <ComponentDefaultsPage />
    } else {
        page = <ButtonPage />
    }

    return (
        <div className="layout">
            <Toaster />
            <Sidebar currentHash={hash} />
            <div className="layout-center">
                <div className="preview-area" ref={previewAreaRef}>
                    <PreviewCard onRectChange={handlePreviewRectChange} shiftX={previewShiftX}>{page}</PreviewCard>
                    {hash === "#/button" && customStylesOpen && (
                        <FloatingWindow
                            title="Override Button styles globally"
                            onClose={toggleCustomStyles}
                            avoidRect={previewRect}
                            containerRef={previewAreaRef}
                        >
                            <ButtonCustomStylesExample />
                        </FloatingWindow>
                    )}
                </div>
                <BottomControls />
            </div>
            <ThemeVariables />
        </div>
    )
}
