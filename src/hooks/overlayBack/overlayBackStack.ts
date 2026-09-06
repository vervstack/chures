// Framework-free by design -- no React import, no consumer-app types. Coordinates
// the mobile "swipe from edge" back gesture (and the hardware/browser back button)
// across every open overlay (dialog, drawer, sheet, ...) on the page, regardless of
// which component opened it.
//
// Each open overlay level registers one entry here and gets one matching browser
// history entry pushed. A single shared popstate listener always closes the
// *topmost* entry -- so nesting (e.g. a drawer opened from inside a dialog) closes
// one level at a time, innermost first, in the order things were actually opened,
// instead of every open overlay's own listener reacting to the same back gesture.
//
// Most consumers won't call this module directly -- see useBackableOverlay for the
// React binding. It's exported separately for anything that needs to manage more
// than one overlay level itself (e.g. a dialog that keeps its own back/forward
// stack of swapped contents).

export type OverlayBackHandle = number

interface StackEntry {
    handle: OverlayBackHandle
    onBack: () => void
}

const stack: StackEntry[] = []
let nextHandle = 1
let listenerAttached = false

// Incremented right before we call history.back() ourselves (an overlay closing
// via its own UI, not the back gesture) and decremented by the popstate that
// causes -- lets handlePopState tell "we did this" apart from a real back press
// without needing to inspect event/state payloads, which browsers don't guarantee.
let pendingProgrammaticPops = 0

function handlePopState() {
    if (pendingProgrammaticPops > 0) {
        pendingProgrammaticPops -= 1
        return
    }

    const top = stack.pop()
    detachListenerIfIdle()
    if (top) top.onBack()
}

function attachListenerIfNeeded() {
    if (listenerAttached) return
    listenerAttached = true
    window.addEventListener('popstate', handlePopState)
}

function detachListenerIfIdle() {
    if (stack.length > 0 || !listenerAttached) return
    listenerAttached = false
    window.removeEventListener('popstate', handlePopState)
}

// Registers one overlay level. Pushes a browser history entry so the next back
// gesture has something of ours to consume instead of leaving the page. Returns a
// handle to pass to popOverlayBack once this level closes.
export function pushOverlayBack(onBack: () => void): OverlayBackHandle {
    const handle = nextHandle++
    stack.push({ handle, onBack })
    attachListenerIfNeeded()
    window.history.pushState({ churesOverlayBackHandle: handle }, '')
    return handle
}

// Unregisters one overlay level closed by anything other than the back gesture
// (an X button, a backdrop click, Escape, unmounting). Consumes the matching
// history entry via history.back() so the browser's back stack doesn't grow by one
// for every overlay opened this session. A no-op if the handle was already popped
// by a real back gesture.
export function popOverlayBack(handle: OverlayBackHandle) {
    const index = stack.findIndex(entry => entry.handle === handle)
    if (index === -1) return

    stack.splice(index, 1)
    detachListenerIfIdle()
    pendingProgrammaticPops += 1
    window.history.back()
}
