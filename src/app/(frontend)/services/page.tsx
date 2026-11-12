import Link from 'next/link'
import type { Metadata } from 'next'
import { Icon, Reveal, Spot } from '@/components/ui'
import { ContactCTA } from '@/components/home'
import { services } from '@/lib/content'

export const metadata: Metadata = { title: 'Services | Craverloft', description: 'Interactive design, web, custom and enterprise software from Craverloft.' }

export default function ServicesPage() {
  return (
    <main>
      <header className="mx-auto max-w-[1240px] px-5 pb-20 pt-44 sm:px-8">
        <p className="eyebrow flex items-center gap-3"><i className="h-px w-8 bg-accent" />Services</p>
        <h1 className="mt-8 max-w-4xl text-[clamp(44px,7vw,100px)] leading-[0.98]">Expertise for the entire <em className="font-serif font-normal text-accent">product</em> journey.</h1>
        <p className="mt-9 max-w-xl text-[18px] leading-relaxed text-mute">Strategy, design and engineering working as one, from a complex challenge to a confident product. Each discipline has its own team, and its own page.</p>
      </header>
      <section className="mx-auto grid max-w-[1240px] gap-4 px-5 pb-12 sm:px-8 md:grid-cols-2">
        {services.map((s, i) => (
          <Reveal key={s.slug} delay={i * 70}>
            <Spot className="glass group h-full rounded-[32px]">
              <Link href={`/services/${s.slug}`} className="relative flex h-full min-h-[420px] flex-col p-9 sm:p-11">
                <div className="flex items-start justify-between"><span className="grid h-14 w-14 place-items-center rounded-2xl border border-line text-accent"><Icon name={s.icon} size={26} /></span><span className="eyebrow">{s.num}</span></div>
                <h2 className="mt-auto pt-16 text-3xl leading-tight sm:text-4xl">{s.title}</h2>
                <p className="mt-4 text-[15px] leading-relaxed text-mute">{s.description}</p>
                <ul className="mt-6 grid gap-2 text-sm text-soft">{s.deliverables.slice(0, 3).map((d) => <li key={d} className="flex items-center gap-2.5"><i className="h-1 w-1 rounded-full bg-accent" />{d}</li>)}</ul>
                <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-accent">Explore capability <Icon name="arrow" size={16} className="transition-transform group-hover:translate-x-1.5" /></span>
              </Link>
            </Spot>
          </Reveal>
        ))}
      </section>
      <ContactCTA />
    </main>
  )
}
