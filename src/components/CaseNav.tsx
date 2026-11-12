'use client'

import { useEffect, useState } from 'react'

export default function CaseNav({ items }: { items: { id: string; label: string }[] }) {
  const [active, setActive] = useState(items[0]?.id)
  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[]
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id) })
    }, { rootMargin: '-30% 0px -60% 0px' })
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [items])
  return (
    <nav aria-label="Case study sections" className="glass hidden rounded-3xl p-3 lg:block">
      <ul className="grid gap-0.5">
        {items.map((it, n) => (
          <li key={it.id}>
            <a href={`#${it.id}`} className={`flex items-center gap-3 rounded-2xl px-3 py-2.5 text-[13px] transition-colors ${active === it.id ? 'bg-glass-hi text-fg' : 'text-mute hover:text-fg'}`}>
              <span className={`eyebrow !text-[10px] ${active === it.id ? '!text-accent' : ''}`}>{String(n + 1).padStart(2, '0')}</span>{it.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
