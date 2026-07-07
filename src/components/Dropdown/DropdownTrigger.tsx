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
}

export function DropdownTrigger({ triggerRef, isOpen, onClick, selectedOptions, multiSelect, placeholder }: Props) {
    return (
        <button
            type="button"
            ref={triggerRef}
            className={cn(styles.TriggerContainer, isOpen && styles.Open)}
            onClick={onClick}
            aria-expanded={isOpen}
            aria-haspopup="listbox"
        >
            {multiSelect && selectedOptions.length > 0 ? (
                <div className={styles.ChipsWrapper}>
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
