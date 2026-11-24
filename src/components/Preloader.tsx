import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { getLenis } from '../hooks/useLenis'

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(0)
  const [show, setShow] = useState(true)

  useEffect(() => {
    getLenis()?.stop()
    const start = performance.now()
    const dur = 1800
    let raf = 0
    const tick = (t: number) => {
      const p = Math.min((t - start) / dur, 1)
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * 100))
      if (p < 1) raf = requestAnimationFrame(tick)
      else setTimeout(() => setShow(false), 250)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <AnimatePresence onExitComplete={() => { getLenis()?.start(); onDone() }}>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-ink p-6 text-cream md:p-10"
          exit={{ y: '-100%' }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex justify-between text-xs tracking-[0.3em] uppercase">
            <span>Portfolio</span>
            <span>2026</span>
          </div>
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="font-display text-2xl text-brand-light md:text-3xl"
            >
              Trisha Mishra — Full-Stack Developer
            </motion.p>
            <div className="mt-6 h-px w-full overflow-hidden bg-cream/20">
              <div className="h-full bg-brand transition-[width] duration-100" style={{ width: `${count}%` }} />
            </div>
          </div>
          <div className="text-right font-display text-[22vw] leading-none font-black tabular-nums md:text-[14vw]">
            {String(count).padStart(3, '0')}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
