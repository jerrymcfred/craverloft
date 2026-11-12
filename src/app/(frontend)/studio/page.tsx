import type { Metadata } from 'next'
import { ContactCTA, Why, Process } from '@/components/home'
import { Counter } from '@/components/ui'

export const metadata: Metadata = { title: 'Studio | Craverloft', description: 'An independent software design and engineering company for teams with meaningful work to do.' }

export default function StudioPage() {
  return (
    <main>
      <header className="mx-auto max-w-[1240px] px-5 pb-12 pt-44 sm:px-8">
        <p className="eyebrow flex items-center gap-3"><i className="h-px w-8 bg-accent" />The studio</p>
        <h1 className="mt-8 max-w-5xl text-[clamp(44px,7vw,100px)] leading-[0.98]">Software people, with <em className="font-serif font-normal text-accent">product</em> in their bones.</h1>
        <div className="mt-16 grid gap-10 border-t border-line pt-12 md:grid-cols-2">
          <p className="text-[19px] leading-relaxed text-soft">We founded Craverloft to close the space between ambitious thinking and exceptional execution. Technology should feel more human, not less.</p>
          <p className="text-[17px] leading-relaxed text-mute">Today our senior team works across product strategy, experience design and software engineering, helping organisations in finance, industry and enterprise create the systems their future depends on.</p>
        </div>
        <div className="mt-16 grid gap-10 sm:grid-cols-3">
          {[[12, '+', 'Years building software'], [70, '+', 'Products shipped'], [8, '', 'Industries served']].map(([n, s, l]) => <div key={String(l)}><p className="text-6xl tracking-tight"><Counter to={n as number} suffix={s as string} /></p><p className="eyebrow mt-3">{l}</p></div>)}
        </div>
      </header>
      <Why />
      <Process />
      <ContactCTA />
    </main>
  )
}
