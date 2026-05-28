import SurahView from "@/components/quran/SurahView";
import { getSurahDetails } from "@/lib/api/quran";
import { Metadata } from "next";
import { getSurahSlug } from "@/lib/utils";

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

export async function generateStaticParams() {
    const paths = [];
    for (let i = 0; i < 114; i++) {
        const id = (i + 1).toString();
        const name = surahNames[i];
        paths.push({ id });
        paths.push({ id: getSurahSlug(i + 1, name) });
    }
    return paths;
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
            title: `Surah ${surah.name_simple} (${surah.name_arabic}) - Translation & Recitation | FaithJourney`,
            description: `Read, recite, and listen to Surah ${surah.name_simple} (${surah.translated_name.name}) with Urdu & English translation, word-by-word highlights, and sequential audio recitations on FaithJourney.`,
            keywords: [`Surah ${surah.name_simple}`, `Quran ${surah.name_simple}`, surah.name_arabic, `${surah.translated_name.name} translation`, "Faith Journey Quran", "Al-Quran Online"],
            openGraph: {
                title: `Surah ${surah.name_simple} (${surah.name_arabic}) - FaithJourney`,
                description: `Read and listen to Surah ${surah.name_simple} (${surah.translated_name.name}) with Urdu & English translation.`,
                url: `https://faithjourney.pro/quran/${id}`,
            }
        };
    } catch (e) {
        return {
            title: `Surah Recitation | FaithJourney`,
            description: `Read and listen to the Holy Quran on FaithJourney.`
        };
    }
}

export default async function SurahPage({ params }: PageProps) {
    const { id } = await params;
    const surahId = parseInt(id.split('-')[0], 10);
    return <SurahView id={surahId} />;
}
