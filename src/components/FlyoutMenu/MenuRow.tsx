import cn from "classnames"
import {motion} from "framer-motion"

import {Button} from "../Button"
import {useMenuMeasured} from "./menuMeasuredContext"
import {MenuItem} from "./menuModel"
import {FloatingMenu} from "./useFloatingMenu"
import styles from "./FlyoutMenu.module.css"

interface Props {
    item: MenuItem
    menu: FloatingMenu
    dim?: boolean
}

const TRANSITION = {duration: 0.15, ease: [0.2, 0.7, 0.2, 1] as const}

// One selectable row of a flyout menu: icon? + label, a ▸ when it opens a
// submenu. The motion.div wrapper lets the row slide when a search re-partitions
// the list; `dim` is the non-matching half shown below the divider. `layout` stays
// off until the panel's placement lands, or the row flies in from the panel's
// mount origin (see menuMeasuredContext).
export function MenuRow({item, menu, dim}: Props) {
    const measured = useMenuMeasured()
    const sub = item.submenu

    function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
        if (sub) {
            menu.toggleSubmenuFrom(e.currentTarget, sub)
            return
        }
        if (item.disabled) return
        menu.selectItem(item)
    }

    return (
        <motion.div layout={measured} transition={TRANSITION} className={cn(styles.MenuRowContainer, dim && styles.Dim)}>
            <Button
                variant="unstyled"
                className={styles.Row}
                disabled={item.disabled}
                aria-haspopup={sub ? "menu" : undefined}
                onClick={handleClick}
                onMouseEnter={sub ? e => menu.openSubmenuFrom(e.currentTarget, sub) : undefined}
                onMouseLeave={sub ? menu.closeSubmenuSoon : undefined}
            >
                {item.icon && <span className={styles.Icon}>{item.icon}</span>}
                <span className={styles.Label}>{item.label}</span>
                {sub && <span className={styles.Arrow}>{"▸"}</span>}
            </Button>
        </motion.div>
    )
}
