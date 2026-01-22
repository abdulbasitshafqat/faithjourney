const https = require('https');

const urls = [
    "https://download.quranicaudio.com/quran/translation/urdu/sudais_shuraym/001.mp3",
    "https://download.quranicaudio.com/c/urdu/sudais_shuraym_urdu/001.mp3",
    "https://mirrors.quranicaudio.com/quran/translation/urdu/sudais_shuraym/001.mp3",
    "https://server10.mp3quran.net/urdu/001.mp3",
    "https://everyayah.com/data/Abdul_Basit_Murattal_192kbps/001001.mp3", // Control
];

async function checkUrl(url) {
    return new Promise((resolve) => {
        const req = https.request(url, { method: 'HEAD' }, (res) => {
            resolve({ url, status: res.statusCode });
        });
        req.on('error', (e) => resolve({ url, error: e.message }));
        req.end();
    });
}

async function run() {
    for (const url of urls) {
        console.log(await checkUrl(url));
    }
}

run();
