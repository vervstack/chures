import type { ReactNode } from 'react';
import cn from 'classnames';

import { useDropdownOpenState } from './Dropdown.hooks';
import { getOptionId, resolveSelectedOptions } from './Dropdown.types';
import type { DropdownOption } from './Dropdown.types';
import { DropdownPanel } from './DropdownPanel';
import { DropdownTrigger } from './DropdownTrigger';
import styles from './Dropdown.module.css';
import { useComponentClassName } from '../../theme/useComponentClassName';

export type { DropdownOption };

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
    options?: DropdownOption[];
    value: string[];
    onChange: (value: string[]) => void;
    onSearch?: (query: string) => Promise<DropdownOption[]>;
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
    glass?: boolean;
    children?: (props: TriggerRenderProps) => ReactNode;
}

export type DropdownProps = Props;

export function Dropdown(
    {
        options = [], value, onChange, onSearch, onCreate, excluded, multiSelect = false, selectedAtTop = false, onOverflow = 'scroll', label,
        placeholder = 'select…', searchPlaceholder, emptyHint, isLoading, skeletonRowCount,
        onError, className, glass = false, children,
    }: Props) {

    const { isOpen, triggerRef, toggleOpen, close } = useDropdownOpenState();
    const resolvedClassName = useComponentClassName('Dropdown', className);

    const selectedOptions = resolveSelectedOptions(value, options);
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
                />
            )}
        </div>
    );
}
