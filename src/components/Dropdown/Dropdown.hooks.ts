import { useCallback, useEffect, useRef, useState } from 'react';

import type { DropdownOption } from './Dropdown.types';

export function useDropdownOpenState() {
    const [isOpen, setIsOpen] = useState(false);
    const triggerRef = useRef<HTMLButtonElement>(null);

    const toggleOpen = useCallback(() => setIsOpen((v) => !v), []);
    const close = useCallback(() => setIsOpen(false), []);

    return { isOpen, triggerRef, toggleOpen, close };
}

export function useDropdownClose(
    panelRef: React.RefObject<HTMLDivElement | null>,
    onClose: () => void,
    anchorRef?: React.RefObject<HTMLElement | null>,
) {
    useEffect(() => {
        function handleMousedown(e: MouseEvent) {
            const target = e.target as Node;
            if (panelRef.current?.contains(target)) return;
            if (anchorRef?.current?.contains(target)) return;
            onClose();
        }
        function handleKeyDown(e: KeyboardEvent) {
            if (e.key === 'Escape') onClose();
        }
        document.addEventListener('mousedown', handleMousedown, true);
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('mousedown', handleMousedown, true);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose, panelRef, anchorRef]);
}

export function useSearchResults(query: string, onSearch?: (q: string) => Promise<DropdownOption[]>) {
    const [searchResults, setSearchResults] = useState<DropdownOption[]>([]);

    useEffect(() => {
        if (!onSearch) return;
        let cancelled = false;
        onSearch(query).then((results) => {
            if (!cancelled) setSearchResults(results);
        });
        return () => {
            cancelled = true;
        };
    }, [query, onSearch]);

    return searchResults;
}
