import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { timeline } from '../data'
import Section from './Section'
import { SectionHead } from './Reveal'

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.7', 'end 0.6'] })
  const line = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <Section id="experience">
      <SectionHead num="06" label="Timeline" title="2026, one build _at _a _time." />
      <div ref={ref} className="relative ml-2 max-w-4xl md:ml-10">
        <div className="absolute top-0 bottom-0 left-0 w-px bg-ink/15" />
        <motion.div style={{ scaleY: line }} className="absolute top-0 bottom-0 left-0 w-px origin-top bg-brand" />
        {timeline.map((t, i) => (
          <motion.div
            key={t.title}
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 }}
            className="relative pb-16 pl-10 last:pb-0 md:pl-16"
          >
            <span className="absolute top-2 -left-[7px] h-3.5 w-3.5 rounded-full border-2 border-brand bg-base" />
            <div className="font-serif text-2xl text-brand italic">{t.when}</div>
            <h3 className="mt-2 font-display text-4xl font-extrabold md:text-5xl">{t.title}</h3>
            <div className="mt-1 font-medium text-ink/70">{t.sub}</div>
            <p className="mt-3 max-w-xl leading-relaxed text-mute">{t.body}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
