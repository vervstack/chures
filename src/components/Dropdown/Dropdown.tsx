import type { ReactNode } from 'react';
import cn from 'classnames';

import { useDropdownOpenState } from './Dropdown.hooks';
import { getOptionId, resolveSelectedOptions } from './Dropdown.types';
import type { DropdownOption } from './Dropdown.types';
import { DropdownPanel } from './DropdownPanel';
import { DropdownTrigger } from './DropdownTrigger';
import styles from './Dropdown.module.css';

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
    placeholder?: string;
    searchPlaceholder?: string;
    emptyHint?: string;
    isLoading?: boolean;
    skeletonRowCount?: number;
    onError?: (err: unknown) => void;
    className?: string;
    children?: (props: TriggerRenderProps) => ReactNode;
}

export type DropdownProps = Props;

export function Dropdown(
    {
        options = [], value, onChange, onSearch, onCreate, excluded, multiSelect = false,
        placeholder = 'select…', searchPlaceholder, emptyHint, isLoading, skeletonRowCount,
        onError, className, children,
    }: Props) {

    const { isOpen, triggerRef, toggleOpen, close } = useDropdownOpenState();

    const selectedOptions = resolveSelectedOptions(value, options);

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
        <div className={cn(styles.DropdownContainer, className)}>
            {children
                ? children({ selectedOptions, isOpen, toggleOpen, close, triggerProps })
                : (
                    <DropdownTrigger
                        triggerRef={triggerRef}
                        isOpen={isOpen}
                        onClick={toggleOpen}
                        selectedOptions={selectedOptions}
                        multiSelect={multiSelect}
                        placeholder={placeholder}
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
                    selected={value}
                    placeholder={searchPlaceholder}
                    emptyHint={emptyHint}
                    isLoading={isLoading}
                    skeletonRowCount={skeletonRowCount}
                    onError={onError}
                />
            )}
        </div>
    );
}
