import { useCallback, useEffect, useState } from 'react'

// In-memory navigation stack (no router, no persistence — exactly what a
// 3-levels-deep QR-scanned app needs). Each push also adds a browser history
// entry so the hardware/Android back button and gesture work and the user is
// never trapped. All pops funnel through the single popstate handler.

let _uid = 0

export function useNavStack(initial) {
  const [stack, setStack] = useState(() => [{ uid: _uid++, ...initial }])
  const [direction, setDirection] = useState(0) // 1 = forward (push), -1 = back (pop)

  const push = useCallback((screen) => {
    setDirection(1)
    setStack((s) => [...s, { uid: _uid++, ...screen }])
    window.history.pushState({ depth: Date.now() }, '')
  }, [])

  // The on-screen back button delegates to history so there's one code path.
  const back = useCallback(() => {
    window.history.back()
  }, [])

  useEffect(() => {
    const onPop = () => {
      setDirection(-1)
      setStack((s) => (s.length > 1 ? s.slice(0, -1) : s))
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  return {
    current: stack[stack.length - 1],
    depth: stack.length,
    direction,
    push,
    back,
  }
}
