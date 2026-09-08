import {describe, expect, it} from "vitest"

import {partitionBySubstring} from "./partitionBySubstring"

const items = ["Google Sheets", "File from vault", "Sheet templates", "Notes"]

function id(s: string): string {
    return s
}

describe("partitionBySubstring", () => {
    it("puts everything in matches when the query is empty", () => {
        const {matches, rest} = partitionBySubstring(items, "", id)

        expect(matches).toEqual(items)
        expect(rest).toEqual([])
    })

    it("puts everything in matches when the query is only whitespace", () => {
        const {matches, rest} = partitionBySubstring(items, "   ", id)

        expect(matches).toEqual(items)
        expect(rest).toEqual([])
    })

    it("splits on a case-insensitive substring, preserving order", () => {
        const {matches, rest} = partitionBySubstring(items, "SHEET", id)

        expect(matches).toEqual(["Google Sheets", "Sheet templates"])
        expect(rest).toEqual(["File from vault", "Notes"])
    })

    it("trims the query before matching", () => {
        const {matches} = partitionBySubstring(items, "  notes ", id)

        expect(matches).toEqual(["Notes"])
    })

    it("returns all items in rest when nothing matches", () => {
        const {matches, rest} = partitionBySubstring(items, "xyz", id)

        expect(matches).toEqual([])
        expect(rest).toEqual(items)
    })

    it("reads match text through getText", () => {
        const rows = [{name: "Alpha"}, {name: "Beta"}]
        const {matches} = partitionBySubstring(rows, "alp", r => r.name)

        expect(matches).toEqual([{name: "Alpha"}])
    })
})
