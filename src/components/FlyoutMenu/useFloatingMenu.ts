import {RefObject, useCallback, useEffect, useRef, useState} from "react"

import {MenuItem, MenuSection} from "./menuModel"
import {MenuPlacement, Size, Viewport, positionMenu} from "./positionMenu"
import {SubmenuPlacement, positionSubmenu} from "./positionSubmenu"
import {useTrackedPlacement} from "./useTrackedPlacement"

const PAD = 8
const GAP = 8
const GRACE_MS = 150
const MAX_DEPTH = 3

type SidePlacement = Extract<SubmenuPlacement, {side: "right" | "left"}>
type SideResult = SidePlacement | "collapse" | null

export interface FloatingSubmenu {
    section: MenuSection
    placement: SidePlacement | null
}

export interface FloatingMenu {
    open: boolean
    toggle: () => void
    close: () => void
    back: () => void
    selectItem: (item: MenuItem) => void
    openSubmenuFrom: (rowEl: HTMLElement, section: MenuSection) => void
    toggleSubmenuFrom: (rowEl: HTMLElement, section: MenuSection) => void
    closeSubmenuSoon: () => void
    holdSubmenu: () => void
    frame: MenuSection | null
    menuPlacement: MenuPlacement | null
    submenu: FloatingSubmenu | null
}

interface Args {
    anchorRef: RefObject<HTMLElement | null>
    panelRef: RefObject<HTMLElement | null>
    submenuRef: RefObject<HTMLElement | null>
    open?: boolean
    onOpenChange?: (next: boolean) => void
}

function viewport(): Viewport {
    return {width: window.innerWidth, height: window.innerHeight}
}

function isPortrait(): boolean {
    return window.matchMedia("(orientation: portrait)").matches
}

function naturalSize(el: HTMLElement): Size {
    return {width: el.scrollWidth || el.offsetWidth, height: el.scrollHeight || el.offsetHeight}
}

function eqMainPlacement(a: MenuPlacement, b: MenuPlacement): boolean {
    return a.top === b.top && a.left === b.left && a.maxHeight === b.maxHeight && a.maxWidth === b.maxWidth
}

function eqSideResult(a: SidePlacement | "collapse", b: SidePlacement | "collapse"): boolean {
    if (a === "collapse" || b === "collapse") return a === b
    return a.side === b.side && a.top === b.top && a.left === b.left && a.maxHeight === b.maxHeight
}

// Live placement for the main panel: opens above the anchor (below only when it
// can't fit above) and stays glued there while the anchor moves — the trigger may
// hang off a control that autogrows, or sit in a panel that animates its layout.
// naturalSize reads scrollHeight, which stays the true content height even after
// maxHeight + overflow clamp it, so re-placing converges as async content loads in.
function useMainPlacement(
    open: boolean,
    anchorRef: RefObject<HTMLElement | null>,
    panelRef: RefObject<HTMLElement | null>,
): MenuPlacement | null {
    return useTrackedPlacement<MenuPlacement>(
        open,
        () => {
            const anchor = anchorRef.current
            const panel = panelRef.current
            if (!anchor || !panel) return null
            return positionMenu(anchor.getBoundingClientRect(), naturalSize(panel), viewport(), PAD, GAP)
        },
        eqMainPlacement,
    )
}

// Live placement for the submenu: re-derives from the trigger row's current rect and
// reports "collapse" when the panel no longer fits either side (or the viewport
// turned portrait). naturalSize reads scrollHeight so the clamped pass doesn't feed
// its own capped box back in.
function useSubmenuPlacement(
    active: boolean,
    submenuRef: RefObject<HTMLElement | null>,
    rowElRef: RefObject<HTMLElement | null>,
): SideResult {
    return useTrackedPlacement<SidePlacement | "collapse">(
        active,
        () => {
            const panel = submenuRef.current
            const row = rowElRef.current
            if (!panel || !row) return null
            const next = positionSubmenu(row.getBoundingClientRect(), naturalSize(panel), viewport(), PAD, isPortrait())
            return next.side === "collapse" ? "collapse" : next
        },
        eqSideResult,
    )
}

export function useFloatingMenu(args: Args): FloatingMenu {
    const {anchorRef, panelRef, submenuRef, open: controlledOpen, onOpenChange} = args

    const [uncontrolled, setUncontrolled] = useState(false)
    const open = controlledOpen ?? uncontrolled

    const [navStack, setNavStack] = useState<MenuSection[]>([])
    const [submenu, setSubmenu] = useState<FloatingSubmenu | null>(null)

    const rowElRef = useRef<HTMLElement | null>(null)
    const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined)

    const setOpen = useCallback((next: boolean) => {
        setUncontrolled(next)
        onOpenChange?.(next)
    }, [onOpenChange])

    const pushFrame = useCallback((section: MenuSection) => {
        setSubmenu(null)
        setNavStack(stack => (stack.length >= MAX_DEPTH ? stack : [...stack, section]))
    }, [])

    useEffect(() => {
        if (open) return
        setNavStack([])
        setSubmenu(null)
        rowElRef.current = null
        if (closeTimer.current) clearTimeout(closeTimer.current)
    }, [open])

    const openSubmenuFrom = useCallback((rowEl: HTMLElement, section: MenuSection) => {
        if (closeTimer.current) clearTimeout(closeTimer.current)
        rowElRef.current = rowEl
        if (isPortrait()) {
            pushFrame(section)
            return
        }
        setSubmenu({section, placement: null})
    }, [pushFrame])

    const toggleSubmenuFrom = useCallback((rowEl: HTMLElement, section: MenuSection) => {
        if (isPortrait()) {
            if (navStack[navStack.length - 1] === section) setNavStack(stack => stack.slice(0, -1))
            else openSubmenuFrom(rowEl, section)
            return
        }
        if (submenu && submenu.section === section) setSubmenu(null)
        else openSubmenuFrom(rowEl, section)
    }, [navStack, submenu, openSubmenuFrom])

    const closeSubmenuSoon = useCallback(() => {
        if (closeTimer.current) clearTimeout(closeTimer.current)
        closeTimer.current = setTimeout(() => setSubmenu(null), GRACE_MS)
    }, [])

    const holdSubmenu = useCallback(() => {
        if (closeTimer.current) clearTimeout(closeTimer.current)
    }, [])

    const sideResult = useSubmenuPlacement(!!submenu, submenuRef, rowElRef)
    const menuPlacement = useMainPlacement(open, anchorRef, panelRef)

    useEffect(() => {
        if (!submenu || !sideResult) return
        if (sideResult === "collapse") {
            pushFrame(submenu.section)
            return
        }
        if (submenu.placement !== sideResult) setSubmenu({section: submenu.section, placement: sideResult})
    }, [sideResult, submenu, pushFrame])

    const back = useCallback(() => setNavStack(stack => stack.slice(0, -1)), [])
    const close = useCallback(() => setOpen(false), [setOpen])
    const toggle = useCallback(() => setOpen(!open), [setOpen, open])
    const selectItem = useCallback((item: MenuItem) => {
        item.onSelect?.()
        setOpen(false)
    }, [setOpen])

    return {
        open,
        toggle,
        close,
        back,
        selectItem,
        openSubmenuFrom,
        toggleSubmenuFrom,
        closeSubmenuSoon,
        holdSubmenu,
        frame: navStack[navStack.length - 1] ?? null,
        menuPlacement,
        submenu,
    }
}
