import {MenuRow} from "./MenuRow"
import {MenuItem} from "./menuModel"
import {FloatingMenu} from "./useFloatingMenu"
import styles from "./FlyoutMenu.module.css"

interface Props {
    items: MenuItem[]
    menu: FloatingMenu
    heading?: string
    rest?: MenuItem[]
}

// The rows of one section: an optional heading, then each item as a MenuRow. When
// a search is active `rest` holds the non-matching items — shown dimmed below a
// divider, still selectable.
export function MenuList({items, menu, heading, rest}: Props) {
    const hasRest = !!rest && rest.length > 0

    return (
        <div className={styles.MenuListContainer}>
            {heading && <span className={styles.Heading}>{heading}</span>}
            {items.map(item => <MenuRow key={item.key} item={item} menu={menu}/>)}
            {hasRest && <div className={styles.Divider}/>}
            {rest?.map(item => <MenuRow key={item.key} item={item} menu={menu} dim/>)}
        </div>
    )
}
