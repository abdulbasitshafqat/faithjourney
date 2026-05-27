"use client";

import { useEffect } from 'react';
import { App } from '@capacitor/app';
import { useRouter, usePathname } from 'next/navigation';
import { Toast } from '@capacitor/toast';
import { LocalNotifications } from '@capacitor/local-notifications';
import { dailyAyats } from '@/lib/data/daily-ayats';
import { duasData } from '@/lib/data/duas';
import { useWebMCP } from '@/hooks/useWebMCP';
import { supabase } from '@/lib/supabase';

export default function AppFlowProvider({ children }: { children: React.ReactNode }) {
    useWebMCP();
    const router = useRouter();
    const pathname = usePathname();

    // Scroll to top on route change to ensure pages start from the top
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, [pathname]);

    useEffect(() => {
        let lastBackPress = 0;

        const appUrlOpenListener = App.addListener('appUrlOpen', async (data: { url: string }) => {
            try {
                const urlStr = data.url;
                if (!urlStr) return;

                console.log("App opened with deep link URL:", urlStr);

                // Replace scheme with a parseable URL scheme for URL parsing
                // Since data.url could be com.faithjourney.pro://auth/callback?code=...
                // we can convert it to https://faithjourney.pro/auth/callback?code=... for standard URL parsing
                const normalizedUrl = new URL(urlStr.replace('com.faithjourney.pro://', 'https://faithjourney.pro/'));
                
                const code = normalizedUrl.searchParams.get('code');
                if (code) {
                    const { error } = await supabase.auth.exchangeCodeForSession(code);
                    if (error) throw error;
                    router.push('/');
                    return;
                }

                // Handle hash parameters (implicit grant)
                const hash = normalizedUrl.hash;
                if (hash) {
                    const params = new URLSearchParams(hash.substring(1));
                    const access_token = params.get('access_token');
                    const refresh_token = params.get('refresh_token');
                    if (access_token && refresh_token) {
                        const { error } = await supabase.auth.setSession({
                            access_token,
                            refresh_token
                        });
                        if (error) throw error;
                        router.push('/');
                    }
                }
            } catch (err: unknown) {
                console.error("Deep link auth error:", err instanceof Error ? err.message : err);
            }
        });

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
                let isEnabled = true;
                if (typeof window !== "undefined") {
                    const saved = localStorage.getItem("fj_notification_preferences");
                    if (saved) {
                        isEnabled = JSON.parse(saved).dailyAyat !== false;
                    }
                }

                const pending = await LocalNotifications.getPending();
                const dailyNotification = pending.notifications.find(n => n.id === 88888);

                if (!isEnabled) {
                    if (dailyNotification) {
                        await LocalNotifications.cancel({ notifications: [dailyNotification] });
                    }
                    return;
                }

                const perm = await LocalNotifications.checkPermissions();
                if (perm.display !== 'granted') {
                    await LocalNotifications.requestPermissions();
                }

                if (!dailyNotification) {
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
                let isEnabled = true;
                if (typeof window !== "undefined") {
                    const saved = localStorage.getItem("fj_notification_preferences");
                    if (saved) {
                        isEnabled = JSON.parse(saved).dailyDua !== false;
                    }
                }

                const pending = await LocalNotifications.getPending();
                const dailyDuaNotification = pending.notifications.find(n => n.id === 99999);

                if (!isEnabled) {
                    if (dailyDuaNotification) {
                        await LocalNotifications.cancel({ notifications: [dailyDuaNotification] });
                    }
                    return;
                }

                if (!dailyDuaNotification) {
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
            appUrlOpenListener.then(listener => listener.remove());
        };
    }, [pathname, router]);

    return <>{children}</>;
}
