import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { nav } from '../data'
import { scrollToId } from '../hooks/useLenis'

export default function Nav() {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    nav.forEach((n) => { const el = document.getElementById(n.id); if (el) io.observe(el) })
    return () => { window.removeEventListener('scroll', onScroll); io.disconnect() }
  }, [])

  const go = (id: string) => { setOpen(false); scrollToId(id) }

  return (
    <>
      <motion.div className="fixed top-0 left-0 z-[80] h-[3px] w-full origin-left bg-brand" style={{ scaleX: progress }} />
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2.6, duration: 0.8 }}
        className={`fixed top-0 right-0 left-0 z-[70] flex items-center justify-between px-6 py-4 transition-all duration-500 md:px-12 ${
          scrolled ? 'bg-white/80 backdrop-blur-md shadow-[0_1px_0_rgba(10,14,26,.08)]' : ''
        }`}
      >
        <button onClick={() => scrollToId('intro')} className="flex items-center gap-2 font-display text-xl font-extrabold tracking-tight">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-ink text-sm text-cream">TM</span>
          <span className="hidden sm:inline">Trisha<span className="text-brand">.</span></span>
        </button>
        <nav className="hidden items-center gap-8 lg:flex">
          {nav.map((n) => (
            <button key={n.id} onClick={() => go(n.id)} className={`relative text-sm font-medium transition-colors ${active === n.id ? 'text-brand' : 'text-ink/70 hover:text-ink'}`}>
              {n.label}
              {active === n.id && <motion.span layoutId="nav-dot" className="absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-brand" />}
            </button>
          ))}
        </nav>
        <button onClick={() => go('contact')} className="hidden rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-ink lg:block">
          Let’s talk
        </button>
        <button onClick={() => setOpen((o) => !o)} aria-label="Menu" className="relative z-[75] flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden">
          <span className={`h-0.5 w-6 bg-current transition ${open ? 'translate-y-2 rotate-45 text-cream' : ''}`} />
          <span className={`h-0.5 w-6 bg-current transition ${open ? 'opacity-0' : ''}`} />
          <span className={`h-0.5 w-6 bg-current transition ${open ? '-translate-y-2 -rotate-45 text-cream' : ''}`} />
        </button>
      </motion.header>

      {/* side rail: where you are in the page */}
      <div className="fixed top-1/2 right-5 z-[60] hidden -translate-y-1/2 flex-col items-center gap-4 xl:flex">
        {nav.map((n) => (
          <button key={n.id} onClick={() => go(n.id)} aria-label={n.label} className="group relative flex items-center">
            <span className="pointer-events-none absolute right-6 rounded-full bg-ink px-3 py-1 text-xs whitespace-nowrap text-cream opacity-0 transition group-hover:opacity-100">{n.label}</span>
            <span className={`block rounded-full border border-brand transition-all duration-500 ${active === n.id ? 'h-6 w-1.5 bg-brand' : 'h-1.5 w-1.5 bg-transparent'}`} />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: 'circle(0% at 95% 5%)' }}
            animate={{ clipPath: 'circle(150% at 95% 5%)' }}
            exit={{ clipPath: 'circle(0% at 95% 5%)' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[72] flex flex-col justify-center gap-4 bg-ink px-8 lg:hidden"
          >
            {nav.map((n, i) => (
              <motion.button
                key={n.id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0, transition: { delay: 0.25 + i * 0.06 } }}
                onClick={() => go(n.id)}
                className="text-left font-display text-5xl font-extrabold text-cream"
              >
                {n.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
