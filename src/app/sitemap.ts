import { MetadataRoute } from 'next';
import { articles } from '@/lib/data/knowledge';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://faithjourney.pro';

    // Core Pages
    const routes = [
        '',
        '/quran',
        '/hadith',
        '/prayer-times',
        '/qibla',
        '/tasbih',
        '/knowledge',
        '/duas',
        '/names',
        '/zakat',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 1,
    }));

    // Knowledge Articles
    const articleRoutes = articles.map((article) => ({
        url: `${baseUrl}/knowledge/${article.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }));

    return [...routes, ...articleRoutes];
}
