import {ReactNode} from "react"

// Data model for a FlyoutMenu tree. A section is one panel: either a flat list of
// items, or an arbitrary node via renderPanel (a consumer's custom picker uses
// that), optionally in a loading state that shows a skeleton instead.
export interface MenuItem {
    key: string
    label: ReactNode
    icon?: ReactNode
    disabled?: boolean
    onSelect?: () => void
    submenu?: MenuSection
    // Match target for type-to-search when `label` isn't a plain string.
    searchText?: string
}

export interface MenuSection {
    title?: string
    items?: MenuItem[]
    renderPanel?: () => ReactNode
    loading?: boolean
    // Opt in to type-to-search: typing filters `items` into matches, then a
    // divider, then the dimmed rest. Ignored unless `items` is set.
    searchable?: boolean
}

// The string a menu item is matched against when the user types to search.
export function menuItemText(item: MenuItem): string {
    if (item.searchText !== undefined) return item.searchText
    return typeof item.label === "string" ? item.label : ""
}
