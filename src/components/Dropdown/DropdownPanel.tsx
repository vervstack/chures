import { useEffect, useRef, useState } from 'react';

import { useDropdownClose, useSearchResults } from './Dropdown.hooks';
import { getOptionId, getOptionLabel } from './Dropdown.types';
import type { DropdownOption } from './Dropdown.types';
import { DropdownCreateRow } from './DropdownCreateRow';
import { DropdownOptionRow } from './DropdownOptionRow';
import { DropdownSearchRow } from './DropdownSearchRow';
import { DropdownSkeletonList } from './DropdownSkeletonList';
import styles from './Dropdown.module.css';

interface Props {
    options?: DropdownOption[];
    onSearch?: (query: string) => Promise<DropdownOption[]>;
    onCreate?: (name: string) => Promise<DropdownOption>;
    onPick: (option: DropdownOption) => void;
    onClose: () => void;
    anchorRef?: React.RefObject<HTMLElement | null>;
    excluded?: string[];
    multiSelect?: boolean;
    selected?: string[];
    placeholder?: string;
    emptyHint?: string;
    isLoading?: boolean;
    skeletonRowCount?: number;
    onError?: (err: unknown) => void;
}

export function DropdownPanel(
    {
        onSearch, onCreate, onPick, onClose, anchorRef, placeholder,
        options = [], excluded = [], selected = [],
        multiSelect = false,
        isLoading = false,
        emptyHint = 'no results found',
        skeletonRowCount = 4,
        onError = console.error,
    }: Props) {

    const [query, setQuery] = useState('');
    const [creating, setCreating] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);

    const hasSearch = Boolean(onSearch);
    const searchResults = useSearchResults(query, onSearch);

    useDropdownClose(panelRef, onClose, anchorRef);

    useEffect(() => {
        if (hasSearch) inputRef.current?.focus();
    }, [hasSearch]);

    const visibleOptions = (onSearch ? searchResults : options)
        .filter(
            (opt) => !excluded.includes(getOptionId(opt)),
        );

    const trimmedQuery = query.trim();
    const exactMatch = visibleOptions.some(
        (o) => getOptionLabel(o).toLowerCase() === trimmedQuery.toLowerCase(),
    );
    const showCreate = Boolean(onCreate) && trimmedQuery.length > 0 && !exactMatch;

    async function handleCreate() {
        if (!trimmedQuery || creating || !onCreate) return;
        setCreating(true);

        onCreate(trimmedQuery)
            .then(handlePick)
            .catch(onError)
            .finally(() => setCreating(false));
    }

    function handlePick(opt: DropdownOption) {
        onPick(opt);
        if (!multiSelect) onClose();
    }

    function handleQueryChange(e: React.ChangeEvent<HTMLInputElement>) {
        setQuery(e.target.value);
    }

    function handleInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (visibleOptions.length > 0) {
                handlePick(visibleOptions[0]);
            } else if (showCreate) {
                handleCreate();
            }
        }
    }

    const resolvedPlaceholder = placeholder ?? (onCreate ? 'search or add new…' : 'search…');

    return (
        <div ref={panelRef} className={styles.PanelContainer}>
            {hasSearch && (
                <DropdownSearchRow
                    inputRef={inputRef}
                    query={query}
                    onChange={handleQueryChange}
                    onKeyDown={handleInputKeyDown}
                    placeholder={resolvedPlaceholder}
                />
            )}
            <div className={styles.ResultsList}>
                {isLoading ? (
                    <DropdownSkeletonList count={skeletonRowCount} />
                ) : (
                    <>
                        {visibleOptions.map((opt) => (
                            <DropdownOptionRow
                                key={getOptionId(opt)}
                                opt={opt}
                                isSelected={selected.includes(getOptionId(opt))}
                                multiSelect={multiSelect}
                                onPick={handlePick}
                            />
                        ))}
                        {showCreate && (
                            <DropdownCreateRow
                                query={trimmedQuery}
                                withBorder={visibleOptions.length > 0}
                                onCreate={handleCreate}
                            />
                        )}
                        {visibleOptions.length === 0 && !showCreate && (
                            <div className={styles.EmptyHint}>{emptyHint}</div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
