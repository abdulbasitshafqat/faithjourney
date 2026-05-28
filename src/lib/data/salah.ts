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
        title: "Takbiratul Ihram (Opening)",
        description: "Stand straight, facing the Qibla (direction of Ka'bah), raise your hands to your earlobes or shoulders, and proclaim the opening Takbir with complete intention in your heart.",
        arabic: "ٱللَّهُ أَكْبَرُ",
        transliteration: "Allahu Akbar",
        meaning: "Allah is the Greatest",
        instruction: "Raise hands and then place your right hand over your left hand on your chest or below your navel.",
        variations: {
            hanafi: "Raise hands to earlobes (thumbs touching earlobes), then place hands below the navel, right hand gripping the left wrist.",
            shafi: "Raise hands to shoulder level, then place hands on the chest, slightly to the left, right over left.",
            maliki: "Raise hands to shoulder level. You may either place hands on the chest or leave them straight down at your sides (Sadl).",
            hanbali: "Raise hands to shoulder level or earlobes, then place hands below the navel or on the chest, right over left."
        }
    },
    {
        step: 2,
        title: "Opening Supplication (Dua Al-Istiftah)",
        description: "Recite the opening supplication silently to start your prayer, glorifying Allah.",
        arabic: "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، وَتَبَارَكَ اسْمُكَ، وَتَعَالَىٰ جَدُّكَ، وَلَا إِلَٰهَ غَيْرُكَ",
        transliteration: "Subhanaka Allahumma wa bihamdika, wa tabaraka ismuka, wa ta'ala jadduka, wa la ilaha ghairuk.",
        meaning: "Glory be to You, O Allah, and all praises are due unto You, and blessed is Your name and high is Your majesty and none is worthy of worship but You."
    },
    {
        step: 3,
        title: "Recitation of Surah Al-Fatiha",
        description: "Recite the opening chapter of the Quran. Reciting Surah Al-Fatihah is an essential pillar (Rukn) of the Salah, and the prayer is invalid without it.",
        arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ۝ الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ۝ الرَّحْمَٰنِ الرَّحِيمِ ۝ مَالِكِ يَوْمِ الدِّينِ ۝ إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ ۝ اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ ۝ صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
        transliteration: "Bismillahir-Rahmanir-Rahim. Alhamdu lillahi Rabbil-'alamin. Ar-Rahmanir-Rahim. Maliki yawmid-din. Iyyaka na'budu wa iyyaka nasta'in. Ihdinas-siratal-mustaqim. Siratal-ladhina an'amta 'alayhim, ghayril-maghdubi 'alayhim walad-dallin.",
        meaning: "In the name of Allah, the Most Gracious, the Most Merciful. All praise is due to Allah, Lord of the worlds. The Most Gracious, the Most Merciful. Master of the Day of Judgment. You alone we worship, and You alone we ask for help. Guide us to the straight path. The path of those upon whom You have bestowed favor, not of those who have earned Your anger or of those who are astray.",
        instruction: "Conclude by saying 'Ameen' (O Allah, accept). After this, in the first two Rakahs of Fard prayers, recite any other portion or Surah of the Quran.",
        variations: {
            hanafi: "Say 'Ameen' silently. The congregation does not recite Al-Fatiha behind the Imam.",
            shafi: "Say 'Ameen' aloud in loud prayers. The congregation must recite Al-Fatiha silently during the silence of the Imam.",
            maliki: "Say 'Ameen' silently. Recite behind the Imam only in silent prayers.",
            hanbali: "Say 'Ameen' aloud in loud prayers. Recitation behind the Imam is recommended in silent prayers."
        }
    },
    {
        step: 4,
        title: "Ruku (Bowing)",
        description: "Say 'Allahu Akbar' and bow down. Place your hands on your knees with fingers spread, keeping your back straight and parallel to the floor, looking down at the place of prostration.",
        arabic: "سُبْحَانَ رَبِّيَ الْعَظِيمِ",
        transliteration: "Subhana Rabbiyal Azeem",
        meaning: "Glory be to my Lord, the Magnificent",
        count: "3 times (or any odd number up to 7 or 9)",
        variations: {
            hanafi: "Raise hands (Raf-al-Yadayn) only at the start of prayer, not before bowing.",
            shafi: "Raise hands to shoulder level (Raf-al-Yadayn) before bowing down.",
            maliki: "Raising hands before bowing is a recommended optional Sunnah.",
            hanbali: "Raise hands to shoulder level or earlobes (Raf-al-Yadayn) before bowing down."
        }
    },
    {
        step: 5,
        title: "Rising from Ruku (I'tidal)",
        description: "Rise up from bowing to a fully standing position. Stand straight and calm.",
        arabic: "سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ. رَبَّنَا وَلَكَ الْحَمْدُ حَمْدًا كَثِيرًا طَيِّبًا مُبَارَكًا فِيهِ",
        transliteration: "Sami' Allahu liman hamidah. Rabbana wa lakal-hamd, hamdan kathiran tayyiban mubarakan fih.",
        meaning: "Allah hears those who praise Him. Our Lord, and to You is all praise, a praise that is abundant, beautiful, and full of blessings.",
        variations: {
            hanafi: "Do not raise hands when rising from bowing. Stand with hands at your sides.",
            shafi: "Raise hands to shoulder level when rising. Keep hands at your sides or on your chest.",
            maliki: "Stand with hands at your sides. Raising hands is optional.",
            hanbali: "Raise hands to shoulder level or earlobes when rising. Stand with hands at your sides or on your chest."
        }
    },
    {
        step: 6,
        title: "First Sujood (Prostration)",
        description: "Proclaim 'Allahu Akbar' and go down into prostration. Ensure seven body parts touch the ground: forehead & nose, two palms, two knees, and the toes of both feet. Keep your elbows away from your sides and off the floor.",
        arabic: "سُبْحَانَ رَبِّيَ الْأَعْلَى",
        transliteration: "Subhana Rabbiyal A'la",
        meaning: "Glory be to my Lord, the Most High",
        count: "3 times (or any odd number)",
        instruction: "Ensure the toes are pointing forward towards the Qibla."
    },
    {
        step: 7,
        title: "Sitting between Two Sujoods (Jalsah)",
        description: "Rise from Sujood saying 'Allahu Akbar' and sit down calmly on your left foot with your right foot upright, placing your hands on your thighs near the knees.",
        arabic: "رَبِّ اغْفِرْ لِي، رَبِّ اغْفِرْ لِي",
        transliteration: "Rabbighfir li, Rabbighfir li",
        meaning: "My Lord forgive me, My Lord forgive me",
        instruction: "Achieve complete tranquility in this sitting posture before going for the second prostration."
    },
    {
        step: 8,
        title: "Second Sujood",
        description: "Proclaim 'Allahu Akbar' and perform the second prostration exactly like the first one, repeating the glorification.",
        arabic: "سُبْحَانَ رَبِّيَ الْأَعْلَى",
        transliteration: "Subhana Rabbiyal A'la",
        meaning: "Glory be to my Lord, the Most High",
        count: "3 times (or any odd number)"
    },
    {
        step: 9,
        title: "Tashahhud (Sitting)",
        description: "In the second and final Rak'ah, sit down after the second Sujood to recite the Tashahhud testimony. Sit flat on the left foot (Iftirash) or on the ground with feet to the right (Tawarruk in final Rak'ah).",
        arabic: "التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ، السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ، السَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ. أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ",
        transliteration: "At-tahiyyatu lillahi was-salawatu wat-tayyibatu, as-salamu 'alayka ayyuhan-Nabiyyu wa rahmatullahi wa barakatuhu, as-salamu 'alayna wa 'ala 'ibadillahis-salihin. Ash-hadu an la ilaha illallahu, wa ash-hadu anna Muhammadan 'abduhu wa rasuluh.",
        meaning: "All compliments, prayers, and pure words are due to Allah. Peace be upon you, O Prophet, and the mercy of Allah and His blessings. Peace be upon us and upon the righteous servants of Allah. I bear witness that there is no god but Allah, and I bear witness that Muhammad is His servant and Messenger.",
        instruction: "Point your right index finger to testify the oneness of Allah.",
        variations: {
            hanafi: "Raise the index finger when saying 'La ilaha' (No god) and lower it when saying 'ill-Allah' (except Allah).",
            shafi: "Raise the index finger at 'ill-Allah' and keep it pointed and still until standing or finishing.",
            maliki: "Move the index finger gently from side to side continuously throughout the recitation.",
            hanbali: "Point the index finger every time the name 'Allah' is mentioned, without moving it otherwise."
        }
    },
    {
        step: 10,
        title: "Durood Ibrahim (Blessings on the Prophet)",
        description: "Recite the Durood Ibrahim immediately following the Tashahhud in the final sitting unit of the prayer.",
        arabic: "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ. اللَّهُمَّ بَارِكْ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ",
        transliteration: "Allahumma salli 'ala Muhammadin wa 'ala ali Muhammadin, kama sallayta 'ala Ibrahima wa 'ala ali Ibrahima, innaka Hamidun Majid. Allahumma barik 'ala Muhammadin wa 'ala ali Muhammadin, kama barakta 'ala Ibrahima wa 'ala ali Ibrahima, innaka Hamidun Majid.",
        meaning: "O Allah, send prayers upon Muhammad and upon the family of Muhammad, as You sent prayers upon Abraham and upon the family of Abraham; indeed, You are Praiseworthy, Full of Glory. O Allah, send blessings upon Muhammad and upon the family of Muhammad, as You sent blessings upon Abraham and upon the family of Abraham; indeed, You are Praiseworthy, Full of Glory."
    },
    {
        step: 11,
        title: "Taslim (Salam - Concluding)",
        description: "Turn your face to the right, looking over your shoulder, and say the Salam. Then turn your face to the left and repeat it to complete your prayer.",
        arabic: "السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ",
        transliteration: "As-salamu 'alaykum wa rahmatullah",
        meaning: "Peace and blessings of Allah be upon you",
        variations: {
            hanafi: "Both Salams are mandatory to fully exit the prayer.",
            shafi: "The first Salam to the right is the pillar that exits prayer; the second is a highly recommended Sunnah.",
            maliki: "Reciting one Salam to the front/right is sufficient, though two is common.",
            hanbali: "Both Salams are absolute obligatory pillars in Fard prayers."
        }
    }
];

export type RakahType = 'Sunnah Muakkadah' | 'Sunnah Ghair Muakkadah' | 'Fard' | 'Nafl' | 'Witr';

export interface PrayerStructure {
    name: string;
    rakahs: { type: RakahType; count: number }[];
}

export const prayerStructures: PrayerStructure[] = [
    {
        name: "Fajr",
        rakahs: [
            { type: 'Sunnah Muakkadah', count: 2 },
            { type: 'Fard', count: 2 }
        ]
    },
    {
        name: "Dhuhr",
        rakahs: [
            { type: 'Sunnah Muakkadah', count: 4 },
            { type: 'Fard', count: 4 },
            { type: 'Sunnah Muakkadah', count: 2 },
            { type: 'Nafl', count: 2 }
        ]
    },
    {
        name: "Asr",
        rakahs: [
            { type: 'Sunnah Ghair Muakkadah', count: 4 },
            { type: 'Fard', count: 4 }
        ]
    },
    {
        name: "Maghrib",
        rakahs: [
            { type: 'Fard', count: 3 },
            { type: 'Sunnah Muakkadah', count: 2 },
            { type: 'Nafl', count: 2 }
        ]
    },
    {
        name: "Isha",
        rakahs: [
            { type: 'Sunnah Ghair Muakkadah', count: 4 },
            { type: 'Fard', count: 4 },
            { type: 'Sunnah Muakkadah', count: 2 },
            { type: 'Nafl', count: 2 },
            { type: 'Witr', count: 3 },
            { type: 'Nafl', count: 2 }
        ]
    }
];

export const recitationRules = {
    fard: [
        "1st & 2nd Rakah: Surah Al-Fatiha + Another Surah",
        "3rd & 4th Rakah: Surah Al-Fatiha Only (Silent)"
    ],
    sunnah: "All Rakahs: Surah Al-Fatiha + Another Surah",
    nafl: "All Rakahs: Surah Al-Fatiha + Another Surah"
};

export const shortSurahs = [
    {
        name: "Surah Al-Ikhlas (The Sincerity)",
        arabic: "قُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ",
        transliteration: "Qul huwallahu ahad. Allahus-samad. Lam yalid wa lam yulad. Wa lam yakul-lahu kufuwan ahad.",
        meaning: "Say, 'He is Allah, [who is] One. Allah, the Eternal Refuge. He neither begets nor is born. Nor is there to Him any equivalent.'"
    },
    {
        name: "Surah Al-Kawthar (The Abundance)",
        arabic: "إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ ۝ فَصَلِّ لِرَبِّكَ وَانْحَرْ ۝ إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ",
        transliteration: "Inna a'taynakal-kawthar. Fasalli li-Rabbika wanhar. Inna shani'aka huwal-abtar.",
        meaning: "Indeed, We have granted you, [O Muhammad], al-Kawthar. So pray to your Lord and sacrifice [to Him alone]. Indeed, your enemy is the one cut off."
    },
    {
        name: "Surah Al-Asr (The Declining Day)",
        arabic: "وَالْعَصْرِ ۝ إِنَّ الْإِنسَانَ لَفِي خُسْرٍ ۝ إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ وَتَوَاصَوْا بِالْحَقِّ وَتَوَاصَوْا بِالصَّبْرِ",
        transliteration: "Wal-'asr. Inna-l-insana lafi khusr. Illa-ladhina amanu wa 'amilu-s-salihati wa tawasa bil-haqqi wa tawasa bis-sabr.",
        meaning: "By time. Indeed, mankind is in loss. Except for those who have believed and done righteous deeds and advised each other to truth and advised each other to patience."
    }
];

