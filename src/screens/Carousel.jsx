import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { motion } from 'framer-motion'
import { people } from '../data.js'
import ScreenHeader from '../components/ScreenHeader.jsx'
import DeckCard from '../components/DeckCard.jsx'
import BrandMark from '../components/BrandMark.jsx'

// Full-screen swipeable deck — one person per card, snap to one at a time.
// `mode === 'presenters'` filters to presenters and renders strengths;
// 'team' shows everyone with their job title.
export default function Carousel({ mode, onBack }) {
  const isPresenters = mode === 'presenters'
  // Presenters and team are mutually exclusive: presenters show only presenters,
  // the team deck shows everyone who is NOT presenting.
  const list = isPresenters
    ? people.filter((p) => p.isPresenter)
    : people.filter((p) => !p.isPresenter)
  const title = isPresenters ? 'Presenters' : 'The Team'

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'center',
    containScroll: false, // let the first/last card center so peek-edges show both sides
    skipSnaps: false,
    dragFree: false, // always snap, never free-scroll
  })
  const [selected, setSelected] = useState(0)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)

  const onSelect = useCallback((api) => {
    setSelected(api.selectedScrollSnap())
    setCanPrev(api.canScrollPrev())
    setCanNext(api.canScrollNext())
  }, [])

  useEffect(() => {
    if (!emblaApi) return
    onSelect(emblaApi)
    emblaApi.on('select', onSelect).on('reInit', onSelect)
    return () => {
      emblaApi.off('select', onSelect).off('reInit', onSelect)
    }
  }, [emblaApi, onSelect])

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])
  const scrollTo = useCallback((i) => emblaApi?.scrollTo(i), [emblaApi])

  // Desktop: arrow keys page through the deck.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') scrollPrev()
      else if (e.key === 'ArrowRight') scrollNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [scrollPrev, scrollNext])

  if (list.length === 0) {
    return (
      <div className="absolute inset-0 flex flex-col">
        <ScreenHeader title={title} onBack={onBack} />
        <Empty />
      </div>
    )
  }

  return (
    <div className="absolute inset-0 flex flex-col">
      <ScreenHeader title={title} onBack={onBack} />

      {/* Counter — tells people there's more than the one card in front of them */}
      <div className="shrink-0 px-5 pt-4 text-center">
        <span className="text-[13px] font-bold uppercase tracking-[0.16em] text-muted">
          {selected + 1} <span className="text-muted/45">/</span> {list.length}
        </span>
      </div>

      {/* Deck */}
      <div className="relative min-h-0 flex-1">
        <div className="h-full overflow-hidden px-3 py-4" ref={emblaRef}>
          <div className="flex h-full">
            {list.map((p, i) => (
              <div key={p.id} className="flex h-full min-w-0 flex-[0_0_86%] items-center px-2">
                <DeckCard person={p} variant={mode} isActive={i === selected} />
              </div>
            ))}
          </div>
        </div>

        {/* Tap arrows — make swipeability obvious for first-time venue users */}
        <Arrow side="left" onClick={scrollPrev} disabled={!canPrev} />
        <Arrow side="right" onClick={scrollNext} disabled={!canNext} />
      </div>

      {/* Dots */}
      <div
        className="flex shrink-0 items-center justify-center gap-2 px-5 pt-2"
        style={{ paddingBottom: 'max(1.1rem, env(safe-area-inset-bottom))' }}
      >
        {list.map((p, i) => (
          <button
            key={p.id}
            type="button"
            onClick={() => scrollTo(i)}
            aria-label={`Go to card ${i + 1}: ${p.name}`}
            aria-current={i === selected}
            className="grid h-7 w-7 place-items-center focus:outline-none focus-visible:rounded-full focus-visible:ring-2 focus-visible:ring-accent/60"
          >
            <span
              className={[
                'block rounded-full transition-all duration-300',
                i === selected ? 'h-2.5 w-2.5 bg-accent' : 'h-2 w-2 bg-ink/20',
              ].join(' ')}
            />
          </button>
        ))}
      </div>
    </div>
  )
}

function Arrow({ side, onClick, disabled }) {
  const isLeft = side === 'left'
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      whileTap={disabled ? undefined : { scale: 0.9 }}
      aria-label={isLeft ? 'Previous person' : 'Next person'}
      className={[
        'glass absolute top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full text-accent',
        'transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/70',
        isLeft ? 'left-2' : 'right-2',
        disabled ? 'pointer-events-none opacity-0' : 'opacity-100',
      ].join(' ')}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d={isLeft ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'}
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.button>
  )
}

function Empty() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
      <div
        className="mb-4 grid h-14 w-14 place-items-center rounded-2xl text-white shadow-[0_12px_28px_-10px_rgba(29,78,216,0.7)]"
        style={{ backgroundImage: 'linear-gradient(140deg,#2563EB,#6D28D9)' }}
      >
        <BrandMark className="h-7 w-7 text-white" />
      </div>
      <p className="font-display text-[19px] font-bold text-ink">Lineup coming soon</p>
      <p className="mt-1.5 max-w-[15rem] text-[14px] leading-relaxed text-muted">
        Today’s presenters will appear here.
      </p>
    </div>
  )
}
