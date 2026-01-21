export interface Article {
    slug: string;
    title: string;
    description: string;
    category: "Faith" | "History" | "Practice" | "Spirituality";
    content: string; // Markdown or HTML string
    readTime: string;
    coverImage?: string;
}

export const articles: Article[] = [
    {
        slug: "importance-of-prayer",
        title: "The Spiritual Benefits of Salah",
        description: "Discover how the five daily prayers structure our day and connect us to the Divine.",
        category: "Practice",
        readTime: "5 min read",
        content: `
            <h3>Connecting with the Divine</h3>
            <p>Salah (prayer) is not just a ritual; it is a direct line of communication between the believer and their Creator. It serves as a spiritual anchor in our busy lives, reminding us of our purpose and ultimate destination.</p>
            
            <h3>Psychological Peace</h3>
            <p>In a world full of noise and distraction, Salah offers five moments of silence and reflection. It is a time to disconnect from the world and reconnect with inner peace.</p>
            
            <blockquote>"Indeed, I am Allah. There is no deity except Me, so worship Me and establish prayer for My remembrance." (Quran 20:14)</blockquote>
        `
    },
    {
        slug: "understanding-wudu",
        title: "The Purity of Wudu",
        description: "A guide to the physical and spiritual significance of ablution before prayer.",
        category: "Practice",
        readTime: "4 min read",
        content: `
            <h3>More Than Cleansing</h3>
            <p>Wudu (ablution) is often seen as a physical cleansing, but its spiritual reality is profound. As we wash our limbs, we are also washing away minor sins and preparing our hearts to stand before Allah.</p>
            
            <h3>The Steps of Wudu</h3>
            <ol>
                <li>Intention (Niyyah)</li>
                <li>Washing hands</li>
                <li>Rinsing mouth and nose</li>
                <li>Washing the face</li>
                <li>Washing arms up to elbows</li>
                <li>Wiping the head</li>
                <li>Washing feet up to ankles</li>
            </ol>
        `
    },
    {
        slug: "history-of-quran",
        title: "The Preservation of the Holy Quran",
        description: "Tracing the history of how the Quran was revealed, compiled, and preserved to this day.",
        category: "History",
        readTime: "7 min read",
        content: `
            <h3>The Revelation</h3>
            <p>The Quran was revealed to Prophet Muhammad (PBUH) over a period of 23 years. Unlike other books, it was not revealed all at once but in response to specific events and needs of the community.</p>
            
            <h3>Compilation</h3>
            <p>While the Quran was memorized completely by many companions during the Prophet's life, it was standardized into a single written format during the Caliphate of Uthman (RA) to ensure unity in recitation.</p>
        `
    },
    {
        slug: "power-of-dua",
        title: "The Etiquettes of Dua",
        description: "How to make Dua effectively and the times when supplications are most likely to be accepted.",
        category: "Spirituality",
        readTime: "6 min read",
        content: `
            <h3>The Weapon of the Believer</h3>
            <p>Dua is described as the weapon of the believer. It has the power to change destiny and is the essence of worship.</p>
            
            <h3>Best Times for Dua</h3>
            <ul>
                <li>The last third of the night</li>
                <li>Between Adhan and Iqamah</li>
                <li>During Sujood (prostration)</li>
                <li>While traveling</li>
                <li>When it rains</li>
            </ul>
        `
    }
];
