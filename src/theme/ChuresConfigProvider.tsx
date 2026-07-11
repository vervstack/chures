import type { ReactNode } from 'react'
import { ComponentClassNamesContext, type ComponentClassNames } from './ComponentClassNamesContext'

interface Props {
    // Default className applied to every instance of a component, keyed by
    // component name — e.g. { Button: styles.ProjectButton }. An instance's
    // own `className` prop always takes priority over this default.
    classNames: ComponentClassNames
    children: ReactNode
}

export type ChuresConfigProviderProps = Props

export function ChuresConfigProvider({ classNames, children }: Props) {
    return (
        <ComponentClassNamesContext.Provider value={classNames}>
            {children}
        </ComponentClassNamesContext.Provider>
    )
}
