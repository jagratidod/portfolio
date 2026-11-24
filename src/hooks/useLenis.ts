import Lenis from 'lenis'

let instance: Lenis | null = null
export const getLenis = () => instance

export function initLenis() {
  if (instance) return instance
  instance = new Lenis({ lerp: 0.09, smoothWheel: true })
  const raf = (t: number) => {
    instance?.raf(t)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)
  return instance
}

export function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  if (instance) instance.scrollTo(el, { offset: 0, duration: 1.4 })
  else el.scrollIntoView({ behavior: 'smooth' })
}
