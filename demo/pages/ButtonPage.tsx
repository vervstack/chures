import { useEffect, useState } from "react"
import { Button } from "../../src/components/Button"
import type { ButtonVariant } from "../../src/components/Button"
import { useToaster } from "../../src/hooks/toaster/useToaster"
import { useDemoStore } from "../store/useDemoStore"
import { CodeWindow } from "../widgets/CodeWindow"

const VARIANTS: (ButtonVariant | "none")[] = ["none", "default", "primary", "secondary", "danger", "ghost", "iconDanger", "unstyled"]

const JSX_EXAMPLE = `import { Button, ChuresConfigProvider } from 'chures'
import styles from './theme.module.css'

export function App() {
  return (
    <ChuresConfigProvider classNames={{ Button: styles.ProjectButton }}>
      {/* every <Button> below now uses .ProjectButton by default */}
      <YourApp />
    </ChuresConfigProvider>
  )
}`

const CSS_EXAMPLE = `/* theme.module.css */
.ProjectButton {
  border-radius: 999px;
  background: linear-gradient(135deg, #7c3aed, #db2777);
  border: none;
}`

// Rendered by App.tsx inside .preview-area (as a window alongside the
// PreviewCard) when the "custom styles" control is toggled on.
export function ButtonCustomStylesExample() {
    return (
        <>
            <CodeWindow title="App.tsx" code={JSX_EXAMPLE} />
            <CodeWindow title="theme.module.css" code={CSS_EXAMPLE} />
        </>
    )
}

export function ButtonPage() {
    const [variant, setVariant] = useState<ButtonVariant | "none">("primary")
    const [label, setLabel] = useState("Click me")
    const [disabled, setDisabled] = useState(false)
    const { bake } = useToaster()
    const setControls = useDemoStore((s) => s.setControls)
    const customStylesOpen = useDemoStore((s) => s.customStylesOpen)
    const toggleCustomStyles = useDemoStore((s) => s.toggleCustomStyles)

    useEffect(() => {
        setControls([
            { type: "select", label: "variant", options: VARIANTS, value: variant, onChange: (v) => setVariant(v as ButtonVariant | "none") },
            { type: "input", label: "label", value: label, onChange: setLabel },
            { type: "toggle", label: "disabled", value: disabled, onChange: setDisabled },
            {
                type: "toggle", label: "custom styles", value: customStylesOpen, onChange: toggleCustomStyles,
                tooltip: "Opens a live example of overriding Button's default look project-wide via ChuresConfigProvider, instead of passing className on every instance.",
            },
        ])
        return () => setControls([])
    }, [variant, label, disabled, customStylesOpen, toggleCustomStyles, setControls])

    return (
        <Button
            variant={variant === "none" ? undefined : variant}
            disabled={disabled}
            onClick={() => bake({ title: "Clicked", description: `Button (${variant}) was clicked.`, level: "Info" })}
        >
            {label}
        </Button>
    )
}
