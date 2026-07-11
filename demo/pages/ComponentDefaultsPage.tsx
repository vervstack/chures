import { useEffect, useState } from "react"
import { Button } from "../../src/components/Button"
import { ChuresConfigProvider } from "../../src/theme/ChuresConfigProvider"
import { useDemoStore } from "../store/useDemoStore"
import cls from "./ComponentDefaultsPage.module.css"

export function ComponentDefaultsPage() {
    const [withOverride, setWithOverride] = useState(true)
    const setControls = useDemoStore((s) => s.setControls)

    useEffect(() => {
        setControls([
            {
                type: "toggleGroup",
                label: "2nd button className",
                options: ["none", "override"],
                value: withOverride ? "override" : "none",
                onChange: (v) => setWithOverride(v === "override"),
            },
        ])
        return () => setControls([])
    }, [withOverride, setControls])

    return (
        <ChuresConfigProvider classNames={{ Button: cls.ProjectButton }}>
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
            </div>
        </ChuresConfigProvider>
    )
}
