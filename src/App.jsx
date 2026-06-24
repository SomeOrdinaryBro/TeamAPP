import { useEffect } from 'react'
import { AnimatePresence, motion, MotionConfig } from 'framer-motion'
import { useNavStack } from './hooks/useNavStack.js'
import { screenVariants, screenTransition } from './screens/screenVariants.js'
import Landing from './screens/Landing.jsx'
import Carousel from './screens/Carousel.jsx'

export default function App() {
  const { current, depth, direction, push, back } = useNavStack({ name: 'landing' })

  // Esc = back, for desktop visitors.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && depth > 1) back()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [depth, back])

  function renderScreen(screen) {
    switch (screen.name) {
      case 'landing':
        return (
          <Landing
            onPresenters={() => push({ name: 'deck', mode: 'presenters' })}
            onTeam={() => push({ name: 'deck', mode: 'team' })}
          />
        )
      case 'deck':
        return <Carousel mode={screen.mode} onBack={back} />
      default:
        return null
    }
  }

  return (
    <MotionConfig reducedMotion="user">
      {/* Neutral backdrop keeps desktop from looking broken; on phones the app
          column goes full-bleed and the backdrop is never seen. */}
      <div className="app-backdrop flex min-h-dvh w-full items-stretch justify-center sm:items-center sm:py-6">
        <div className="relative h-dvh w-full overflow-hidden bg-paper sm:h-[min(900px,calc(100dvh-3rem))] sm:max-w-[480px] sm:rounded-[2.2rem] sm:shadow-[0_40px_80px_-30px_rgba(27,23,20,0.5)] sm:ring-1 sm:ring-black/5">
          <AnimatePresence custom={direction} initial={false}>
            <motion.div
              key={current.uid}
              custom={direction}
              variants={screenVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={screenTransition}
              className="absolute inset-0"
            >
              {renderScreen(current)}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </MotionConfig>
  )
}
