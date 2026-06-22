import { useEffect, useState } from "react"
import Toaster from "../src/components/notifications/Toaster"
import { Sidebar } from "./components/Sidebar"
import { ButtonPage } from "./pages/ButtonPage"
import { LoaderPage } from "./pages/LoaderPage"
import { InputPage } from "./pages/InputPage"
import { TogglePage } from "./pages/TogglePage"
import { LoadingWrapperPage } from "./pages/LoadingWrapperPage"
import { ThemePage } from "./pages/ThemePage"
import { ToasterPage } from "./pages/ToasterPage"
import { DropdownPage } from "./pages/DropdownPage"

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

    let page: React.ReactNode
    if (hash === "#/toaster") {
        page = <ToasterPage />
    } else if (hash === "#/theme") {
        page = <ThemePage />
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
    } else {
        page = <ButtonPage />
    }

    return (
        <div className="layout">
            <Toaster />
            <Sidebar currentHash={hash} />
            {page}
        </div>
    )
}
