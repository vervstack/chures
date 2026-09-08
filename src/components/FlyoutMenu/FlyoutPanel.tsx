import {ReactNode, useEffect, useMemo} from "react"
import {AnimatePresence} from "framer-motion"

import {Button} from "../Button"
import {MenuList} from "./MenuList"
import {MenuSkeleton} from "./MenuSkeleton"
import {MenuSearchField} from "./MenuSearchField"
import {partitionBySubstring} from "./partitionBySubstring"
import {useTypeToSearch} from "./useTypeToSearch"
import {MenuSection, menuItemText} from "./menuModel"
import {FloatingMenu} from "./useFloatingMenu"
import styles from "./FlyoutMenu.module.css"

interface Props {
    section: MenuSection
    menu: FloatingMenu
    onBack?: () => void
    skeletonCount?: number
    // Whether this panel is the one that should capture type-to-search keystrokes
    // — false for the main panel while a submenu is flown out.
    active?: boolean
}

// Fills one flyout panel: an optional back row (when this section was drilled into
// the main panel), an optional type-to-search field, then a skeleton while
// loading, an arbitrary node via renderPanel, or the section's rows.
export function FlyoutPanel({section, menu, onBack, skeletonCount, active}: Props) {
    const searchable = !!section.searchable && !!section.items
    const {query, setQuery} = useTypeToSearch(!!active && searchable)

    useEffect(() => setQuery(""), [section, setQuery])

    const {matches, rest} = useMemo(
        () => partitionBySubstring(section.items ?? [], query, menuItemText),
        [section.items, query],
    )

    const heading = onBack ? undefined : section.title

    let body: ReactNode
    if (section.loading) body = <MenuSkeleton count={skeletonCount}/>
    else if (section.renderPanel) body = section.renderPanel()
    else if (searchable) body = <MenuList items={matches} rest={rest} menu={menu} heading={heading}/>
    else body = <MenuList items={section.items ?? []} menu={menu} heading={heading}/>

    return (
        <div className={styles.FlyoutPanelContainer}>
            {onBack && (
                <Button variant="unstyled" className={styles.Back} onClick={onBack}>
                    <span className={styles.Chevron}>{"‹"}</span>
                    {section.title ?? "Back"}
                </Button>
            )}
            {searchable && (
                <AnimatePresence>
                    {query !== "" && <MenuSearchField value={query} onChange={setQuery}/>}
                </AnimatePresence>
            )}
            {body}
        </div>
    )
}
