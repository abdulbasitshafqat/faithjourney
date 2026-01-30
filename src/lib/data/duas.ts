import { morningAzkaar } from './azkaar/morning';
import { eveningAzkaar } from './azkaar/evening';
import { otherAzkaar } from './azkaar/others';

export type Dua = {
    id: string;
    category_id: string;
    arabic_text: string;
    transliteration: string;
    translations: {
        en: string;
        ur: string;
    };
    reference: string;
    repeat_count: number;
    virtue?: string;
    audio_url?: string;
};

export const duaCategories = {
    "morning": "Morning Supplications (صبح کے اذکار)",
    "evening": "Evening Supplications (شام کے اذکار)",
    "after_salah": "After Salah (نماز کے بعد)",
    "witr": "Witr (وتر)",
    "sleeping": "Sleeping (سوتے وقت)",
    "waking": "Waking Up (بیدار ہوتے وقت)",
    "travel": "Travelling (سفر کی دعا)",
    "distress": "Distress & Sorrow (رنج و غم)",
    "protection": "Protection (حفاظت کی دعائیں)",
    "protection_night": "Night Protection (رات کی حفاظت)",
    "bad_dream": "Bad Dreams (برے خواب)",
    "evil_whisperings": "Evil Whisperings (وسوسے)",
    "evil_eye": "Evil Eye (نظر بد)",
    "black_magic": "Black Magic (جادو)",
    "jinns_shaitan": "Jinns & Shaitan (جنات اور شیطان)",
    "enemies": "Enemies (دشمن سے حفاظت)",
    "healing": "Healing (شفا)",
    "healing_collection": "Healing Collection (آیات شفا)",
    "graveyard": "Graveyard (قبرستان)",
    "forgiveness": "Forgiveness (بخشش)",
    "accepted": "Accepted Duas (مقبول دعائیں)",
    "divine_counsel": "Divine Counsel (ہدایت و رہنمائی)",
    "tranquility": "Tranquility (سکون قلب)"
};

export const duasData: Dua[] = [
    ...morningAzkaar,
    ...eveningAzkaar,
    ...otherAzkaar,
    {
        id: "qunoot-witr",
        category_id: "witr",
        arabic_text: "اللَّهُمَّ اهْدِنِي فِيمَنْ هَدَيْتَ، وَعَافِنِي فِيمَنْ عَافَيْتَ، وَتَوَلَّنِي فِيمَنْ تَوَلَّيْتَ، وَبَارِكْ لِي فِيمَا أَعْطَيْتَ، وَقِنِي شَرَّ مَا قَضَيْتَ، فَإِنَّكَ تَقْضِي وَلَا يُقْضَى عَلَيْكَ، إِنَّهُ لَا يَذِلُّ مَنْ وَالَيْتَ، [وَلَا يَعِزُّ مَنْ عَادَيْتَ]، تَبَارَكْتَ رَبَّنَا وَتَعَالَيْتَ",
        transliteration: "Allahumma-hdini fiman hadayt, wa 'afini fiman 'afayt, wa tawallani fiman tawallayt, wa barik li fima a'tayt, wa qini sharra ma qadayt, fa-innaka taqdi wa la yuqda 'alayk, innahu la yadhillu man walayt, [wa la ya'izzu man 'adayt], tabarakta Rabbana wa ta'alayt.",
        translations: {
            en: "O Allah, guide me with those whom You have guided, and grant me well-being with those whom You have granted well-being, and take me to Your care with those whom You have taken to Your care, and bless me in what You have given, and protect me from the evil of what You have decreed. Surely, You decree and are not decreed upon; indeed, he whom You take as an ally is not humbled [and he whom You take as an enemy is not honored]. Blessed are You, our Lord, and Exalted.",
            ur: "اے اللہ! مجھے ہدایت دے ان لوگوں میں جنہیں تو نے ہدایت دی، اور مجھے عافیت دے ان لوگوں میں جنہیں تو نے عافیت دی، اور میرا والی بن جا ان لوگوں میں جن کا تو والی بنا، اور میرے لیے برکت دے اس میں جو تو نے عطا کیا، اور مجھے اس چیز کے شر سے بچا جس کا تو نے فیصلہ کیا، بے شک تو فیصلہ کرتا ہے اور تیرے خلاف فیصلہ نہیں کیا جاتا، یقیناً جسے تو دوست رکھے وہ ذلیل نہیں ہوتا [اور جس سے تو دشمنی رکھے وہ عزت نہیں پاتا]، اے ہمارے رب! تو برکت والا ہے اور بلند ہے۔"
        },
        reference: "Hisn al-Muslim / Abu Dawud, Tirmidhi",
        repeat_count: 1,
        virtue: "Recited in the Witr prayer after bowing (Ruku') or before it."
    }
];
