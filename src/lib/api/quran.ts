const QURAN_COM_BASE_URL = "https://api.quran.com/api/v4";
const ALQURAN_CLOUD_BASE_URL = "https://api.alquran.cloud/v1";

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

export interface Word {
    id: number;
    position: number;
    audio_url: string | null;
    char_type_name: string;
    text_uthmani: string;
    page_number: number;
    line_number: number;
    text: string;
    translation?: { text: string; language_name: string };
    transliteration?: { text: string; language_name: string };
}

export interface Ayah {
    id: number;
    verse_key: string;
    text_uthmani: string;
    words?: Word[];
    translations?: {
        id: number;
        resource_id: number;
        text: string;
        resource_name: string;
        language_name: string;
    }[];
    audio?: { url: string };
}

export interface AudioTimestamp {
    verse_key: string;
    timestamp_from: number;
    timestamp_to: number;
    duration: number;
    segments: [number, number, number][];
}

export interface VerseAudioFile {
    verseKey: string;
    globalAyahId: number;
    audioUrl: string;
}

export interface SurahAudioData {
    verseAudios: VerseAudioFile[];
}

interface AlQuranEdition {
    edition: { identifier: string; name: string; language: string };
    ayahs: Array<{
        number: number;
        numberInSurah: number;
        text: string;
        audio?: string;
    }>;
}

const RECITER_EDITIONS: Record<number, string> = {
    7: "ar.alafasy",
    3: "ar.abdurrahmaansudais",
    1: "ar.abdulbasitmurattal",
};

async function fetchJson<T>(url: string, label: string): Promise<T> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) throw new Error(`${label} returned ${response.status}`);
        return await response.json() as T;
    } finally {
        clearTimeout(timeout);
    }
}

function mapFallbackSurah(chapter: {
    number: number;
    englishName: string;
    englishNameTranslation: string;
    name: string;
    numberOfAyahs: number;
    revelationType: string;
}): Surah {
    return {
        id: chapter.number,
        name_simple: chapter.englishName,
        name_arabic: chapter.name,
        verses_count: chapter.numberOfAyahs,
        revelation_place: chapter.revelationType.toLowerCase(),
        translated_name: {
            name: chapter.englishNameTranslation,
            language_name: "english",
        },
    };
}

export async function getSurahs(): Promise<Surah[]> {
    try {
        const data = await fetchJson<{ chapters: Surah[] }>(`${QURAN_COM_BASE_URL}/chapters?language=en`, "Quran.com chapters");
        return data.chapters;
    } catch (error) {
        console.warn("Quran.com chapters unavailable; using AlQuran Cloud fallback.", error);
        const data = await fetchJson<{ data: Parameters<typeof mapFallbackSurah>[0][] }>(`${ALQURAN_CLOUD_BASE_URL}/surah`, "Fallback chapters");
        return data.data.map(mapFallbackSurah);
    }
}

export async function getSurahDetails(id: number): Promise<Surah> {
    try {
        const data = await fetchJson<{ chapter: Surah }>(`${QURAN_COM_BASE_URL}/chapters/${id}?language=en`, "Quran.com chapter");
        return data.chapter;
    } catch (error) {
        console.warn("Quran.com chapter unavailable; using AlQuran Cloud fallback.", error);
        const data = await fetchJson<{ data: Parameters<typeof mapFallbackSurah>[0] }>(`${ALQURAN_CLOUD_BASE_URL}/surah/${id}`, "Fallback chapter");
        return mapFallbackSurah(data.data);
    }
}

async function getFallbackAyahs(surahId: number): Promise<Ayah[]> {
    const editions = "quran-uthmani,en.sahih,ur.junagarhi,en.transliteration";
    const response = await fetchJson<{ data: AlQuranEdition[] }>(
        `${ALQURAN_CLOUD_BASE_URL}/surah/${surahId}/editions/${editions}`,
        "Fallback verses",
    );
    const byId = new Map(response.data.map((edition) => [edition.edition.identifier, edition]));
    const arabic = byId.get("quran-uthmani");
    if (!arabic) throw new Error("Fallback Arabic edition missing");

    return arabic.ayahs.map((ayah, index) => {
        const translations: NonNullable<Ayah["translations"]> = [];
        const english = byId.get("en.sahih")?.ayahs[index];
        const urdu = byId.get("ur.junagarhi")?.ayahs[index];
        const transliteration = byId.get("en.transliteration")?.ayahs[index];
        if (english) translations.push({ id: english.number, resource_id: 20, text: english.text, resource_name: "Saheeh International", language_name: "english" });
        if (urdu) translations.push({ id: urdu.number, resource_id: 54, text: urdu.text, resource_name: "Muhammad Junagarhi", language_name: "urdu" });
        if (transliteration) translations.push({ id: transliteration.number, resource_id: 57, text: transliteration.text, resource_name: "Transliteration", language_name: "english" });
        return {
            id: ayah.number,
            verse_key: `${surahId}:${ayah.numberInSurah}`,
            text_uthmani: ayah.text,
            translations,
        };
    });
}

export async function getAyahs(surahId: number, translations = "20,54,234,57"): Promise<Ayah[]> {
    try {
        const allVerses: Ayah[] = [];
        let page = 1;
        const perPage = 50;
        while (page <= 10) {
            const data = await fetchJson<{ verses?: Ayah[] }>(
                `${QURAN_COM_BASE_URL}/verses/by_chapter/${surahId}?language=en&words=true&word_fields=text_uthmani,id,position&translations=${translations}&fields=text_uthmani&per_page=${perPage}&page=${page}`,
                "Quran.com verses",
            );
            const verses = data.verses ?? [];
            allVerses.push(...verses);
            if (verses.length < perPage) return allVerses;
            page += 1;
        }
        return allVerses;
    } catch (error) {
        console.warn("Quran.com verses unavailable; using AlQuran Cloud fallback.", error);
        return getFallbackAyahs(surahId);
    }
}

export async function getSurahRecitation(surahId: number, reciterId = 7): Promise<SurahAudioData> {
    const edition = RECITER_EDITIONS[reciterId] ?? RECITER_EDITIONS[7];
    const response = await fetchJson<{ data: AlQuranEdition }>(
        `${ALQURAN_CLOUD_BASE_URL}/surah/${surahId}/${edition}`,
        "Recitation",
    );
    const verseAudios = response.data.ayahs
        .filter((ayah) => Boolean(ayah.audio))
        .map((ayah) => ({
            verseKey: `${surahId}:${ayah.numberInSurah}`,
            globalAyahId: ayah.number,
            audioUrl: ayah.audio!,
        }));
    return { verseAudios };
}

export async function getVerseOfTheDay(): Promise<{
    verse_key: string;
    text_uthmani: string;
    english_translation: string;
    surah_name: string;
}> {
    const curatedVerses = ["2:152", "2:286", "3:139", "94:5", "94:6", "65:2", "65:3", "39:53", "13:28", "40:60"];
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    const verseKey = curatedVerses[dayOfYear % curatedVerses.length];
    const surahId = Number(verseKey.split(":")[0]);

    try {
        const data = await fetchJson<{ verse: { verse_key: string; text_uthmani: string; translations: Array<{ text: string }> } }>(
            `${QURAN_COM_BASE_URL}/verses/by_key/${verseKey}?language=en&words=false&translations=20&fields=text_uthmani`,
            "Quran.com daily verse",
        );
        const surah = await getSurahDetails(surahId);
        return {
            verse_key: data.verse.verse_key,
            text_uthmani: data.verse.text_uthmani,
            english_translation: data.verse.translations[0].text.replace(/<sup.*?<\/sup>/g, ""),
            surah_name: surah.name_simple,
        };
    } catch (error) {
        console.warn("Quran.com daily verse unavailable; using AlQuran Cloud fallback.", error);
        const response = await fetchJson<{ data: Array<{ text: string; surah: { englishName: string } }> }>(
            `${ALQURAN_CLOUD_BASE_URL}/ayah/${verseKey}/editions/quran-uthmani,en.sahih`,
            "Fallback daily verse",
        );
        return {
            verse_key: verseKey,
            text_uthmani: response.data[0].text,
            english_translation: response.data[1].text,
            surah_name: response.data[0].surah.englishName,
        };
    }
}

export async function getTafseer(ayahKey: string, tafseerId = 169): Promise<{ text: string; resource_name: string }> {
    const data = await fetchJson<{ tafsir: { text: string; resource_name?: string } }>(
        `${QURAN_COM_BASE_URL}/tafsirs/${tafseerId}/by_ayah/${ayahKey}`,
        "Tafseer",
    );
    return {
        text: data.tafsir.text,
        resource_name: data.tafsir.resource_name || "Tafsir Ibn Kathir",
    };
}
