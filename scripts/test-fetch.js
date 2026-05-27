async function test() {
    try {
        const res = await fetch("https://api.quran.com/api/v4/chapter_recitations/7/1");
        const data = await res.json();
        console.log("CHAPTER RECITATION RESPONSE:", JSON.stringify(data, null, 2));
    } catch (e) {
        console.error(e);
    }
}
test();
