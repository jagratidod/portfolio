import { motion } from 'framer-motion'
import { marquee, skillGroups } from '../data'
import Section from './Section'
import { SectionHead } from './Reveal'

export default function Skills() {
  return (
    <Section id="skills" variant="dark" bleed>
      <div className="pointer-events-none absolute -top-40 -left-40 h-[30rem] w-[30rem] rounded-full bg-brand/30 blur-3xl" />
      <div className="relative mx-auto max-w-[1400px] px-6 pt-32 pb-28 md:px-12 md:pt-48 md:pb-40">
        <SectionHead dark num="04" label="Skills" title="Tools I _reach _for." />

        <div className="grid border-t border-l border-white/15 md:grid-cols-2">
          {skillGroups.map((g, gi) => (
            <div key={g.title} className="border-r border-b border-white/15 p-8 md:p-12">
              <motion.h3 initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="font-serif text-3xl text-brand-light italic">
                {g.title}
              </motion.h3>
              <div className="mt-6 flex flex-wrap gap-3">
                {g.items.map((it, i) => (
                  <motion.span
                    key={it}
                    data-cursor
                    initial={{ opacity: 0, scale: 0.7, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, margin: '-30px' }}
                    transition={{ type: 'spring', stiffness: 200, damping: 16, delay: gi * 0.05 + i * 0.05 }}
                    whileHover={{ y: -4, backgroundColor: '#2748f0', borderColor: '#2748f0', color: '#fff' }}
                    className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium"
                  >
                    {it}
                  </motion.span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative overflow-hidden pb-28">
        <div className="flex w-max animate-marquee gap-10 font-display text-7xl font-black md:text-9xl" style={{ animationDuration: '45s' }}>
          {[...marquee, ...marquee].map((m, i) => (
            <span key={i} className={`whitespace-nowrap ${i % 2 ? 'font-serif font-normal text-brand-light italic' : 'text-stroke-cream'}`}>{m}</span>
          ))}
        </div>
      </div>
    </Section>
  )
}
