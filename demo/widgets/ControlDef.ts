interface ControlBase {
    disabled?: boolean
    tooltip?: string
}

export type ControlDef =
    | ({ type: "toggle"; label: string; value: boolean; onChange: (v: boolean) => void } & ControlBase)
    | ({ type: "toggleGroup"; label: string; options: string[]; value: string; onChange: (v: string) => void } & ControlBase)
    | ({ type: "input"; label: string; value: string; onChange: (v: string) => void; placeholder?: string } & ControlBase)
    | ({ type: "color"; label: string; value: string; onChange: (v: string) => void } & ControlBase)
    | ({ type: "select"; label: string; options: string[]; value: string; onChange: (v: string) => void } & ControlBase)
    | ({ type: "display"; label: string; value: string } & ControlBase)
    | ({ type: "node"; node: React.ReactNode } & ControlBase)
