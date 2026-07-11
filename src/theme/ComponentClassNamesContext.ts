import { createContext } from 'react'

// Extend this union as each component is wired to read its default via
// useComponentClassName — see Button.tsx for the reference implementation.
export type ChuresComponentName = 'Button'

export type ComponentClassNames = Partial<Record<ChuresComponentName, string>>

export const ComponentClassNamesContext = createContext<ComponentClassNames>({})
