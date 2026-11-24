import type { ReactNode } from 'react'

/** Small CSS-built product mock-ups: one per project, no screenshots needed. */

function Chrome({ url, children }: { url: string; children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white text-ink shadow-[0_40px_80px_-20px_rgba(0,0,0,0.45)] ring-1 ring-black/10">
      <div className="flex items-center gap-2 border-b border-ink/10 bg-[#f3f4f8] px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff6b6b]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#ffd166]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#4ade80]" />
        <span className="ml-3 flex-1 truncate rounded-full bg-white px-3 py-1 text-[10px] text-ink/50">{url}</span>
      </div>
      {children}
    </div>
  )
}

/** Exnshop: a rider moving along a route, order status and delivery OTP. */
export function ExnshopMock() {
  return (
    <Chrome url="exnshop.app/orders/4821">
      <div className="grid aspect-[16/10] grid-cols-[1.5fr_1fr] text-[10px]">
        <div className="relative overflow-hidden bg-[#e9eeff]">
          <svg viewBox="0 0 300 200" className="absolute inset-0 h-full w-full">
            {Array.from({ length: 10 }).map((_, i) => <line key={'v' + i} x1={i * 33} y1="0" x2={i * 33} y2="200" stroke="#cdd7ff" strokeWidth="1" />)}
            {Array.from({ length: 7 }).map((_, i) => <line key={'h' + i} x1="0" y1={i * 33} x2="300" y2={i * 33} stroke="#cdd7ff" strokeWidth="1" />)}
            <rect x="60" y="40" width="70" height="40" rx="6" fill="#dbe3ff" />
            <rect x="170" y="110" width="80" height="50" rx="6" fill="#dbe3ff" />
            <path id="route" d="M40 160 C 90 160, 80 100, 140 100 S 210 60, 260 40" fill="none" stroke="#2748f0" strokeWidth="3" strokeDasharray="6 6" strokeLinecap="round">
              <animate attributeName="stroke-dashoffset" from="0" to="-48" dur="2s" repeatCount="indefinite" />
            </path>
            <circle cx="40" cy="160" r="7" fill="#0a0e1a" />
            <circle cx="260" cy="40" r="7" fill="#2748f0" />
            <circle cx="260" cy="40" r="7" fill="none" stroke="#2748f0">
              <animate attributeName="r" values="7;22" dur="1.6s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.8;0" dur="1.6s" repeatCount="indefinite" />
            </circle>
            <g>
              <circle r="9" fill="#fff" stroke="#0a0e1a" strokeWidth="2" />
              <circle r="3.5" fill="#2748f0" />
              <animateMotion dur="6s" repeatCount="indefinite" rotate="auto"><mpath href="#route" /></animateMotion>
            </g>
          </svg>
          <div className="absolute bottom-3 left-3 rounded-lg bg-white px-3 py-2 font-semibold shadow">Rider · 1.2 km away</div>
        </div>
        <div className="flex flex-col justify-between gap-3 p-4">
          <div>
            <div className="font-bold text-ink/50">ORDER #4821</div>
            <div className="mt-1 font-display text-2xl font-black text-brand">8 min</div>
          </div>
          <ul className="space-y-2">
            {['Seller accepted', 'Rider assigned', 'On the way'].map((s, i) => (
              <li key={s} className="flex items-center gap-2">
                <span className={`grid h-4 w-4 place-items-center rounded-full text-[8px] text-white ${i < 2 ? 'bg-brand' : 'animate-pulse bg-ink'}`}>{i < 2 ? '✓' : ''}</span>
                {s}
              </li>
            ))}
          </ul>
          <div>
            <div className="mb-1 font-semibold text-ink/50">DELIVERY OTP</div>
            <div className="flex gap-1.5">
              {['4', '2', '', ''].map((d, i) => (
                <span key={i} className={`grid h-7 w-7 place-items-center rounded-md border font-bold ${d ? 'border-brand bg-sky' : 'border-ink/20'} ${!d && i === 2 ? 'animate-pulse border-brand' : ''}`}>{d}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Chrome>
  )
}

/** Jaipurio: product grid plus SEO health. */
export function JaipurioMock() {
  const tiles = ['#c8643c', '#e8d9bd', '#8a3b2a', '#f0e6d2', '#d98b5f', '#b9b2a3']
  return (
    <Chrome url="jaipurio.in/marble-idols-jaipur">
      <div className="aspect-[16/10] p-4 text-[10px]">
        <div className="flex items-center justify-between">
          <span className="font-display text-sm font-black">Jaipurio<span className="text-[#c8643c]">.</span></span>
          <span className="flex gap-3 text-ink/50"><span>Idols</span><span>Pottery</span><span>Decor</span></span>
        </div>
        <div className="mt-3 grid grid-cols-[1.6fr_1fr] gap-3">
          <div className="grid grid-cols-3 gap-2">
            {tiles.map((c, i) => (
              <div key={i} className="relative aspect-[4/5] overflow-hidden rounded-lg" style={{ background: c }}>
                <span className="absolute bottom-[18%] left-1/2 h-[42%] w-[38%] -translate-x-1/2 rounded-t-full bg-white/40" />
                <span className="absolute bottom-[52%] left-1/2 h-[16%] w-[16%] -translate-x-1/2 rounded-full bg-white/50" />
                <span className="absolute inset-x-1.5 bottom-1.5 rounded bg-white/90 px-1 py-0.5 text-[8px] font-semibold">₹{(i + 2) * 450}</span>
              </div>
            ))}
          </div>
          <div className="space-y-2.5">
            <div className="rounded-lg bg-cream p-3">
              <div className="font-semibold text-ink/50">SEO HEALTH</div>
              <div className="mt-1 flex items-center gap-3">
                <svg viewBox="0 0 36 36" className="h-12 w-12 -rotate-90">
                  <circle cx="18" cy="18" r="15" fill="none" stroke="#e1d6bd" strokeWidth="4" />
                  <circle cx="18" cy="18" r="15" fill="none" stroke="#2748f0" strokeWidth="4" strokeLinecap="round" strokeDasharray="94" strokeDashoffset="94">
                    <animate attributeName="stroke-dashoffset" values="94;4;94" dur="5s" repeatCount="indefinite" />
                  </circle>
                </svg>
                <span className="font-display text-xl font-black">98</span>
              </div>
            </div>
            {['700+ words ✓', '301 redirects ✓', 'Sitemap live ✓'].map((t) => (
              <div key={t} className="rounded-lg border border-ink/10 px-2.5 py-1.5 font-semibold">{t}</div>
            ))}
          </div>
        </div>
      </div>
    </Chrome>
  )
}

/** Sada Bharat: phone with product, cart and payment toast. */
export function SadaMock() {
  return (
    <div className="relative mx-auto w-[15rem] md:w-[17rem]">
      <div className="overflow-hidden rounded-[2.4rem] bg-white p-3 text-ink shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)] ring-4 ring-cream/20">
        <div className="mx-auto mb-3 h-1.5 w-16 rounded-full bg-ink/15" />
        <div className="relative grid aspect-[5/4] place-items-center overflow-hidden rounded-2xl bg-[#dfe9d8]">
          <svg viewBox="0 0 100 80" className="h-3/4 w-3/4">
            <path d="M50 70 C 20 55, 18 25, 50 8 C 82 25, 80 55, 50 70Z" fill="#3b7a57" />
            <path d="M50 66 V20" stroke="#dfe9d8" strokeWidth="2.5" />
            <path d="M50 40 L34 30 M50 50 L66 38 M50 30 L62 22" stroke="#dfe9d8" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span className="absolute top-2 left-2 rounded-full bg-white px-2 py-0.5 text-[9px] font-bold">Ayurvedic</span>
        </div>
        <div className="mt-3 px-1">
          <div className="font-display text-base font-extrabold">Ashwagandha Root</div>
          <div className="mt-0.5 text-[10px] text-ink/50">60 capsules · Vendor verified</div>
          <div className="mt-2 flex items-end justify-between">
            <span className="font-display text-xl font-black">₹499</span>
            <span className="rounded-full bg-ink px-4 py-2 text-[11px] font-semibold text-cream">Add to cart</span>
          </div>
        </div>
        <div className="mt-3 flex gap-1.5">
          {['100ml', '250ml', '500ml'].map((s, i) => <span key={s} className={`rounded-full border px-2.5 py-1 text-[9px] font-semibold ${i === 1 ? 'border-brand bg-sky text-brand' : 'border-ink/15'}`}>{s}</span>)}
        </div>
      </div>
      <div className="absolute top-8 -right-10 animate-float rounded-xl bg-white px-3 py-2 text-[10px] font-semibold text-ink shadow-xl md:-right-20">
        <span className="text-[#16a34a]">✓</span> Paid · Razorpay
      </div>
      <div className="absolute bottom-14 -left-10 animate-float rounded-xl bg-brand px-3 py-2 text-[10px] font-semibold text-white shadow-xl md:-left-20" style={{ animationDelay: '-3s' }}>
        Hi! Need help? 💬
      </div>
    </div>
  )
}
