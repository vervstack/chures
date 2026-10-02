import { useEffect, useMemo, useState } from "react"
import { Tooltip } from "react-tooltip"
import { SegmentedControl } from "../../src/components/SegmentedControl"
import type { SegmentedControlOption } from "../../src/components/SegmentedControl"
import { useDemoStore } from "../store/useDemoStore"

const LABELS = ["Day", "Week", "Month", "Year"]

export function SegmentedControlPage() {
    const [value, setValue] = useState("option-0")
    const [disabled, setDisabled] = useState(false)
    const [count, setCount] = useState("3")
    const [contentMode, setContentMode] = useState("text")
    const [isOneDisabled, setIsOneDisabled] = useState(false)
    const setControls = useDemoStore((s) => s.setControls)

    useEffect(() => {
        setControls([
            { type: "toggleGroup", label: "disabled", options: ["false", "true"], value: String(disabled), onChange: (v) => setDisabled(v === "true") },
            { type: "toggleGroup", label: "options", options: ["2", "3", "4"], value: count, onChange: setCount },
            { type: "toggleGroup", label: "content", options: ["text", "with tooltip"], value: contentMode, onChange: setContentMode },
            { type: "toggleGroup", label: "one option disabled", options: ["false", "true"], value: String(isOneDisabled), onChange: (v) => setIsOneDisabled(v === "true") },
        ])
        return () => setControls([])
    }, [disabled, count, contentMode, isOneDisabled, setControls])

    const options = useMemo<SegmentedControlOption[]>(
        () => LABELS.slice(0, Number(count)).map((label, index) => ({
            value: `option-${index}`,
            disabled: isOneDisabled && index === 1,
            content: contentMode === "text"
                ? label
                : <span data-tooltip-id="segmented-tooltip" data-tooltip-content={`${label} range`}>{label}</span>,
        })),
        [count, contentMode, isOneDisabled],
    )

    const selected = options.some((option) => option.value === value) ? value : options[0].value

    return (
        <>
            <SegmentedControl options={options} value={selected} onChange={setValue} disabled={disabled} />
            <Tooltip id="segmented-tooltip" />
        </>
    )
}
