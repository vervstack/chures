interface Props {
    size?: number
    strokeWidth?: number
    shrink?: boolean
}

export type CheckmarkIconProps = Props

export function CheckmarkIcon({ size = 18, strokeWidth = 2.5, shrink = true }: Props) {
    return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={strokeWidth}
             strokeLinecap="round" strokeLinejoin="round" style={shrink ? { flexShrink: 0 } : undefined}>
            <polyline points="20 6 9 17 4 12"/>
        </svg>
    )
}
