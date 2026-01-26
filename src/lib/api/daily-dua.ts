import { duasData, Dua } from "@/lib/data/duas";

export function getDuaOfTheDay(): Dua {
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));

    // Use the day of year to select a dua, cycling through the data
    const duaIndex = dayOfYear % duasData.length;
    return duasData[duaIndex];
}

export function getAyatOfTheDay() {
    // Similar logic for verses if needed for consistency
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));

    // Fallback or specific list
    const index = dayOfYear % 7; // Just an example
    return index;
}
