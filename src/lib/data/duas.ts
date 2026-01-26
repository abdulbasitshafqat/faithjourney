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
    ...otherAzkaar
];
