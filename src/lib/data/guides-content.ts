
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
    title: "Janazah (Funeral) Guide",
    description: "A comprehensive guide to the Islamic funeral prayer and burial rites in accordance with authentic Quran & Sahih Hadith guidelines.",
    rights: [
        "Washing the body (Ghusl) - Preparing the deceased with purity.",
        "Shrouding (Kafan) - Wrapping the body in clean, white sheets.",
        "Funeral Prayer (Salat al-Janazah) - A collective obligation (Fard al-Kifayah).",
        "Burial (Dafn) - Laying the body to rest facing the Qiblah."
    ],
    janazahPrayerSteps: [
        {
            step: 1,
            title: "First Takbir: Surah Al-Fatihah",
            description: "Raise your hands to your ears or shoulders, say 'Allahu Akbar' to enter the prayer, and fold your hands over your chest. Recite Surah Al-Fatihah silently. According to the authentic Sunnah (Sahih Bukhari 1335), reciting Al-Fatihah is obligatory in the funeral prayer.",
            arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ﴿١﴾ الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ﴿٢﴾ الرَّحْمَٰنِ الرَّحِيمِ ﴿٣﴾ مَالِكِ يَوْمِ الدِّينِ ﴿٤﴾ إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ ﴿٥﴾ اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ ﴿٦﴾ صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ ﴿٧﴾",
            transliteration: "Bismillahir-Rahmanir-Rahim. Alhamdu lillahi Rabbil-'Alamin. Ar-Rahmanir-Rahim. Maliki Yawmid-Din. Iyyaka na'budu wa iyyaka nasta'in. Ihdinas-Siratal-Mustaqim. Siratal-ladhina an'amta 'alayhim, ghayril-maghdubi 'alayhim wa lad-dallin.",
            meaning: "In the name of Allah, the Entirely Merciful, the Especially Merciful. [All] praise is [due] to Allah, Lord of the worlds - The Entirely Merciful, the Especially Merciful, Sovereign of the Day of Recompense. It is You we worship and You we ask for help. Guide us to the straight path - The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray."
        },
        {
            step: 2,
            title: "Second Takbir: Durood-e-Ibrahim",
            description: "Say 'Allahu Akbar' and recite Durood-e-Ibrahim silently, sending prayers of peace and blessings upon the Prophet Muhammad (ﷺ) just as in regular prayers.",
            arabic: "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ. اللَّهُمَّ بَارِكْ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ",
            transliteration: "Allahumma salli 'ala Muhammadin wa 'ala aali Muhammadin kama sallayta 'ala Ibrahima wa 'ala aali Ibrahima innaka Hamidun Majid. Allahumma barik 'ala Muhammadin wa 'ala aali Muhammadin kama barakta 'ala Ibrahima wa 'ala aali Ibrahima innaka Hamidun Majid.",
            meaning: "O Allah, send prayers upon Muhammad and upon the family of Muhammad, as You sent prayers upon Abraham and upon the family of Abraham, indeed You are Praiseworthy, Most Glorious. O Allah, bless Muhammad and the family of Muhammad, as You blessed Abraham and the family of Abraham, indeed You are Praiseworthy, Most Glorious."
        },
        {
            step: 3,
            title: "Third Takbir: Sincere Supplication for the Deceased",
            description: "Say 'Allahu Akbar' and make sincere, authentic dua for the deceased. Sourcing from primary collections (Sahih Muslim 963), the Prophet (ﷺ) taught us to pray for the forgiveness, purification, and high station of the deceased's soul.",
            arabic: "اللَّهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ وَعَافِهِ وَاعْفُ عَنْهُ وَأَكْرِمْ نُزُلَهُ وَوَسِّعْ مُدْخَلَهُ وَاغْسِلْهُ بِالْمَاءِ وَالثَّلْجِ وَالْبَرَدِ وَنَقِّهِ مِنَ الْخَطَايَا كَمَا نَقَّيْتَ الثَّوْبَ الأَبْيَضَ مِنَ الدَّنَسِ. اللَّهُمَّ أَبْدِلْهُ دَارًا خَيْرًا مِنْ دَارِهِ وَأَهْلاً خَيْرًا مِنْ أَهْلِهِ وَزَوْجًا خَيْرًا مِنْ زَوْجِهِ وَأَدْخِلْهُ الْجَنَّةَ وَأَعِذْهُ مِنْ عَذَابِ الْقَبْرِ وَمِنْ عَذَابِ النَّارِ",
            transliteration: "Allahum-maghfir lahu war-hamhu wa 'afihi wa'fu 'anhu, wa akrim nuzulahu, wa wassi' mudkhalahu, waghsilhu bil-ma'i wath-thalji wal-baradi, wa naqqihi minal-khataya kama naqqaytath-thawbal-abyada minad-danasi. Allahumma abdilhu daran khayran min darihi, wa ahlan khayran min ahlihi, wa zawjan khayran min zawjihi, wa adkhilhul-Jannata wa a'idh-hu min 'adhabail-qabri wa min 'adhabin-nar.",
            meaning: "O Allah, forgive him and have mercy on him, keep him safe and sound, excuse him and honor his reception. Make his grave spacious and wash him with water, snow, and hail. Purify him from sins as a white garment is purified from dirt. O Allah, grant him a home better than his home, a family better than his family, and a spouse better than his spouse. Admit him into Paradise and protect him from the torment of the grave and the torment of Hellfire. (Note: If the deceased is a female, adapt pronouns accordingly, e.g. Allahum-maghfir laha war-hamha...)"
        },
        {
            step: 4,
            title: "Fourth Takbir & Tasleem (Salam)",
            description: "Say 'Allahu Akbar', pause briefly to make general dua for yourself and the Ummah, and conclude the prayer by turning your head to the right and saying Salam. Reciting one Salam to the right is the established primary Sunnah, although saying two Salams is also acceptable.",
            arabic: "السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ",
            transliteration: "Assalamu 'Alaikum wa Rahmatullah",
            meaning: "Peace and mercy of Allah be upon you."
        }
    ]
};
