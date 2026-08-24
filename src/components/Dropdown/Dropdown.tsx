import type { ReactNode } from 'react';
import cn from 'classnames';

import { useDropdownOpenState } from './Dropdown.hooks';
import { flattenItems, getOptionId, resolveSelectedOptions } from './Dropdown.types';
import type { DropdownItem, DropdownOption, DropdownOptionGroup, RenderOptionState } from './Dropdown.types';
import { DropdownPanel } from './DropdownPanel';
import { DropdownTrigger } from './DropdownTrigger';
import styles from './Dropdown.module.css';
import { useComponentClassName } from '../../theme/useComponentClassName';

export type { DropdownOption, DropdownItem, DropdownOptionGroup, RenderOptionState };

interface TriggerRenderProps {
    selectedOptions: DropdownOption[];
    isOpen: boolean;
    toggleOpen: () => void;
    close: () => void;
    triggerProps: {
        ref: React.RefObject<HTMLButtonElement | null>;
        onClick: () => void;
        'aria-expanded': boolean;
        'aria-haspopup': 'listbox';
    };
}

interface Props {
    options?: DropdownItem[];
    value: string[];
    onChange: (value: string[]) => void;
    onSearch?: (query: string) => Promise<DropdownItem[]>;
    onCreate?: (name: string) => Promise<DropdownOption>;
    excluded?: string[];
    multiSelect?: boolean;
    selectedAtTop?: boolean;
    onOverflow?: 'scroll' | 'expand';
    label?: string;
    placeholder?: string;
    searchPlaceholder?: string;
    emptyHint?: string;
    isLoading?: boolean;
    skeletonRowCount?: number;
    onError?: (err: unknown) => void;
    className?: string;
    // Frosted-glass look for the open panel: translucent background + backdrop
    // blur + a soft glow, themeable via --chures-dropdown-glass-* (see theme.css).
    // Implies `portal` below (a glass panel must escape via portal regardless
    // to blur the real content behind it — see DropdownPanel.tsx).
    glass?: boolean;
    // Renders the open panel via a portal to document.body, positioned from the
    // anchor's live getBoundingClientRect(), instead of a plain `position: absolute`
    // inside this component. Use when an ancestor would otherwise clip the panel
    // (overflow: hidden) or paint over it (a flex/grid container where a later
    // sibling item paints over an earlier item's overflowing content, regardless of
    // the panel's own position/z-index — see the "Never use z-index" flex/grid
    // gotcha in consuming apps' style guides). Does not change the panel's look.
    portal?: boolean;
    // Fully overrides how a single leaf option row renders (icon, layout, custom
    // affordances, etc). chures still owns search/selection/grouping/positioning —
    // this only swaps the row's own markup. Receives the pre-bound `onPick` for
    // that option, so a custom renderer never re-implements the multiSelect/close
    // logic in Dropdown/DropdownPanel's own handlePick. Omit to keep the default
    // DropdownOptionRow rendering (fully backward-compatible).
    renderOption?: (opt: DropdownOption, state: RenderOptionState) => ReactNode;
    children?: (props: TriggerRenderProps) => ReactNode;
}

export type DropdownProps = Props;

export function Dropdown(
    {
        options = [], value, onChange, onSearch, onCreate, excluded, multiSelect = false, selectedAtTop = false, onOverflow = 'scroll', label,
        placeholder = 'select…', searchPlaceholder, emptyHint, isLoading, skeletonRowCount,
        onError, className, glass = false, portal = false, renderOption, children,
    }: Props) {

    const { isOpen, triggerRef, toggleOpen, close } = useDropdownOpenState();
    const resolvedClassName = useComponentClassName('Dropdown', className);

    const selectedOptions = resolveSelectedOptions(value, flattenItems(options));
    const lifted = isOpen || selectedOptions.length > 0;
    const triggerPlaceholder = label && !lifted ? '' : placeholder;

    function handlePick(opt: DropdownOption) {
        const id = getOptionId(opt);
        onChange(
            multiSelect
                ? value.includes(id) ? value.filter((v) => v !== id) : [...value, id]
                : [id],
        );
    }

    const triggerProps = {
        ref: triggerRef,
        onClick: toggleOpen,
        'aria-expanded': isOpen,
        'aria-haspopup': 'listbox' as const,
    };

    return (
        <div className={cn(styles.DropdownContainer, resolvedClassName)}>
            {label && (
                <label className={cn(styles.Label, { [styles.lifted]: lifted })}>
                    {label}
                </label>
            )}
            {children
                ? children({ selectedOptions, isOpen, toggleOpen, close, triggerProps })
                : (
                    <DropdownTrigger
                        triggerRef={triggerRef}
                        isOpen={isOpen}
                        onClick={toggleOpen}
                        selectedOptions={selectedOptions}
                        multiSelect={multiSelect}
                        onOverflow={onOverflow}
                        placeholder={triggerPlaceholder}
                    />
                )}
            {isOpen && (
                <DropdownPanel
                    options={options}
                    onSearch={onSearch}
                    onCreate={onCreate}
                    onPick={handlePick}
                    onClose={close}
                    anchorRef={triggerRef}
                    excluded={excluded}
                    multiSelect={multiSelect}
                    selectedAtTop={selectedAtTop}
                    selected={value}
                    placeholder={searchPlaceholder}
                    emptyHint={emptyHint}
                    isLoading={isLoading}
                    skeletonRowCount={skeletonRowCount}
                    onError={onError}
                    glass={glass}
                    portal={portal}
                    renderOption={renderOption}
                />
            )}
        </div>
    );
}
