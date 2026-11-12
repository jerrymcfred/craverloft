import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { Icon } from '@/components/ui'
import { ContactCTA } from '@/components/home'
import ProjectVisual from '@/components/ProjectArt'
import CaseNav from '@/components/CaseNav'
import { getProject, getProjects } from '@/lib/projects'
import { services } from '@/lib/content'

// Known projects are prerendered; a newly published project renders on first visit and is then cached.
export async function generateStaticParams() { return (await getProjects()).map((p) => ({ slug: p.slug })) }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const p = await getProject(slug)
  return p ? { title: `${p.title} | Craverloft case study`, description: p.summary } : {}
}

const linkLabel: Record<string, string> = { live: 'Live site', app: 'App', code: 'Code', press: 'Press', other: 'Link' }

const Paragraphs = ({ text }: { text: string }) => (
  <>{text.split(/\n\s*\n/).map((t, i) => <p key={i} className={i ? 'mt-5' : ''}>{t}</p>)}</>
)

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const c = await getProject(slug)
  if (!c) notFound()
  const all = await getProjects()
  const next = all.length > 1 ? all[(all.findIndex((x) => x.slug === c.slug) + 1) % all.length] : null

  // Only sections with content are shown, numbered in order.
  const sections: { id: string; label: string; title: string; body: React.ReactNode }[] = []
  const add = (id: string, label: string, title: string, body: React.ReactNode, show: boolean) => { if (show) sections.push({ id, label, title, body }) }
  const List = ({ items }: { items: string[] }) => (
    <ul className="grid gap-3">{items.map((o) => <li key={o} className="flex gap-4 border-b border-line pb-3"><Icon name="check" size={18} className="mt-1 shrink-0 text-accent" />{o}</li>)}</ul>
  )
  add('client', 'Client', 'Client introduction', <Paragraphs text={c.intro} />, !!c.intro)
  add('overview', 'Overview', 'Project overview', <Paragraphs text={c.overview} />, !!c.overview)
  add('challenge', 'Challenge', 'Business challenge', <Paragraphs text={c.challenge} />, !!c.challenge)
  add('objectives', 'Objectives', 'Objectives', <List items={c.objectives} />, c.objectives.length > 0)
  add('research', 'Research & strategy', 'Research and strategy', <Paragraphs text={c.research} />, !!c.research)
  add('design', 'Design direction', 'Design direction', <Paragraphs text={c.design} />, !!c.design)
  add('development', 'Development', 'Development process', <Paragraphs text={c.development} />, !!c.development)
  add('product', 'Final product', 'Final product', <List items={c.product} />, c.product.length > 0)
  const hasResults = c.results.length > 0
  const nav = [...sections.map((s) => ({ id: s.id, label: s.label })), ...(hasResults ? [{ id: 'results', label: 'Results & impact' }] : [])]
  const disciplineLabels = c.disciplines.map((d) => services.find((s) => s.slug === d)?.short).filter(Boolean) as string[]
  const serviceList = [...disciplineLabels, ...c.tags].join(' · ')

  return (
    <main>
      <header className="mx-auto max-w-[1240px] px-5 pb-16 pt-40 sm:px-8">
        <Link href="/#work" className="eyebrow inline-flex items-center gap-2 transition-colors hover:text-fg"><Icon name="arrow" size={14} className="rotate-180" />Selected work</Link>
        <p className="eyebrow mt-10 flex items-center gap-3"><i className="h-px w-8 bg-accent" />{c.sector}</p>
        <h1 className="mt-6 text-[clamp(48px,8vw,120px)] leading-[0.95]">{c.title}</h1>
        <p className="mt-9 max-w-2xl text-[19px] leading-relaxed text-mute">{c.summary}</p>
        <dl className="glass mt-14 grid gap-6 rounded-3xl p-7 sm:grid-cols-2 lg:grid-cols-[1fr_.6fr_.7fr_1.6fr]">
          {[['Client', c.client], ['Year', c.year], ['Duration', c.duration], ['Services', serviceList]].filter(([, v]) => v).map(([k, v]) => <div key={k}><dt className="eyebrow !text-[10px]">{k}</dt><dd className="mt-2 text-[15px]">{v}</dd></div>)}
        </dl>
        {c.links.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-3">
            {c.links.map((l) => (
              <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" className="glass group inline-flex items-center gap-3 rounded-full py-2.5 pl-5 pr-4 text-sm transition-transform hover:scale-[1.03]">
                <span className="eyebrow !text-[10px]">{linkLabel[l.type] ?? 'Link'}</span>{l.label}<Icon name="arrow" size={15} className="-rotate-45 text-accent transition-transform group-hover:translate-x-0.5" />
              </a>
            ))}
          </div>
        )}
      </header>
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8"><ProjectVisual project={c} priority className="aspect-[16/9] min-h-[320px]" /></div>

      <div className="mx-auto grid max-w-[1240px] gap-14 px-5 py-28 sm:px-8 lg:grid-cols-[230px_1fr]">
        <aside className="lg:sticky lg:top-28 lg:self-start"><CaseNav items={nav} /></aside>
        <div>
          {sections.map((s, n) => (
            <section key={s.id} id={s.id} className="scroll-mt-28 border-b border-line py-14 first:pt-0">
              <p className="eyebrow !text-accent">{String(n + 1).padStart(2, '0')}</p>
              <h2 className="mt-4 text-3xl sm:text-4xl">{s.title}</h2>
              <div className="mt-6 max-w-2xl text-[17px] leading-[1.75] text-soft">{s.body}</div>
            </section>
          ))}
          {hasResults && (
            <section id="results" className="scroll-mt-28 pt-14">
              <p className="eyebrow !text-accent">{String(sections.length + 1).padStart(2, '0')}</p>
              <h2 className="mt-4 text-3xl sm:text-4xl">Results and impact</h2>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {c.results.map((r) => <div key={r.label} className="glass rounded-3xl p-7"><p className="bg-gradient-to-r from-accent to-accent2 bg-clip-text text-5xl tracking-tight text-transparent">{r.value}</p><p className="mt-4 text-sm leading-snug text-mute">{r.label}</p></div>)}
              </div>
              {c.quote && <figure className="mt-14"><blockquote className="font-serif text-3xl italic leading-snug sm:text-4xl">“{c.quote.text}”</blockquote>{c.quote.author && <figcaption className="eyebrow mt-6">{c.quote.author}</figcaption>}</figure>}
            </section>
          )}
        </div>
      </div>

      {c.gallery.length > 0 && (
        <section className="mx-auto max-w-[1240px] px-5 pb-28 sm:px-8">
          <p className="eyebrow mb-8 flex items-center gap-3"><i className="h-px w-8 bg-accent" />Gallery</p>
          <div className="grid gap-5 md:grid-cols-2">
            {c.gallery.map((g, n) => (
              <figure key={g.image.url + n} className={n % 3 === 0 ? 'md:col-span-2' : ''}>
                <div className="overflow-hidden rounded-[28px] border border-line">
                  <Image src={g.image.url} alt={g.image.alt || g.caption || c.title} width={g.image.width} height={g.image.height} sizes="(min-width: 768px) 600px, 100vw" className="h-auto w-full" />
                </div>
                {g.caption && <figcaption className="mt-3 text-sm text-mute">{g.caption}</figcaption>}
              </figure>
            ))}
          </div>
        </section>
      )}

      {next && (
        <section className="mx-auto max-w-[1240px] px-5 sm:px-8">
          <Link href={`/work/${next.slug}`} className="glass group flex items-center justify-between rounded-[32px] p-8 sm:p-12">
            <div><p className="eyebrow">Next case study</p><p className="mt-3 text-3xl sm:text-5xl">{next.title}</p></div>
            <Icon name="arrow" size={36} className="transition-transform group-hover:translate-x-2" />
          </Link>
        </section>
      )}
      <ContactCTA />
    </main>
  )
}
