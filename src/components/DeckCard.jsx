import Pill from './Pill.jsx'
import { initials, avatarBackground } from '../lib/avatar.js'

// One person, one glass card. The card HUGS ITS CONTENT — it does not stretch to
// fill the viewport (the carousel centers it vertically instead). A team card
// (avatar + name) is short; a presenter card (+ strengths) is a bit taller.
//   presenters → strengths (chips). title is ignored.
//   team       → job title. strengths are ignored.
// `isActive` drives the focus pop so the centered card reads as "live".
export default function DeckCard({ person, variant, isActive }) {
  const isPresenter = variant === 'presenters'
  const strengths = isPresenter ? person.strengths ?? [] : []

  return (
    <article
      className={[
        'glass mx-auto flex w-full max-w-[340px] max-h-full flex-col overflow-hidden rounded-[24px]',
        'transition-[transform,opacity] duration-300 ease-out',
        isActive ? 'scale-100 opacity-100' : 'scale-[0.92] opacity-40',
      ].join(' ')}
    >
      {/* Padding 32/24; scrolls internally only if a tall card meets a short
          (landscape) viewport — normal portrait never scrolls. */}
      <div className="no-scrollbar overflow-y-auto overscroll-contain px-6 py-8">
        {/* avatar → name → badge: tight, top-weighted rhythm */}
        <div className="flex flex-col items-center">
          <div
            aria-hidden="true"
            className="grid h-24 w-24 place-items-center rounded-[1.6rem] font-display text-[34px] font-extrabold text-white shadow-[inset_0_1px_4px_rgba(255,255,255,0.4),0_16px_32px_-14px_rgba(0,0,0,0.55)]"
            style={{ backgroundImage: avatarBackground(person) }}
          >
            {person.initials || initials(person.name)}
          </div>

          <h2 className="mt-4 text-center font-display text-[24px] font-extrabold leading-[1.12] tracking-tight text-ink">
            {person.name}
          </h2>

          {isPresenter ? (
            <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/15 px-3 py-1 text-[11.5px] font-bold uppercase tracking-[0.12em] text-soft">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
              Speaking today
            </span>
          ) : (
            <p className="mt-2 text-center text-[15px] font-semibold text-accent-2">
              {person.title || 'Aura Farming · Group 04'}
            </p>
          )}
        </div>

        {/* Strengths — presenters only */}
        {isPresenter && strengths.length > 0 && (
          <div className="mt-6 border-t border-white/10 pt-5">
            <h3 className="mb-3 text-[12.5px] font-bold uppercase tracking-[0.16em] text-muted">Strengths</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {strengths.map((s) => (
                <Pill key={s}>{s}</Pill>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  )
}
