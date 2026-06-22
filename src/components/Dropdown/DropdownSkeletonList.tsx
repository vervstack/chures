import styles from './Dropdown.module.css';

interface Props {
    count: number;
}

export function DropdownSkeletonList({ count }: Props) {
    return (
        <>
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className={styles.SkeletonRow} />
            ))}
        </>
    );
}
