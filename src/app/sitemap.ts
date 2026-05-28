import { MetadataRoute } from 'next';
import { articles } from '@/lib/data/knowledge';
import { getSurahSlug, getBookSlug } from '@/lib/utils';

export const dynamic = 'force-static';

const surahNames = [
    "Al-Fatihah", "Al-Baqarah", "Ali 'Imran", "An-Nisa", "Al-Ma'idah", "Al-An'am", "Al-A'raf", "Al-Anfal", "At-Tawbah", "Yunus",
    "Hud", "Yusuf", "Ar-Ra'd", "Ibrahim", "Al-Hijr", "An-Nahl", "Al-Isra", "Al-Kahf", "Maryam", "Ta-Ha",
    "Al-Anbiya", "Al-Hajj", "Al-Mu'minun", "An-Nur", "Al-Furqan", "Ash-Shu'ara", "An-Naml", "Al-Qasas", "Al-Ankabut", "Ar-Rum",
    "Luqman", "As-Sajdah", "Al-Ahzab", "Saba", "Fatir", "Ya-Sin", "As-Saffat", "Sad", "Az-Zumar", "Ghafir",
    "Fussilat", "Ash-Shura", "Az-Zukhruf", "Ad-Dukhan", "Al-Jathiyah", "Al-Ahqaf", "Muhammad", "Al-Fath", "Al-Hujurat", "Qaf",
    "Adh-Dhariyat", "At-Tur", "An-Najm", "Al-Qamar", "Ar-Rahman", "Al-Waqi'ah", "Al-Hadid", "Al-Mujadilah", "Al-Hashr", "Al-Mumtahanah",
    "As-Saff", "Al-Jumu'ah", "Al-Munafiqun", "At-Taghabun", "At-Talaq", "At-Tahrim", "Al-Mulk", "Al-Qalam", "Al-Haqqah", "Al-Ma'arij",
    "Nuh", "Al-Jinn", "Al-Muzzammil", "Al-Muddaththir", "Al-Qiyamah", "Al-Insan", "Al-Mursalat", "An-Naba", "An-Nazi'at", "'Abasa",
    "At-Takwir", "Al-Infitar", "Al-Mutaffifin", "Al-Inshiqaq", "Al-Buruj", "At-Tariq", "Al-A'la", "Al-Ghashiyah", "Al-Fajr", "Al-Balad",
    "Ash-Shams", "Al-Layl", "Ad-Duha", "Ash-Sharh", "At-Tin", "Al-'Alaq", "Al-Qadr", "Al-Bayyinah", "Az-Zalzalah", "Al-'Adiyat",
    "Al-Qari'ah", "At-Takathur", "Al-'Asr", "Al-Humazah", "Al-Fil", "Quraysh", "Al-Ma'un", "Al-Kawthar", "Al-Kafirun", "An-Nasr",
    "Al-Masad", "Al-Ikhlas", "Al-Falaq", "An-Nas"
];

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

    // 3. Quran Surahs with SEO Slugs
    const surahRoutes = surahNames.map((name, i) => ({
        url: `${baseUrl}/quran/${getSurahSlug(i + 1, name)}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }));

    // 4. Hadith Books with SEO Slugs
    const hadithBooks = ['bukhari', 'muslim', 'abudawud'];
    const hadithRoutes = hadithBooks.map((book) => ({
        url: `${baseUrl}/hadith/${getBookSlug(book)}`,
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
