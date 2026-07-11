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
}

export function DropdownTrigger(
    { triggerRef, isOpen, onClick, selectedOptions, multiSelect, placeholder, onOverflow = 'scroll' }: Props) {
    const expand = onOverflow === 'expand';

    return (
        <button
            type="button"
            ref={triggerRef}
            className={cn(
                styles.TriggerContainer,
                isOpen && styles.Open,
                multiSelect && styles.MultiSelect,
                expand && styles.ExpandHeight,
            )}
            onClick={onClick}
            aria-expanded={isOpen}
            aria-haspopup="listbox"
        >
            {multiSelect && selectedOptions.length > 0 ? (
                <div className={cn(styles.ChipsWrapper, expand && styles.Expand)}>
                    {selectedOptions.map((opt, i) => (
                        <span key={i} className={styles.Chip}>
                            {getOptionLabel(opt)}
                        </span>
                    ))}
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
