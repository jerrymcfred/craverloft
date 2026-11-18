import { revalidatePath } from 'next/cache'
import type { CollectionConfig } from 'payload'

import { createFolderField, createTagField } from 'payload'

import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
const isSelfHosted = Boolean(process.env.DATABASE_URI)


export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  hooks: {
    // Replacing or editing an image must refresh every page that may show it.
    afterChange: [
      ({ doc }) => {
        try { revalidatePath('/', 'layout') } catch {}
        return doc
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    createFolderField({ relationTo: 'folders' }),
    createTagField({ relationTo: 'tags' }),
  ],
  upload: true,
}
