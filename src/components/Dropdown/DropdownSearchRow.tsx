import styles from './Dropdown.module.css';

interface Props {
    inputRef: React.RefObject<HTMLInputElement | null>;
    query: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    placeholder: string;
}

export function DropdownSearchRow({ inputRef, query, onChange, onKeyDown, placeholder }: Props) {
    return (
        <div className={styles.SearchRow}>
            <div className={styles.SearchBox}>
                <span className={styles.SearchIcon}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                        <circle cx="5" cy="5" r="3.5" />
                        <line x1="8" y1="8" x2="11" y2="11" />
                    </svg>
                </span>
                <input
                    ref={inputRef}
                    className={styles.SearchInput}
                    value={query}
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    placeholder={placeholder}
                />
            </div>
        </div>
    );
}
