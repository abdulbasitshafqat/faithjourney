const https = require('https');

async function fetchPage(page) {
    return new Promise((resolve, reject) => {
        https.get(`https://api.quran.com/api/v4/resources/recitations?page=${page}`, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => resolve(JSON.parse(data)));
            res.on('error', reject);
        });
    });
}

async function findUrdu() {
    let page = 1;
    while (true) {
        console.log("Checking page " + page);
        const data = await fetchPage(page);
        if (!data.recitations || data.recitations.length === 0) break;

        for (const r of data.recitations) {
            const raw = JSON.stringify(r).toLowerCase();
            if (raw.includes('shamshad') || raw.includes('fateh') || raw.includes('urdu')) {
                console.log("FOUND RECITER:", r);
            }
        }
        page++;
        if (page > 20) break; // Safety
    }
}

findUrdu();
