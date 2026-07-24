import { useEffect, useState } from "react"
import { Dropdown } from "../../src/components/Dropdown/Dropdown"
import type { DropdownOption } from "../../src/components/Dropdown/Dropdown.types"
import { useDemoStore } from "../store/useDemoStore"

const FRUITS: DropdownOption[] = [
    "Apple", "Banana", "Cherry", "Date", "Elderberry", "Fig", "Grape", "Honeydew",
]

function mockSearch(q: string): Promise<DropdownOption[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            const lower = q.toLowerCase()
            resolve(FRUITS.filter((f) => (f as string).toLowerCase().includes(lower)))
        }, 150)
    })
}

export function DropdownPage() {
    const [multiSelect, setMultiSelect] = useState(false)
    const [selectedAtTop, setSelectedAtTop] = useState(false)
    const [onOverflow, setOnOverflow] = useState<"scroll" | "expand">("scroll")
    const [isLoading, setIsLoading] = useState(false)
    const [searchEnabled, setSearchEnabled] = useState(false)
    const [createEnabled, setCreateEnabled] = useState(false)
    const [skeletonRowCount, setSkeletonRowCount] = useState(4)
    const [placeholder, setPlaceholder] = useState("")
    const [emptyHint, setEmptyHint] = useState("no results found")
    const [glass, setGlass] = useState(false)
    const [portal, setPortal] = useState(false)
    const [options, setOptions] = useState<DropdownOption[]>(FRUITS)
    const [value, setValue] = useState<string[]>([])
    const setControls = useDemoStore((s) => s.setControls)

    useEffect(() => {
        setControls([
            { type: "toggleGroup", label: "multiSelect", options: ["false", "true"], value: String(multiSelect), onChange: (v) => { setMultiSelect(v === "true"); setValue([]) } },
            { type: "toggleGroup", label: "selectedAtTop", options: ["false", "true"], value: String(selectedAtTop), onChange: (v) => setSelectedAtTop(v === "true") },
            {
                type: "toggleGroup", label: "onOverflow", options: ["scroll", "expand"], value: onOverflow,
                onChange: (v) => setOnOverflow(v as "scroll" | "expand"),
                disabled: !multiSelect, tooltip: "Requires multiSelect to be enabled",
            },
            { type: "toggleGroup", label: "isLoading", options: ["false", "true"], value: String(isLoading), onChange: (v) => setIsLoading(v === "true") },
            { type: "toggleGroup", label: "onSearch", options: ["off", "on"], value: searchEnabled ? "on" : "off", onChange: (v) => setSearchEnabled(v === "on") },
            { type: "toggleGroup", label: "onCreate", options: ["off", "on"], value: createEnabled ? "on" : "off", onChange: (v) => setCreateEnabled(v === "on") },
            { type: "toggleGroup", label: "skeletonRowCount", options: ["2", "4", "6"], value: String(skeletonRowCount), onChange: (v) => setSkeletonRowCount(Number(v)) },
            { type: "input", label: "placeholder", value: placeholder, onChange: setPlaceholder, placeholder: "(default)" },
            { type: "input", label: "emptyHint", value: emptyHint, onChange: setEmptyHint },
            {
                type: "toggle", label: "glass", value: glass, onChange: setGlass,
                tooltip: "Frosted-glass look for the open panel: translucent background + backdrop blur + a soft glow. Implies portal below.",
            },
            {
                type: "toggle", label: "portal", value: portal, onChange: setPortal,
                tooltip: "Renders the panel via a portal to document.body instead of position:absolute inside the Dropdown. Try it against the sibling box below.",
            },
            { type: "display", label: "selected", value: value.length > 0 ? value.join(", ") : "(none)" },
        ])
        return () => setControls([])
    }, [multiSelect, selectedAtTop, onOverflow, isLoading, searchEnabled, createEnabled, skeletonRowCount, placeholder, emptyHint, glass, portal, value, setControls])

    function handleCreate(name: string): Promise<DropdownOption> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const created: DropdownOption = name
                setOptions((prev) => [...prev, created])
                resolve(created)
            }, 300)
        })
    }

    return (
        <div style={{ width: "16rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <Dropdown
                options={options}
                value={value}
                onChange={setValue}
                onSearch={searchEnabled ? mockSearch : undefined}
                onCreate={createEnabled ? handleCreate : undefined}
                multiSelect={multiSelect}
                selectedAtTop={selectedAtTop}
                onOverflow={onOverflow}
                isLoading={isLoading}
                skeletonRowCount={skeletonRowCount}
                placeholder={placeholder || undefined}
                emptyHint={emptyHint}
                glass={glass}
                portal={portal}
                label="Fruit"
            />
            {/* A later flex sibling: without portal/glass, this paints over the open
                panel above (the panel is trapped inside the Dropdown's own flex-item
                paint slot) even though the panel visually overflows past it — the
                exact bug this prop fixes. Toggle portal to see the panel escape. */}
            <div
                style={{
                    padding: "0.75rem",
                    borderRadius: "0.5rem",
                    background: "#1a1a1a",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    fontSize: "0.8rem",
                    color: "#9ca3af",
                }}
            >
                A later flex sibling — open the dropdown above with{" "}
                <code>portal=false</code> and it renders underneath this box; flip{" "}
                <code>portal</code> (or <code>glass</code>) on to see it escape.
            </div>
        </div>
    )
}
