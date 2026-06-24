// iOS-style push/pop slide. The incoming screen slides in from the right while
// the outgoing one parallaxes left and dims (and vice-versa on back). The
// `custom` prop carries the direction (1 forward, -1 back).

export const screenVariants = {
  enter: (dir) => ({
    x: dir >= 0 ? '100%' : '-28%',
    opacity: dir >= 0 ? 1 : 0.55,
  }),
  center: { x: '0%', opacity: 1 },
  exit: (dir) => ({
    x: dir >= 0 ? '-28%' : '100%',
    opacity: dir >= 0 ? 0.55 : 1,
  }),
}

// The classic iOS sheet easing — snappy out, soft settle.
export const screenTransition = {
  type: 'tween',
  ease: [0.32, 0.72, 0, 1],
  duration: 0.42,
}
