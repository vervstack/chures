import {Size, Viewport} from "./positionMenu"

export type SubmenuPlacement =
    | {side: "right" | "left"; top: number; left: number; maxHeight: number}
    | {side: "collapse"}

// Decides where a nested submenu panel goes relative to its trigger row: to the
// right if it fits, otherwise to the left, otherwise "collapse" — the caller then
// drills the section into the main panel as a back-navigable frame instead. Portrait
// always collapses. Vertically the panel keeps an edge on the row: it opens downward
// with its top level with the row's top, or — when there isn't room below and there
// is more above (the common case for a trigger low on the screen) — upward with its
// bottom level with the row's bottom. Either way its height caps to that direction's
// room so it scrolls internally instead of drifting away from the trigger, and it
// never crosses the top or bottom pad regardless of how tall its (async) content is.
export function positionSubmenu(
    row: DOMRect,
    panel: Size,
    vp: Viewport,
    pad: number,
    forceCollapse: boolean,
): SubmenuPlacement {
    if (forceCollapse) return {side: "collapse"}

    const fitsRight = row.right + panel.width <= vp.width - pad
    const leftEdge = row.left - panel.width
    const side = fitsRight ? "right" : leftEdge >= pad ? "left" : null
    if (!side) return {side: "collapse"}

    const left = side === "right" ? row.right : leftEdge

    const roomBelow = vp.height - pad - row.top
    const roomAbove = row.bottom - pad
    if (roomBelow >= panel.height || roomBelow >= roomAbove) {
        return {side, left, top: row.top, maxHeight: roomBelow}
    }
    const top = Math.max(row.bottom - panel.height, pad)
    return {side, left, top, maxHeight: roomAbove}
}
