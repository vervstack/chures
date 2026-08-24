import { Fragment, useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import cn from 'classnames';

import { useDropdownClose, useSearchResults } from './Dropdown.hooks';
import { flattenItems, getOptionId, getOptionLabel, isGroupOption } from './Dropdown.types';
import type { DropdownItem, DropdownOption, RenderOptionState } from './Dropdown.types';
import { DropdownCreateRow } from './DropdownCreateRow';
import { DropdownGroupHeader } from './DropdownGroupHeader';
import { DropdownOptionRow } from './DropdownOptionRow';
import { DropdownSearchRow } from './DropdownSearchRow';
import { DropdownSkeletonList } from './DropdownSkeletonList';
import styles from './Dropdown.module.css';

interface Props {
    options?: DropdownItem[];
    onSearch?: (query: string) => Promise<DropdownItem[]>;
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
    renderOption?: (opt: DropdownOption, state: RenderOptionState) => ReactNode;
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
        renderOption,
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

    // Group-aware exclusion: a leaf is dropped by the existing excluded check; a group
    // is filtered leaf-by-leaf and dropped entirely once it has no leaves left, but
    // otherwise keeps its original top-level position (relative to flat leaves) —
    // that ordering choice belongs to whatever data the caller supplies, not to this
    // filtering step.
    const filteredItems: DropdownItem[] = (onSearch ? searchResults : options).flatMap((item): DropdownItem[] => {
        if (isGroupOption(item)) {
            const leaves = item.options.filter((opt) => !excluded.includes(getOptionId(opt)));
            return leaves.length > 0 ? [{ ...item, options: leaves }] : [];
        }
        return excluded.includes(getOptionId(item)) ? [] : [item];
    });

    // selectedAtTop only reorders flat top-level leaves (selected-first/rest); any
    // group item keeps its original relative position. Pulling a selected leaf out
    // of a group to the top is a deliberate scope limit, not a bug — groups are a
    // caller-authored structure and this component doesn't reshape them.
    const visibleItems: DropdownItem[] = selectedAtTop
        ? [
            ...filteredItems.filter((item) => !isGroupOption(item) && selected.includes(getOptionId(item))),
            ...filteredItems.filter((item) => isGroupOption(item) || !selected.includes(getOptionId(item))),
        ]
        : filteredItems;

    const visibleOptions = flattenItems(visibleItems);

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
                            {visibleItems.map((item) => (
                                isGroupOption(item) ? (
                                    <Fragment key={`group:${item.group}`}>
                                        <DropdownGroupHeader label={item.group} />
                                        {item.options.map((opt) => (
                                            <Fragment key={getOptionId(opt)}>
                                                {renderOption ? renderOption(opt, {
                                                    isSelected: selected.includes(getOptionId(opt)),
                                                    multiSelect,
                                                    indented: true,
                                                    onPick: () => handlePick(opt),
                                                }) : (
                                                    <DropdownOptionRow
                                                        opt={opt}
                                                        isSelected={selected.includes(getOptionId(opt))}
                                                        multiSelect={multiSelect}
                                                        onPick={handlePick}
                                                        indented
                                                    />
                                                )}
                                            </Fragment>
                                        ))}
                                    </Fragment>
                                ) : (
                                    <Fragment key={getOptionId(item)}>
                                        {renderOption ? renderOption(item, {
                                            isSelected: selected.includes(getOptionId(item)),
                                            multiSelect,
                                            indented: false,
                                            onPick: () => handlePick(item),
                                        }) : (
                                            <DropdownOptionRow
                                                opt={item}
                                                isSelected={selected.includes(getOptionId(item))}
                                                multiSelect={multiSelect}
                                                onPick={handlePick}
                                            />
                                        )}
                                    </Fragment>
                                )
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
