import path from 'path'
import { buildFigmaConfig } from '@payloadcms/figma'

import { buildConfig, type Config } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'


import { mcpPlugin } from '@payloadcms/plugin-mcp'
import { en as adminLanguage } from '@payloadcms/translations/languages/en'
import { fileURLToPath } from 'url'
import { Admins } from './collections/Admins'
import { Media } from './collections/Media'
import { Folders } from './collections/Folders'
import { Tags } from './collections/Tags'
import { Inquiries } from './collections/Inquiries'
import { Projects } from './collections/Projects'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)



const isSelfHosted = Boolean(process.env.DATABASE_URI)

const baseConfig: Omit<Config, 'db' | 'secret'> = {
  admin: {
    user: Admins.slug,
    constrainWidth: true,
    dashboard: {
      widgets: [],
      defaultLayout: [
        { widgetSlug: 'activity', width: 'full' },
        { widgetSlug: 'collections', width: 'full' },
      ],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  i18n: {
    fallbackLanguage: 'en',
    supportedLanguages: { en: adminLanguage },
  },
  collections: [Admins, Media, Folders, Tags, Projects, Inquiries],
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  localization: {
    locales: [{ code: 'en', label: 'English' }],
    fallback: true,
    defaultLocale: 'en',
  },
  plugins: [
    mcpPlugin({})
  ],
  storage: isSelfHosted
  ? [
      vercelBlobStorage({
        collections: {
          media: true,
        },
        token: process.env.BLOB_READ_WRITE_TOKEN || '',
      }),
    ]
  : [],
}

export default isSelfHosted
  ? buildConfig({
      ...baseConfig,
      secret: process.env.PAYLOAD_SECRET || '',
      db: postgresAdapter({
        pool: {
          connectionString: process.env.DATABASE_URI || '',
        },
      }),
    })
  : buildFigmaConfig({
      ...baseConfig,
      figma: {},
    })

