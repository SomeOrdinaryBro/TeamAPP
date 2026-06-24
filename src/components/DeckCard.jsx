import Pill from './Pill.jsx'
import { initials, avatarBackground } from '../lib/avatar.js'

// One person, one card. Same shell for both decks; the body differs:
//   presenters → strengths (chips). title is ignored.
//   team       → job title. strengths are ignored.
// `isActive` drives the focus pop — the centered card is full-size/opacity,
// neighbors (the peek slivers) sit back and dim so the eye knows which is live.
export default function DeckCard({ person, variant, isActive }) {
  const isPresenter = variant === 'presenters'
  const strengths = isPresenter ? person.strengths ?? [] : []

  return (
    <article
      className={[
        'flex h-full w-full flex-col overflow-hidden rounded-[1.9rem] bg-surface ring-1 ring-line/70',
        'shadow-[0_2px_4px_rgba(27,23,20,0.04),0_30px_60px_-30px_rgba(27,23,20,0.45)]',
        'transition-[transform,opacity] duration-300 ease-out',
        isActive ? 'scale-100 opacity-100' : 'scale-[0.92] opacity-45',
      ].join(' ')}
    >
      {/* Avatar hero */}
      <div className="flex shrink-0 flex-col items-center px-6 pb-6 pt-9">
        <div
          aria-hidden="true"
          className="grid h-28 w-28 place-items-center rounded-[1.9rem] font-display text-[40px] font-extrabold text-white shadow-[inset_0_1px_4px_rgba(255,255,255,0.4),0_18px_36px_-16px_rgba(27,23,20,0.55)]"
          style={{ backgroundImage: avatarBackground(person) }}
        >
          {person.initials || initials(person.name)}
        </div>

        <h2 className="mt-5 text-center font-display text-[27px] font-extrabold leading-[1.1] tracking-tight text-ink">
          {person.name}
        </h2>

        {isPresenter ? (
          <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-[11.5px] font-bold uppercase tracking-[0.12em] text-accent">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
            Speaking today
          </span>
        ) : (
          <p className="mt-1.5 text-center text-[15.5px] font-semibold text-accent">
            {person.title || 'Aura Farming · Group 04'}
          </p>
        )}
      </div>

      {/* Body — presenter strengths only. Scrolls inside the card if long. */}
      {isPresenter && (
        <div
          className="no-scrollbar flex-1 overflow-y-auto overscroll-contain border-t border-line/70 px-6 pt-5"
          style={{ paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))' }}
        >
          {strengths.length > 0 ? (
            <>
              <h3 className="mb-3 text-[12.5px] font-bold uppercase tracking-[0.16em] text-muted">Strengths</h3>
              <div className="flex flex-wrap gap-2">
                {strengths.map((s) => (
                  <Pill key={s}>{s}</Pill>
                ))}
              </div>
            </>
          ) : (
            <p className="text-center text-[14px] leading-relaxed text-muted/80">
              Strengths coming soon.
            </p>
          )}
        </div>
      )}
    </article>
  )
}
