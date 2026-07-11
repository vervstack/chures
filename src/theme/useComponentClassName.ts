import { useContext } from 'react'
import { ComponentClassNamesContext, type ChuresComponentName } from './ComponentClassNamesContext'

// Resolves the className a component instance should render with: the
// instance's own `className` prop always wins; otherwise falls back to the
// project-wide default registered for `component` via ChuresConfigProvider
// (or undefined if none is registered / no provider is mounted).
export function useComponentClassName(component: ChuresComponentName, instanceClassName?: string): string | undefined {
    const defaults = useContext(ComponentClassNamesContext)
    return instanceClassName ?? defaults[component]
}
