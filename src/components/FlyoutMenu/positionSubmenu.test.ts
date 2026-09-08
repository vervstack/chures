import {describe, expect, it} from "vitest"

import {positionSubmenu} from "./positionSubmenu"

function rect(part: Partial<DOMRect>): DOMRect {
    const base = {top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0, x: 0, y: 0, toJSON: () => ({})}
    return {...base, ...part} as DOMRect
}

const vp = {width: 1000, height: 800}

describe("positionSubmenu", () => {
    it("opens to the right, top level with the row, when the panel fits there", () => {
        const row = rect({top: 200, bottom: 240, left: 300, right: 500})
        const placement = positionSubmenu(row, {width: 260, height: 300}, vp, 8, false)

        expect(placement).toEqual({side: "right", left: 500, top: 200, maxHeight: 800 - 8 - 200})
    })

    it("flips to the left when the panel overflows the right edge", () => {
        const row = rect({top: 200, bottom: 240, left: 500, right: 800})
        const placement = positionSubmenu(row, {width: 260, height: 300}, vp, 8, false)

        expect(placement).toEqual({side: "left", left: 240, top: 200, maxHeight: 800 - 8 - 200})
    })

    it("opens upward with its bottom on the row when content is too tall to fit below", () => {
        const row = rect({top: 700, bottom: 740, left: 300, right: 500})
        const placement = positionSubmenu(row, {width: 200, height: 4000}, vp, 8, false)

        if (placement.side === "collapse") throw new Error("expected a side placement")
        expect(placement.top).toBe(8)
        expect(placement.top + placement.maxHeight).toBe(740)
    })

    it("opens upward from the row's bottom when the row sits near the bottom edge", () => {
        const row = rect({top: 760, bottom: 800, left: 300, right: 500})
        const placement = positionSubmenu(row, {width: 200, height: 300}, vp, 8, false)

        if (placement.side === "collapse") throw new Error("expected a side placement")
        expect(placement.side).toBe("right")
        // Bottom edge (top + measured height) sits on the row's bottom.
        expect(placement.top + 300).toBe(800)
        expect(placement.maxHeight).toBe(800 - 8)
    })

    it("collapses when the panel fits on neither side", () => {
        const row = rect({top: 200, bottom: 240, left: 120, right: 880})
        const placement = positionSubmenu(row, {width: 300, height: 300}, vp, 8, false)

        expect(placement).toEqual({side: "collapse"})
    })

    it("collapses when forceCollapse is set regardless of available space", () => {
        const row = rect({top: 200, bottom: 240, left: 300, right: 500})
        const placement = positionSubmenu(row, {width: 100, height: 100}, vp, 8, true)

        expect(placement).toEqual({side: "collapse"})
    })
})
