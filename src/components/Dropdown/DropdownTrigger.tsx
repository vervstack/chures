import type { ReactNode } from 'react';
import cn from 'classnames';

import { ChevronDownIcon } from '../icons';
import { getOptionLabel } from './Dropdown.types';
import type { DropdownOption } from './Dropdown.types';
import styles from './Dropdown.module.css';

interface Props {
    triggerRef: React.RefObject<HTMLButtonElement | null>;
    isOpen: boolean;
    onClick: () => void;
    selectedOptions: DropdownOption[];
    multiSelect: boolean;
    placeholder: string;
    onOverflow?: 'scroll' | 'expand';
    // Overrides how a selected option's label renders inside the closed trigger
    // (single value or a chip), mirroring `renderOption` for the open panel's
    // rows. Omit to keep the default plain-text label (backward-compatible).
    renderValue?: (opt: DropdownOption) => ReactNode;
}

export function DropdownTrigger(
    {
        triggerRef, isOpen, onClick, selectedOptions, multiSelect, placeholder, onOverflow = 'scroll', renderValue,
    }: Props) {
    const expand = onOverflow === 'expand';
    const rich = Boolean(renderValue) && !multiSelect && selectedOptions.length === 1;

    return (
        <button
            type="button"
            ref={triggerRef}
            className={cn(
                styles.TriggerContainer,
                isOpen && styles.Open,
                multiSelect && styles.MultiSelect,
                expand && styles.ExpandHeight,
                rich && styles.RichValue,
            )}
            onClick={onClick}
            aria-expanded={isOpen}
            aria-haspopup="listbox"
        >
            {multiSelect && selectedOptions.length > 0 ? (
                <div className={cn(styles.ChipsWrapper, expand && styles.Expand)}>
                    {selectedOptions.map((opt, i) => (
                        <span key={i} className={styles.Chip}>
                            {renderValue ? renderValue(opt) : getOptionLabel(opt)}
                        </span>
                    ))}
                </div>
            ) : rich ? (
                <div className={styles.TriggerValueRich}>
                    {renderValue!(selectedOptions[0])}
                </div>
            ) : (
                <span className={selectedOptions.length === 0 ? styles.TriggerPlaceholder : styles.TriggerValue}>
                    {selectedOptions.length === 0 ? placeholder : selectedOptions.map(getOptionLabel).join(', ')}
                </span>
            )}
            <span className={styles.TriggerIcon}>
                <ChevronDownIcon size={12} />
            </span>
        </button>
    );
}
