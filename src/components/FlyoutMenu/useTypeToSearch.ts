import {useEffect, useState} from "react"

function isTypingTarget(el: Element | null): boolean {
    if (!(el instanceof HTMLElement)) return false
    return el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable
}

// Type-to-search for a menu that has no always-visible input: while `active`, a
// document-level keydown listener seeds a query string from the first printable
// keypress. Once a MenuSearchField mounts (query non-empty) it takes focus, so
// `isTypingTarget` then routes further keys to the field's own onChange and this
// listener stands down until the query is cleared again.
export function useTypeToSearch(active: boolean) {
    const [query, setQuery] = useState("")

    useEffect(() => {
        if (!active) return

        function handleKeyDown(e: KeyboardEvent) {
            if (isTypingTarget(document.activeElement)) return
            if (e.key === "Backspace") {
                setQuery(q => q.slice(0, -1))
                return
            }
            if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
                setQuery(q => q + e.key)
                e.preventDefault()
            }
        }

        document.addEventListener("keydown", handleKeyDown)
        return () => document.removeEventListener("keydown", handleKeyDown)
    }, [active])

    return {query, setQuery}
}
