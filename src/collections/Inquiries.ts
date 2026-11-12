import type { CollectionConfig, FieldAccess } from 'payload'

const staffOnly: FieldAccess = ({ req }) => Boolean(req.user)

export const serviceOptions = [
  { label: 'Interactive UI/UX design', value: 'interactive-design' },
  { label: 'Web design & development', value: 'web-design-development' },
  { label: 'Custom web development', value: 'custom-web-development' },
  { label: 'Enterprise software (AI, blockchain, finance)', value: 'enterprise-software' },
  { label: 'Not sure yet', value: 'not-sure' },
]

export const budgetOptions = [
  { label: 'Under $25k', value: 'under-25k' },
  { label: '$25k – $75k', value: '25k-75k' },
  { label: '$75k – $200k', value: '75k-200k' },
  { label: '$200k+', value: '200k-plus' },
  { label: 'To be discussed', value: 'tbd' },
]

export const Inquiries: CollectionConfig = {
  slug: 'inquiries',
  labels: { singular: 'Inquiry', plural: 'Inquiries' },
  defaultSort: '-createdAt',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'company', 'service', 'budget', 'status', 'createdAt'],
    description: 'Project enquiries submitted through the Craverloft contact form.',
  },
  // Visitors may submit an enquiry; only signed-in staff can read or manage them.
  access: {
    create: () => true,
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    { name: 'name', type: 'text', required: true, maxLength: 120 },
    { name: 'email', type: 'email', required: true },
    { name: 'company', type: 'text', maxLength: 160 },
    { name: 'service', type: 'select', options: serviceOptions, defaultValue: 'not-sure' },
    { name: 'budget', type: 'select', options: budgetOptions, defaultValue: 'tbd' },
    { name: 'message', type: 'textarea', required: true, maxLength: 4000 },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'In conversation', value: 'in-conversation' },
        { label: 'Proposal sent', value: 'proposal' },
        { label: 'Won', value: 'won' },
        { label: 'Closed', value: 'closed' },
      ],
      admin: { position: 'sidebar' },
      access: { create: staffOnly, update: staffOnly },
    },
    {
      name: 'internalNotes',
      type: 'textarea',
      admin: { position: 'sidebar', description: 'Private. Never shown to the client.' },
      access: { create: staffOnly, read: staffOnly, update: staffOnly },
    },
  ],
}
