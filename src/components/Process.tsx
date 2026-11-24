import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { steps } from '../data'
import Section from './Section'
import { SectionHead } from './Reveal'

/** Pinned: vertical scroll drives a horizontal track, one step at a time. */
export default function Process() {
  const ref = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const [dist, setDist] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  useEffect(() => {
    const measure = () => track.current && setDist(Math.max(0, track.current.scrollWidth - window.innerWidth))
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const x = useTransform(scrollYProgress, [0, 1], [0, -dist])

  return (
    <Section id="process" bleed>
      <div ref={ref} className="relative" style={{ height: `${steps.length * 85}vh` }}>
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
          <div className="mx-auto w-full max-w-[1400px] px-6 md:px-12">
            <SectionHead num="05" label="Process" title="How I _work." />
          </div>
          <motion.div ref={track} style={{ x }} className="flex w-max gap-6 px-6 md:px-[max(3rem,calc((100vw-1400px)/2+3rem))]">
            {steps.map((s) => (
              <article
                key={s.n}
                data-cursor
                className="relative flex h-[42vh] min-h-[270px] w-[min(78vw,34rem)] shrink-0 flex-col justify-between overflow-hidden rounded-[2rem] border border-ink/15 bg-white/60 p-8 backdrop-blur-sm md:p-10"
              >
                <span className="font-serif text-8xl text-brand italic md:text-9xl">{s.n}</span>
                <div>
                  <h3 className="font-display text-2xl font-extrabold md:text-3xl">{s.title}</h3>
                  <p className="mt-3 max-w-md leading-relaxed text-mute">{s.body}</p>
                </div>
              </article>
            ))}
          </motion.div>
          <div className="mx-auto mt-10 w-full max-w-[1400px] px-6 md:px-12">
            <div className="h-px overflow-hidden bg-ink/15">
              <motion.div style={{ scaleX: scrollYProgress }} className="h-px origin-left bg-brand" />
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
