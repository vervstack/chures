import { useEffect, useState } from "react"
import { AvatarFallbackIcon, CheckmarkIcon, ChevronDownIcon, EditPencilIcon, SearchIcon } from "../../src/components/icons"
import { useDemoStore } from "../store/useDemoStore"

export function IconsPage() {
    const [size, setSize] = useState(24)
    const [strokeWidth, setStrokeWidth] = useState(2)
    const setControls = useDemoStore((s) => s.setControls)

    useEffect(() => {
        setControls([
            { type: "toggleGroup", label: "size", options: ["14", "18", "24", "32"], value: String(size), onChange: (v) => setSize(Number(v)) },
            { type: "toggleGroup", label: "strokeWidth", options: ["1.5", "2", "2.5", "3"], value: String(strokeWidth), onChange: (v) => setStrokeWidth(Number(v)) },
        ])
        return () => setControls([])
    }, [size, strokeWidth, setControls])

    const icons: { name: string; node: React.ReactNode }[] = [
        { name: "ChevronDownIcon", node: <ChevronDownIcon size={size} strokeWidth={strokeWidth} /> },
        { name: "CheckmarkIcon", node: <CheckmarkIcon size={size} strokeWidth={strokeWidth} /> },
        { name: "EditPencilIcon", node: <EditPencilIcon /> },
        { name: "AvatarFallbackIcon", node: <AvatarFallbackIcon /> },
        { name: "SearchIcon", node: <SearchIcon size={size} strokeWidth={strokeWidth} /> },
    ]

    return (
        <div className="icon-grid">
            {icons.map((icon) => (
                <div key={icon.name} className="icon-grid-cell">
                    <div className="icon-grid-swatch">{icon.node}</div>
                    <span className="icon-grid-label">{icon.name}</span>
                </div>
            ))}
        </div>
    )
}
