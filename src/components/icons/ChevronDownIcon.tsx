interface Props {
    size?: number
    strokeWidth?: number
    className?: string
}

export type ChevronDownIconProps = Props

export function ChevronDownIcon({ size = 14, strokeWidth = 2, className }: Props) {
    return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor"
             strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
            <polyline points="6 9 12 15 18 9"/>
        </svg>
    )
}
