
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
    description: "Step-by-step guide to performing Hajj, the fifth pillar of Islam, in accordance with the authentic Sunnah.",
    days: [
        {
            day: "8th Dhul-Hijjah",
            title: "Entering Ihram & Mina (Day of Tarwiyah)",
            steps: [
                "Purify yourself (perform Ghusl/bath, trim nails, remove unwanted hair).",
                "Assume the state of Ihram from your place of residence in Makkah. Men wear two white seamless sheets; women wear modest clothing of their choice, keeping their faces and hands uncovered.",
                "Make the sincere intention for Hajj: recite 'Labbayk Allahumma Hajjah' (Here I am, O Allah, for Hajj).",
                "Travel to the valley of Mina. Recite the Talbiyah frequently along the way.",
                "Perform Dhuhr, Asr, Maghrib, Isha, and Fajr (of the 9th day) in Mina. All prayers are shortened (Qasr - 4 Rakahs reduced to 2) but not combined; pray each at its designated time.",
                "Spend the night in Mina. This is a highly recommended established Sunnah."
            ]
        },
        {
            day: "9th Dhul-Hijjah",
            title: "Arafah & Muzdalifah (Day of Wuquf & Muzdalifah)",
            steps: [
                "Travel to Arafah after sunrise on the 9th of Dhul-Hijjah.",
                "Wuquf (standing) in Arafah is the grandest pillar of Hajj. The Prophet (ﷺ) said: 'Hajj is Arafah.' Seek forgiveness and make intense dua with hands raised.",
                "Listen to the Hajj sermon at Masjid Namirah (if possible).",
                "Pray Dhuhr and Asr combined and shortened (2 Rakahs each) in Arafah during the time of Dhuhr (Jam'a Taqdeem) with one Adhan and two Iqamahs.",
                "Spend the entire afternoon in constant remembrance of Allah (Dhikr) and supplication until sunset.",
                "Depart for Muzdalifah immediately after sunset without praying Maghrib in Arafah.",
                "Upon reaching Muzdalifah, pray Maghrib (3 Rakahs) and Isha (shortened to 2 Rakahs) combined at Isha time (Jam'a Ta'kheer) with one Adhan and two Iqamahs.",
                "Collect pebbles (approx. 49 to 70 small pebbles, size of a chickpea/date-stone) in Muzdalifah for stoning the Jamarat.",
                "Spend the night resting in Muzdalifah, and pray Fajr at its earliest time."
            ],
            dua: {
                arabic: "لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ",
                transliteration: "La ilaha illallahu wahdahu la sharika lah, lahul-mulku wa lahul-hamdu, wa huwa 'ala kulli shay'in qadir.",
                meaning: "There is no god but Allah alone, without partner. To Him belongs sovereignty and to Him belongs praise, and He is over all things omnipotent. (The Prophet ﷺ stated this is the best supplication on the Day of Arafah)."
            }
        },
        {
            day: "10th Dhul-Hijjah",
            title: "Yawm al-Nahr (Day of Sacrifice & Eid Day)",
            steps: [
                "Pray Fajr in Muzdalifah and stand at Al-Mash'ar al-Haram, supplicating earnestly until just before sunrise.",
                "Depart Muzdalifah and travel back to Mina before the sun rises.",
                "Rami (Stoning): Head to Jamarat al-Aqabah (the large pillar) and stone it with 7 pebbles consecutively, proclaiming 'Allahu Akbar' with each throw.",
                "Qurbani (Sacrifice): Slaughter a sacrificial animal (sheep, goat, cow, or camel) or verify that your pre-purchased voucher has been executed.",
                "Halq or Taqsir: Shave the head completely (highly recommended for men) or trim it equally all over. Women cut a fingertip-length from their hair. You now enter 'Tahalul al-Asghar' (first release from Ihram) — all restrictions are lifted except marital relations.",
                "Tawaf al-Ifadah: Travel to Makkah to perform Tawaf al-Ifadah (7 rounds around the Kaaba) and Sa'i (if performing Hajj Tamattu' or if Sa'i was not done with Qiran/Ifrad).",
                "Tahalul al-Akbar: Upon completing Tawaf and Sa'i, all Ihram restrictions are fully lifted, including marital relations. Return to Mina for the night."
            ]
        },
        {
            day: "11th-13th Dhul-Hijjah",
            title: "Days of Tashreeq & Farewell",
            steps: [
                "Spend the nights of the 11th and 12th (and optionally 13th) in Mina.",
                "Rami (Stoning) each day: After the sun passes its zenith (Zawal/midday), stone all three Jamarats in order, starting with the Small (Jamarat al-Sugra), then the Medium (Jamarat al-Wusta), and finally the Large (Jamarat al-Aqabah). Stone each with 7 pebbles, saying 'Allahu Akbar' with each throw.",
                "Supplication: After stoning the Small and Medium Jamarats, stand facing the Qiblah and make long, sincere dua. Do not stand for dua after stoning the Large Jamarat.",
                "Nafar Awwal: You may leave Mina on the 12th before sunset. If sunset catches you in Mina, you must stay for the 13th and stone all three pillars again.",
                "Tawaf al-Wida (Farewell Tawaf): Before leaving Makkah to return home, perform Tawaf al-Wida (7 rounds around the Kaaba) as your absolute final act in Makkah. This is mandatory for all pilgrims except menstruating women."
            ]
        }
    ]
};

export const umrahGuide = {
    title: "Umrah",
    description: "A comprehensive guide to performing the minor pilgrimage (Umrah) in accordance with the authentic Sunnah of the Prophet Muhammad (ﷺ).",
    steps: [
        {
            title: "Ihram & Niyyah (The Intention)",
            description: "Assume the state of Ihram before crossing the designated boundary (Miqat). Perform ghusl, wear the Ihram garments, and make the sincere intention.",
            arabic: "لَبَّيْكَ اللَّهُمَّ عُمْرَةً",
            transliteration: "Labbayk Allahumma Umrah",
            meaning: "Here I am, O Allah, for Umrah",
            instruction: "Proclaim this intention aloud. Once in Ihram, refrain from scented products, clipping nails, cutting hair, or conjugal behavior."
        },
        {
            title: "Talbiyah (The Pilgrim's Call)",
            description: "Recite the Talbiyah frequently from the Miqat until you reach the outer gates of Masjid al-Haram in Makkah.",
            arabic: "لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ لَا شَرِيكَ لَكَ",
            transliteration: "Labbayk Allahumma Labbayk, Labbayka la sharika laka Labbayk. Innal-hamda wan-ni'mata laka wal-mulk, la sharika lak.",
            meaning: "Here I am, O Allah, here I am. Here I am, You have no partner, here I am. Indeed all praise, grace, and sovereignty belong to You. You have no partner.",
            instruction: "Men should recite this loudly; women recite it quietly."
        },
        {
            title: "Entering Masjid al-Haram",
            description: "Enter the sacred sanctuary with your right foot first, reciting the authentic gate-entry supplication.",
            arabic: "بِسْمِ اللَّهِ، وَالصَّلَاةُ وَالسَّلَامُ عَلَى رَسُولِ اللَّهِ. اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ",
            transliteration: "Bismillah, was-salatu was-salamu 'ala Rasulillah. Allahummaftah li abwaba rahmatik.",
            meaning: "In the name of Allah, and peace and blessings be upon the Messenger of Allah. O Allah, open for me the gates of Your mercy.",
            instruction: "Keep your gaze lowered in humility until you face the magnificent Kaaba."
        },
        {
            title: "Tawaf (Circumambulating the Kaaba)",
            description: "Walk around the Kaaba 7 times counter-clockwise, starting from the Black Stone (Hajar al-Aswad). Men should uncover their right shoulder (Idtiba') and jog lightly during the first 3 rounds (Raml) if space permits.",
            arabic: "بِسْمِ اللَّهِ وَاللَّهُ أَكْبَرُ",
            transliteration: "Bismillahi wa Allahu Akbar",
            meaning: "In the name of Allah, and Allah is the Greatest",
            instruction: "Face the Black Stone and point your right hand towards it saying 'Allahu Akbar' to begin each round. Recite any personal dua during the circumambulation. Between the Yemeni Corner (Rukn al-Yamani) and the Black Stone, recite the specific Quranic verse below:",
            specialDua: {
                arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
                transliteration: "Rabbana atina fid-dunya hasanatah wa fil-akhirati hasanatah wa qina 'adhaban-nar.",
                meaning: "Our Lord, give us in this world [that which is] good and in the Hereafter [that which is] good and protect us from the punishment of the Fire. (Surah Al-Baqarah 2:201)"
            }
        },
        {
            title: "Maqam Ibrahim (Two Rakah Prayer)",
            description: "After completing Tawaf, cover your right shoulder and head to the Station of Abraham, reciting the Quranic command, and perform a 2-Rakah Sunnah prayer.",
            arabic: "وَاتَّخِذُوا مِن مَّقَامِ إِبْرَاهِيمَ مُصَلًّى",
            transliteration: "Wattakhidhu min maqami Ibrahima musalla",
            meaning: "And take, [O believers], from the standing place of Abraham a place of prayer. (Surah Al-Baqarah 2:125)",
            instruction: "Pray two short Rakahs behind Maqam Ibrahim (or anywhere in the Haram). Recite Surah Al-Kafirun in the first Rakah and Surah Al-Ikhlas in the second. Drink Zamzam water copiously afterward."
        },
        {
            title: "Sa'i (Walking Safa & Marwah)",
            description: "Perform Sa'i by walking 7 times between the hills of Safa and Marwah, beginning at Safa and ending at Marwah. Approach Safa and recite the Quranic verse.",
            arabic: "إِنَّ الصَّفَا وَالْمَرْوَةَ مِن شَعَائِرِ اللَّهِ... أَبْدَأُ بِمَا بَدَأَ اللَّهُ بِهِ",
            transliteration: "Innas-Safa wal-Marwata min sha'airillah... Abda'u bima bada'allahu bih.",
            meaning: "Indeed, Safa and Marwah are among the symbols of Allah... I begin with that which Allah began with. (Surah Al-Baqarah 2:158)",
            instruction: "Stand on Safa, face the Kaaba, raise your hands, and praise Allah by repeating the following authentic supplication 3 times, making personal dua in between:",
            specialDua: {
                arabic: "لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ. لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ، أَنْجَزَ وَعْدَهُ، وَنَصَرَ عَبْدَهُ، وَهَزَمَ الْأَحْزَابَ وَحْدَهُ",
                transliteration: "La ilaha illallahu wahdahu la sharika lah, lahul-mulku wa lahul-hamdu wa huwa 'ala kulli shay'in qadir. La ilaha illallahu wahdahu, anjaza wa'dahu, wa nasara 'abdahu, wa hazamal-ahzaba wahdah.",
                meaning: "There is no god but Allah alone, without partner. To Him belongs sovereignty and to Him belongs praise, and He is over all things omnipotent. There is no god but Allah alone, He fulfilled His promise, helped His servant, and defeated the factions alone."
            }
        },
        {
            title: "Halq or Taqsir (Exit Ihram)",
            description: "Conclude your Umrah by shaving the head (Halq) or trimming the hair equally (Taqsir).",
            instruction: "Shaving the head (Halq) is highly recommended for men; they may also choose to trim the hair equally all over. Women exit Ihram by gathering their hair and cutting a small portion equal to a fingertip. Your Umrah is now complete and all Ihram prohibitions are lifted."
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
