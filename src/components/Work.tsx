import { useRef, type ReactNode } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { projects, type Project } from '../data'
import Section from './Section'
import { SectionHead } from './Reveal'
import { ExnshopMock, JaipurioMock, SadaMock } from './Mockups'

const palette = {
  brand: { bg: '#2442d8', fg: '#ffffff' },
  cream: { bg: '#f6f0e4', fg: '#0a0e1a' },
  ink: { bg: '#0a0e1a', fg: '#f6f0e4' },
}
const mocks: Record<string, ReactNode> = {
  exnshop: <ExnshopMock />,
  jaipurio: <JaipurioMock />,
  'sada-bharat': <SadaMock />,
}
const n = projects.length

/** one continuous sideways gradient: each scene sits on its own colour, blends flow between them */
const trackBg = `linear-gradient(90deg, ${projects
  .map((p, i) => {
    const c = (i + 0.5) / n
    const h = 0.28 / n
    return `${palette[p.accent].bg} ${((c - h) * 100).toFixed(1)}% ${((c + h) * 100).toFixed(1)}%`
  })
  .join(', ')})`

function Scene({ p, i, progress }: { p: Project; i: number; progress: MotionValue<number> }) {
  const center = n > 1 ? i / (n - 1) : 0
  // local: -1 (arriving from right) → 0 (centred) → +1 (leaving to the left)
  const local = useTransform(progress, (v) => (v - center) * (n - 1))
  const nameX = useTransform(local, [-1, 1], ['32vw', '-32vw'])
  const mockX = useTransform(local, [-1, 1], ['14vw', '-14vw'])
  const rotateY = useTransform(local, [-1, 0, 1], [-28, 0, 28])
  const rotateX = useTransform(local, [-1, 0, 1], [8, 0, 8])
  const textX = useTransform(local, [-1, 1], ['6vw', '-6vw'])
  const textOpacity = useTransform(local, [-0.9, -0.3, 0.3, 0.9], [0, 1, 1, 0])
  const chipA = useTransform(local, [-1, 1], ['22vw', '-22vw'])
  const chipB = useTransform(local, [-1, 1], ['-10vw', '10vw'])
  const t = palette[p.accent]

  return (
    <div className="relative h-full w-screen shrink-0 overflow-hidden" style={{ color: t.fg }}>
      <motion.div
        style={{ x: nameX, WebkitTextStroke: `1.5px ${t.fg}` }}
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[26vw] leading-none font-black tracking-tighter whitespace-nowrap text-transparent opacity-30 select-none"
      >
        {p.name}
      </motion.div>

      <div className="relative z-10 flex h-full flex-col justify-center gap-5 px-6 pt-16 pb-16 md:flex-row md:items-center md:gap-10 md:px-16 md:pt-0 md:pb-0">
        <motion.div style={{ x: textX, opacity: textOpacity }} className="md:w-[36%]">
          <div className="flex items-baseline gap-3">
            <span className="font-serif text-5xl italic opacity-70 md:text-7xl">{p.index}</span>
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase opacity-70">{p.kind}</span>
          </div>
          <h3 className="mt-2 font-display text-4xl leading-none font-black tracking-tight md:text-6xl">{p.name}</h3>
          <p className="mt-3 text-sm leading-relaxed opacity-80 md:text-base">{p.summary}</p>
          <ul className="mt-4 hidden text-sm md:block">
            {p.highlights.slice(0, 3).map((h) => (
              <li key={h} className="flex gap-3 border-t border-current/20 py-2 leading-snug"><span className="opacity-60">✦</span>{h}</li>
            ))}
          </ul>
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-semibold">
            <span>{p.period}</span><span className="opacity-40">/</span><span>{p.commits}</span><span className="opacity-40">/</span><span>{p.role}</span>
            {p.url && <a href={p.url} target="_blank" rel="noreferrer" className="underline underline-offset-4">Live site ↗</a>}
          </div>
        </motion.div>

        <div className="relative md:ml-auto md:w-[56%]" style={{ perspective: 1400 }}>
          <motion.div data-cursor style={{ x: mockX, rotateY, rotateX }} className="mx-auto w-full max-w-[40rem] origin-center">
            {mocks[p.id]}
          </motion.div>
          <motion.span style={{ x: chipA }} className="absolute -top-6 left-2 hidden animate-float rounded-full bg-white px-4 py-2 text-xs font-bold text-ink shadow-xl md:block">{p.stack[0]}</motion.span>
          <motion.span style={{ x: chipB }} className="absolute right-0 -bottom-6 hidden animate-float rounded-full bg-ink px-4 py-2 text-xs font-bold text-cream shadow-xl md:block" >{p.stack[2]}</motion.span>
          <motion.span style={{ x: chipA }} className="absolute top-1/3 -right-4 hidden animate-float rounded-full bg-brand px-4 py-2 text-xs font-bold text-white shadow-xl lg:block">{p.stack[4]}</motion.span>
        </div>
      </div>
    </div>
  )
}

export default function Work() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0, 1], ['0vw', `-${(n - 1) * 100}vw`])

  return (
    <Section id="work" bleed>
      <div className="mx-auto max-w-[1400px] px-6 pt-28 md:px-12 md:pt-40">
        <SectionHead num="03" label="Selected work · scroll sideways" title="Three marketplaces, _shipped." />
      </div>

      <div ref={ref} style={{ height: `${n * 100 + 40}vh` }}>
        <div className="sticky top-0 h-screen p-3 md:p-6">
          <div className="relative h-full overflow-hidden rounded-[2rem] shadow-2xl md:rounded-[3rem]">
            <motion.div style={{ x, width: `${n * 100}vw`, backgroundImage: trackBg }} className="flex h-full">
              {projects.map((p, i) => <Scene key={p.id} p={p} i={i} progress={scrollYProgress} />)}
            </motion.div>

            {/* progress */}
            <div className="pointer-events-none absolute right-6 bottom-5 left-6 z-20 flex items-center gap-4 text-white mix-blend-difference md:right-12 md:left-12">
              <span className="text-[11px] font-semibold tracking-[0.25em] uppercase">Work</span>
              <div className="h-px flex-1 bg-white/30">
                <motion.div style={{ scaleX: scrollYProgress }} className="h-px origin-left bg-white" />
              </div>
              <span className="font-serif text-lg italic">{n} projects</span>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
