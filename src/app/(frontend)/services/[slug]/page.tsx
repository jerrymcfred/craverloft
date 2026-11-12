import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { Icon, Reveal } from '@/components/ui'
import { ContactCTA } from '@/components/home'
import ProjectVisual from '@/components/ProjectArt'
import { getProjects } from '@/lib/projects'
import { processSteps, services } from '@/lib/content'

export const dynamicParams = false
export function generateStaticParams() { return services.map((s) => ({ slug: s.slug })) }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const s = services.find((x) => x.slug === slug)
  return s ? { title: `${s.title} | Craverloft`, description: s.description } : {}
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const s = services.find((x) => x.slug === slug)
  if (!s) notFound()
  const idx = services.indexOf(s)
  const next = services[(idx + 1) % services.length]
  const all = await getProjects()
  const related = [...all.filter((p) => p.disciplines.includes(s.slug)), ...all.filter((p) => !p.disciplines.includes(s.slug))].slice(0, 2)

  return (
    <main>
      <header className="mx-auto max-w-[1240px] px-5 pb-20 pt-40 sm:px-8">
        <Link href="/services" className="eyebrow inline-flex items-center gap-2 transition-colors hover:text-fg"><Icon name="arrow" size={14} className="rotate-180" />All services</Link>
        <div className="mt-10 grid items-end gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="eyebrow flex items-center gap-3"><i className="h-px w-8 bg-accent" />{s.num} / Capability</p>
            <h1 className="mt-8 text-[clamp(42px,6.6vw,92px)] leading-[0.98]">{s.title}</h1>
            <p className="mt-9 max-w-xl text-[18px] leading-relaxed text-mute">{s.description}</p>
            <div className="mt-10 flex flex-wrap gap-2.5">{s.tags.map((t) => <span key={t} className="glass rounded-full px-4 py-2 text-[13px]">{t}</span>)}</div>
          </div>
          <div className="glass relative grid aspect-square max-h-[420px] place-items-center overflow-hidden rounded-[40px]">
            <div className="absolute h-[78%] w-[78%] rounded-full border border-line" /><div className="absolute h-[52%] w-[52%] rounded-full border border-line" />
            <span className="relative grid h-28 w-28 place-items-center rounded-[32px] bg-inv-bg text-inv-fg shadow-2xl"><Icon name={s.icon} size={44} /></span>
          </div>
        </div>
      </header>

      <section className="mx-auto grid max-w-[1240px] gap-14 px-5 py-24 sm:px-8 lg:grid-cols-[1fr_1.4fr]">
        <div className="lg:sticky lg:top-28 lg:self-start"><p className="eyebrow flex items-center gap-3"><i className="h-px w-8 bg-accent" />What we deliver</p><h2 className="mt-6 text-[clamp(32px,4vw,52px)] leading-[1.06]">Built for clarity. Made for <em className="font-serif font-normal text-accent">momentum</em>.</h2></div>
        <div className="border-t border-line">
          {s.deliverables.map((d, n) => (
            <Reveal key={d}><div className="group flex items-center gap-6 border-b border-line py-8"><span className="eyebrow w-8">0{n + 1}</span><h3 className="flex-1 text-xl transition-transform duration-500 group-hover:translate-x-2 sm:text-2xl">{d}</h3><Icon name="check" size={20} className="text-accent opacity-0 transition-opacity group-hover:opacity-100" /></div></Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-5 py-12 sm:px-8">
        <p className="eyebrow mb-8 flex items-center gap-3"><i className="h-px w-8 bg-accent" />How we deliver</p>
        <ol className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-5">
          {processSteps.map((p, n) => <li key={p.title} className="bg-bg2/80 p-6 backdrop-blur"><span className="eyebrow !text-accent">0{n + 1}</span><p className="mt-8 text-[17px] leading-snug">{p.title}</p></li>)}
        </ol>
        <div className="mt-10 flex flex-wrap items-center gap-3"><span className="eyebrow mr-2">Tools</span>{s.stack.map((t) => <span key={t} className="rounded-full border border-line px-4 py-1.5 text-[13px] text-soft">{t}</span>)}</div>
      </section>

      <section className="mx-auto max-w-[1240px] px-5 py-24 sm:px-8">
        {related.length > 0 && <p className="eyebrow mb-8 flex items-center gap-3"><i className="h-px w-8 bg-accent" />Related work</p>}
        <div className="grid gap-5 md:grid-cols-2">
          {related.map((c) => (
            <Link key={c.slug} href={`/work/${c.slug}`} className="group block">
              <ProjectVisual project={c} className="aspect-[16/11] transition-transform duration-700 group-hover:scale-[1.015]" />
              <div className="mt-5 flex items-center justify-between"><div><p className="eyebrow">{c.sector}</p><h3 className="mt-2 text-2xl">{c.title}</h3></div><span className="text-accent">{c.results[0]?.value} <span className="text-xs text-mute">{c.results[0]?.label}</span></span></div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <Link href={`/services/${next.slug}`} className="glass group flex items-center justify-between rounded-[32px] p-8 sm:p-12">
          <div><p className="eyebrow">Next capability</p><p className="mt-3 text-3xl sm:text-5xl">{next.title}</p></div>
          <Icon name="arrow" size={36} className="transition-transform group-hover:translate-x-2" />
        </Link>
      </section>
      <ContactCTA />
    </main>
  )
}
