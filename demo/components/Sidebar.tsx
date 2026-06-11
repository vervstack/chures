interface NavItem {
    hash: string
    label: string
}

const NAV: NavItem[] = [
    { hash: "#/button", label: "TelegramSignInButton" },
    { hash: "#/toaster", label: "Toaster" },
    { hash: "#/loader", label: "Loader" },
    { hash: "#/loading-wrapper", label: "LoadingWrapper" },
    { hash: "#/input", label: "Input" },
    { hash: "#/toggle", label: "Toggle" },
    { hash: "#/theme", label: "Theming" },
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
