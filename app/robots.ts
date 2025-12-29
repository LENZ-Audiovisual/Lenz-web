import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/admin/', // PROÍBE O GOOGLE DE LER O ADMIN
    },
    sitemap: 'https://lampejo.rec.br/sitemap.xml',
  }
}