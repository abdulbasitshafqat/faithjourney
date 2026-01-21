import fs from 'fs';
import path from 'path';

export interface HadithBook {
    name: string;
    id: string; // e.g., 'bukhari', 'muslim'
    collection: {
        name: string;
        has_books: boolean;
        has_chapters: boolean;
    }[];
    language: string;
    direction: string;
    source: string;
    editionName: string; // 'eng-bukhari', 'urd-bukhari'
    metadata: {
        name: string;
        sections: Record<string, string>; // "1": "Revelation"
        section_details: Record<string, { name: string; hadithnumber_first: number; hadithnumber_last: number; hadithnumber_count: number }>;
    };
}

export interface Section {
    number: string;
    name: string;
    hadith_count?: number;
}

export interface Hadith {
    hadithnumber: number;
    arabicnumber: number;
    text: string;
    grades: {
        name: string;
        grade: string;
    }[];
    reference: {
        book: number;
        hadith: number;
    };
}

// Local Data Directory
const DATA_DIR = path.join(process.cwd(), 'src/lib/data/hadith');

// Mapping of Friendly Names to specific Edition Slugs we want to support
const BOOK_EDITIONS = {
    bukhari: {
        eng: "eng-bukhari",
        urd: "urd-bukhari",
        ara: "ara-bukhari" // Arabic text is often in the same edition file or separate, usually we fetch Arabic + Translation
    },
    muslim: {
        eng: "eng-muslim",
        urd: "urd-muslim",
        ara: "ara-muslim"
    },
    abudawud: {
        eng: "eng-abudawud",
        urd: "urd-abudawud",
        ara: "ara-abudawud"
    },
    // Add more as needed
};

// Helper: Read from local JSON file
async function readLocalFile(relativePath: string) {
    try {
        const filePath = path.join(DATA_DIR, relativePath);
        // Using fs.promises to read asynchronously on server
        const fileContent = await fs.promises.readFile(filePath, 'utf-8');
        return JSON.parse(fileContent);
    } catch (error) {
        console.error(`Failed to read local file: ${relativePath}`, error);
        return null;
    }
}

/**
 * Get the list of sections (chapters) for a specific book and language.
 * Uses the English edition to get standard section names.
 */
export async function getBookSections(bookSlug: keyof typeof BOOK_EDITIONS = 'bukhari'): Promise<Section[]> {
    const edition = BOOK_EDITIONS[bookSlug].eng;
    // Read from local edition file
    const data = await readLocalFile(`editions/${edition}.json`);

    if (!data || !data.metadata || !data.metadata.sections) return [];

    // The data.metadata.sections is a map: { "1": "Revelation", "2": "Belief" ... }
    return Object.entries(data.metadata.sections).map(([number, name]) => ({
        number,
        name: name as string
    })).sort((a, b) => Number(a.number) - Number(b.number));
}

/**
 * Fetch Hadiths for a specific section (chapter).
 * Returns both Arabic and the selected translation.
 */
export async function getHadithsForSection(
    bookSlug: keyof typeof BOOK_EDITIONS,
    sectionNumber: string,
    language: 'eng' | 'urd' = 'eng'
): Promise<{ arabic: Hadith[]; translation: Hadith[] }> {

    const engEdition = BOOK_EDITIONS[bookSlug].eng; // Not used but good reference
    const targetEdition = BOOK_EDITIONS[bookSlug][language];
    const araEdition = BOOK_EDITIONS[bookSlug].ara;

    // Read Arabic from local files
    // Path structure from downloader: editions/{edition}/sections/{number}.json
    const araData = await readLocalFile(`editions/${araEdition}/sections/${sectionNumber}.json`);

    // Read Translation from local files
    const transData = await readLocalFile(`editions/${targetEdition}/sections/${sectionNumber}.json`);

    return {
        arabic: araData?.hadiths || [],
        translation: transData?.hadiths || []
    };
}

/**
 * Get a list of supported books for the dashboard
 */
export function getSupportedBooks() {
    return [
        {
            id: 'bukhari',
            name: 'Sahih al-Bukhari',
            author: 'Imam Bukhari',
            total: 7563,
            description: 'The most authentic book of Hadith.'
        },
        {
            id: 'muslim',
            name: 'Sahih Muslim',
            author: 'Imam Muslim',
            total: 7563, // Approx
            description: 'The second most authentic book of Hadith.'
        },
        {
            id: 'abudawud',
            name: 'Sunan Abu Dawud',
            author: 'Abu Dawud',
            total: 5274,
            description: 'Focuses on legal rulings (Fiqh).'
        },
    ];
}
