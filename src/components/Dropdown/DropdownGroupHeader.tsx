import styles from './Dropdown.module.css';

interface Props {
    label: string;
}

export function DropdownGroupHeader({ label }: Props) {
    return (
        <div className={styles.GroupHeader}>
            {label}
        </div>
    );
}
