import { useRef, useState } from "react"
import { Dropdown } from "../../src/components/Dropdown/Dropdown"
import type { DropdownOption } from "../../src/components/Dropdown/Dropdown.types"
import { getOptionId, getOptionLabel } from "../../src/components/Dropdown/Dropdown.types"
import { Playground } from "../components/Playground"

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
    const triggerRef = useRef<HTMLButtonElement>(null)
    const [isOpen, setIsOpen] = useState(false)
    const [multiSelect, setMultiSelect] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [searchEnabled, setSearchEnabled] = useState(false)
    const [createEnabled, setCreateEnabled] = useState(false)
    const [skeletonRowCount, setSkeletonRowCount] = useState(4)
    const [placeholder, setPlaceholder] = useState("")
    const [emptyHint, setEmptyHint] = useState("no results found")
    const [options, setOptions] = useState<DropdownOption[]>(FRUITS)
    const [selected, setSelected] = useState<string[]>([])

    function handlePick(opt: DropdownOption) {
        const id = getOptionId(opt)
        setSelected((prev) =>
            multiSelect
                ? prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
                : [id]
        )
    }

    function handleCreate(name: string): Promise<DropdownOption> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const created: DropdownOption = name
                setOptions((prev) => [...prev, created])
                resolve(created)
            }, 300)
        })
    }

    const triggerText = selected.length === 0
        ? (placeholder || "Select…")
        : selected
            .map((id) => {
                const opt = options.find((o) => getOptionId(o) === id)
                return opt ? getOptionLabel(opt) : id
            })
            .join(", ")

    return (
        <Playground controls={[
            { type: "toggleGroup", label: "multiSelect", options: ["false", "true"], value: String(multiSelect), onChange: (v) => { setMultiSelect(v === "true"); setSelected([]) } },
            { type: "toggleGroup", label: "isLoading", options: ["false", "true"], value: String(isLoading), onChange: (v) => setIsLoading(v === "true") },
            { type: "toggleGroup", label: "onSearch", options: ["off", "on"], value: searchEnabled ? "on" : "off", onChange: (v) => setSearchEnabled(v === "on") },
            { type: "toggleGroup", label: "onCreate", options: ["off", "on"], value: createEnabled ? "on" : "off", onChange: (v) => setCreateEnabled(v === "on") },
            { type: "toggleGroup", label: "skeletonRowCount", options: ["2", "4", "6"], value: String(skeletonRowCount), onChange: (v) => setSkeletonRowCount(Number(v)) },
            { type: "input", label: "placeholder", value: placeholder, onChange: setPlaceholder, placeholder: "(default)" },
            { type: "input", label: "emptyHint", value: emptyHint, onChange: setEmptyHint },
            { type: "display", label: "selected", value: selected.length > 0 ? selected.join(", ") : "(none)" },
        ]}>
            <div style={{ position: "relative", width: "16rem" }}>
                <button
                    ref={triggerRef}
                    className={`dropdown-trigger${isOpen ? " open" : ""}`}
                    onClick={() => setIsOpen((v) => !v)}
                >
                    {multiSelect && selected.length > 0 ? (
                        <div className="dropdown-chips">
                            {selected.map((id) => {
                                const opt = options.find((o) => getOptionId(o) === id)
                                return (
                                    <span key={id} className="dropdown-chip">
                                        {opt ? getOptionLabel(opt) : id}
                                    </span>
                                )
                            })}
                        </div>
                    ) : (
                        <span className={selected.length === 0 ? "dropdown-trigger-placeholder" : "dropdown-trigger-value"}>
                            {triggerText}
                        </span>
                    )}
                    <span className="dropdown-trigger-icon">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="2,4 6,8 10,4" />
                        </svg>
                    </span>
                </button>
                {isOpen && (
                    <Dropdown
                        options={options}
                        onSearch={searchEnabled ? mockSearch : undefined}
                        onCreate={createEnabled ? handleCreate : undefined}
                        onPick={handlePick}
                        onClose={() => setIsOpen(false)}
                        anchorRef={triggerRef}
                        multiSelect={multiSelect}
                        selected={selected}
                        isLoading={isLoading}
                        skeletonRowCount={skeletonRowCount}
                        placeholder={placeholder || undefined}
                        emptyHint={emptyHint}
                    />
                )}
            </div>
        </Playground>
    )
}
