import {RefObject, useRef} from "react"
import {createPortal} from "react-dom"
import {AnimatePresence, motion} from "framer-motion"

import {FlyoutPanel} from "./FlyoutPanel"
import {MenuMeasuredContext} from "./menuMeasuredContext"
import {MenuItem, MenuSection} from "./menuModel"
import {useFloatingMenu} from "./useFloatingMenu"
import styles from "./FlyoutMenu.module.css"

const MENU_TRANSITION = {duration: 0.15, ease: [0.2, 0.7, 0.2, 1] as const}

interface Props {
    anchorRef: RefObject<HTMLElement | null>
    open: boolean
    onClose: () => void
    items: MenuItem[]
    rootTitle?: string
    skeletonCount?: number
    // Opt the root list in to type-to-search. Submenus opt in via their own
    // MenuSection.searchable.
    searchable?: boolean
}

export type FlyoutMenuProps = Props

// Viewport-aware flyout menu. Portals a backdrop + a bottom-anchored panel to
// document.body, measures itself once hidden to place it inside the viewport, and
// either flies a nested submenu out to the side or — when it wouldn't fit, or on a
// portrait screen — drills it into the same panel as a back-navigable frame.
export function FlyoutMenu(props: Props) {
    const {anchorRef, open, onClose, items, rootTitle, skeletonCount} = props
    const panelRef = useRef<HTMLDivElement>(null)
    const submenuRef = useRef<HTMLDivElement>(null)

    function handleOpenChange(next: boolean) {
        if (!next) onClose()
    }

    const menu = useFloatingMenu({anchorRef, panelRef, submenuRef, open, onOpenChange: handleOpenChange})

    const mainSection: MenuSection = menu.frame ?? {title: rootTitle, items, searchable: props.searchable}
    const main = menu.menuPlacement
    const sub = menu.submenu?.placement ?? null

    return createPortal(
        <div className={styles.FlyoutMenuContainer}>
            {open && <div className={styles.Backdrop} onClick={onClose}/>}
            {/* AnimatePresence needs its animated child directly beneath it — a createPortal()
                value can't be an AnimatePresence child, so the wrapper is portaled and
                AnimatePresence nested inside, which is what lets the exit animation run. */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        ref={panelRef}
                        key="flyout-panel"
                        className={styles.Panel}
                        style={main
                            ? {top: main.top, left: main.left, maxHeight: main.maxHeight, maxWidth: main.maxWidth}
                            : {visibility: "hidden"}}
                        initial={{opacity: 0, scale: 0.94, y: 6}}
                        animate={{opacity: 1, scale: 1, y: 0}}
                        exit={{opacity: 0, scale: 0.94, y: 6}}
                        transition={MENU_TRANSITION}
                    >
                        <MenuMeasuredContext.Provider value={!!main}>
                            <FlyoutPanel
                                section={mainSection}
                                menu={menu}
                                onBack={menu.frame ? menu.back : undefined}
                                skeletonCount={skeletonCount}
                                active={!menu.submenu}
                            />
                        </MenuMeasuredContext.Provider>
                    </motion.div>
                )}
            </AnimatePresence>
            <AnimatePresence>
                {open && menu.submenu && (
                    <motion.div
                        ref={submenuRef}
                        key="flyout-submenu"
                        className={styles.Submenu}
                        style={sub
                            ? {top: sub.top, left: sub.left, maxHeight: sub.maxHeight}
                            : {visibility: "hidden"}}
                        onMouseEnter={menu.holdSubmenu}
                        onMouseLeave={menu.closeSubmenuSoon}
                        initial={{opacity: 0, scale: 0.94, x: 6}}
                        animate={{opacity: 1, scale: 1, x: 0}}
                        exit={{opacity: 0, scale: 0.94, x: 6}}
                        transition={MENU_TRANSITION}
                    >
                        <MenuMeasuredContext.Provider value={!!sub}>
                            <FlyoutPanel
                                section={menu.submenu.section}
                                menu={menu}
                                skeletonCount={skeletonCount}
                                active
                            />
                        </MenuMeasuredContext.Provider>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>,
        document.body,
    )
}
