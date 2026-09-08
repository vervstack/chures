import {describe, expect, it} from "vitest"

import {positionMenu} from "./positionMenu"

function rect(part: Partial<DOMRect>): DOMRect {
    const base = {top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0, x: 0, y: 0, toJSON: () => ({})}
    return {...base, ...part} as DOMRect
}

const vp = {width: 1000, height: 800}

describe("positionMenu", () => {
    it("right-aligns the panel to the anchor's right edge and opens above it", () => {
        const anchor = rect({top: 600, bottom: 640, right: 700})
        const placement = positionMenu(anchor, {width: 200, height: 150}, vp, 8, 8)

        expect(placement.left).toBe(500)
        expect(placement.top).toBe(600 - 8 - 150)
        expect(placement.maxHeight).toBe(600 - 8 - 8)
        expect(placement.maxWidth).toBe(1000 - 16)
    })

    it("pins to the top pad and caps its height when a tall panel doesn't fit above", () => {
        const anchor = rect({top: 600, bottom: 640, right: 700})
        const placement = positionMenu(anchor, {width: 200, height: 5000}, vp, 8, 8)

        expect(placement.top).toBe(8)
        expect(placement.top + placement.maxHeight).toBe(600 - 8)
    })

    it("clamps the left edge to the pad when the panel would overflow the left side", () => {
        const anchor = rect({top: 600, bottom: 640, right: 120})
        const placement = positionMenu(anchor, {width: 400, height: 100}, vp, 8, 8)

        expect(placement.left).toBe(8)
    })

    it("flips below the anchor when it can't fit above and there is more room below", () => {
        const anchor = rect({top: 100, bottom: 140, right: 700})
        const placement = positionMenu(anchor, {width: 200, height: 400}, vp, 8, 8)

        expect(placement.top).toBe(140 + 8)
        expect(placement.maxHeight).toBe(800 - 8 - 140 - 8)
        expect(placement.left).toBe(500)
    })

    it("clamps the right edge so a wide panel near the right edge stays on screen", () => {
        const anchor = rect({top: 600, bottom: 640, right: 995})
        const placement = positionMenu(anchor, {width: 300, height: 100}, vp, 8, 8)

        expect(placement.left).toBe(1000 - 8 - 300)
    })
})
