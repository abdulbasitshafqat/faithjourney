async function test() {
    try {
        const res = await fetch("https://api.quran.com/api/v4/chapter_recitations/7/1?segments=true");
        const data = await res.json();
        console.log("CHAPTER RECITATION WITH SEGMENTS RESPONSE:", JSON.stringify(data, null, 2).substring(0, 1000));
    } catch (e) {
        console.error(e);
    }
}
test();
