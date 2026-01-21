const BASE_URL = "https://api.quran.com/api/v4";

export interface Surah {
    id: number;
    name_simple: string;
    name_arabic: string;
    verses_count: number;
    revelation_place: string;
    translated_name: {
        name: string;
        language_name: string;
    };
}

export interface Ayah {
    id: number;
    verse_key: string;
    text_uthmani: string;
    translations?: {
        id: number;
        resource_id: number;
        text: string;
        resource_name: string;
        language_name: string;
    }[];
    audio?: {
        url: string;
    };
}

export async function getSurahs(): Promise<Surah[]> {
    const res = await fetch(`${BASE_URL}/chapters?language=en`);
    if (!res.ok) throw new Error("Failed to fetch Surahs");
    const data = await res.json();
    return data.chapters;
}

export async function getSurahDetails(id: number): Promise<Surah> {
    const res = await fetch(`${BASE_URL}/chapters/${id}?language=en`);
    if (!res.ok) throw new Error("Failed to fetch Surah details");
    const data = await res.json();
    return data.chapter;
}

export async function getAyahs(surahId: number, translations: string = "20,234"): Promise<Ayah[]> {
    // 20: Sahih International (English)
    // 234: Fatah Muhammad Jalandhari (Urdu)
    const res = await fetch(
        `${BASE_URL}/verses/by_chapter/${surahId}?language=en&words=false&translations=${translations}&fields=text_uthmani&per_page=286`
    );
    if (!res.ok) throw new Error("Failed to fetch Ayahs");
    const data = await res.json();
    return data.verses;
}

export async function getSurahAudio(surahId: number, reciterId: number = 7): Promise<string> {
    // 7 is Mishary Rashid Alafasy
    const res = await fetch(`${BASE_URL}/chapter_recitations/${reciterId}/${surahId}`);
    if (!res.ok) throw new Error("Failed to fetch Audio");
    const data = await res.json();
    return data.audio_file.audio_url;
}
