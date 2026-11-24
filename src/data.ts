export const profile = {
  name: 'Trisha Mishra',
  role: 'Full-Stack Developer',
  stack: 'MERN / TypeScript',
  email: import.meta.env.VITE_CONTACT_EMAIL as string | undefined,
  github: import.meta.env.VITE_GITHUB_URL as string | undefined,
  linkedin: import.meta.env.VITE_LINKEDIN_URL as string | undefined,
  resume: import.meta.env.VITE_RESUME_URL as string | undefined,
  formEndpoint: import.meta.env.VITE_FORM_ENDPOINT as string | undefined,
}

export const nav = [
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Expertise' },
  { id: 'work', label: 'Work' },
  { id: 'skills', label: 'Skills' },
  { id: 'process', label: 'Process' },
  { id: 'experience', label: 'Timeline' },
  { id: 'contact', label: 'Contact' },
]

export const stats = [
  { value: 3, suffix: '', label: 'Production marketplaces' },
  { value: 350, suffix: '+', label: 'Commits across projects' },
  { value: 7, suffix: '', label: 'Payment providers unified' },
  { value: 120, suffix: '+', label: 'Admin & panel screens' },
]

export const services = [
  { n: '01', title: 'Marketplaces & Catalogs', body: 'Multi-vendor stores, variant matrices, category trees, GST inheritance and product approval workflows.', tags: ['Multi-vendor', 'Variants', 'GST'] },
  { n: '02', title: 'Quick-Commerce Logistics', body: 'Real-time rider dispatch, distance-based fees, seller-acceptance timeouts and delivery OTP verification.', tags: ['Socket.io', 'Google Routes', 'OTP'] },
  { n: '03', title: 'Payments & Finance', body: 'Commission engines, wallets, payouts, settlements and one abstraction over seven payment providers.', tags: ['Razorpay', 'Cashfree', 'Stripe'] },
  { n: '04', title: 'Returns, RTO & Couriers', body: 'Return, replacement and RTO lifecycles with two-sided OTP handover, plus Shiprocket and DTDC shipping.', tags: ['Shiprocket', 'DTDC', 'Labels'] },
  { n: '05', title: 'Technical SEO', body: 'Server-rendered first paint, honest sitemaps, 301/410 migration maps and a quality-gated city-page engine.', tags: ['SEO', '301 / 410', 'Sitemaps'] },
  { n: '06', title: 'DevOps & Security', body: 'Docker, Coolify, Nginx, VPS and SSL, 2FA, RBAC, byte-checked uploads and repo hardening.', tags: ['Docker', 'Nginx', 'RBAC'] },
]

export type Project = {
  id: string
  index: string
  name: string
  kind: string
  url?: string
  period: string
  commits: string
  role: string
  summary: string
  stack: string[]
  highlights: string[]
  accent: 'brand' | 'cream' | 'ink'
}

export const projects: Project[] = [
  {
    id: 'exnshop',
    index: '01',
    name: 'Exnshop',
    kind: 'Quick commerce + e-commerce marketplace',
    period: 'Sep – Nov 2026',
    commits: '207 commits',
    role: 'Sole developer',
    summary:
      'One platform, two business models: hyperlocal quick delivery by own riders (like Blinkit) and courier-shipped orders via Shiprocket (like Flipkart). Four apps in one codebase: Customer, Seller, Rider and Admin.',
    stack: ['React 18', 'TypeScript', 'Node / Express', 'MongoDB', 'Socket.io', 'Tailwind', 'Framer Motion', 'Razorpay', 'Shiprocket', 'FCM'],
    highlights: [
      'Real-time rider dispatch broadcast with a Google Routes → Directions → Haversine fallback chain',
      '3-level commission engine with transaction-safe Pending → Paid settlement',
      'Full return, replacement and RTO lifecycle with two-sided OTP handover and video proof',
      'Admin ON/OFF service controls enforced by a central API guard',
    ],
    accent: 'brand',
  },
  {
    id: 'jaipurio',
    index: '02',
    name: 'Jaipurio',
    kind: 'Handicrafts marketplace · jaipurio.in',
    url: 'https://jaipurio.in',
    period: 'Aug – Nov 2026',
    commits: '87 of ~100 commits',
    role: 'Lead contributor · 5-person team',
    summary:
      'Rebuilt the legacy jaipurio.in as Jaipurio v2: vendors, affiliates, a 40+ screen admin and a strong SEO focus, shipping marble idols, pottery and decor across India and abroad.',
    stack: ['React (Vite)', 'Node / Express', 'MongoDB', 'Redis', 'MinIO', 'Docker', 'Coolify', 'Stripe', 'PayPal', 'DTDC'],
    highlights: [
      'Migrated the legacy site without losing SEO: 301 map, 410s, server-rendered first paint',
      'City-page engine with deterministic variation and a 700-word publish gate',
      'One payment layer over 7 providers; shipping via Shiprocket and DTDC',
      'Custom MCP server so AI assistants can manage the admin safely',
    ],
    accent: 'cream',
  },
  {
    id: 'sada-bharat',
    index: '03',
    name: 'Sada Bharat',
    kind: 'Ayurvedic D2C multi-vendor store',
    period: 'May – Oct 2026',
    commits: '44 commits',
    role: 'Sole developer',
    summary:
      'An Ayurvedic store where admins, vendors and customers each get their own area, with 70+ React screens, live payments and per-product social link previews.',
    stack: ['React (Vite)', 'Context API', 'Framer Motion', 'Lenis', 'Node / Express', 'MongoDB', 'Redis', 'Razorpay', 'PM2', 'Nginx'],
    highlights: [
      'Live Razorpay, Shiprocket, FCM push notifications and live chat',
      'Nginx rule serves per-product previews to WhatsApp and social crawlers',
      'Lockout after failed logins, single-session enforcement and IP rate limiting',
      'Order-time price snapshots keep past invoices intact',
    ],
    accent: 'ink',
  },
]

export const skillGroups = [
  { title: 'Frontend', items: ['React', 'TypeScript', 'Vite', 'Tailwind', 'Framer Motion', 'GSAP', 'Recharts'] },
  { title: 'Backend', items: ['Node.js', 'Express', 'MongoDB', 'Mongoose', 'Redis', 'Socket.io', 'REST'] },
  { title: 'Integrations', items: ['Razorpay / X', 'Cashfree', 'Stripe', 'PayPal', 'Shiprocket', 'DTDC', 'Google Maps', 'FCM', 'Cloudinary'] },
  { title: 'Engineering', items: ['MongoDB transactions', 'OTP flows', 'RBAC', 'Docker', 'Coolify', 'Nginx', 'VPS & SSL', 'MCP'] },
]

export const marquee = ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Socket.io', 'Redis', 'Docker', 'Tailwind', 'Razorpay', 'Shiprocket', 'Nginx', 'MinIO']

export const steps = [
  { n: '01', title: 'Understand the business', body: 'Map sellers, riders, customers and admins: who does what, who gets paid and when.' },
  { n: '02', title: 'Model the data', body: 'Design schemas and money flows first: commissions, wallets, ledgers, with transactions where it counts.' },
  { n: '03', title: 'Build role by role', body: 'Ship storefront, seller panel and admin console as one system with shared guards and permissions.' },
  { n: '04', title: 'Harden & deploy', body: 'Rate limits, 2FA, SSL, Docker and a written VPS deployment SOP so releases stay boring.' },
]

export const timeline = [
  { when: 'May – Oct 2026', title: 'Sada Bharat', sub: 'Sole developer · Ayurvedic D2C multi-vendor store', body: 'Admin, vendor and customer areas, live Razorpay, Shiprocket and FCM.' },
  { when: 'Aug – Nov 2026', title: 'Jaipurio v2', sub: 'Lead contributor · Handicrafts marketplace', body: 'Vendors, affiliates, SEO migration, 7-provider payments, MCP server, Docker on Coolify.' },
  { when: 'Sep – Nov 2026', title: 'Exnshop', sub: 'Sole developer · Quick + e-commerce marketplace', body: 'Four role-based apps, real-time dispatch, commission engine and RTO lifecycle.' },
]
