import { useEffect } from 'react'
import { AnimatePresence, motion, MotionConfig } from 'framer-motion'
import { useNavStack } from './hooks/useNavStack.js'
import { screenVariants, screenTransition } from './screens/screenVariants.js'
import Landing from './screens/Landing.jsx'
import Carousel from './screens/Carousel.jsx'
import MeshBackground from './components/MeshBackground.jsx'

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
      {/* Layer 1: the mesh fills the ENTIRE viewport so big screens don't look
          like a tall phone on a white wall. The content column floats on top. */}
      <MeshBackground />

      <div className="relative z-10 flex min-h-dvh w-full justify-center">
        {/* Transparent column — caps at 520px on desktop, full-bleed on phones.
            The mesh shows through every gap between glass surfaces. */}
        <div className="relative h-dvh w-full overflow-hidden sm:max-w-[520px]">
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
