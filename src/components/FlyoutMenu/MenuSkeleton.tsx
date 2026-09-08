import {useMemo} from "react"

import styles from "./FlyoutMenu.module.css"

interface Props {
    count?: number
}

// Placeholder rows shown while a section's contents load — a local pulsing block
// per row, no spinner.
export function MenuSkeleton({count = 3}: Props) {
    const rows = useMemo(() => Array.from({length: Math.max(0, count)}, (_, i) => i), [count])

    return (
        <div className={styles.MenuSkeletonContainer}>
            {rows.map(i => (
                <div key={i} className={styles.MenuSkeletonRow} role="presentation"/>
            ))}
        </div>
    )
}

export type MenuSkeletonProps = Props
