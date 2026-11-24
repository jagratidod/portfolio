import { motion, type HTMLMotionProps } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

export function Reveal({ delay = 0, y = 40, ...props }: HTMLMotionProps<'div'> & { delay?: number; y?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, ease, delay }}
      {...props}
    />
  )
}

/** Masked word-by-word rise. Prefix a word with "_" for the italic serif accent. */
export function SplitWords({ text, className = '', delay = 0, stagger = 0.06 }: { text: string; className?: string; delay?: number; stagger?: number }) {
  return (
    <span className={className} aria-label={text.replaceAll('_', '')}>
      {text.split(' ').map((raw, i) => {
        const accent = raw.startsWith('_')
        const w = accent ? raw.slice(1) : raw
        return (
          <span key={i} aria-hidden className="mr-[0.25em] -mb-[0.15em] inline-block overflow-hidden pb-[0.15em] align-bottom">
            <motion.span
              className={`inline-block ${accent ? 'font-serif font-normal text-brand italic' : ''}`}
              initial={{ y: '110%', rotate: 4 }}
              whileInView={{ y: 0, rotate: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.9, ease, delay: delay + i * stagger }}
            >
              {w}
            </motion.span>
          </span>
        )
      })}
    </span>
  )
}

/** Same header on every section: serif number · drawn hairline · small-caps label, then the title. */
export function SectionHead({ num, label, title, dark = false }: { num?: string; label: string; title: string; dark?: boolean }) {
  return (
    <div className="mb-14 md:mb-24">
      <div className="flex items-center gap-5">
        {num && <span className={`font-serif text-3xl italic ${dark ? 'text-brand-light' : 'text-brand'}`}>{num}</span>}
        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease }}
          className={`h-px flex-1 origin-left ${dark ? 'bg-white/20' : 'bg-ink/20'}`}
        />
        <span className={`text-xs font-semibold tracking-[0.3em] uppercase ${dark ? 'text-cream/60' : 'text-mute'}`}>{label}</span>
      </div>
      <h2 className={`mt-10 max-w-5xl font-display text-5xl leading-[1] font-extrabold tracking-tight md:text-7xl lg:text-[5.5rem] ${dark ? 'text-cream' : ''}`}>
        <SplitWords text={title} />
      </h2>
    </div>
  )
}
