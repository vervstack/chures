import { useEffect, useState } from "react"
import { Button } from "../../src/components/Button"
import { Input } from "../../src/components/Input"
import { Toggle } from "../../src/components/Toggle"
import { ChuresConfigProvider } from "../../src/theme/ChuresConfigProvider"
import { useDemoStore } from "../store/useDemoStore"
import cls from "./ComponentDefaultsPage.module.css"

export function ComponentDefaultsPage() {
    const [withOverride, setWithOverride] = useState(true)
    const [inputValue, setInputValue] = useState("")
    const [toggleChecked, setToggleChecked] = useState(false)
    const setControls = useDemoStore((s) => s.setControls)

    useEffect(() => {
        setControls([
            {
                type: "toggleGroup",
                label: "2nd instance className",
                options: ["none", "override"],
                value: withOverride ? "override" : "none",
                onChange: (v) => setWithOverride(v === "override"),
            },
        ])
        return () => setControls([])
    }, [withOverride, setControls])

    return (
        <ChuresConfigProvider
            classNames={{
                Button: cls.ProjectButton,
                Input: cls.ProjectInput,
                Toggle: cls.ProjectToggle,
            }}
        >
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <div className={cls.Row}>
                    <span className={cls.Hint}>No className passed — falls back to the project-wide default registered on ChuresConfigProvider</span>
                    <Button onClick={() => {}}>Uses global default</Button>
                </div>
                <div className={cls.Row}>
                    <span className={cls.Hint}>className passed on this instance — always takes priority over the global default</span>
                    <Button className={withOverride ? cls.InstanceOverride : undefined} onClick={() => {}}>
                        {withOverride ? "Instance override" : "Uses global default"}
                    </Button>
                </div>
                <div className={cls.Row}>
                    <span className={cls.Hint}>Input — no className passed, uses the registered default</span>
                    <Input label="Uses global default" value={inputValue} setValue={setInputValue} />
                </div>
                <div className={cls.Row}>
                    <span className={cls.Hint}>Input — instance className overrides the default</span>
                    <Input
                        label={withOverride ? "Instance override" : "Uses global default"}
                        value={inputValue}
                        setValue={setInputValue}
                        className={withOverride ? cls.InstanceOverrideInput : undefined}
                    />
                </div>
                <div className={cls.Row}>
                    <span className={cls.Hint}>Toggle — no className passed, uses the registered default</span>
                    <Toggle checked={toggleChecked} onChange={setToggleChecked} label="Uses global default" />
                </div>
                <div className={cls.Row}>
                    <span className={cls.Hint}>Toggle — instance className overrides the default</span>
                    <Toggle
                        checked={toggleChecked}
                        onChange={setToggleChecked}
                        label={withOverride ? "Instance override" : "Uses global default"}
                        className={withOverride ? cls.InstanceOverrideToggle : undefined}
                    />
                </div>
            </div>
        </ChuresConfigProvider>
    )
}
