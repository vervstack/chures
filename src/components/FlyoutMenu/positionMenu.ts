export interface Size {
    width: number
    height: number
}

export interface Viewport {
    width: number
    height: number
}

export interface MenuPlacement {
    top: number
    left: number
    maxHeight: number
    maxWidth: number
}

// Places the main flyout panel relative to its anchor. Horizontally the panel's
// right edge is pulled to the anchor's right edge, then clamped so neither side
// crosses the viewport pad. Vertically it opens above the anchor by default: its
// height is capped to the room between the top pad and the anchor, so a tall panel
// pins to the top pad and scrolls internally instead of overflowing. It flips to
// below the anchor only when the panel cannot fit above and there is more room
// below — a trigger near the top of the viewport — mirroring positionSubmenu's
// cramped-side fallback.
export function positionMenu(
    anchor: DOMRect,
    panel: Size,
    vp: Viewport,
    pad: number,
    gap: number,
): MenuPlacement {
    const maxWidth = vp.width - 2 * pad
    const highClamp = Math.max(pad, vp.width - pad - panel.width)
    const left = Math.min(Math.max(anchor.right - panel.width, pad), highClamp)

    const roomAbove = anchor.top - gap - pad
    const roomBelow = vp.height - pad - anchor.bottom - gap

    if (panel.height > roomAbove && roomBelow > roomAbove) {
        return {top: anchor.bottom + gap, left, maxHeight: roomBelow, maxWidth}
    }

    const rawTop = anchor.top - gap - panel.height
    const top = rawTop < pad ? pad : rawTop
    return {top, left, maxHeight: roomAbove, maxWidth}
}
