const https = require('https');

const ids = [158, 234, 161, 97, 101, 142, 140, 50, 60, 5, 20];

async function checkId(id) {
    return new Promise((resolve) => {
        https.get(`https://api.quran.com/api/v4/chapter_recitations/${id}/1`, (res) => {
            if (res.statusCode !== 200) {
                resolve({ id, error: res.statusCode });
                return;
            }
            let data = '';
            res.on('data', c => data += c);
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    resolve({ id, url: json.audio_file.audio_url });
                } catch (e) {
                    resolve({ id, error: e.message });
                }
            });
        }).on('error', (e) => resolve({ id, error: e.message }));
    });
}

async function run() {
    for (const id of ids) {
        const res = await checkId(id);
        console.log(`ID ${id}:`, res);
    }
}

run();
