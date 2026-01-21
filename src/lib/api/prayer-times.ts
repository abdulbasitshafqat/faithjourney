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
                name: string;
            };
        };
    };
}

export async function getPrayerTimes(
    latitude: number,
    longitude: number,
    method: number = 2 // ISNA by default, can be parameterized
): Promise<PrayerTimesResponse> {
    const date = new Date();
    const timestamp = Math.floor(date.getTime() / 1000);

    const response = await fetch(
        `https://api.aladhan.com/v1/timings/${timestamp}?latitude=${latitude}&longitude=${longitude}&method=${method}`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch prayer times");
    }

    return response.json();
}
