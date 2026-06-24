import { motion } from 'framer-motion'
import { app, people } from '../data.js'
import BrandMark from '../components/BrandMark.jsx'

const container = {
  animate: { transition: { staggerChildren: 0.08, delayChildren: 0.12 } },
}
const item = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 360, damping: 28 } },
}

export default function Landing({ onPresenters, onTeam }) {
  const presenterCount = people.filter((p) => p.isPresenter).length
  const teamCount = people.length - presenterCount

  return (
    <div className="absolute inset-0 flex flex-col bg-paper">
      {/* ── Gradient hero ───────────────────────────────────────────── */}
      <div
        className="grain relative overflow-hidden rounded-b-[28px] text-white shadow-[0_18px_36px_-22px_rgba(214,50,75,0.55)]"
        style={{
          paddingTop: 'max(2.75rem, calc(env(safe-area-inset-top) + 1.5rem))',
          backgroundImage: 'linear-gradient(150deg, #FF6B3D 0%, #F0492E 48%, #D6324B 100%)',
        }}
      >
        <div aria-hidden="true" className="pointer-events-none absolute -left-12 -top-16 h-56 w-56 rounded-full bg-white/20 blur-2xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 -right-10 h-56 w-56 rounded-full bg-[#F7A23B]/45 blur-2xl" />

        <div className="relative px-6 pb-9">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.05 }}
            className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/30 backdrop-blur"
          >
            <BrandMark className="h-6 w-6 text-white" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-5 text-[12.5px] font-bold uppercase tracking-[0.2em] text-white/75"
          >
            {app.subtitle}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.14 }}
            className="mt-1 font-display text-[36px] font-extrabold leading-[1.04] tracking-tight"
            style={{ textShadow: '0 1px 18px rgba(120,20,10,0.25)' }}
          >
            {app.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-2 max-w-[19rem] text-[15.5px] font-medium leading-snug text-white/90"
          >
            {app.tagline}
          </motion.p>
        </div>
      </div>

      {/* ── Two big nav cards ───────────────────────────────────────── */}
      <motion.div
        variants={container}
        initial="initial"
        animate="animate"
        className="no-scrollbar flex-1 overflow-y-auto px-5 pt-6"
        style={{ paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))' }}
      >
        <motion.p variants={item} className="mb-3 px-1 text-[12.5px] font-bold uppercase tracking-[0.16em] text-muted">
          Choose a directory
        </motion.p>

        <motion.div variants={item}>
          <NavCard
            label="Presenters"
            sub={presenterCount > 0 ? `${presenterCount} speaking today` : 'Lineup coming soon'}
            gradient="linear-gradient(140deg,#F0492E,#D6324B)"
            onClick={onPresenters}
            icon={<MicIcon />}
          />
        </motion.div>

        <motion.div variants={item} className="mt-4">
          <NavCard
            label="The Team"
            sub={`${teamCount} people · Group 04`}
            gradient="linear-gradient(140deg,#F7A23B,#F0492E)"
            onClick={onTeam}
            icon={<PeopleIcon />}
          />
        </motion.div>

        <motion.p variants={item} className="mx-auto mt-8 max-w-[17rem] text-center text-[12.5px] leading-relaxed text-muted/80">
          Tip: tap <span className="font-semibold text-ink/70">Share → Add to Home Screen</span> to install it like a native app.
        </motion.p>
      </motion.div>
    </div>
  )
}

function NavCard({ label, sub, gradient, onClick, icon }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
      className="group flex w-full items-center gap-4 rounded-card bg-surface p-5 text-left shadow-[0_1px_2px_rgba(27,23,20,0.04),0_20px_44px_-26px_rgba(27,23,20,0.4)] ring-1 ring-line/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
    >
      <span
        aria-hidden="true"
        className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-white shadow-[0_8px_18px_-8px_rgba(240,73,46,0.6)]"
        style={{ backgroundImage: gradient }}
      >
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-display text-[21px] font-extrabold leading-tight text-ink">{label}</span>
        <span className="mt-0.5 block text-[14px] text-muted">{sub}</span>
      </span>
      <Arrow />
    </motion.button>
  )
}

function Arrow() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0 text-ink/25 transition-transform group-active:translate-x-0.5">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function MicIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="9" y="2.5" width="6" height="11" rx="3" stroke="currentColor" strokeWidth="2" />
      <path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21M8.5 21h7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function PeopleIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="9" cy="8" r="3.2" stroke="currentColor" strokeWidth="2" />
      <path d="M3.5 19a5.5 5.5 0 0 1 11 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M16 5.2a3.2 3.2 0 0 1 0 5.6M17.5 19a5.5 5.5 0 0 0-3-4.9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}
