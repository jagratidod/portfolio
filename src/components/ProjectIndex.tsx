import { motion } from 'framer-motion'
import { projects } from '../data'
import Section from './Section'
import { SectionHead } from './Reveal'

export default function ProjectIndex() {
  return (
    <Section id="project-index">
      <SectionHead num="—" label="Archive" title="Project _index" />
      <div className="border-t border-ink/20">
        {projects.map((p, i) => (
          <motion.div
            key={p.id}
            data-cursor
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="group relative grid grid-cols-[3rem_1fr] items-center gap-4 overflow-hidden border-b border-ink/20 py-9 md:grid-cols-[5rem_1.5fr_1.2fr_auto]"
          >
            <span className="absolute inset-0 origin-left scale-x-0 bg-white/80 transition-transform duration-500 ease-out group-hover:scale-x-100" />
            <span className="relative font-serif text-2xl text-brand italic">{p.index}</span>
            <h3 className="relative font-display text-3xl font-extrabold transition-transform duration-500 group-hover:translate-x-3 md:text-5xl">{p.name}</h3>
            <p className="relative col-span-2 text-mute md:col-span-1">{p.kind}</p>
            <span className="relative hidden text-sm font-semibold md:block">{p.period} ↗</span>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
