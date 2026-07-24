import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import cn from 'classnames';

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
    selectedAtTop?: boolean;
    selected?: string[];
    placeholder?: string;
    emptyHint?: string;
    isLoading?: boolean;
    skeletonRowCount?: number;
    onError?: (err: unknown) => void;
    glass?: boolean;
    portal?: boolean;
}

export function DropdownPanel(
    {
        onSearch, onCreate, onPick, onClose, anchorRef, placeholder,
        options = [], excluded = [], selected = [],
        multiSelect = false,
        selectedAtTop = false,
        isLoading = false,
        emptyHint = 'no results found',
        skeletonRowCount = 4,
        onError = console.error,
        glass = false,
        portal = false,
    }: Props) {

    const [query, setQuery] = useState('');
    const [creating, setCreating] = useState(false);
    const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);

    const inputRef = useRef<HTMLInputElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);

    const hasSearch = Boolean(onSearch);
    const searchResults = useSearchResults(query, onSearch);

    useDropdownClose(panelRef, onClose, anchorRef);

    // Two independent reasons to escape into a portal: an explicit `portal` request
    // (e.g. the anchor sits in a flex/grid container where a later sibling would
    // otherwise paint over the panel, or in an overflow:hidden ancestor that would
    // clip it), or `glass`, which *needs* to blur whatever's actually rendered behind
    // the panel — an element with backdrop-filter establishes a "backdrop root" for
    // its descendants, so a nested backdrop-filter panel can only ever sample within
    // its nearest backdrop-filter ancestor (e.g. a card or modal), never reaching past
    // it. Either way, portaling to document.body and positioning from the anchor's
    // live rect sidesteps the ancestor entirely.
    const usePortal = glass || portal;

    useLayoutEffect(() => {
        if (!usePortal) return;
        function updateRect() {
            if (anchorRef?.current) setAnchorRect(anchorRef.current.getBoundingClientRect());
        }
        updateRect();
        window.addEventListener('scroll', updateRect, true);
        window.addEventListener('resize', updateRect);
        return () => {
            window.removeEventListener('scroll', updateRect, true);
            window.removeEventListener('resize', updateRect);
        };
    }, [usePortal, anchorRef]);

    useEffect(() => {
        if (hasSearch) inputRef.current?.focus();
    }, [hasSearch]);

    const filteredOptions = (onSearch ? searchResults : options)
        .filter(
            (opt) => !excluded.includes(getOptionId(opt)),
        );

    const visibleOptions = selectedAtTop
        ? [
            ...filteredOptions.filter((opt) => selected.includes(getOptionId(opt))),
            ...filteredOptions.filter((opt) => !selected.includes(getOptionId(opt))),
        ]
        : filteredOptions;

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

    if (usePortal && !anchorRect) return null;

    const panel = (
        <div
            ref={panelRef}
            className={cn(styles.PanelWrapper, { [styles.Portal]: usePortal })}
            style={usePortal && anchorRect ? { top: anchorRect.bottom, left: anchorRect.left, width: anchorRect.width } : undefined}
        >
            <div className={cn(styles.PanelContainer, { [styles.Glass]: glass })}>
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
        </div>
    );

    return usePortal ? createPortal(panel, document.body) : panel;
}
