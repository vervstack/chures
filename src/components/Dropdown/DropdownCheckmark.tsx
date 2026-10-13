import cn from 'classnames';

import styles from './Dropdown.module.css';

interface Props {
    isChecked: boolean;
}

export function DropdownCheckmark({ isChecked }: Props) {
    return (
        <span className={cn(styles.CheckSlot, isChecked && styles.Checked)} aria-hidden="true">
            <svg className={styles.CheckIcon} viewBox="0 0 12 12" width="12" height="12" fill="none">
                <path d="M2 6.5 L4.75 9 L10 3.5" pathLength="1" />
            </svg>
        </span>
    );
}
