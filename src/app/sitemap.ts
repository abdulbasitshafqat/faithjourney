import type { MetadataRoute } from "next";
import { articles } from "@/lib/data/knowledge";
import { surahNames } from "@/lib/data/surah-names";
import { getBookSections } from "@/lib/api/hadith";
import { getSurahSlug, getBookSlug } from "@/lib/utils";

export const dynamic = "force-static";

const lastModified = new Date("2026-09-23T00:00:00.000Z");
const hadithBooks = ["bukhari", "muslim", "abudawud"] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://faithjourney.pro";

  const staticRoutes = [
    "",
    "/quran",
    "/hadith",
    "/prayer-times",
    "/qibla",
    "/tasbih",
    "/knowledge",
    "/duas",
    "/names",
    "/zakat",
    "/wonders",
    "/guides",
    "/support",
    "/terms",
    "/privacy",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 1,
  }));

  const guideRoutes = [
    "/guides/salah",
    "/guides/wudu",
    "/guides/fasting",
    "/guides/zakat",
    "/guides/hajj",
    "/guides/umrah",
    "/guides/janazah",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const surahRoutes = surahNames.map((name, index) => ({
    url: `${baseUrl}/quran/${getSurahSlug(index + 1, name)}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const hadithRoutes = hadithBooks.map((book) => ({
    url: `${baseUrl}/hadith/${getBookSlug(book)}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const hadithSectionGroups = await Promise.all(
    hadithBooks.map(async (book) => {
      const sections = await getBookSections(book);
      return sections.map((section) => ({
        url: `${baseUrl}/hadith/${getBookSlug(book)}/${section.number}`,
        lastModified,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }));
    }),
  );

  const articleRoutes = articles.map((article) => ({
    url: `${baseUrl}/knowledge/${article.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...guideRoutes,
    ...surahRoutes,
    ...hadithRoutes,
    ...hadithSectionGroups.flat(),
    ...articleRoutes,
  ];
}
