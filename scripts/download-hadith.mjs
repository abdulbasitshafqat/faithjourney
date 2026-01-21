
import fs from 'fs';
import path from 'path';
import https from 'https';

// Configuration
const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1";
const DOWNLOAD_DIR = path.join(process.cwd(), 'src/lib/data/hadith');

// Editions to download (add more as needed)
const EDITIONS = [
    'eng-bukhari',
    'urd-bukhari',
    'ara-bukhari',
    'eng-muslim',
    'urd-muslim',
    'ara-muslim',
    'eng-abudawud',
    'urd-abudawud',
    'ara-abudawud'
];

async function ensureDir(dir) {
    if (!fs.existsSync(dir)) {
        await fs.promises.mkdir(dir, { recursive: true });
    }
}

function fetchJson(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            if (res.statusCode !== 200) {
                res.resume();
                resolve(null); // Return null for missing files
                return;
            }
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                } catch (e) {
                    reject(e);
                }
            });
        }).on('error', reject);
    });
}

async function downloadEdition(editionName) {
    console.log(`Downloading edition: ${editionName}...`);

    // 1. Download Main Edition File (Metadata + potentially content)
    // IMPORTANT: Checking the API, editions/{name}.json usually has just metadata or full content.
    // For this API, sections are often separate.
    const editionData = await fetchJson(`${BASE_URL}/editions/${editionName}.json`);

    if (!editionData) {
        console.error(`Failed to find edition: ${editionName}`);
        return;
    }

    // Save edition file
    const editionDir = path.join(DOWNLOAD_DIR, 'editions');
    await ensureDir(editionDir);
    await fs.promises.writeFile(path.join(editionDir, `${editionName}.json`), JSON.stringify(editionData, null, 2));

    // 2. Download Sections
    // The edition metadata should contain a sections map.
    if (editionData.metadata && editionData.metadata.sections) {
        const sectionsDir = path.join(DOWNLOAD_DIR, 'editions', editionName, 'sections');
        await ensureDir(sectionsDir);

        const sections = Object.keys(editionData.metadata.sections);
        console.log(`  - Found ${sections.length} sections. Downloading...`);

        // Download in chunks to avoid rate limits
        const CHUNK_SIZE = 10;
        for (let i = 0; i < sections.length; i += CHUNK_SIZE) {
            const chunk = sections.slice(i, i + CHUNK_SIZE);
            await Promise.all(chunk.map(async (sectionId) => {
                const sectionData = await fetchJson(`${BASE_URL}/editions/${editionName}/sections/${sectionId}.json`);
                if (sectionData) {
                    await fs.promises.writeFile(
                        path.join(sectionsDir, `${sectionId}.json`),
                        JSON.stringify(sectionData, null, 2)
                    );
                }
            }));
            process.stdout.write(`.`);
        }
        console.log(`\n  - Completed ${editionName}`);
    } else {
        console.log(`  - No sections found (or contained in main file) for ${editionName}`);
    }
}

async function main() {
    console.log('Starting Hadith Data Download...');
    await ensureDir(DOWNLOAD_DIR);

    for (const edition of EDITIONS) {
        await downloadEdition(edition);
    }

    console.log('All downloads complete!');
}

main().catch(console.error);
