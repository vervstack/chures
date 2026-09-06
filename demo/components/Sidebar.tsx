interface NavItem {
    hash: string
    label: string
}

const NAV: NavItem[] = [
    { hash: "#/button", label: "Button" },
    { hash: "#/telegram-button", label: "TelegramSignInButton" },
    { hash: "#/toaster", label: "Toaster" },
    { hash: "#/loader", label: "Loader" },
    { hash: "#/loading-wrapper", label: "LoadingWrapper" },
    { hash: "#/input", label: "Input" },
    { hash: "#/toggle", label: "Toggle" },
    { hash: "#/dropdown", label: "Dropdown" },
    { hash: "#/confirm-dialog", label: "ConfirmDialog" },
    { hash: "#/info-dialog", label: "InfoDialog" },
    { hash: "#/modal-actions", label: "ModalActions" },
    { hash: "#/modal-close", label: "ModalClose" },
    { hash: "#/side-drawer", label: "SideDrawer" },
    { hash: "#/icons", label: "Icons" },
    { hash: "#/component-defaults", label: "Component Defaults" },
]

interface Props {
    currentHash: string
}

export function Sidebar({ currentHash }: Props) {
    return (
        <nav className="sidebar">
            <div className="sidebar-heading">Components</div>
            {NAV.map((item) => (
                <a
                    key={item.hash}
                    href={item.hash}
                    className={`sidebar-link${currentHash === item.hash ? " active" : ""}`}
                >
                    {item.label}
                </a>
            ))}
        </nav>
    )
}
