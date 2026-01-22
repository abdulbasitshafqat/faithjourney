const https = require('https');

async function checkId(id) {
    return new Promise((resolve) => {
        const req = https.get(`https://api.quran.com/api/v4/chapter_recitations/${id}/1`, (res) => {
            if (res.statusCode !== 200) {
                resolve(null);
                return;
            }
            let data = '';
            res.on('data', c => data += c);
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    resolve({ id, url: json.audio_file.audio_url });
                } catch (e) {
                    resolve(null);
                }
            });
        });
        req.on('error', () => resolve(null));
        req.setTimeout(5000, () => req.destroy());
    });
}

async function run() {
    const promises = [];
    for (let i = 1; i <= 200; i++) {
        promises.push(checkId(i));
        if (i % 20 === 0) await new Promise(r => setTimeout(r, 200)); // Throttle slightly
    }

    const results = await Promise.all(promises);

    for (const r of results) {
        if (!r) continue;
        const lower = r.url.toLowerCase();
        // Log interesting ones
        if (lower.includes('urdu') || lower.includes('translation') || lower.includes('khan') || lower.includes('fateh')) {
            console.log("MATCH:", r);
        }
    }
    console.log("Scan complete.");
}

run();
