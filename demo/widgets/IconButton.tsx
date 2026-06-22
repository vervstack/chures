interface Props {
    children: React.ReactNode
    className?: string
    onClick?: () => void
    "aria-label"?: string
    tabIndex?: number
    "aria-hidden"?: boolean | "true" | "false"
}

export function IconButton({ children, className, onClick, "aria-label": ariaLabel, tabIndex, "aria-hidden": ariaHidden }: Props) {
    return (
        <button
            className={className}
            onClick={onClick}
            aria-label={ariaLabel}
            tabIndex={tabIndex}
            aria-hidden={ariaHidden}
        >
            {children}
        </button>
    )
}
