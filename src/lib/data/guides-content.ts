
export const fastingGuide = {
    title: "Fasting (Sawm)",
    description: "A comprehensive guide to the fourth pillar of Islam, including rules, virtues, and etiquettes.",
    steps: [
        {
            title: "Intention (Niyyah)",
            description: "The intention to fast must be made before Fajr (dawn). It is an act of the heart.",
            arabic: "وَبِصَوْمِ غَدٍ نَّوَيْتُ مِنْ شَهْرِ رَمَضَانَ",
            transliteration: "Wa bisawmi ghadin nawaiytu min shahri Ramadan",
            meaning: "I intend to keep the fast for tomorrow in the month of Ramadan"
        },
        {
            title: "Suhoor (Pre-dawn Meal)",
            description: "It is a Sunnah to eat a meal before dawn. The Prophet (PBUH) said there is blessing in Suhoor.",
            note: "Finish eating before the Fajr adhan begins."
        },
        {
            title: "Abstaining",
            description: "From dawn (Fajr) until sunset (Maghrib), one must abstain from food, drink, and marital relations.",
            note: "Also safeguard your tongue, eyes, and ears from sins."
        },
        {
            title: "Iftar (Breaking Fast)",
            description: "Hasten to break the fast as soon as the sun sets (Maghrib time).",
            instruction: "Break your fast with dates or water.",
            dua: {
                arabic: "اللَّهُمَّ إِنِّي لَكَ صُمْتُ وَبِكَ آمَنْتُ وَعَلَيْكَ تَوَكَّلْتُ وَعَلَى رِزْقِكَ أَفْطَرْتُ",
                transliteration: "Allahumma inni laka sumtu wa bika aamantu wa 'alayka tawakkaltu wa 'ala rizq-ika aftartu",
                meaning: "O Allah! I fasted for You and I believe in You and I put my trust in You and I break my fast with Your sustenance"
            }
        }
    ],
    rules: [
        { title: "Who Must Fast?", description: "Every adult, sane, healthy Muslim." },
        { title: "Exemptions", description: "Travelers, the sick, elderly, pregnant or nursing women, and women on menstruation/postnatal bleeding." },
        { title: "Nullifiers", description: "Eating/drinking intentionally, intentional vomiting, and marital relations during the day." }
    ]
};

export const hajjGuide = {
    title: "Hajj (The Pilgrimage)",
    description: "Step-by-step guide to performing Hajj, the fifth pillar of Islam.",
    days: [
        {
            day: "8th Dhul-Hijjah",
            title: "Ihram & Mina",
            steps: [
                "Assume Ihram",
                "Travel to Mina",
                "Pray Dhuhr, Asr, Maghrib, Isha, and Fajr (next day) in Mina",
                "Spend the night in Mina"
            ]
        },
        {
            day: "9th Dhul-Hijjah",
            title: "Day of Arafah",
            steps: [
                "Travel to Arafah after sunrise",
                "Pray Dhuhr and Asr combined in Arafah",
                "Make dua until sunset (Wuquf)",
                "Travel to Muzdalifah after sunset",
                "Pray Maghrib and Isha combined in Muzdalifah",
                "Collect pebbles and spend the night"
            ]
        },
        {
            day: "10th Dhul-Hijjah",
            title: "Yawm al-Nahr",
            steps: [
                "Pray Fajr in Muzdalifah",
                "Travel to Mina before sunrise",
                "Perform Rami (stoning) of Jamarat al-Aqabah (Big Pillar)",
                "Perform Sacrifice (Qurbani)",
                "Trim or Shave hair (Halq/Taqsir)",
                "Remove Ihram (First Tahallul)",
                "Perform Tawaf al-Ifadah and Sa'i in Makkah",
                "Return to Mina for the night"
            ]
        },
        {
            day: "11th-13th Dhul-Hijjah",
            title: "Days of Tashreeq",
            steps: [
                "Spend nights in Mina",
                "Stone all three Jamarat each day after Zawal (midday)",
                "Perform Farewell Tawaf (Tawaf al-Wida) before leaving Makkah"
            ]
        }
    ]
};

export const umrahGuide = {
    title: "Umrah",
    description: "A guide to the minor pilgrimage.",
    steps: [
        {
            title: "Ihram",
            description: "Enter the state of Ihram before the Miqat. Niyyah for Umrah.",
            arabic: "لَبَّيْكَ اللَّهُمَّ عُمْرَةً",
            transliteration: "Labbayk Allahumma Umrah",
            meaning: "Here I am O Allah, for Umrah"
        },
        {
            title: "Talbiyah",
            description: "Recite the Talbiyah frequently on the way to Makkah.",
            arabic: "لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ لَا شَرِيكَ لَكَ",
            transliteration: "Labbayk Allahumma Labbayk, Labbayka la sharika laka Labbayk...",
            meaning: "Here I am, O Allah, here I am. Here I am, You have no partner, here I am..."
        },
        {
            title: "Tawaf",
            description: "Circumbulate the Kaaba 7 times counter-clockwise, starting from the Black Stone (Hajar al-Aswad). Pray 2 Rakat behind Maqam Ibrahim."
        },
        {
            title: "Sa'i",
            description: "Walk 7 times between the hills of Safa and Marwah, starting at Safa."
        },
        {
            title: "Halq or Taqsir",
            description: "Shave the head (men only) or trim the hair (men and women) to exit Ihram."
        }
    ]
};

export const zakatGuideContent = {
    title: "Zakat (Almsgiving)",
    description: "Understanding the obligation of Zakat and how to fulfill it.",
    sections: [
        {
            title: "What is Zakat?",
            content: "Zakat is a mandatory charitable contribution, the third pillar of Islam. It purifies wealth and blesses the remainder."
        },
        {
            title: "Conditions for Zakat",
            items: [
                "Example: Muslim, Adult, Sane, Free",
                "Complete ownership of wealth",
                "Wealth beyond basic needs",
                "Reaching the Nisab (threshold)",
                "Possession for one lunar year (Hawl)"
            ]
        },
        {
            title: "Types of Zakatable Wealth",
            items: [
                "Gold and Silver",
                "Cash and Savings",
                "Business Inventory",
                "Agricultural Produce",
                "Livestock"
            ]
        },
        {
            title: "Recipients of Zakat",
            description: "Zakat can only be given to specific categories mentioned in the Quran (9:60):",
            items: [
                "The Poor (Al-Fuqara)",
                "The Needy (Al-Masakin)",
                "Zakat Collectors",
                "Those whose hearts are to be reconciled",
                "Freed Slaves",
                "Debtors",
                "In the Cause of Allah",
                "The Wayfarer"
            ]
        }
    ]
};

export const janazahGuide = {
    title: "Janazah (Funeral)",
    description: "Guide to the Islamic funeral prayer and burial rights.",
    rights: [
        "Washing the body (Ghusl)",
        "Shrouding (Kafan)",
        "Funeral Prayer (Salat al-Janazah)",
        "Burial (Dafn)"
    ],
    janazahPrayerSteps: [
        {
            step: 1,
            title: "First Takbir",
            description: "Raise hands, say 'Allahu Akbar', fold hands, recite Thana (or Al-Fatiha in some schools)."
        },
        {
            step: 2,
            title: "Second Takbir",
            description: "Say 'Allahu Akbar' (hands lowered or raised depending on school), recite Durood-e-Ibrahim."
        },
        {
            step: 3,
            title: "Third Takbir",
            description: "Say 'Allahu Akbar', make Dua for the deceased."
        },
        {
            step: 4,
            title: "Fourth Takbir",
            description: "Say 'Allahu Akbar', pause/make general dua, then perform Tasleem to end."
        }
    ]
};
