import { motion } from 'framer-motion'

// Sticky, frosted top bar with an always-obvious back affordance.
// 3-column grid keeps the title centered regardless of the back button width.
// Safe-area top padding so it clears the notch.
export default function ScreenHeader({ title, onBack }) {
  return (
    <header
      className="glass-header shrink-0 sticky top-0 z-20"
      style={{ paddingTop: 'max(0.6rem, env(safe-area-inset-top))' }}
    >
      <div className="grid h-14 grid-cols-[1fr_auto_1fr] items-center px-2">
        {onBack ? (
          <motion.button
            type="button"
            onClick={onBack}
            whileTap={{ scale: 0.92 }}
            aria-label="Go back"
            className="-ml-1 flex h-11 min-w-11 items-center gap-0.5 justify-self-start rounded-xl px-2 text-ink transition-colors active:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
          >
            <ChevronLeft />
            <span className="pr-1 text-[15px] font-semibold">Back</span>
          </motion.button>
        ) : (
          <span aria-hidden="true" />
        )}

        <h1 className="justify-self-center font-display text-[17px] font-bold tracking-tight text-ink">
          {title}
        </h1>

        <span aria-hidden="true" className="w-11 justify-self-end" />
      </div>
    </header>
  )
}

function ChevronLeft() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
