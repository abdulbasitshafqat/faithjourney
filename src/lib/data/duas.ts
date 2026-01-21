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
    "morning": "Morning Supplications",
    "evening": "Evening Supplications",
    "after_salah": "After Salah",
    "sleeping": "Sleeping",
    "waking": "Supplications for Waking Up",
    "travel": "Supplications for Travelling",
    "distress": "Relief from Sorrow and Distress",
    "protection": "Supplications for Protection",
    "protection_night": "Protection During the Night",
    "bad_dream": "After a Bad Dream",
    "evil_whisperings": "For Warding Off Evil Whisperings",
    "evil_eye": "For Warding Off Evil-Eye",
    "black_magic": "Protection Against Black Magic",
    "jinns_shaitan": "Protection Against Jinns and Shaitan",
    "enemies": "Protection from Enemies",
    "healing": "Supplication for Healing",
    "healing_collection": "Supplications for Healing (Collection)",
    "graveyard": "Visiting the Graveyard",
    "forgiveness": "Supplications for Forgiveness",
    "accepted": "Accepted Supplications",
    "divine_counsel": "Seeking Divine Counsel",
    "tranquility": "Ayaat of Tranquility"
};

export const duasData: Dua[] = [
    ...morningAzkaar,
    ...eveningAzkaar,
    ...otherAzkaar
];
