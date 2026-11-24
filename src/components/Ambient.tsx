import { motion, useScroll, useTransform } from 'framer-motion'

/** One continuous backdrop behind every light section, so the page reads as a single surface. */
export default function Ambient() {
  const { scrollYProgress } = useScroll()
  const y1 = useTransform(scrollYProgress, [0, 1], ['-10vh', '-140vh'])
  const y2 = useTransform(scrollYProgress, [0, 1], ['60vh', '-80vh'])
  const x1 = useTransform(scrollYProgress, [0, 0.5, 1], ['-15vw', '35vw', '-10vw'])
  const x2 = useTransform(scrollYProgress, [0, 0.5, 1], ['60vw', '10vw', '55vw'])

  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden bg-base">
      <motion.div style={{ x: x1, y: y1 }} className="absolute h-[42rem] w-[42rem] rounded-full bg-cream-deep/70 blur-[110px]" />
      <motion.div style={{ x: x2, y: y2 }} className="absolute h-[34rem] w-[34rem] rounded-full bg-sky/80 blur-[120px]" />
      <div className="absolute inset-0 mx-auto max-w-[1400px] border-x border-ink/[0.05]" />
      <div className="absolute inset-0 mx-auto grid max-w-[1400px] grid-cols-3">
        <span className="border-r border-ink/[0.04]" />
        <span className="border-r border-ink/[0.04]" />
      </div>
    </div>
  )
}
