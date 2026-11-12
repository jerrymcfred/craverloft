import Image from 'next/image'
import type { Img, ProjectCard, ThemeKey } from '@/lib/projects'

const themes: Record<ThemeKey, { a: string; b: string; kind: 'line' | 'ring' | 'bars' }> = {
  indigo: { a: '#6c7bff', b: '#a07bff', kind: 'line' },
  emerald: { a: '#2fd3a4', b: '#4aa3ff', kind: 'ring' },
  amber: { a: '#ff8a4c', b: '#ffcb5c', kind: 'bars' },
  rose: { a: '#ff5c8a', b: '#ffa07b', kind: 'line' },
  sky: { a: '#3fb6ff', b: '#6c7bff', kind: 'ring' },
}

type Art = Pick<ProjectCard, 'title' | 'results' | 'theme'>

/** Generated product-style visual used when a project has no cover image. */
export function ProjectArt({ project, className = '' }: { project: Art; className?: string }) {
  const t = themes[project.theme] ?? themes.indigo
  const [r0, r1, r2] = project.results
  const id = `g-${project.title.replace(/\W/g, '')}`
  return (
    <div className={`relative overflow-hidden rounded-[28px] border border-line ${className}`} style={{ background: `radial-gradient(120% 90% at 20% 0%, ${t.a}55, transparent 60%), radial-gradient(90% 80% at 100% 100%, ${t.b}55, transparent 60%), var(--bg-2)` }}>
      <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)', backgroundSize: '44px 44px', maskImage: 'radial-gradient(circle at 50% 50%, #000, transparent 75%)' }} />
      <div className="glass absolute bottom-[10%] left-[7%] right-[7%] top-[12%] rounded-3xl p-5 sm:p-7">
        <div className="flex items-center justify-between">
          <div className="flex gap-1.5"><i className="h-2 w-2 rounded-full bg-mute/50" /><i className="h-2 w-2 rounded-full bg-mute/50" /><i className="h-2 w-2 rounded-full bg-mute/50" /></div>
          <span className="eyebrow !text-[10px]">{project.title}</span>
        </div>
        <p className="eyebrow mt-6 !text-[10px]">{r0?.label ?? 'Impact'}</p>
        <p className="mt-1 text-3xl tracking-tight sm:text-5xl">{r0?.value ?? '—'}</p>
        <div className="mt-6 h-[42%]">
          {t.kind === 'line' && (
            <svg viewBox="0 0 400 140" preserveAspectRatio="none" className="h-full w-full">
              <defs><linearGradient id={id} x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor={t.a} stopOpacity=".5" /><stop offset="1" stopColor={t.a} stopOpacity="0" /></linearGradient></defs>
              <path d="M0 110 C40 100 60 60 100 72 S170 105 210 70 S290 20 330 36 S380 10 400 14 V140 H0Z" fill={`url(#${id})`} />
              <path d="M0 110 C40 100 60 60 100 72 S170 105 210 70 S290 20 330 36 S380 10 400 14" fill="none" stroke={t.a} strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          )}
          {t.kind === 'ring' && (
            <div className="flex h-full items-center gap-6">
              <div className="aspect-square h-full rounded-full" style={{ background: `conic-gradient(${t.a} 0 42%, ${t.b} 0 71%, var(--line) 0)`, mask: 'radial-gradient(circle, transparent 56%, #000 57%)', WebkitMask: 'radial-gradient(circle, transparent 56%, #000 57%)' }} />
              <div className="grid flex-1 gap-3"><div className="h-1.5 rounded-full" style={{ background: t.a, width: '80%' }} /><div className="h-1.5 rounded-full" style={{ background: t.b, width: '58%' }} /><div className="h-1.5 rounded-full bg-line" /></div>
            </div>
          )}
          {t.kind === 'bars' && (
            <div className="flex h-full items-end gap-2">
              {[40, 62, 48, 80, 66, 92, 74, 96, 84, 100].map((h, i) => <i key={i} className="flex-1 rounded-t-md" style={{ height: `${h}%`, background: `linear-gradient(${t.a}, ${t.b}88)`, opacity: 0.5 + i * 0.05 }} />)}
            </div>
          )}
        </div>
      </div>
      {r1 && <div className="glass absolute right-[3%] top-[6%] rounded-2xl px-4 py-3"><p className="eyebrow !text-[9px]">{r1.label}</p><p className="mt-1 text-sm font-medium">{r1.value}</p></div>}
      {r2 && <div className="glass absolute bottom-[4%] left-[3%] rounded-2xl px-4 py-3"><p className="eyebrow !text-[9px]">{r2.label}</p><p className="mt-1 text-sm font-medium">{r2.value}</p></div>}
    </div>
  )
}

/** A project's cover image from the admin, or the generated visual when none is set. */
export default function ProjectVisual({ project, className = '', priority = false }: { project: Art & { cover?: Img }; className?: string; priority?: boolean }) {
  if (!project.cover) return <ProjectArt project={project} className={className} />
  return (
    <div className={`relative overflow-hidden rounded-[28px] border border-line bg-bg2 ${className}`}>
      <Image src={project.cover.url} alt={project.cover.alt || project.title} fill priority={priority} sizes="(min-width: 1024px) 800px, 100vw" className="object-cover" />
    </div>
  )
}
