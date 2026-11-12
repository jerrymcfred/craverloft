'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { Icon, Logo } from './ui'
import { services } from '@/lib/content'
import type { IconName } from '@/lib/content'

function useTheme() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === 'light' ? 'light' : 'dark')
  }, [])
  const toggle = useCallback(() => {
    const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light'
    document.documentElement.dataset.theme = next
    try { localStorage.setItem('cl-theme', next) } catch {}
    setTheme(next)
  }, [])
  return { theme, toggle }
}

const dockItems: { href: string; label: string; icon: IconName }[] = [
  { href: '/', label: 'Home', icon: 'home' },
  { href: '/#work', label: 'Work', icon: 'grid' },
  { href: '/services', label: 'Services', icon: 'layers' },
  { href: '/studio', label: 'Studio', icon: 'user' },
  { href: '/contact', label: 'Contact', icon: 'mail' },
]

function Dock({ theme, toggle, openPalette }: { theme: string; toggle: () => void; openPalette: () => void }) {
  const pathname = usePathname()
  const wrap = useRef<HTMLDivElement>(null)

  // macOS-style magnification: scale each item by its distance from the pointer.
  const magnify = (clientX: number) => {
    wrap.current?.querySelectorAll<HTMLElement>('[data-dock]').forEach((el) => {
      const r = el.getBoundingClientRect()
      const d = Math.abs(clientX - (r.left + r.width / 2))
      const s = 1 + Math.max(0, 1 - d / 110) * 0.55
      el.style.setProperty('--s', String(s))
    })
  }
  const reset = () => wrap.current?.querySelectorAll<HTMLElement>('[data-dock]').forEach((el) => el.style.setProperty('--s', '1'))

  const active = (href: string) => (href === '/' ? pathname === '/' : href.startsWith('/#') ? false : pathname.startsWith(href))
  const itemCls = 'group relative grid h-11 w-11 place-items-center rounded-2xl text-fg transition-[transform,background-color] duration-200 ease-out hover:bg-glass-hi origin-bottom [transform:scale(var(--s,1))]'

  return (
    <nav aria-label="Primary" className="fixed inset-x-0 bottom-5 z-50 flex justify-center px-4">
      <div
        ref={wrap}
        onPointerMove={(e) => e.pointerType === 'mouse' && magnify(e.clientX)}
        onPointerLeave={reset}
        className="glass flex items-end gap-1.5 rounded-[26px] p-2"
      >
        {dockItems.map((it) => (
          <Link key={it.href} href={it.href} data-dock aria-label={it.label} className={itemCls}>
            <Icon name={it.icon} size={20} className={active(it.href) ? 'text-accent' : ''} />
            {active(it.href) && <span className="absolute -bottom-1 h-1 w-1 rounded-full bg-accent" />}
            <span className="pointer-events-none absolute -top-9 whitespace-nowrap rounded-lg bg-inv-bg px-2.5 py-1 text-[11px] font-medium text-inv-fg opacity-0 transition-opacity group-hover:opacity-100">{it.label}</span>
          </Link>
        ))}
        <span className="mx-1 mb-2.5 h-6 w-px self-end bg-line" />
        <button data-dock aria-label="Search and commands" onClick={openPalette} className={itemCls}>
          <Icon name="search" size={19} />
          <span className="pointer-events-none absolute -top-9 whitespace-nowrap rounded-lg bg-inv-bg px-2.5 py-1 text-[11px] font-medium text-inv-fg opacity-0 transition-opacity group-hover:opacity-100">Search  ⌘K</span>
        </button>
        <button data-dock aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`} onClick={toggle} className={itemCls}>
          <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={19} />
          <span className="pointer-events-none absolute -top-9 whitespace-nowrap rounded-lg bg-inv-bg px-2.5 py-1 text-[11px] font-medium text-inv-fg opacity-0 transition-opacity group-hover:opacity-100">{theme === 'dark' ? 'Light mode' : 'Dark mode'}</span>
        </button>
      </div>
    </nav>
  )
}

type Cmd = { id: string; label: string; hint: string; icon: IconName; run: () => void }

type NavProject = { slug: string; title: string }

function Palette({ open, close, toggleTheme, projects }: { open: boolean; close: () => void; toggleTheme: () => void; projects: NavProject[] }) {
  const router = useRouter()
  const [q, setQ] = useState('')
  const [i, setI] = useState(0)
  const input = useRef<HTMLInputElement>(null)

  const cmds = useMemo<Cmd[]>(() => {
    const go = (href: string) => () => { router.push(href) }
    return [
      { id: 'home', label: 'Home', hint: 'Page', icon: 'home', run: go('/') },
      { id: 'services', label: 'All services', hint: 'Page', icon: 'layers', run: go('/services') },
      ...services.map((s) => ({ id: s.slug, label: s.title, hint: 'Service', icon: s.icon, run: go(`/services/${s.slug}`) })),
      ...projects.map((c) => ({ id: c.slug, label: c.title, hint: 'Case study', icon: 'grid' as IconName, run: go(`/work/${c.slug}`) })),
      { id: 'studio', label: 'The studio', hint: 'Page', icon: 'user', run: go('/studio') },
      { id: 'contact', label: 'Start a project', hint: 'Contact', icon: 'mail', run: go('/contact') },
      { id: 'theme', label: 'Toggle light / dark theme', hint: 'Action', icon: 'sun', run: toggleTheme },
    ]
  }, [router, toggleTheme, projects])

  const list = cmds.filter((c) => c.label.toLowerCase().includes(q.toLowerCase()))

  useEffect(() => { if (open) { setQ(''); setI(0); setTimeout(() => input.current?.focus(), 30) } }, [open])
  useEffect(() => setI(0), [q])

  if (!open) return null
  const choose = (c?: Cmd) => { if (!c) return; close(); c.run() }

  return (
    <div className="fixed inset-0 z-[60] grid place-items-start justify-center bg-black/40 px-4 pt-[16vh] backdrop-blur-sm" onMouseDown={close} role="dialog" aria-modal="true" aria-label="Command palette">
      <div onMouseDown={(e) => e.stopPropagation()} className="glass w-full max-w-xl overflow-hidden rounded-3xl">
        <div className="flex items-center gap-3 border-b border-line px-5">
          <Icon name="search" size={18} className="text-mute" />
          <input
            ref={input}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown') { e.preventDefault(); setI((v) => Math.min(v + 1, list.length - 1)) }
              if (e.key === 'ArrowUp') { e.preventDefault(); setI((v) => Math.max(v - 1, 0)) }
              if (e.key === 'Enter') choose(list[i])
              if (e.key === 'Escape') close()
            }}
            placeholder="Search pages, services, case studies..."
            className="h-14 flex-1 bg-transparent text-[15px] outline-none placeholder:text-mute"
          />
          <kbd className="eyebrow rounded-md border border-line px-1.5 py-0.5">esc</kbd>
        </div>
        <ul className="max-h-[50vh] overflow-auto p-2">
          {list.length === 0 && <li className="px-4 py-8 text-center text-sm text-mute">No results for “{q}”</li>}
          {list.map((c, n) => (
            <li key={c.id}>
              <button onMouseEnter={() => setI(n)} onClick={() => choose(c)} className={`flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm transition-colors ${n === i ? 'bg-glass-hi' : ''}`}>
                <span className="grid h-8 w-8 place-items-center rounded-xl border border-line"><Icon name={c.icon} size={16} /></span>
                <span className="flex-1">{c.label}</span>
                <span className="eyebrow">{c.hint}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function TopBar({ openPalette }: { openPalette: () => void }) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return (
    <header className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${scrolled ? 'py-3' : 'py-6'}`}>
      <div className="mx-auto flex max-w-[1240px] items-center justify-between px-5 sm:px-8">
        <Link href="/" aria-label="Craverloft home"><Logo /></Link>
        <div className="flex items-center gap-2">
          <button onClick={openPalette} className="glass hidden items-center gap-3 rounded-full py-2 pl-4 pr-2.5 text-[13px] text-mute transition-colors hover:text-fg sm:flex">
            <Icon name="search" size={15} /> Search
            <kbd className="eyebrow rounded-md border border-line px-1.5 py-0.5 !text-[10px]">⌘K</kbd>
          </button>
          <Link href="/contact" className="rounded-full bg-inv-bg px-5 py-2.5 text-[13px] font-medium text-inv-fg transition-transform hover:scale-[1.03]">Start a project</Link>
        </div>
      </div>
    </header>
  )
}

function Footer({ projects }: { projects: NavProject[] }) {
  return (
    <footer className="relative border-t border-line px-5 pb-36 pt-20 sm:px-8">
      <div className="mx-auto grid max-w-[1240px] gap-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-mute">A software design and engineering company for teams with meaningful work to do.</p>
        </div>
        <div className="grid content-start gap-3 text-sm">
          <span className="eyebrow mb-1">Services</span>
          {services.map((s) => <Link key={s.slug} href={`/services/${s.slug}`} className="text-soft transition-colors hover:text-fg">{s.short}</Link>)}
        </div>
        <div className="grid content-start gap-3 text-sm">
          <span className="eyebrow mb-1">Work</span>
          {projects.map((c) => <Link key={c.slug} href={`/work/${c.slug}`} className="text-soft transition-colors hover:text-fg">{c.title}</Link>)}
        </div>
        <div className="grid content-start gap-3 text-sm">
          <span className="eyebrow mb-1">Studio</span>
          <Link href="/studio" className="text-soft transition-colors hover:text-fg">About</Link>
          <Link href="/contact" className="text-soft transition-colors hover:text-fg">Contact</Link>
          <a href="mailto:hello@craverloft.com" className="text-soft transition-colors hover:text-fg">hello@craverloft.com</a>
        </div>
      </div>
      <div className="mx-auto mt-16 flex max-w-[1240px] flex-col justify-between gap-3 border-t border-line pt-6 text-xs text-mute sm:flex-row">
        <span>© {new Date().getFullYear()} Craverloft Ltd. All rights reserved.</span>
        <span>Designed with intent. Engineered with care.</span>
      </div>
    </footer>
  )
}

export default function Chrome({ children, projects }: { children: ReactNode; projects: NavProject[] }) {
  const { theme, toggle } = useTheme()
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const on = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setOpen((v) => !v) }
    }
    window.addEventListener('keydown', on)
    return () => window.removeEventListener('keydown', on)
  }, [])

  // Scroll to top on route change unless the link targets a hash.
  useEffect(() => { if (!window.location.hash) window.scrollTo(0, 0) }, [pathname])

  return (
    <>
      <div className="aurora" aria-hidden="true"><i /><i /><i /></div>
      <TopBar openPalette={() => setOpen(true)} />
      {children}
      <Footer projects={projects} />
      <Dock theme={theme} toggle={toggle} openPalette={() => setOpen(true)} />
      <Palette open={open} close={() => setOpen(false)} toggleTheme={toggle} projects={projects} />
    </>
  )
}
