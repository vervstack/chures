import {createContext, useContext} from "react"

// While a flyout panel is still resolving its viewport placement, the rows inside
// it must not run framer `layout` animations. The panel mounts at its static
// origin and only gets its real top/left a beat later (then keeps shifting as
// useTrackedPlacement follows the anchor); a `layout` row reads that jump as its
// own move and flies in from the old spot. Each panel publishes here whether its
// placement has landed, and MenuRow / a consumer's own rows gate `layout` on it —
// so the only moves that animate are real in-panel ones (the search re-partition).
export const MenuMeasuredContext = createContext(true)

export function useMenuMeasured(): boolean {
    return useContext(MenuMeasuredContext)
}
