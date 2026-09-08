import { useEffect, useMemo, useRef, useState } from "react"
import { FlyoutMenu } from "../../src/components/FlyoutMenu/FlyoutMenu"
import type { MenuItem } from "../../src/components/FlyoutMenu/menuModel"
import { Button } from "../../src/components/Button/Button"
import { useDemoStore } from "../store/useDemoStore"

// A section rendered through renderPanel — proves an arbitrary node drops into a
// panel (and, with `loading`, that the skeleton shows instead).
function CustomPanel() {
    return (
        <div style={{ padding: "0.5rem 0.6rem", fontSize: "0.8125rem", color: "#9ca3af", maxWidth: "14rem" }}>
            Anything can live here via <code>renderPanel</code> — a search box, a list with its own
            data hook, a form. chures still owns the panel chrome and viewport placement.
        </div>
    )
}

const FRUITS = ["Apple", "Banana", "Cherry", "Date", "Elderberry", "Fig", "Grape", "Honeydew", "Kiwi", "Lemon"]

export function FlyoutMenuPage() {
    const anchorRef = useRef<HTMLDivElement>(null)
    const [open, setOpen] = useState(false)
    const [rootTitle, setRootTitle] = useState("Attach")
    const [skeletonCount, setSkeletonCount] = useState(3)
    const [searchable, setSearchable] = useState(true)
    const [submenuLoading, setSubmenuLoading] = useState(false)
    const [picked, setPicked] = useState("(none)")
    const setControls = useDemoStore((s) => s.setControls)

    useEffect(() => {
        setControls([
            { type: "input", label: "rootTitle", value: rootTitle, onChange: setRootTitle },
            {
                type: "toggleGroup", label: "skeletonCount", options: ["2", "3", "5"], value: String(skeletonCount),
                onChange: (v) => setSkeletonCount(Number(v)),
            },
            {
                type: "toggle", label: "searchable", value: searchable, onChange: setSearchable,
                tooltip: "Opt the root list in to type-to-search: start typing while the menu is open.",
            },
            {
                type: "toggle", label: "submenu loading", value: submenuLoading, onChange: setSubmenuLoading,
                tooltip: "Puts the Fruits submenu into its loading state so the skeleton shows instead of rows.",
            },
            { type: "display", label: "picked", value: picked },
        ])
        return () => setControls([])
    }, [rootTitle, skeletonCount, searchable, submenuLoading, picked, setControls])

    const items = useMemo<MenuItem[]>(() => [
        { key: "new-note", label: "New note", onSelect: () => setPicked("New note") },
        { key: "upload", label: "Upload file", onSelect: () => setPicked("Upload file") },
        { key: "vault", label: "File from vault", disabled: true },
        {
            key: "fruits",
            label: "Fruits",
            submenu: {
                title: "Fruits",
                searchable: true,
                loading: submenuLoading,
                items: FRUITS.map((f) => ({ key: f, label: f, onSelect: () => setPicked(f) })),
            },
        },
        {
            key: "custom",
            label: "Custom panel",
            submenu: { title: "Custom panel", renderPanel: () => <CustomPanel /> },
        },
    ], [submenuLoading])

    return (
        <div ref={anchorRef} style={{ display: "inline-flex" }}>
            <Button variant="secondary" onClick={() => setOpen((v) => !v)} aria-haspopup="menu" aria-expanded={open}>
                {open ? "Close menu" : "Open menu"}
            </Button>
            <FlyoutMenu
                anchorRef={anchorRef}
                open={open}
                onClose={() => setOpen(false)}
                items={items}
                rootTitle={rootTitle || undefined}
                skeletonCount={skeletonCount}
                searchable={searchable}
            />
        </div>
    )
}
