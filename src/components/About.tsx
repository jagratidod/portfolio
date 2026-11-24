import { useEffect, useRef } from 'react'
import { animate, motion, useInView, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { stats } from '../data'
import ProfilePhoto from './ProfilePhoto'
import Section from './Section'
import { Reveal, SectionHead } from './Reveal'

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  useEffect(() => {
    if (!inView || !ref.current) return
    const c = animate(0, to, { duration: 2, ease: 'easeOut', onUpdate: (v) => { if (ref.current) ref.current.textContent = Math.round(v) + suffix } })
    return () => c.stop()
  }, [inView, to, suffix])
  return <span ref={ref}>0{suffix}</span>
}

const statement = 'I build the whole shop: storefront, seller panel and admin console, wired to payments, couriers and real-time delivery.'

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.18, 1])
  const color = useTransform(progress, range, ['#0a0e1a', '#2748f0'])
  return <motion.span style={{ opacity, color }} className="mr-[0.28em] inline-block">{children}</motion.span>
}

export default function About() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.55'] })
  const words = statement.split(' ')

  return (
    <Section id="about">
      <SectionHead num="01" label="About" title="Commerce, _end _to _end." />

      <div ref={ref} className="max-w-5xl">
        <p className="font-display text-3xl leading-[1.2] font-semibold md:text-5xl">
          {words.map((w, i) => <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>{w}</Word>)}
        </p>
      </div>

      <div className="mt-24 grid items-center gap-14 md:grid-cols-[minmax(0,26rem)_1fr] md:gap-24">
        <Reveal y={60}><ProfilePhoto className="mx-auto aspect-[4/5] w-full max-w-md" /></Reveal>
        <div className="space-y-6">
          <Reveal><p className="font-serif text-3xl leading-snug italic md:text-4xl">Hi, I’m Trisha, a full-stack developer working in MERN and TypeScript.</p></Reveal>
          <Reveal delay={0.08}>
            <p className="text-lg leading-relaxed text-mute">
              In 2026 I built three production marketplaces that cover the main shapes of online retail: hyperlocal quick commerce, courier-shipped e-commerce, a niche D2C brand store and an SEO-heavy handicrafts marketplace.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="text-lg leading-relaxed text-mute">
              Each one has a customer storefront, a seller or vendor panel and an admin console, plus payments, logistics, notifications and deployment. I built two of them as the sole developer and led a third in a five-person team.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <p className="text-lg leading-relaxed text-mute">
              I care about the parts that keep a shop running: money that adds up, orders that reach the customer and pages that search engines can read.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="mt-24 grid grid-cols-2 border-y border-ink/15 md:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08} y={30} className={`px-2 py-10 md:px-8 ${i ? 'md:border-l md:border-ink/15' : ''}`}>
            <div className="font-serif text-6xl text-brand md:text-8xl"><Counter to={s.value} suffix={s.suffix} /></div>
            <div className="mt-3 text-sm font-medium text-mute">{s.label}</div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
