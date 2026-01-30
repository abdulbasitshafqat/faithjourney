import { MetadataRoute } from 'next';
import { articles } from '@/lib/data/knowledge';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://faithjourney.pro';

    // 1. Static Core Pages
    const staticRoutes = [
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
        '/wonders',
        '/guides',
        '/support',
        '/terms',
        '/privacy',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 1.0,
    }));

    // 2. Guide Sub-pages
    const guideRoutes = [
        '/guides/salah',
        '/guides/wudu',
        '/guides/fasting',
        '/guides/zakat',
        '/guides/hajj',
        '/guides/umrah',
        '/guides/janazah',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.9,
    }));

    // 3. Quran Surahs (1-114)
    const surahRoutes = Array.from({ length: 114 }, (_, i) => i + 1).map((id) => ({
        url: `${baseUrl}/quran/${id}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }));

    // 4. Hadith Books
    // Hardcoded for stability, but matches available books
    const hadithBooks = ['bukhari', 'muslim', 'abudawud'];
    const hadithRoutes = hadithBooks.map((book) => ({
        url: `${baseUrl}/hadith/${book}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }));

    // 5. Knowledge Articles
    const articleRoutes = articles.map((article) => ({
        url: `${baseUrl}/knowledge/${article.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    return [
        ...staticRoutes,
        ...guideRoutes,
        ...surahRoutes,
        ...hadithRoutes,
        ...articleRoutes,
    ];
}
