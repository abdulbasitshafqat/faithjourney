export interface PrayerTimes {
    Fajr: string;
    Sunrise: string;
    Dhuhr: string;
    Asr: string;
    Maghrib: string;
    Isha: string;
    [key: string]: string;
}

export interface PrayerTimesResponse {
    code: number;
    status: string;
    data: {
        timings: PrayerTimes;
        date: {
            readable: string;
            timestamp: string;
            hijri: {
                date: string;
                month: {
                    en: string;
                    ar: string;
                };
                year: string;
                day: string;
            };
        };
        meta: {
            method: {
                id: number;
                name: string;
            };
            school: string;
        };
    };
}

export interface CalendarResponse {
    code: number;
    status: string;
    data: PrayerTimesResponse['data'][];
}

export const CALCULATION_METHODS = [
    { id: 1, name: "University of Islamic Sciences, Karachi" },
    { id: 2, name: "Islamic Society of North America (ISNA)" },
    { id: 3, name: "Muslim World League" },
    { id: 4, name: "Umm Al-Qura University, Makkah" },
    { id: 5, name: "Egyptian General Authority of Survey" },
    { id: 7, name: "Institute of Geophysics, University of Tehran" },
    { id: 8, name: "Gulf Region" },
    { id: 9, name: "Kuwait" },
    { id: 10, name: "Qatar" },
    { id: 11, name: "Majlis Ugama Islam Singapura, Singapore" },
    { id: 12, name: "Union Organization islamic de France" },
    { id: 13, name: "Diyanet İşleri Başkanlığı, Turkey" },
    { id: 14, name: "Spiritual Administration of Muslims of Russia" },
    { id: 15, name: "Moonsighting Committee Worldwide" },
];

export async function getPrayerTimes(
    latitude: number,
    longitude: number,
    method: number = 1, // Defaulting to Karachi for better localized accuracy in South Asia
    school: number = 1 // Defaulting to Hanafi
): Promise<PrayerTimesResponse> {
    const date = new Date();
    const timestamp = Math.floor(date.getTime() / 1000);

    const response = await fetch(
        `https://api.aladhan.com/v1/timings/${timestamp}?latitude=${latitude}&longitude=${longitude}&method=${method}&school=${school}`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch prayer times");
    }

    return response.json();
}

export async function getPrayerCalendar(
    latitude: number,
    longitude: number,
    method: number = 1,
    school: number = 1,
    month?: number,
    year?: number
): Promise<CalendarResponse> {
    const date = new Date();
    const targetMonth = month || (date.getMonth() + 1);
    const targetYear = year || date.getFullYear();

    const response = await fetch(
        `https://api.aladhan.com/v1/calendar?latitude=${latitude}&longitude=${longitude}&method=${method}&school=${school}&month=${targetMonth}&year=${targetYear}`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch prayer calendar");
    }

    return response.json();
}
