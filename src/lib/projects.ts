import { cache } from 'react'
import { findBySlug, getPayloadClient } from '@/lib/payload'
import type { Media, Project as ProjectDoc } from '@/payload-types'

export type Img = { url: string; alt: string; width: number; height: number }
export type ThemeKey = 'indigo' | 'emerald' | 'amber' | 'rose' | 'sky'

export type Project = {
  slug: string
  title: string
  client: string
  sector: string
  year: string
  duration: string
  summary: string
  overview: string
  intro: string
  challenge: string
  objectives: string[]
  research: string
  design: string
  development: string
  product: string[]
  results: { value: string; label: string }[]
  quote?: { text: string; author: string }
  theme: ThemeKey
  disciplines: string[]
  tags: string[]
  cover?: Img
  gallery: { image: Img; caption?: string }[]
  links: { label: string; url: string; type: string }[]
}

export type ProjectCard = Pick<Project, 'slug' | 'title' | 'sector' | 'summary' | 'results' | 'theme' | 'cover' | 'disciplines'>

const img = (m: unknown): Img | undefined => {
  const media = m as Media | string | null | undefined
  if (!media || typeof media === 'string' || !media.url) return undefined
  return { url: media.url, alt: media.alt || '', width: media.width || 1600, height: media.height || 1000 }
}

const lines = (rows?: { text: string }[] | null) => (rows ?? []).map((r) => r.text).filter(Boolean)

function normalize(d: ProjectDoc): Project {
  return {
    slug: d.slug,
    title: d.title,
    client: d.client,
    sector: d.sector,
    year: d.year ?? '',
    duration: d.duration ?? '',
    summary: d.summary,
    overview: d.overview,
    intro: d.clientIntro ?? '',
    challenge: d.challenge ?? '',
    objectives: lines(d.objectives),
    research: d.research ?? '',
    design: d.design ?? '',
    development: d.development ?? '',
    product: lines(d.finalProduct),
    results: (d.results ?? []).map((r) => ({ value: r.value, label: r.label })),
    quote: d.testimonial?.quote ? { text: d.testimonial.quote, author: d.testimonial.author ?? '' } : undefined,
    theme: (d.theme as ThemeKey) || 'indigo',
    disciplines: d.disciplines ?? [],
    tags: (d.tags ?? []).map((t) => t.label),
    cover: img(d.coverImage),
    gallery: (d.gallery ?? []).flatMap((g) => {
      const image = img(g.image)
      return image ? [{ image, caption: g.caption ?? undefined }] : []
    }),
    links: (d.links ?? []).map((l) => ({ label: l.label, url: l.url, type: l.type ?? 'other' })),
  }
}

/** All published projects, in the order set in the admin. Visitors only ever see published documents. */
export const getProjects = cache(async (): Promise<Project[]> => {
  const payload = await getPayloadClient()
  const res = await payload.find({ collection: 'projects', overrideAccess: false, sort: 'order', limit: 100, depth: 2, pagination: false })
  return res.docs.map(normalize)
})

export async function getProject(slug: string): Promise<Project | null> {
  const doc = await findBySlug('projects', slug, { depth: 2 })
  return doc ? normalize(doc) : null
}

export const toCard = (p: Project): ProjectCard => ({ slug: p.slug, title: p.title, sector: p.sector, summary: p.summary, results: p.results, theme: p.theme, cover: p.cover, disciplines: p.disciplines })
