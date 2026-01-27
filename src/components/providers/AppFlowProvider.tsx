"use client";

import { useEffect } from 'react';
import { App } from '@capacitor/app';
import { useRouter, usePathname } from 'next/navigation';
import { Toast } from '@capacitor/toast';
import { LocalNotifications } from '@capacitor/local-notifications';
import { dailyAyats } from '@/lib/data/daily-ayats';
import { duasData } from '@/lib/data/duas';

export default function AppFlowProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();

    // Scroll to top on route change to ensure pages start from the top
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, [pathname]);

    useEffect(() => {
        let lastBackPress = 0;

        const backButtonListener = App.addListener('backButton', async () => {
            const now = Date.now();

            // If on homepage, handle exit confirmation
            if (pathname === '/') {
                if (now - lastBackPress < 2000) {
                    App.exitApp();
                } else {
                    lastBackPress = now;
                    await Toast.show({
                        text: 'Press back again to exit',
                        duration: 'short',
                        position: 'bottom'
                    });
                }
            } else {
                // Otherwise navigate back
                router.back();
            }
        });

        const scheduleDailyAyat = async () => {
            try {
                const perm = await LocalNotifications.checkPermissions();
                if (perm.display !== 'granted') {
                    await LocalNotifications.requestPermissions();
                }

                const pending = await LocalNotifications.getPending();
                const hasDaily = pending.notifications.some(n => n.id === 88888);

                if (!hasDaily) {
                    const ayat = dailyAyats[Math.floor(Math.random() * dailyAyats.length)];
                    const scheduleDate = new Date();
                    scheduleDate.setHours(9);
                    scheduleDate.setMinutes(0);
                    if (scheduleDate <= new Date()) scheduleDate.setDate(scheduleDate.getDate() + 1);

                    await LocalNotifications.schedule({
                        notifications: [{
                            title: "Daily Verse",
                            body: `"${ayat.text}" - ${ayat.reference}`,
                            id: 88888,
                            schedule: { at: scheduleDate, every: 'day', allowWhileIdle: true }
                        }]
                    });
                }
            } catch (error) {
                console.error("Error scheduling daily ayat:", error);
            }
        };

        const scheduleDailyDua = async () => {
            try {
                const pending = await LocalNotifications.getPending();
                const hasDailyDua = pending.notifications.some(n => n.id === 99999);

                if (!hasDailyDua) {
                    const today = new Date();
                    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
                    const dua = duasData[dayOfYear % duasData.length];

                    const scheduleDate = new Date();
                    scheduleDate.setHours(20); // 8 PM
                    scheduleDate.setMinutes(0);
                    if (scheduleDate <= new Date()) scheduleDate.setDate(scheduleDate.getDate() + 1);

                    await LocalNotifications.schedule({
                        notifications: [{
                            title: "Daily Dua",
                            body: `${dua.translations.en}`,
                            id: 99999,
                            schedule: { at: scheduleDate, every: 'day', allowWhileIdle: true }
                        }]
                    });

                }
            } catch (error) {
                console.error("Error scheduling daily dua:", error);
            }
        };

        scheduleDailyAyat();
        scheduleDailyDua();

        return () => {
            backButtonListener.then(listener => listener.remove());
        };
    }, [pathname, router]);

    return <>{children}</>;
}
