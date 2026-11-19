'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { Counter, Icon, Magnetic, Reveal, Spot } from './ui'
import ProjectVisual from './ProjectArt'
import type { ProjectCard } from '@/lib/projects'
import ContactForm from './ContactForm'
import { industries, partners, principles, processSteps, services, techRows, testimonials } from '@/lib/content'

export function Heading({ eyebrow, title, children }: { eyebrow: string; title: React.ReactNode; children?: React.ReactNode }) {
  return (
    <div className="mb-14 grid gap-6 md:grid-cols-[1fr_1.4fr] md:gap-16">
      <p className="eyebrow flex items-center gap-3 pt-3"><i className="h-px w-8 bg-accent" />{eyebrow}</p>
      <div>
        <h2 className="text-[clamp(34px,5vw,64px)] leading-[1.04]">{title}</h2>
        {children && <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-mute">{children}</p>}
      </div>
    </div>
  )
}

const Section = ({ id, children, className = '' }: { id?: string; children: React.ReactNode; className?: string }) => (
  <section id={id} className={`mx-auto max-w-[1240px] scroll-mt-24 px-5 py-28 sm:px-8 md:py-36 ${className}`}>{children}</section>
)

/* ---------------- Hero ---------------- */
const words = ['software', 'products', 'platforms', 'systems']

export function Hero() {
  const [w, setW] = useState(0)
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const t = setInterval(() => setW((v) => (v + 1) % words.length), 2600)
    return () => clearInterval(t)
  }, [])

  return (
    <header
      ref={ref}
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden px-5 pb-32 pt-36 sm:px-8"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        const x = (e.clientX - r.left) / r.width - 0.5
        const y = (e.clientY - r.top) / r.height - 0.5
        e.currentTarget.style.setProperty('--px', String(x))
        e.currentTarget.style.setProperty('--py', String(y))
      }}
    >
      <div className="absolute inset-0 -z-10" style={{ backgroundImage: 'radial-gradient(circle, var(--line) 1px, transparent 1.2px)', backgroundSize: '34px 34px', maskImage: 'radial-gradient(ellipse at 50% 40%, #000 20%, transparent 72%)' }} />
      <div className="mx-auto grid w-full max-w-[1240px] items-center gap-16 lg:grid-cols-[1.25fr_1fr]">
        <div>
          <p className="glass reveal in inline-flex items-center gap-2.5 rounded-full py-2 pl-3 pr-4 text-[12px] text-soft">
            <span className="relative flex h-2 w-2"><i className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" /><i className="relative h-2 w-2 rounded-full bg-emerald-400" /></span>
            Now booking projects for the next quarter
          </p>
          <h1 className="mt-8 text-[clamp(46px,7.4vw,108px)] font-medium leading-[0.95]">
            We design the
            <br />
            <span key={w} className="swap-in inline-block bg-gradient-to-r from-accent to-accent2 bg-clip-text font-serif italic font-normal text-transparent pr-2">{words[w]}</span>
            <br />
            behind bold ideas.
          </h1>
          <p className="mt-9 max-w-xl text-[18px] leading-relaxed text-mute">
            Craverloft is a software design and engineering company. We build interactive products, enterprise platforms and intelligent systems for organisations that intend to lead.
          </p>
          <div className="mt-11 flex flex-wrap items-center gap-4">
            <Magnetic>
              <Link href="/contact" className="group inline-flex items-center gap-3 rounded-full bg-inv-bg px-8 py-4 text-[15px] font-medium text-inv-fg shadow-xl shadow-black/10">
                Start a project <Icon name="arrow" size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </Magnetic>
            <Link href="/#work" className="glass inline-flex items-center gap-2 rounded-full px-7 py-4 text-[15px] font-medium transition-transform hover:scale-[1.03]">See our work</Link>
          </div>
        </div>

        {/* floating glass device stack that responds to the pointer */}
        <div className="relative hidden h-[540px] lg:block" aria-hidden="true">
          <div className="absolute inset-0 transition-transform duration-300 ease-out" style={{ transform: 'translate3d(calc(var(--px,0) * -18px), calc(var(--py,0) * -18px), 0)' }}>
            <div className="glass absolute left-4 top-10 w-[78%] rounded-[28px] p-6" style={{ transform: 'rotate(-4deg)' }}>
              <p className="eyebrow !text-[10px]">Decision engine</p>
              <p className="mt-2 text-5xl tracking-tight">42%</p>
              <p className="mt-1 text-sm text-mute">faster operational decisions</p>
              <svg viewBox="0 0 300 80" className="mt-5 w-full"><path d="M0 62 C40 58 50 30 90 40 S150 66 190 38 S260 8 300 14" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" /></svg>
            </div>
          </div>
          <div className="absolute inset-0 transition-transform duration-300 ease-out" style={{ transform: 'translate3d(calc(var(--px,0) * 26px), calc(var(--py,0) * 26px), 0)' }}>
            <div className="glass absolute bottom-6 right-0 w-[64%] rounded-[28px] p-6" style={{ transform: 'rotate(3deg)' }}>
              <div className="flex items-center justify-between"><p className="eyebrow !text-[10px]">Portfolio</p><span className="rounded-full bg-emerald-400/15 px-2 py-0.5 text-[11px] text-emerald-400">+12.4%</span></div>
              <p className="mt-3 text-3xl tracking-tight">$248,920</p>
              <div className="mt-5 grid gap-2.5">{[80, 56, 34].map((w2, i) => <i key={i} className="block h-1.5 rounded-full" style={{ width: `${w2}%`, background: i === 0 ? 'var(--accent)' : i === 1 ? 'var(--accent-2)' : 'var(--line)' }} />)}</div>
            </div>
            <div className="glass absolute right-8 top-0 grid h-16 w-16 place-items-center rounded-2xl text-accent"><Icon name="spark" size={26} /></div>
            <div className="glass absolute bottom-0 left-2 flex items-center gap-3 rounded-2xl px-4 py-3"><Icon name="cube" size={20} className="text-accent2" /><span className="text-sm">On-chain settlement</span></div>
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-28 mx-auto hidden max-w-[1240px] items-center justify-between px-8 text-mute md:flex">
        <span className="eyebrow">Strategy · Design · Engineering · Intelligence</span>
        <span className="eyebrow flex items-center gap-2">Scroll <i className="h-px w-10 bg-mute/60" /></span>
      </div>
    </header>
  )
}

/* ---------------- Manifesto: words light up on scroll ---------------- */
export function Manifesto() {
  const ref = useRef<HTMLParagraphElement>(null)
  const text = 'We are not another digital agency. Craverloft is a product partner of senior designers and engineers, solving consequential problems in interactive design, enterprise software, AI, blockchain and industrial technology.'
  const parts = text.split(' ')
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const spans = Array.from(el.querySelectorAll<HTMLElement>('span'))
    let raf = 0
    const update = () => {
      const r = el.getBoundingClientRect()
      const p = Math.min(1, Math.max(0, (window.innerHeight * 0.85 - r.top) / (r.height + window.innerHeight * 0.35)))
      spans.forEach((s, i) => { s.style.opacity = String(p * spans.length > i ? 1 : 0.18) })
    }
    const on = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', on)
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on) }
  }, [])
  return (
    <Section id="studio-intro" className="!py-24">
      <p className="eyebrow mb-8 flex items-center gap-3"><i className="h-px w-8 bg-accent" />The studio</p>
      <p ref={ref} className="max-w-5xl text-[clamp(28px,4.2vw,56px)] font-medium leading-[1.12] tracking-tight">
        {parts.map((w2, i) => <span key={i} className="transition-opacity duration-500" style={{ opacity: 0.18 }}>{w2}{' '}</span>)}
      </p>
      <div className="mt-20 grid gap-10 border-t border-line pt-10 sm:grid-cols-3">
        {[[3, '+', 'Years building software'], [20, '+', 'Products shipped'], [5, '', 'Industries served']].map(([n, s, l]) => (
          <div key={String(l)}><p className="text-6xl font-medium tracking-tight sm:text-7xl"><Counter to={n as number} suffix={s as string} /></p><p className="eyebrow mt-3">{l}</p></div>
        ))}
      </div>
    </Section>
  )
}

/* ---------------- Services bento ---------------- */
export function Services() {
  const spans = ['md:col-span-7', 'md:col-span-5', 'md:col-span-5', 'md:col-span-7']
  return (
    <Section id="services">
      <Heading eyebrow="Capabilities" title={<>Everything it takes to <em className="font-serif font-normal text-accent">ship</em> something remarkable.</>}>Four focused disciplines, each with its own team and craft.</Heading>
      <div className="grid gap-4 md:grid-cols-12">
        {services.map((s, i) => (
          <Reveal key={s.slug} delay={i * 80} className={spans[i]}>
            <Spot className="glass group h-full rounded-[32px]">
              <Link href={`/services/${s.slug}`} className="relative flex h-full min-h-[340px] flex-col p-8 sm:p-10">
                <div className="flex items-start justify-between">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl border border-line bg-glass text-accent transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[-6deg]"><Icon name={s.icon} size={26} /></span>
                  <span className="eyebrow">{s.num}</span>
                </div>
                <h3 className="mt-auto pt-14 text-3xl leading-tight">{s.title}</h3>
                <p className="mt-4 max-w-md text-[15px] leading-relaxed text-mute">{s.description}</p>
                <div className="mt-7 flex flex-wrap gap-2">{s.tags.map((t) => <span key={t} className="rounded-full border border-line px-3 py-1 text-xs text-soft">{t}</span>)}</div>
                <span className="absolute bottom-9 right-9 grid h-11 w-11 place-items-center rounded-full border border-line opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:bg-inv-bg group-hover:text-inv-fg"><Icon name="arrow" size={18} /></span>
              </Link>
            </Spot>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

/* ---------------- Selected work: interactive showcase ---------------- */
export function Work({ projects }: { projects: ProjectCard[] }) {
  const [i, setI] = useState(0)
  const c = projects[Math.min(i, projects.length - 1)]
  if (!c) {
    return (
      <Section id="work">
        <Heading eyebrow="Selected work" title={<>Case studies are <em className="font-serif font-normal text-accent2">coming soon</em>.</>}>New projects will appear here as soon as they are published.</Heading>
      </Section>
    )
  }
  return (
    <Section id="work">
      <Heading eyebrow="Selected work" title={<>Evidence over <em className="font-serif font-normal text-accent2">promises</em>.</>}>Select a project to explore the problem, the product and the impact.</Heading>
      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.4fr]">
        <div className="grid content-start gap-3" role="tablist" aria-label="Projects">
          {projects.map((p, n) => (
            <button key={p.slug} role="tab" aria-selected={n === i} onClick={() => setI(n)} onMouseEnter={() => setI(n)} className={`group relative rounded-3xl border p-6 text-left transition-all duration-300 ${n === i ? 'glass border-transparent' : 'border-line hover:bg-glass'}`}>
              <div className="flex items-center justify-between"><span className="eyebrow">{String(n + 1).padStart(2, '0')} · {p.sector}</span><span className={`h-2 w-2 rounded-full transition-colors ${n === i ? 'bg-accent' : 'bg-line'}`} /></div>
              <h3 className="mt-5 text-2xl">{p.title}</h3>
              <div className={`grid transition-all duration-500 ${n === i ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden"><p className="pt-3 text-sm leading-relaxed text-mute">{p.summary}</p></div>
              </div>
            </button>
          ))}
        </div>
        <div className="grid gap-4">
          <Link href={`/work/${c.slug}`} aria-label={`Open ${c.title} case study`} className="group block">
            <div key={c.slug} className="swap-in">
              <ProjectVisual project={c} className="aspect-[16/11] transition-transform duration-700 group-hover:scale-[1.012] sm:aspect-[16/10]" />
            </div>
          </Link>
          <div className="glass flex flex-col gap-6 rounded-3xl p-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="grid flex-1 grid-cols-3 gap-4">
              {c.results.map((r) => <div key={r.label}><p className="text-3xl tracking-tight text-accent sm:text-4xl">{r.value}</p><p className="mt-1.5 text-[11px] leading-snug text-mute">{r.label}</p></div>)}
            </div>
            <Link href={`/work/${c.slug}`} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-inv-bg px-6 py-3.5 text-sm font-medium text-inv-fg transition-transform hover:scale-[1.03]">Read case study <Icon name="arrow" size={16} /></Link>
          </div>
        </div>
      </div>
    </Section>
  )
}

/* ---------------- Industries: hover accordion ---------------- */
export function Industries() {
  const [open, setOpen] = useState(0)
  return (
    <Section>
      <Heading eyebrow="Industries" title={<>Deep context. <em className="font-serif font-normal text-accent">Fresh</em> perspective.</>} />
      <div className="border-t border-line">
        {industries.map((x, n) => (
          <button key={x.name} onMouseEnter={() => setOpen(n)} onFocus={() => setOpen(n)} onClick={() => setOpen(n)} aria-expanded={open === n} className="group block w-full border-b border-line py-7 text-left">
            <div className="flex items-center gap-6">
              <span className="eyebrow w-8">{String(n + 1).padStart(2, '0')}</span>
              <h3 className={`flex-1 text-[clamp(26px,3.6vw,46px)] transition-all duration-500 ${open === n ? 'translate-x-3 text-fg' : 'text-mute'}`}>{x.name}</h3>
              <Icon name="arrow" size={26} className={`transition-all duration-500 ${open === n ? 'rotate-[-45deg] text-accent' : 'text-mute'}`} />
            </div>
            <div className={`grid pl-14 transition-all duration-500 ${open === n ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
              <div className="overflow-hidden"><p className="max-w-xl pt-4 text-[15px] leading-relaxed text-mute">{x.text}</p></div>
            </div>
          </button>
        ))}
      </div>
    </Section>
  )
}

/* ---------------- Why Craverloft ---------------- */
export function Why() {
  return (
    <Section>
      <div className="glass overflow-hidden rounded-[40px] p-8 sm:p-14 md:p-20">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow flex items-center gap-3"><i className="h-px w-8 bg-accent" />Why Craverloft</p>
            <h2 className="mt-8 text-[clamp(36px,5vw,66px)] leading-[1.02]">Small teams.<br />Senior minds.<br /><em className="font-serif font-normal text-accent">Serious</em> outcomes.</h2>
            <p className="mt-8 max-w-md text-[16px] leading-relaxed text-mute">We stay deliberately focused. The people who scope your project are the people who build it.</p>
            <Link href="/studio" className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-accent">Meet the studio <Icon name="arrow" size={16} /></Link>
          </div>
          <div className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line">
            {principles.map((p, n) => (
              <Spot key={p.title} className="bg-bg2/80 p-8 backdrop-blur">
                <span className="eyebrow">0{n + 1}</span>
                <h3 className="mt-4 text-2xl">{p.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-mute">{p.text}</p>
              </Spot>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}

/* ---------------- Process: auto-advancing stepper ---------------- */
export function Process() {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  useEffect(() => {
    if (paused) return
    const t = setTimeout(() => setI((v) => (v + 1) % processSteps.length), 5200)
    return () => clearTimeout(t)
  }, [i, paused])
  const s = processSteps[i]
  return (
    <Section id="process">
      <Heading eyebrow="Our process" title={<>Structured enough to deliver. Flexible enough to <em className="font-serif font-normal text-accent2">discover</em>.</>} />
      <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} className="grid gap-6 lg:grid-cols-[1fr_1.15fr]">
        <ol className="grid gap-2">
          {processSteps.map((p, n) => (
            <li key={p.title}>
              <button onClick={() => setI(n)} aria-current={n === i} className={`relative w-full overflow-hidden rounded-2xl px-5 py-5 text-left transition-colors ${n === i ? 'glass' : 'hover:bg-glass'}`}>
                <div className="flex items-center gap-5">
                  <span className={`eyebrow w-7 ${n === i ? '!text-accent' : ''}`}>{String(n + 1).padStart(2, '0')}</span>
                  <span className={`text-lg transition-colors sm:text-xl ${n === i ? 'text-fg' : 'text-mute'}`}>{p.title}</span>
                </div>
                {n === i && !paused && <i key={`${i}-p`} className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-accent" style={{ animation: 'progress 5.2s linear forwards' }} />}
              </button>
            </li>
          ))}
        </ol>
        <div className="glass relative min-h-[360px] overflow-hidden rounded-[32px] p-8 sm:p-12">
          <span className="pointer-events-none absolute -right-4 -top-10 text-[220px] font-medium leading-none tracking-tighter text-fg/[0.05]">{i + 1}</span>
          <div key={i} className="swap-in relative flex h-full flex-col">
            <p className="eyebrow">Phase {String(i + 1).padStart(2, '0')} / 05</p>
            <h3 className="mt-6 text-4xl leading-tight">{s.title}</h3>
            <p className="mt-5 text-lg text-soft">{s.text}</p>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-mute">{s.detail}</p>
          </div>
        </div>
      </div>
    </Section>
  )
}

/* ---------------- Technology marquee ---------------- */
export function Tech() {
  return (
    <section className="overflow-hidden border-y border-line py-24">
      <div className="mx-auto mb-14 max-w-[1240px] px-5 sm:px-8">
        <p className="eyebrow flex items-center gap-3"><i className="h-px w-8 bg-accent" />Technology capabilities</p>
        <h2 className="mt-6 max-w-3xl text-[clamp(32px,4.6vw,58px)] leading-[1.06]">Modern tools. <em className="font-serif font-normal text-accent">Enduring</em> systems.</h2>
      </div>
      <div className="marquee-wrap grid gap-4 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        {techRows.map((row, r) => (
          <div key={r} className="flex w-max">
            <div className={`marquee flex shrink-0 gap-4 pr-4 ${r ? 'marquee-rev' : ''}`}>
              {[...row, ...row, ...row, ...row].map((t, n) => (
                <span key={n} className="glass shrink-0 whitespace-nowrap rounded-full px-8 py-4 text-lg transition-colors hover:text-accent">{t}</span>
              ))}
            </div>
            <div className={`marquee flex shrink-0 gap-4 pr-4 ${r ? 'marquee-rev' : ''}`} aria-hidden="true">
              {[...row, ...row, ...row, ...row].map((t, n) => (
                <span key={n} className="glass shrink-0 whitespace-nowrap rounded-full px-8 py-4 text-lg">{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ---------------- Testimonials ---------------- */
export function Testimonials() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setTimeout(() => setI((v) => (v + 1) % testimonials.length), 7000)
    return () => clearTimeout(t)
  }, [i])
  const t = testimonials[i]
  return (
    <Section>
      <div className="text-center">
        <p className="eyebrow flex items-center justify-center gap-3"><i className="h-px w-8 bg-accent" />Client voices</p>
        <div className="mx-auto mt-10 min-h-[300px] max-w-4xl sm:min-h-[260px]">
          <blockquote key={i} className="swap-in text-[clamp(26px,3.6vw,46px)] font-medium leading-[1.2] tracking-tight">“{t.quote}”</blockquote>
          <p className="mt-9 text-sm"><span className="font-medium">{t.name}</span><span className="text-mute"> · {t.role}</span></p>
        </div>
        <div className="mt-6 flex justify-center gap-2">
          {testimonials.map((x, n) => <button key={x.name} aria-label={`Show testimonial ${n + 1}`} onClick={() => setI(n)} className={`h-1.5 rounded-full transition-all ${n === i ? 'w-10 bg-accent' : 'w-4 bg-line'}`} />)}
        </div>
        <div className="mt-20 flex flex-wrap items-center justify-center gap-x-14 gap-y-6 border-t border-line pt-12 text-2xl font-medium tracking-tight text-mute/70">
          {partners.map((p) => <span key={p} className="transition-colors hover:text-fg">{p}</span>)}
        </div>
      </div>
    </Section>
  )
}

/* ---------------- Contact CTA with live form ---------------- */
export function ContactCTA({ id = 'contact' }: { id?: string }) {
  return (
    <Section id={id}>
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div>
          <p className="eyebrow flex items-center gap-3"><i className="h-px w-8 bg-accent" />Start a project</p>
          <h2 className="mt-8 text-[clamp(40px,6vw,84px)] leading-[0.98]">Have something <em className="bg-gradient-to-r from-accent to-accent2 bg-clip-text font-serif font-normal text-transparent">ambitious</em> in mind?</h2>
          <p className="mt-8 max-w-md text-[17px] leading-relaxed text-mute">Tell us where you want to go. A senior member of the team will reply within one working day.</p>
          <ul className="mt-10 grid gap-4 text-sm text-soft">
            {['Free initial consultation', 'Clear scope, timeline and pricing', 'Your enquiry goes directly to our founders'].map((t) => (
              <li key={t} className="flex items-center gap-3"><span className="grid h-6 w-6 place-items-center rounded-full bg-accent/15 text-accent"><Icon name="check" size={14} /></span>{t}</li>
            ))}
          </ul>
          <a href="mailto:hello@craverloft.com" className="mt-10 inline-block font-serif text-3xl italic text-accent">hello@craverloft.com</a>
        </div>
        <Reveal><ContactForm /></Reveal>
      </div>
    </Section>
  )
}
