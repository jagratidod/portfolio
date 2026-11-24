import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { profile } from '../data'
import Section from './Section'
import { Reveal, SplitWords } from './Reveal'

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const d = Object.fromEntries(new FormData(form)) as Record<string, string>
    if (profile.formEndpoint) {
      setStatus('sending')
      try {
        const r = await fetch(profile.formEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(d) })
        if (!r.ok) throw new Error()
        setStatus('sent')
        form.reset()
      } catch { setStatus('error') }
    } else if (profile.email) {
      const body = encodeURIComponent(`${d.message}\n\n— ${d.name} (${d.email})`)
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent('Portfolio enquiry from ' + d.name)}&body=${body}`
      setStatus('sent')
    } else setStatus('error')
  }

  const input = 'w-full border-b border-white/25 bg-transparent py-4 text-lg text-cream outline-none transition placeholder:text-cream/40 focus:border-brand-light'
  const links = [
    profile.email && { l: 'Email', h: `mailto:${profile.email}` },
    profile.github && { l: 'GitHub', h: profile.github },
    profile.linkedin && { l: 'LinkedIn', h: profile.linkedin },
    profile.resume && { l: 'Résumé', h: profile.resume },
  ].filter(Boolean) as { l: string; h: string }[]

  return (
    <Section id="contact" variant="dark" bleed>
      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 50, ease: 'linear' }} className="pointer-events-none absolute -right-48 -bottom-48 h-[40rem] w-[40rem] rounded-full border border-brand/40" />
      <div className="pointer-events-none absolute -top-32 left-1/2 h-[28rem] w-[50rem] -translate-x-1/2 rounded-full bg-brand/30 blur-[120px]" />

      <div className="relative mx-auto max-w-[1400px] px-6 pt-32 pb-10 md:px-12 md:pt-48">
        <div className="flex items-center gap-5">
          <span className="font-serif text-3xl text-brand-light italic">07</span>
          <motion.span initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.2 }} className="h-px flex-1 origin-left bg-white/20" />
          <span className="text-xs font-semibold tracking-[0.3em] text-cream/60 uppercase">Contact</span>
        </div>

        <h2 className="mt-10 font-display text-[16vw] leading-[0.88] font-black tracking-tighter md:text-[11vw]">
          <SplitWords text="Let’s build" stagger={0.1} /><br />
          <SplitWords text="_something." delay={0.2} stagger={0.1} />
        </h2>

        <div className="mt-20 grid gap-14 md:grid-cols-2">
          <Reveal>
            <p className="max-w-md text-xl leading-relaxed text-cream/80">
              Hiring for a full-stack role, or have a marketplace that needs building? Send a note, I reply fast.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {links.map((l) => (
                <a key={l.l} href={l.h} target={l.h.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="rounded-full border border-white/30 px-6 py-3 font-semibold transition hover:border-brand hover:bg-brand">
                  {l.l} ↗
                </a>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <form onSubmit={onSubmit} className="space-y-4">
              <input name="name" required placeholder="Your name" className={input} />
              <input name="email" type="email" required placeholder="Your email" className={input} />
              <textarea name="message" required rows={3} placeholder="Tell me about the role or project" className={input} />
              <button disabled={status === 'sending'} className="mt-4 rounded-full bg-brand px-10 py-4 font-semibold text-white transition hover:bg-white hover:text-ink disabled:opacity-60">
                {status === 'sending' ? 'Sending…' : 'Send message →'}
              </button>
              {status === 'sent' && <p className="text-sm text-cream/90">Thanks! Your message is on its way.</p>}
              {status === 'error' && <p className="text-sm text-cream/90">Couldn’t send. Set VITE_CONTACT_EMAIL or VITE_FORM_ENDPOINT, or email me directly.</p>}
            </form>
          </Reveal>
        </div>

        <footer className="mt-28 flex flex-wrap justify-between gap-4 border-t border-white/15 pt-6 text-sm text-cream/60">
          <span>© {new Date().getFullYear()} Trisha Mishra</span>
          <span>React · TypeScript · Tailwind · Framer Motion</span>
        </footer>
      </div>
    </Section>
  )
}
