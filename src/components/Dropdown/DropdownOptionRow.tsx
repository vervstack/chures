import cn from 'classnames';

import { getOptionLabel } from './Dropdown.types';
import type { DropdownOption } from './Dropdown.types';
import styles from './Dropdown.module.css';

interface Props {
    opt: DropdownOption;
    isSelected: boolean;
    multiSelect: boolean;
    onPick: (opt: DropdownOption) => void;
}

export function DropdownOptionRow({ opt, isSelected, multiSelect, onPick }: Props) {
    function handleMouseDown(e: React.MouseEvent) {
        e.preventDefault();
        onPick(opt);
    }

    return (
        <div
            className={cn(styles.OptionRow, isSelected && styles.Selected)}
            onMouseDown={handleMouseDown}
        >
            {multiSelect && isSelected && <span className={styles.Checkmark}>✓</span>}
            {getOptionLabel(opt)}
        </div>
    );
}
