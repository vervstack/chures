import cn from 'classnames';

import styles from './Dropdown.module.css';

interface Props {
    query: string;
    withBorder: boolean;
    onCreate: () => void;
}

export function DropdownCreateRow({ query, withBorder, onCreate }: Props) {
    function handleMouseDown(e: React.MouseEvent) {
        e.preventDefault();
        onCreate();
    }

    return (
        <div
            className={cn(styles.CreateRow, withBorder && styles.WithBorder)}
            onMouseDown={handleMouseDown}
        >
            <span className={styles.CreateIcon}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                    <line x1="5" y1="1" x2="5" y2="9" />
                    <line x1="1" y1="5" x2="9" y2="5" />
                </svg>
            </span>
            <span className={styles.CreateLabel}>create &ldquo;{query}&rdquo;</span>
        </div>
    );
}
