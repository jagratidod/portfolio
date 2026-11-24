import { useRef, useState } from 'react'
import { motion, useMotionValueEvent, useScroll, useTransform, type MotionValue } from 'framer-motion'
import ProfilePhoto from './ProfilePhoto'
import { scrollToId } from '../hooks/useLenis'

const WORD = 'PORTFOLIO'

function Letter({ ch, i, progress }: { ch: string; i: number; progress: MotionValue<number> }) {
  // letters fill one after another: light → bold, left to right
  const s = 0.03 + i * 0.055
  const e = s + 0.3
  const color = useTransform(progress, [s, e], ['#dbe3ff', '#2748f0'])
  const fontWeight = useTransform(progress, [s, e], [150, 900])
  const y = useTransform(progress, [s, e], [30, 0])
  return (
    <motion.span style={{ color, fontWeight, y }} className="inline-block">
      {ch}
    </motion.span>
  )
}

/** Pinned for ~3 screens of scrolling: the giant word fills from light to bold, then the page moves on. */
export default function Intro() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const [stage, setStage] = useState(1)
  useMotionValueEvent(scrollYProgress, 'change', (v) => setStage(v < 0.34 ? 1 : v < 0.67 ? 2 : 3))

  const photoScale = useTransform(scrollYProgress, [0, 0.8, 1], [0.9, 1.05, 1.15])
  const photoY = useTransform(scrollYProgress, [0, 1], ['6%', '-4%'])
  const wordScale = useTransform(scrollYProgress, [0.7, 1], [1, 1.25])
  const wordOpacity = useTransform(scrollYProgress, [0.88, 1], [1, 0])
  const captionOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0])
  const sweep = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section id="intro" ref={ref} className="relative h-[400vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* portrait sits behind the lettering, like the reference */}
        <motion.div style={{ scale: photoScale, y: photoY }} className="absolute inset-x-0 top-[10vh] bottom-0 mx-auto flex w-[min(70vw,24rem)] items-end">
          <ProfilePhoto className="h-[82vh] w-full" rounded="rounded-t-[12rem] rounded-b-none" frame={false} />
        </motion.div>

        <motion.h1
          style={{ scale: wordScale, opacity: wordOpacity }}
          aria-label="Portfolio"
          className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center font-display text-[15.5vw] leading-none tracking-tighter select-none mix-blend-multiply"
        >
          <span aria-hidden>
            {WORD.split('').map((c, i) => <Letter key={i} ch={c} i={i} progress={scrollYProgress} />)}
          </span>
        </motion.h1>

        {/* corner captions */}
        <div className="absolute top-24 left-6 z-20 text-xs leading-relaxed font-semibold tracking-[0.2em] text-ink/60 uppercase md:left-12">
          Portfolio<br />2026
        </div>
        <div className="absolute top-24 right-6 z-20 text-right text-xs leading-relaxed font-semibold tracking-[0.2em] text-ink/60 uppercase md:right-12">
          Full-Stack Developer<br />MERN / TypeScript
        </div>
        <div className="absolute bottom-8 left-6 z-20 text-xs leading-relaxed font-semibold tracking-[0.2em] uppercase md:left-12">
          <span className="text-ink/50">Presented by</span><br />Trisha Mishra
        </div>

        <motion.button
          style={{ opacity: captionOpacity }}
          onClick={() => scrollToId('hero')}
          aria-label="Skip intro"
          className="group absolute right-6 bottom-8 z-20 flex items-center gap-4 md:right-12"
        >
          <span className="hidden text-xs font-semibold tracking-[0.25em] uppercase sm:block">Scroll to begin</span>
          <span className="grid h-16 w-16 place-items-center rounded-full bg-brand text-white shadow-lg transition group-hover:scale-110">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M7 4.5v15l13-7.5z" /></svg>
          </span>
        </motion.button>

        {/* progress: 3 steps of scrolling */}
        <div className="absolute bottom-8 left-1/2 z-20 hidden w-40 -translate-x-1/2 md:block">
          <div className="mb-2 text-center text-xs font-semibold tracking-[0.25em] text-ink/60 uppercase">0{stage} / 03</div>
          <div className="h-px w-full bg-ink/15">
            <motion.div style={{ width: sweep }} className="h-px bg-brand" />
          </div>
        </div>
      </div>
    </section>
  )
}
