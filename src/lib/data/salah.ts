export const wuduSteps = [
    {
        step: 1,
        title: "Intention (Niyyah)",
        description: "Make the intention in your heart to perform Wudu for the sake of Allah.",
        arabic: "بِسْمِ ٱللَّٰهِ",
        transliteration: "Bismillah",
        meaning: "In the name of Allah"
    },
    {
        step: 2,
        title: "Wash Hands",
        description: "Wash both hands up to the wrists three times, ensuring water reaches between the fingers.",
    },
    {
        step: 3,
        title: "Rinse Mouth",
        description: "Rinse your mouth thoroughly with water three times.",
    },
    {
        step: 4,
        title: "Rinse Nose",
        description: "Sniff water into your nose and blow it out three times.",
    },
    {
        step: 5,
        title: "Wash Face",
        description: "Wash your entire face three times, from the hairline to the chin and from ear to ear.",
    },
    {
        step: 6,
        title: "Wash Arms",
        description: "Wash your arms up to and including the elbows three times, starting with the right arm.",
    },
    {
        step: 7,
        title: "Wipe Head",
        description: "Wipe your head once with wet hands, from the forehead to the back of the neck and back.",
    },
    {
        step: 8,
        title: "Wash Feet",
        description: "Wash both feet up to and including the ankles three times, starting with the right foot.",
    },
    {
        step: 9,
        title: "Dua After Wudu",
        description: "Recite the supplication after completing Wudu.",
        arabic: "أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا ٱللَّٰهُ وَحْدَهُ لَا شَرِيكَ لَهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ",
        transliteration: "Ash-hadu an la ilaha ill-Allah wahdahu la sharika lah, wa ash-hadu anna Muhammadan 'abduhu wa rasuluh.",
        meaning: "I bear witness that there is no god but Allah alone, with no partner or associate, and I bear witness that Muhammad is His slave and Messenger."
    }
];

export const salahSteps = [
    {
        step: 1,
        title: "Takbiratul Ihram",
        description: "Stand facing the Qibla, raise your hands to your shoulders or ears, and say the opening Takbir.",
        arabic: "ٱللَّٰهُ أَكْبَرُ",
        transliteration: "Allahu Akbar",
        meaning: "Allah is the Greatest",
        instruction: "Place your hands according to your school of thought.",
        variations: {
            hanafi: "Place your hands below the navel, right over left.",
            shafi: "Place your hands on the chest, slightly to the left.",
            maliki: "You may either place hands on the chest or leave them at your sides (Sadh).",
            hanbali: "Place your hands below the navel or on the chest."
        }
    },
    {
        step: 2,
        title: "Opening Supplication (Dua Al-Istiftah)",
        description: "Recite the opening supplication silently.",
        arabic: "سُبْحَانَكَ ٱللَّٰهُمَّ وَبِحَمْدِكَ، وَتَبَارَكَ ٱسْمُكَ، وَتَعَالَىٰ جَدُّكَ، وَلَا إِلَٰهَ غَيْرُكَ",
        transliteration: "Subhanaka Allahumma wa bihamdika, wa tabaraka ismuka, wa ta'ala jadduka, wa la ilaha ghairuk.",
        meaning: "Glory be to You, O Allah, and all praises are due unto You, and blessed is Your name and high is Your majesty and none is worthy of worship but You."
    },
    {
        step: 3,
        title: "Recitation of Surah Al-Fatiha",
        description: "Recite Surah Al-Fatiha in every Rak'ah. It is mandatory.",
        arabic: "بِسْمِ ٱللَّٰهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ... (Surah Al-Fatiha)",
        transliteration: "Bismillahi r-rahmani r-rahim...",
        meaning: "In the name of Allah, the Most Gracious, the Most Merciful...",
        instruction: "Recite with concentration.",
        variations: {
            hanafi: "Say 'Ameen' silently after Surah Al-Fatiha.",
            shafi: "Say 'Ameen' audibly in loud prayers.",
            maliki: "Recitation of Al-Fatiha is required behind the Imam.",
            hanbali: "Say 'Ameen' audibly in loud prayers."
        }
    },
    {
        step: 4,
        title: "Ruku (Bowing)",
        description: "Say 'Allahu Akbar' and bow down. Keep your back straight and parallel to the floor.",
        arabic: "سُبْحَانَ رَبِّيَ ٱلْعَظِيمِ",
        transliteration: "Subhana Rabbiyal Azeem",
        meaning: "Glory be to my Lord, the Magnificent",
        count: "3 times or more (odd number)",
        variations: {
            hanafi: "Only raise hands (Raf-al-Yadayn) at the start of prayer.",
            shafi: "Raise hands (Raf-al-Yadayn) before going into Ruku.",
            maliki: "Raising hands before Ruku is a recommended Sunnah.",
            hanbali: "Raise hands (Raf-al-Yadayn) before going into Ruku."
        }
    },
    {
        step: 5,
        title: "Rising from Ruku (I'tidal)",
        description: "Rise from bowing to a standing position.",
        arabic: "سَمِعَ ٱللَّٰهُ لِمَنْ حَمِدَهُ... رَبَّنَا وَلَكَ ٱلْحَمْدُ",
        transliteration: "Sami'Allahu liman hamidah... Rabbana wa lakal hamd",
        meaning: "Allah hears those who praise Him... Our Lord, and to You is all praise",
        variations: {
            hanafi: "Do not raise hands when rising.",
            shafi: "Raise hands when rising (Raf-al-Yadayn).",
            maliki: "Rising with hands at sides is common.",
            hanbali: "Raise hands when rising (Raf-al-Yadayn)."
        }
    },
    {
        step: 6,
        title: "Sujood (Prostration)",
        description: "Go down for prostration saying 'Allahu Akbar'.",
        arabic: "سُبْحَانَ رَبِّيَ ٱلْأَعْلَىٰ",
        transliteration: "Subhana Rabbiyal A'la",
        meaning: "Glory be to my Lord, the Most High",
        count: "3 times or more (odd number)",
        instruction: "Seven parts of the body must touch the ground: forehead & nose, two palms, two knees, and toes of two feet."
    },
    {
        step: 7,
        title: "Sitting between Two Sujoods",
        description: "Rise from Sujood saying 'Allahu Akbar' and sit briefly.",
        arabic: "رَبِّ ٱغْفِرْ لِي، رَبِّ ٱغْفِرْ لِي",
        transliteration: "Rabbighfir li, Rabbighfir li",
        meaning: "My Lord forgive me, My Lord forgive me"
    },
    {
        step: 8,
        title: "Second Sujood",
        description: "Perform the second prostration exactly like the first.",
    },
    {
        step: 9,
        title: "Tashahhud (Sitting)",
        description: "Sit for Tashahhud in the second and final Rak'ah.",
        arabic: "ٱلتَّحِيَّاتُ لِلَّٰهِ وَٱلصَّلَوَاتُ وَٱلطَّيِّبَاتُ...",
        transliteration: "At-tahiyyatu lillahi was-salawatu wat-tayyibatu...",
        meaning: "All compliments, prayers and pure words are due to Allah...",
        instruction: "Sit on your left foot with the right foot upright.",
        variations: {
            hanafi: "Raise the index finger when saying 'La ilaha' and drop it after 'ill-Allah'.",
            shafi: "Raise the index finger and keep it still or slightly curved.",
            maliki: "Move the index finger from side to side throughout the Tashahhud.",
            hanbali: "Point with the index finger throughout the Tashahhud without moving it."
        }
    },
    {
        step: 10,
        title: "Durood (Sending Blessings)",
        description: "Recite Durood Ibrahim after Tashahhud in the final sitting.",
        arabic: "ٱللَّٰهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ وَعَلَىٰ آلِ مُحَمَّدٍ...",
        transliteration: "Allahumma salli 'ala Muhammadin wa 'ala ali Muhammadin...",
        meaning: "O Allah, send prayers upon Muhammad and upon the family of Muhammad..."
    },
    {
        step: 11,
        title: "Taslim (Concluding)",
        description: "Turn your face to the right and then to the left to end the prayer.",
        arabic: "ٱلسَّلَامُ عَلَيْكُمْ وَرَحْمَةُ ٱللَّٰهِ",
        transliteration: "As-salamu 'alaykum wa rahmatullah",
        meaning: "Peace be upon you and the mercy of Allah"
    }
];
