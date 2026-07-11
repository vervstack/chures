import { createContext } from 'react'

// Extend this union as each component is wired to read its default via
// useComponentClassName — see Button.tsx for the reference implementation.
export type ChuresComponentName =
    | 'Button'
    | 'Input'
    | 'Toggle'
    | 'Loader'
    | 'LoadingWrapper'
    | 'TelegramSignInButton'
    | 'Dropdown'
    | 'ModalClose'
    | 'ModalActions'
    | 'ConfirmDialog'
    | 'InfoDialog'
    | 'Toaster'

export type ComponentClassNames = Partial<Record<ChuresComponentName, string>>

export const ComponentClassNamesContext = createContext<ComponentClassNames>({})
