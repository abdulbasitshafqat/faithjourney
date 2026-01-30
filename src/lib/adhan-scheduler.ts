import { LocalNotifications } from '@capacitor/local-notifications';
import { Preferences } from '@capacitor/preferences';

// Mock prayer times calculation for 10 days (In real app, import from aladhan or calculation lib)
// For this MVP, we will schedule a test notification and structure the logic.

export const scheduleAdhan = async () => {
    // 1. Request Permissions
    const perm = await LocalNotifications.requestPermissions();
    if (perm.display !== 'granted') return;

    // 2. Clear Existing
    const pending = await LocalNotifications.getPending();
    if (pending.notifications.length > 0) {
        await LocalNotifications.cancel(pending);
    }

    // 3. Define Adhan times (Mock for demo: 10 seconds from now)
    const now = new Date();
    const adhanTime = new Date(now.getTime() + 10000); // 10s from now

    // 4. Schedule
    await LocalNotifications.schedule({
        notifications: [
            {
                title: "Asr Prayer",
                body: "It is time for Asr. Hayya 'alas-salah.",
                id: 1,
                schedule: { at: adhanTime },
                sound: "adhan", // res/raw/adhan.mp3 (Android)
                channelId: "adhan-channel",
                actionTypeId: "",
                extra: null
            }
        ]
    });

    console.log("Adhan Scheduled for: " + adhanTime.toString());
};

export const createAdhanChannel = async () => {
    // Create high-importance channel for Android
    await LocalNotifications.createChannel({
        id: 'adhan-channel',
        name: 'Adhan Alerts',
        description: 'Plays the full Adhan for prayer times',
        importance: 5, // High
        visibility: 1, // Public
        sound: 'adhan',
        // Capacitor docs say: "filename of the sound file in the res/raw directory without the extension"
        vibration: true,
    });
};
