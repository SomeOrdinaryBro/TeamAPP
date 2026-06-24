import { motion } from 'framer-motion'
import { app, people } from '../data.js'
import BrandMark from '../components/BrandMark.jsx'

const container = {
  animate: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
}
const item = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 360, damping: 28 } },
}

export default function Landing({ onPresenters, onTeam }) {
  const presenterCount = people.filter((p) => p.isPresenter).length
  const teamCount = people.length - presenterCount

  return (
    <div className="absolute inset-0 flex flex-col">
      <motion.div
        variants={container}
        initial="initial"
        animate="animate"
        className="no-scrollbar flex flex-1 flex-col overflow-y-auto px-6"
        style={{
          paddingTop: 'max(3rem, calc(env(safe-area-inset-top) + 2rem))',
          paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))',
        }}
      >
        {/* ── Title / header ─────────────────────────────────────────── */}
        <motion.div
          variants={item}
          className="glass inline-flex h-14 w-14 items-center justify-center rounded-2xl"
        >
          <BrandMark className="h-7 w-7 text-ink" />
        </motion.div>

        <motion.p variants={item} className="mt-6 text-[12.5px] font-bold uppercase tracking-[0.2em] text-muted">
          {app.subtitle}
        </motion.p>
        <motion.h1
          variants={item}
          className="mt-1 font-display font-extrabold leading-[1.04] tracking-tight text-ink"
          style={{ fontSize: 'clamp(34px, 11vw, 44px)' }}
        >
          {app.title}
        </motion.h1>
        <motion.p variants={item} className="mt-2 max-w-[20rem] text-[15.5px] font-medium leading-snug text-soft">
          {app.tagline}
        </motion.p>

        {/* ── Two big glass nav buttons ──────────────────────────────── */}
        <div className="mt-9 flex flex-col gap-4">
          <motion.div variants={item}>
            <NavButton
              label="Presenters"
              sub={presenterCount > 0 ? `${presenterCount} speaking today` : 'Lineup coming soon'}
              onClick={onPresenters}
              icon={<MicIcon />}
            />
          </motion.div>

          <motion.div variants={item}>
            <NavButton
              label="The Team"
              sub={`${teamCount} people · Group 04`}
              onClick={onTeam}
              icon={<PeopleIcon />}
            />
          </motion.div>
        </div>

        <motion.p variants={item} className="mx-auto mt-auto max-w-[18rem] pt-8 text-center text-[12.5px] leading-relaxed text-muted">
          Tip: tap <span className="font-semibold text-soft">Share → Add to Home Screen</span> to install it like a native app.
        </motion.p>
      </motion.div>
    </div>
  )
}

function NavButton({ label, sub, onClick, icon }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
      className="glass group flex w-full items-center gap-4 rounded-[24px] p-5 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
    >
      <span
        aria-hidden="true"
        className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-white shadow-[0_10px_22px_-10px_rgba(29,78,216,0.7)]"
        style={{ backgroundImage: 'linear-gradient(140deg,#2563EB,#6D28D9)' }}
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
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0 text-soft/50 transition-transform group-active:translate-x-0.5">
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
