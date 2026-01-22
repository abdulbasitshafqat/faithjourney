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
    },
    {
        slug: "concept-of-tawhid",
        title: "Understanding Tawhid: The Core of Faith",
        description: "An in-depth look at the oneness of God, the foundation of Islamic belief and spirituality.",
        category: "Faith",
        readTime: "8 min read",
        content: `
            <h3>The Foundation of Islam</h3>
            <p>Tawhid is the defining doctrine of Islam. It is the belief in the absolute oneness and uniqueness of Allah, the Creator and Sustainer of the universe.</p>
            
            <h3>Three Aspects of Tawhid</h3>
            <p>Scholars often categorize Tawhid into three parts to help us understand our relationship with the Divine:</p>
            <ul>
                <li><strong>Tawhid ar-Rububiyyah:</strong> Oneness in Lordship (Allah is the only Creator and Provider).</li>
                <li><strong>Tawhid al-Uluhiyyah:</strong> Oneness in Worship (Allah is the only one worthy of worship).</li>
                <li><strong>Tawhid al-Asma was-Sifat:</strong> Oneness in Names and Attributes (Allah's names are unique to Him).</li>
            </ul>
        `
    },
    {
        slug: "intro-to-hadith-science",
        title: "Introduction to Hadith Science",
        description: "How scholars verified the sayings and actions of the Prophet (PBUH) through a rigorous system.",
        category: "History",
        readTime: "10 min read",
        content: `
            <h3>What is Hadith?</h3>
            <p>A Hadith refers to the reports of the statements, actions, and silent approvals of Prophet Muhammad (PBUH). It is the second primary source of Islamic law after the Quran.</p>
            
            <h3>The Rigorous Verification Process</h3>
            <p>Islamic scholars developed 'Ilm al-Hadith (Science of Hadith) to verify authenticity. Every authentic Hadith has two parts:</p>
            <ul>
                <li><strong>Isnad (Chain of Narrators):</strong> A list of trustworthy individuals who passed the message down.</li>
                <li><strong>Matn (Main Text):</strong> The actual content of the report.</li>
            </ul>
        `
    },
    {
        slug: "ramadan-spiritual-recharge",
        title: "Ramadan: A Month of Spiritual Growth",
        description: "Beyond abstaining from food and drink, Ramadan is a time for self-discipline, charity, and prayer.",
        category: "Practice",
        readTime: "6 min read",
        content: `
            <h3>The Gate of Ar-Rayyan</h3>
            <p>Ramadan is the ninth month of the Islamic calendar, observed by Muslims worldwide as a month of fasting. It commemorates the first revelation of the Quran to Prophet Muhammad (PBUH).</p>
            
            <h3>Core Objectives</h3>
            <p>The primary goal is to attain <em>Taqwa</em> (God-consciousness). Achievements of the month include:</p>
            <ul>
                <li>Self-control and discipline</li>
                <li>Empathy for the less fortunate</li>
                <li>Community bonding through Iftar and Taraweeh</li>
                <li>Intense Quranic study</li>
            </ul>
        `
    },
    {
        slug: "impact-of-sadaqah",
        title: "The Power of Sadaqah",
        description: "How voluntary charity benefits both the giver and the receiver in this life and the next.",
        category: "Spirituality",
        readTime: "5 min read",
        content: `
            <h3>Invest in the Hereafter</h3>
            <p>While Zakat is obligatory, Sadaqah is voluntary charity given out of compassion and a desire to please Allah. It is described in the Quran as a 'beautiful loan' to God.</p>
            
            <h3>Forms of Sadaqah</h3>
            <p>Sadaqah is not limited to money. Prophet Muhammad (PBUH) taught that:</p>
            <ul>
                <li>"A smile to your brother is Sadaqah."</li>
                <li>"Removing an obstacle from the path is Sadaqah."</li>
                <li>"Helping a person with their burden is Sadaqah."</li>
            </ul>
        `
    }
];
