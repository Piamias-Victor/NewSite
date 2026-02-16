import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: ['GPTBot', 'Google-Extended', 'CCBot', 'Claude-Web'],
        allow: '/',
      },
    ],
    sitemap: 'https://phardev.fr/sitemap.xml',
  }
}
