import { lazy, Suspense, useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { marquee, profile } from '../data'
import { scrollToId } from '../hooks/useLenis'

const Hero3D = lazy(() => import('./Hero3D'))
const ease = [0.22, 1, 0.36, 1] as const

function Line({ children, delay, ready, className = '' }: { children: React.ReactNode; delay: number; ready: boolean; className?: string }) {
  return (
    <span className="block overflow-hidden pb-[0.12em]">
      <motion.span className={`block ${className}`} initial={{ y: '115%' }} animate={ready ? { y: 0 } : {}} transition={{ duration: 1.1, ease, delay }}>
        {children}
      </motion.span>
    </span>
  )
}

export default function Hero({ ready: loaded }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null)
  const seen = useInView(ref, { once: true, amount: 0.35 })
  const ready = loaded && seen
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const yText = useTransform(scrollYProgress, [0, 1], [0, 140])
  const yShape = useTransform(scrollYProgress, [0, 1], [0, -200])
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0])

  return (
    <section id="hero" ref={ref} className="relative flex min-h-screen flex-col justify-between overflow-hidden pt-28">
      <motion.div style={{ y: yShape }} className="absolute top-[14%] right-[-18%] z-0 h-[22rem] w-[22rem] sm:right-[-6%] md:right-[2%] md:h-[34rem] md:w-[34rem] lg:h-[40rem] lg:w-[40rem]">
        <Suspense fallback={null}>
          <Hero3D />
        </Suspense>
      </motion.div>

      <motion.div style={{ y: yText, opacity: fade }} className="relative z-10 mx-auto w-full max-w-[1400px] px-6 md:px-12">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.8 }}
          className="mb-8 flex items-center gap-3 text-xs font-semibold tracking-[0.3em] uppercase"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
          </span>
          Available for work · 2026
        </motion.p>

        <h1 className="font-display text-[19vw] leading-[0.86] font-black tracking-tighter sm:text-[16vw] lg:text-[13vw]">
          <Line ready={ready} delay={0.15}>Trisha</Line>
          <Line ready={ready} delay={0.3} className="font-serif font-normal text-brand italic">Mishra</Line>
        </h1>

        <div className="mt-12 grid items-end gap-8 md:grid-cols-[1.2fr_1fr]">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7, duration: 0.9, ease }}
            className="max-w-xl text-lg leading-relaxed text-mute md:text-xl"
          >
            <span className="font-semibold text-ink">{profile.role} ({profile.stack}).</span> I build production marketplaces: quick commerce, courier e-commerce and SEO-heavy stores, with storefront, seller panel, admin console, payments and logistics.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.85, duration: 0.9, ease }}
            className="flex flex-wrap gap-4 md:justify-end"
          >
            <button onClick={() => scrollToId('work')} className="group rounded-full bg-ink px-8 py-4 font-semibold text-cream transition hover:bg-brand">
              View my work <span className="inline-block transition group-hover:translate-x-1">→</span>
            </button>
            <button onClick={() => scrollToId('contact')} className="rounded-full border border-ink/20 px-8 py-4 font-semibold transition hover:border-brand hover:text-brand">
              Contact me
            </button>
          </motion.div>
        </div>
      </motion.div>

      <div className="relative z-10 mt-16 overflow-hidden border-y border-ink/15 py-5">
        <div className="flex w-max animate-marquee gap-12 font-serif text-3xl italic">
          {[...marquee, ...marquee].map((m, i) => (
            <span key={i} className="flex items-center gap-12 whitespace-nowrap">
              {m}
              <span className="text-xl text-brand not-italic">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
