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

export async function getAyahs(surahId: number, translations: string = "20,234,57"): Promise<Ayah[]> {
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

export async function getVerseOfTheDay(): Promise<{
    verse_key: string;
    text_uthmani: string;
    english_translation: string;
    surah_name: string;
}> {
    // Simplified logic: Pick a random verse key or cycle by day
    // For MVP, randomly selecting from a popular list or by day index is better than a full random from API which might be hard to control content quality.
    // Let's use a curated list of inspiring verses for "Verse of the Day".

    const curatedVerses = [
        "2:152", // Remember Me
        "2:286", // Does not burden
        "3:139", // Do not weaken
        "94:5",  // With hardship comes ease
        "94:6",  // Indeed with hardship ease
        "65:2",  // Way out
        "65:3",  // Provide from where he does not expect
        "39:53", // Do not despair
        "13:28", // Hearts find rest
        "40:60", // Call upon me
    ];

    const dayOfYear = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
    const verseKey = curatedVerses[dayOfYear % curatedVerses.length];

    // Fetch specifics for this verse
    const res = await fetch(`${BASE_URL}/verses/by_key/${verseKey}?language=en&words=false&translations=20&fields=text_uthmani`);
    if (!res.ok) throw new Error("Failed to fetch Verse of the Day");
    const data = await res.json();
    const verse = data.verse;

    // We need Surah Name too.
    const surahId = verseKey.split(':')[0];
    const surahRes = await fetch(`${BASE_URL}/chapters/${surahId}`);
    const surahData = await surahRes.json();

    return {
        verse_key: verse.verse_key,
        text_uthmani: verse.text_uthmani,
        english_translation: verse.translations[0].text.replace(/<sup.*?<\/sup>/g, ""),
        surah_name: surahData.chapter.name_simple
    };
}
