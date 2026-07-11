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
            { type: "display", label: "selected", value: value.length > 0 ? value.join(", ") : "(none)" },
        ])
        return () => setControls([])
    }, [multiSelect, selectedAtTop, onOverflow, isLoading, searchEnabled, createEnabled, skeletonRowCount, placeholder, emptyHint, value, setControls])

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
        <div style={{ width: "16rem" }}>
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
                label="Fruit"
            />
        </div>
    )
}
