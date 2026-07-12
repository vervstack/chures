interface Props {
    size?: number
    strokeWidth?: number
    className?: string
}

export type SearchIconProps = Props

export function SearchIcon({ size = 14, strokeWidth = 2, className }: Props) {
    return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor"
             strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
            <circle cx="11" cy="11" r="7"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
    )
}
