import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: [
                    '/settings/',
                    '/auth/',
                    '/bookmarks/',
                    '/api/', // Generally restrict indexing APIs
                ],
            },
            {
                // Explicitly allow leading AI search engines and LLM crawlers to access public modules
                userAgent: [
                    'GPTBot',
                    'ChatGPT-User',
                    'ClaudeBot',
                    'Claude-Web',
                    'PerplexityBot',
                    'Google-Extended',
                    'Applebot-Extended'
                ],
                allow: [
                    '/',
                    '/quran/',
                    '/hadith/',
                    '/duas/',
                    '/knowledge/',
                    '/guides/'
                ],
                disallow: [
                    '/settings/',
                    '/auth/',
                    '/bookmarks/',
                    '/api/'
                ]
            }
        ],
        sitemap: 'https://faithjourney.pro/sitemap.xml',
    };
}
