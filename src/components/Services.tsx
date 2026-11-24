import { motion } from 'framer-motion'
import { services } from '../data'
import Section from './Section'
import { SectionHead } from './Reveal'

const ease = [0.22, 1, 0.36, 1] as const

export default function Services() {
  return (
    <Section id="services">
      <SectionHead num="02" label="Expertise" title="What I _build & _solve" />
      <div className="grid border-t border-l border-ink/15 md:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <motion.article
            key={s.n}
            data-cursor
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, ease, delay: (i % 3) * 0.1 }}
            className="group relative overflow-hidden border-r border-b border-ink/15 p-8 transition-colors duration-500 hover:bg-white/70 md:p-10"
          >
            <span className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-brand transition-transform duration-700 ease-out group-hover:scale-x-100" />
            <div className="font-serif text-5xl text-brand italic">{s.n}</div>
            <h3 className="mt-10 font-display text-2xl font-bold">{s.title}</h3>
            <p className="mt-3 leading-relaxed text-mute">{s.body}</p>
            <p className="mt-8 text-xs font-semibold tracking-[0.2em] text-ink/60 uppercase">{s.tags.join('  ·  ')}</p>
          </motion.article>
        ))}
      </div>
    </Section>
  )
}
