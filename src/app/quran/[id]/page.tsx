import SurahView from "@/components/quran/SurahView";
import { getSurahDetails } from "@/lib/api/quran";
import { Metadata } from "next";
import { getSurahSlug } from "@/lib/utils";
import { surahNames } from "@/lib/data/surah-names";

export async function generateStaticParams() {
    return surahNames.map((name, index) => ({
        id: getSurahSlug(index + 1, name),
    }));
}

interface PageProps {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id } = await params;
    const surahId = parseInt(id.split('-')[0], 10);
    
    try {
        const surah = await getSurahDetails(surahId);
        return {
            title: `Surah ${surah.name_simple} (${surah.name_arabic}) - Translation & Recitation`,
            description: `Read, recite, and listen to Surah ${surah.name_simple} (${surah.translated_name.name}) with Urdu & English translation, word-by-word highlights, and sequential audio recitations on FaithJourney.`,
            keywords: [`Surah ${surah.name_simple}`, `Quran ${surah.name_simple}`, surah.name_arabic, `${surah.translated_name.name} translation`, "Faith Journey Quran", "Al-Quran Online"],
            openGraph: {
                title: `Surah ${surah.name_simple} (${surah.name_arabic}) - FaithJourney`,
                description: `Read and listen to Surah ${surah.name_simple} (${surah.translated_name.name}) with Urdu & English translation.`,
                url: `https://faithjourney.pro/quran/${getSurahSlug(surahId, surah.name_simple)}`,
            },
            alternates: {
                canonical: `/quran/${getSurahSlug(surahId, surah.name_simple)}`,
            },
        };
    } catch {
        return {
            title: `Surah Recitation`,
            description: `Read and listen to the Holy Quran on FaithJourney.`
        };
    }
}

export default async function SurahPage({ params }: PageProps) {
    const { id } = await params;
    const surahId = parseInt(id.split('-')[0], 10);
    return <SurahView id={surahId} />;
}
