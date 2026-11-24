import { useState } from 'react'

/** Drop your photo at public/profile.jpg. Until then an empty placeholder shows. */
export default function ProfilePhoto({ className = '', rounded = 'rounded-[2rem]', frame = true }: { className?: string; rounded?: string; frame?: boolean }) {
  const [missing, setMissing] = useState(false)
  return (
    <div className={`relative ${className}`}>
      {frame && <div className={`absolute inset-0 translate-x-4 translate-y-4 bg-brand ${rounded}`} />}
      <div className={`absolute inset-0 overflow-hidden border border-ink/10 bg-cream ${rounded}`}>
        {missing ? (
          <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
            <span className="grid h-28 w-28 place-items-center rounded-full bg-ink font-display text-4xl font-black text-cream">TM</span>
            <span className="px-6 text-xs font-semibold tracking-[0.2em] text-ink/50 uppercase">Your photo here · public/profile.jpg</span>
          </div>
        ) : (
          <img src="/profile.jpg" alt="Trisha Mishra" onError={() => setMissing(true)} className="h-full w-full object-cover" />
        )}
      </div>
    </div>
  )
}
