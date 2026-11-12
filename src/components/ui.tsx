'use client'

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import type { IconName } from '@/lib/content'

const paths: Record<IconName, ReactNode> = {
  arrow: (<><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>),
  pen: (<><path d="m4 20 4.5-1 10.2-10.2a2.1 2.1 0 0 0-3-3L5.5 16 4 20Z" /><path d="m13.5 7.5 3 3" /></>),
  web: (<><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></>),
  code: (<><path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" /></>),
  building: (<><path d="M5 21V4l7-2 7 2v17M2 21h20M9 8h2m2 0h2M9 12h2m2 0h2M9 16h2m2 0h2" /></>),
  spark: (<><path d="m12 3 1.6 6.4L20 11l-6.4 1.6L12 19l-1.6-6.4L4 11l6.4-1.6L12 3Z" /></>),
  cube: (<><path d="m12 2 9 5v10l-9 5-9-5V7l9-5Z" /><path d="m3 7 9 5 9-5M12 12v10" /></>),
  search: (<><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>),
  sun: (<><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>),
  moon: (<><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" /></>),
  home: (<><path d="m3 11 9-8 9 8" /><path d="M5 10v10h5v-6h4v6h5V10" /></>),
  grid: (<><rect x="3" y="3" width="7" height="7" rx="2" /><rect x="14" y="3" width="7" height="7" rx="2" /><rect x="3" y="14" width="7" height="7" rx="2" /><rect x="14" y="14" width="7" height="7" rx="2" /></>),
  mail: (<><rect x="3" y="5" width="18" height="14" rx="3" /><path d="m4 7 8 6 8-6" /></>),
  user: (<><circle cx="12" cy="8" r="4" /><path d="M4 21c1-4 4-6 8-6s7 2 8 6" /></>),
  layers: (<><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 13 9 5 9-5" /></>),
  check: (<><path d="m5 12 5 5 9-10" /></>),
}

export function Icon({ name, size = 20, className }: { name: IconName; size?: number; className?: string }) {
  return (
    <svg aria-hidden="true" className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  )
}

export function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 font-medium tracking-tight ${className}`}>
      <span className="relative grid h-7 w-7 place-items-center rounded-[9px] bg-inv-bg text-inv-fg">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 12V4.5L8 2l5 2.5V12" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /><path d="M6 12V8h4v4" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /></svg>
      </span>
      <span className="text-[17px]">craverloft</span>
    </span>
  )
}

/** Fades and lifts children into view the first time they scroll on screen. */
export function Reveal({ children, delay = 0, className = '', as: Tag = 'div' }: { children: ReactNode; delay?: number; className?: string; as?: 'div' | 'section' | 'li' }) {
  const ref = useRef<HTMLDivElement>(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect() } }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  const Comp = Tag as 'div'
  return <Comp ref={ref} style={{ '--d': `${delay}ms` } as CSSProperties} className={`reveal ${seen ? 'in' : ''} ${className}`}>{children}</Comp>
}

/** Container whose spotlight glow tracks the pointer. */
export function Spot({ children, className = '', ...rest }: { children: ReactNode; className?: string } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...rest}
      className={`spot ${className}`}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        e.currentTarget.style.setProperty('--x', `${e.clientX - r.left}px`)
        e.currentTarget.style.setProperty('--y', `${e.clientY - r.top}px`)
      }}
    >
      {children}
    </div>
  )
}

/** Element that gently follows the cursor while hovered. */
export function Magnetic({ children, strength = 0.28, className = '' }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  return (
    <span
      ref={ref}
      className={`inline-block transition-transform duration-300 ease-out ${className}`}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        const x = (e.clientX - (r.left + r.width / 2)) * strength
        const y = (e.clientY - (r.top + r.height / 2)) * strength
        e.currentTarget.style.transform = `translate(${x}px, ${y}px)`
      }}
      onPointerLeave={(e) => { e.currentTarget.style.transform = '' }}
    >
      {children}
    </span>
  )
}

/** Counts up to a number once visible. */
export function Counter({ to, suffix = '', prefix = '', decimals = 0 }: { to: number; suffix?: string; prefix?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [v, setV] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      const start = performance.now()
      const tick = (t: number) => {
        const p = Math.min((t - start) / 1400, 1)
        setV(to * (1 - Math.pow(1 - p, 4)))
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, { threshold: 0.4 })
    io.observe(el)
    return () => io.disconnect()
  }, [to])
  return <span ref={ref}>{prefix}{v.toFixed(decimals)}{suffix}</span>
}
