import cn from 'classnames';

import { getOptionDisabled, getOptionLabel, getOptionTitle } from './Dropdown.types';
import type { DropdownOption } from './Dropdown.types';
import styles from './Dropdown.module.css';

interface Props {
    opt: DropdownOption;
    isSelected: boolean;
    multiSelect: boolean;
    onPick: (opt: DropdownOption) => void;
    indented?: boolean;
}

export function DropdownOptionRow({ opt, isSelected, multiSelect, onPick, indented = false }: Props) {
    const disabled = getOptionDisabled(opt);

    function handleMouseDown(e: React.MouseEvent) {
        e.preventDefault();
        if (disabled) return;
        onPick(opt);
    }

    return (
        <div
            className={cn(styles.OptionRow, isSelected && styles.Selected, indented && styles.Indented, disabled && styles.Disabled)}
            onMouseDown={handleMouseDown}
            title={getOptionTitle(opt)}
        >
            {multiSelect && isSelected && <span className={styles.Checkmark}>✓</span>}
            {getOptionLabel(opt)}
        </div>
    );
}
