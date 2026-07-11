export interface Rect {
    x: number
    y: number
    width: number
    height: number
}

export interface Size {
    width: number
    height: number
}

/** True when two rects intersect. */
export function rectsOverlap(a: Rect, b: Rect): boolean {
    return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y
}

/**
 * Position for a `size` window placed just to the right of `avoid`, top-aligned with it,
 * then clamped so the window stays fully inside a `container` of the given size
 * (top-left origin 0,0).
 */
export function placeToRightOf(avoid: Rect, size: Size, container: Size, gap = 24): { x: number; y: number } {
    const maxX = Math.max(0, container.width - size.width)
    const maxY = Math.max(0, container.height - size.height)
    return {
        x: clamp(avoid.x + avoid.width + gap, 0, maxX),
        y: clamp(avoid.y, 0, maxY),
    }
}

function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max)
}
