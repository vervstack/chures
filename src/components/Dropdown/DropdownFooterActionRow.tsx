import cn from 'classnames';

import type { DropdownFooterAction } from './Dropdown.types';
import styles from './Dropdown.module.css';

interface Props extends DropdownFooterAction {
    withBorder: boolean;
}

// A persistent action row pinned to the bottom of the results list, unlike
// DropdownCreateRow which only appears while the search query has no exact
// match. Used for a caller-defined affordance that isn't about creating an
// option from typed text (e.g. "add a new connection" opening an external
// page) but still belongs inside the panel instead of a separate button
// beneath the trigger.
export function DropdownFooterActionRow({ label, icon, withBorder, onAction }: Props) {
    function handleMouseDown(e: React.MouseEvent) {
        e.preventDefault();
        onAction();
    }

    return (
        <div
            className={cn(styles.CreateRow, withBorder && styles.WithBorder)}
            onMouseDown={handleMouseDown}
        >
            <span className={styles.CreateIcon}>
                {icon ?? (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                        <line x1="5" y1="1" x2="5" y2="9" />
                        <line x1="1" y1="5" x2="9" y2="5" />
                    </svg>
                )}
            </span>
            <span className={styles.CreateLabel}>{label}</span>
        </div>
    );
}
