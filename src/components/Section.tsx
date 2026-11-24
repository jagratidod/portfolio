import type { ReactNode } from 'react'

/**
 * light: transparent over the shared backdrop.
 * dark: ink panel whose rounded top overlaps the section above, for a seamless curve.
 */
export default function Section({ id, variant = 'light', bleed = false, children }: { id: string; variant?: 'light' | 'dark'; bleed?: boolean; children: ReactNode }) {
  const dark = variant === 'dark'
  return (
    <section
      id={id}
      className={`relative ${dark ? 'z-10 -mt-10 overflow-hidden rounded-t-[2.5rem] bg-ink text-cream md:-mt-16 md:rounded-t-[4rem]' : ''}`}
    >
      {bleed ? children : <div className="mx-auto max-w-[1400px] px-6 py-28 md:px-12 md:py-40">{children}</div>}
    </section>
  )
}
