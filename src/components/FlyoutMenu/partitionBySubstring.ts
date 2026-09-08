export interface Partitioned<T> {
    matches: T[]
    rest: T[]
}

// Splits `items` into those whose text contains `query` (case-insensitive,
// trimmed) and those that don't, preserving order. An empty query puts
// everything in `matches` and leaves `rest` empty.
export function partitionBySubstring<T>(
    items: T[],
    query: string,
    getText: (item: T) => string,
): Partitioned<T> {
    const q = query.trim().toLowerCase()
    if (!q) return {matches: items, rest: []}

    const matches: T[] = []
    const rest: T[] = []
    for (const item of items) {
        if (getText(item).toLowerCase().includes(q)) matches.push(item)
        else rest.push(item)
    }
    return {matches, rest}
}
