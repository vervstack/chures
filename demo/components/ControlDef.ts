export type ControlDef =
    | { type: "toggle"; label: string; value: boolean; onChange: (v: boolean) => void }
    | { type: "toggleGroup"; label: string; options: string[]; value: string; onChange: (v: string) => void }
    | { type: "input"; label: string; value: string; onChange: (v: string) => void; placeholder?: string }
    | { type: "color"; label: string; value: string; onChange: (v: string) => void }
    | { type: "select"; label: string; options: string[]; value: string; onChange: (v: string) => void }
    | { type: "display"; label: string; value: string }
    | { type: "node"; node: React.ReactNode }
