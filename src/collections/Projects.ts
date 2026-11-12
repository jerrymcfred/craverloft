import { revalidatePath } from 'next/cache'
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, CollectionConfig, Field } from 'payload'

export const disciplineOptions = [
  { label: 'Interactive UI/UX design', value: 'interactive-design' },
  { label: 'Web design & development', value: 'web-design-development' },
  { label: 'Custom web development', value: 'custom-web-development' },
  { label: 'Custom enterprise software', value: 'enterprise-software' },
]

export const themeOptions = [
  { label: 'Indigo', value: 'indigo' },
  { label: 'Emerald', value: 'emerald' },
  { label: 'Amber', value: 'amber' },
  { label: 'Rose', value: 'rose' },
  { label: 'Sky', value: 'sky' },
]

const slugify = (v: string) =>
  v.toLowerCase().trim().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')

// Refresh every public page that renders project data: home, the project's own
// page (old and new slug), the services pages and the shared footer/palette.
function refresh(slugs: (string | null | undefined)[]) {
  try {
    revalidatePath('/')
    revalidatePath('/services')
    revalidatePath('/services/[slug]', 'page')
    for (const s of new Set(slugs.filter(Boolean))) revalidatePath(`/work/${s}`)
    // Footer and command palette live in the root layout.
    revalidatePath('/', 'layout')
  } catch (error) {
    // Outside a Next request (e.g. CLI seeding) there is no cache to refresh.
    console.warn('Project revalidation skipped:', (error as Error).message)
  }
}

const afterChange: CollectionAfterChangeHook = ({ doc, previousDoc }) => {
  refresh([doc?.slug, previousDoc?.slug])
  return doc
}
const afterDelete: CollectionAfterDeleteHook = ({ doc }) => {
  refresh([doc?.slug])
  return doc
}

const textList = (name: string, label: string, description?: string): Field => ({
  name,
  label,
  type: 'array',
  admin: { description, initCollapsed: false },
  fields: [{ name: 'text', type: 'text', required: true }],
})

export const Projects: CollectionConfig = {
  slug: 'projects',
  labels: { singular: 'Project', plural: 'Projects' },
  defaultSort: 'order',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'client', 'sector', 'year', 'order', '_status', 'updatedAt'],
    description: 'Selected work and case studies shown on the website. Save as draft, then Publish to go live.',
    preview: (doc) => (doc?.slug ? `/work/${doc.slug}` : null),
  },
  versions: { drafts: true, maxPerDoc: 15 },
  access: {
    // Visitors only see published projects; signed-in staff see everything including drafts.
    read: ({ req }) => (req.user ? true : { _status: { equals: 'published' } }),
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  hooks: { afterChange: [afterChange], afterDelete: [afterDelete] },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Project',
          description: 'What appears on the homepage and at the top of the case study.',
          fields: [
            { name: 'title', type: 'text', required: true, maxLength: 120 },
            { name: 'client', type: 'text', required: true, admin: { description: 'Client name, e.g. Atlas Group.' } },
            { name: 'sector', type: 'text', required: true, admin: { description: 'Short label, e.g. "AI / Enterprise".' } },
            {
              type: 'row',
              fields: [
                { name: 'year', type: 'text', admin: { width: '50%' } },
                { name: 'duration', type: 'text', admin: { width: '50%', description: 'e.g. 9 months' } },
              ],
            },
            { name: 'summary', type: 'textarea', required: true, maxLength: 280, admin: { description: 'One or two sentences for cards and previews.' } },
            { name: 'disciplines', type: 'select', hasMany: true, options: disciplineOptions, admin: { description: 'Which services this project showcases. Used for "Related work" on service pages.' } },
            { name: 'tags', type: 'array', admin: { description: 'Extra capability labels, e.g. Applied AI, Fintech.' }, fields: [{ name: 'label', type: 'text', required: true }] },
          ],
        },
        {
          label: 'Images & links',
          fields: [
            { name: 'coverImage', type: 'upload', relationTo: 'media', admin: { description: 'Main image. If empty, a stylised placeholder is generated from the colour theme.' } },
            { name: 'theme', type: 'select', defaultValue: 'indigo', options: themeOptions, admin: { description: 'Accent colour for the generated placeholder.' } },
            {
              name: 'gallery',
              type: 'array',
              admin: { description: 'Extra screenshots shown at the end of the case study.' },
              fields: [
                { name: 'image', type: 'upload', relationTo: 'media', required: true },
                { name: 'caption', type: 'text' },
              ],
            },
            {
              name: 'links',
              type: 'array',
              admin: { description: 'Live site, app store pages, repositories, press coverage...' },
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'label', type: 'text', required: true, admin: { width: '40%' } },
                    {
                      name: 'type',
                      type: 'select',
                      defaultValue: 'live',
                      admin: { width: '25%' },
                      options: [
                        { label: 'Live site', value: 'live' },
                        { label: 'App', value: 'app' },
                        { label: 'Code', value: 'code' },
                        { label: 'Press', value: 'press' },
                        { label: 'Other', value: 'other' },
                      ],
                    },
                    {
                      name: 'url',
                      type: 'text',
                      required: true,
                      admin: { width: '35%', placeholder: 'https://' },
                      validate: (v: string | null | undefined) => (v && /^https?:\/\/\S+$/i.test(v) ? true : 'Enter a full link starting with https://'),
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Case study',
          description: 'The nine sections of the full case study page. Separate paragraphs with a blank line.',
          fields: [
            { name: 'clientIntro', label: '1. Client introduction', type: 'textarea' },
            { name: 'overview', label: '2. Project overview', type: 'textarea', required: true },
            { name: 'challenge', label: '3. Business challenge', type: 'textarea' },
            textList('objectives', '4. Objectives'),
            { name: 'research', label: '5. Research and strategy', type: 'textarea' },
            { name: 'design', label: '6. Design direction', type: 'textarea' },
            { name: 'development', label: '7. Development process', type: 'textarea' },
            textList('finalProduct', '8. Final product', 'Key features or deliverables of the finished product.'),
            {
              name: 'results',
              label: '9. Results and impact',
              type: 'array',
              maxRows: 4,
              admin: { description: 'Headline numbers, e.g. "42%" / "faster decisions".' },
              fields: [
                { name: 'value', type: 'text', required: true, maxLength: 12 },
                { name: 'label', type: 'text', required: true },
              ],
            },
            {
              name: 'testimonial',
              type: 'group',
              fields: [
                { name: 'quote', type: 'textarea' },
                { name: 'author', type: 'text', admin: { description: 'Name, role and company.' } },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { position: 'sidebar', description: 'Page address: /work/your-slug. Generated from the title.' },
      hooks: {
        beforeValidate: [({ value, data }) => slugify(String(value || data?.title || ''))],
      },
    },
    { name: 'order', type: 'number', defaultValue: 10, admin: { position: 'sidebar', description: 'Lower numbers appear first.' } },
  ],
}
