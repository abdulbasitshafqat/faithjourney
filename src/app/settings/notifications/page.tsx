"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, Volume2, PlayCircle, Settings, CheckCircle, Sunrise, Sun, Sunset, Moon, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { scheduleAdhan, createAdhanChannel } from "@/lib/adhan-scheduler";
import { toast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import { LocalNotifications } from "@capacitor/local-notifications";

export default function NotificationSettingsPage() {
    const [isScheduling, setIsScheduling] = useState(false);
    const [channelCreated, setChannelCreated] = useState(false);

    // Individual notification states
    const [preferences, setPreferences] = useState({
        Fajr: true,
        Dhuhr: true,
        Asr: true,
        Maghrib: true,
        Isha: true,
        dailyAyat: true,
        dailyDua: true,
    });

    useEffect(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("fj_notification_preferences");
            if (saved) {
                try {
                    setPreferences(JSON.parse(saved));
                } catch (e) {
                    console.error("Failed to load notification preferences", e);
                }
            }
        }
    }, []);

    const savePreference = async (key: keyof typeof preferences, value: boolean) => {
        const updated = { ...preferences, [key]: value };
        setPreferences(updated);
        localStorage.setItem("fj_notification_preferences", JSON.stringify(updated));

        // If toggling off, cancel matching notifications
        if (!value) {
            try {
                const pending = await LocalNotifications.getPending();
                const toCancel = pending.notifications.filter(
                    n => n.extra?.prayerName === key || (key === 'dailyAyat' && n.id === 88888) || (key === 'dailyDua' && n.id === 99999)
                );
                if (toCancel.length > 0) {
                    await LocalNotifications.cancel({ notifications: toCancel });
                }
                toast({
                    title: "Alert Disabled",
                    description: `Notifications for ${key === 'dailyAyat' ? 'Daily Ayat' : key === 'dailyDua' ? 'Daily Dua' : key} turned off.`,
                });
            } catch (e: any) {
                console.error("Failed to cancel notification", e);
            }
        } else {
            // Toggling on, request permission & let user know it will schedule on next refresh/load
            try {
                const perm = await LocalNotifications.requestPermissions();
                if (perm.display === 'granted') {
                    toast({
                        title: "Alert Enabled",
                        description: `Notifications for ${key === 'dailyAyat' ? 'Daily Ayat' : key === 'dailyDua' ? 'Daily Dua' : key} will sync shortly.`,
                    });
                }
            } catch (e: any) {
                console.error(e);
            }
        }
    };

    const handleSetup = async () => {
        try {
            await createAdhanChannel();
            setChannelCreated(true);
            toast({
                title: "Android Channel Created",
                description: "High priority Adhan channel registered.",
            });
        } catch (e: any) {
            toast({
                title: "Error",
                description: e.message || "Failed to create channel",
                variant: 'destructive',
            });
        }
    };

    const handleTest = async () => {
        setIsScheduling(true);
        try {
            await scheduleAdhan();
            toast({
                title: "Adhan Scheduled",
                description: "Test notification in 10 seconds. Minimize the app!",
            });
        } catch (e: any) {
            toast({
                title: "Scheduling Failed",
                description: e.message,
                variant: 'destructive',
            });
        } finally {
            setIsScheduling(false);
        }
    };

    const prayerConfig = [
        { key: "Fajr" as const, name: "Fajr", icon: Moon, color: "text-blue-900" },
        { key: "Dhuhr" as const, name: "Dhuhr", icon: Sun, color: "text-cyan-500" },
        { key: "Asr" as const, name: "Asr", icon: Sun, color: "text-amber-500" },
        { key: "Maghrib" as const, name: "Maghrib", icon: Sunset, color: "text-orange-600" },
        { key: "Isha" as const, name: "Isha", icon: Moon, color: "text-indigo-950" },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-[#fafaf9] dark:bg-[#0c0c0b] font-sans">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-24 md:py-32">
                <div className="max-w-2xl mx-auto space-y-8">
                    
                    {/* Header Reflection */}
                    <div className="text-center space-y-4">
                        <div className="w-16 h-16 bg-primary/10 rounded-[1.5rem] mx-auto flex items-center justify-center border border-primary/10 shadow-xl">
                            <Bell className="h-8 w-8 text-primary" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-serif font-black text-primary tracking-tight">Notification Center</h1>
                        <p className="text-muted-foreground text-base max-w-lg mx-auto font-medium">
                            Choose exactly which reminders keep you connected to your spiritual routine throughout the day.
                        </p>
                    </div>

                    {/* Prayer Notifications Settings */}
                    <Card className="border-primary/5 rounded-[2.5rem] bg-white/70 dark:bg-white/[0.02] backdrop-blur-2xl shadow-xl overflow-hidden">
                        <CardHeader className="pb-4">
                            <CardTitle className="flex items-center gap-3 font-serif text-2xl font-black text-primary">
                                <Volume2 className="h-6 w-6 text-primary" />
                                Adhan & Prayer Reminders
                            </CardTitle>
                            <CardDescription className="text-sm font-medium text-muted-foreground mt-1">
                                Customize notification alerts for each individual prayer time.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {prayerConfig.map((p) => (
                                <div 
                                    key={p.key} 
                                    className="flex items-center justify-between p-4 bg-muted/20 hover:bg-muted/45 rounded-2xl border border-primary/5 transition-all duration-300"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`p-3 rounded-xl bg-white dark:bg-white/5 shadow-sm ${p.color}`}>
                                            <p.icon className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-foreground">{p.name} Prayer</h3>
                                            <p className="text-xs text-muted-foreground font-medium">Plays authentic adhan notification audio.</p>
                                        </div>
                                    </div>
                                    <Switch 
                                        checked={preferences[p.key]} 
                                        onCheckedChange={(val) => savePreference(p.key, val)}
                                    />
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Daily Reminders Settings */}
                    <Card className="border-primary/5 rounded-[2.5rem] bg-white/70 dark:bg-white/[0.02] backdrop-blur-2xl shadow-xl overflow-hidden">
                        <CardHeader className="pb-4">
                            <CardTitle className="flex items-center gap-3 font-serif text-2xl font-black text-primary">
                                <Sparkles className="h-6 w-6 text-secondary" />
                                Spiritual Reflections
                            </CardTitle>
                            <CardDescription className="text-sm font-medium text-muted-foreground mt-1">
                                Receive daily verses and supplications to nourish your heart.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-muted/20 hover:bg-muted/45 rounded-2xl border border-primary/5 transition-all duration-300">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-xl bg-white dark:bg-white/5 shadow-sm text-secondary">
                                        <Sparkles className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-foreground">Verse of the Day</h3>
                                        <p className="text-xs text-muted-foreground font-medium">Daily morning wisdom from the Holy Quran.</p>
                                    </div>
                                </div>
                                <Switch 
                                    checked={preferences.dailyAyat} 
                                    onCheckedChange={(val) => savePreference("dailyAyat", val)}
                                />
                            </div>

                            <div className="flex items-center justify-between p-4 bg-muted/20 hover:bg-muted/45 rounded-2xl border border-primary/5 transition-all duration-300">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-xl bg-white dark:bg-white/5 shadow-sm text-secondary">
                                        <Sparkles className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-foreground">Daily Supplication</h3>
                                        <p className="text-xs text-muted-foreground font-medium">Daily evening selected Dua reminder.</p>
                                    </div>
                                </div>
                                <Switch 
                                    checked={preferences.dailyDua} 
                                    onCheckedChange={(val) => savePreference("dailyDua", val)}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Developer & Native Settings (Capacitor Debugging) */}
                    <Card className="border-primary/5 rounded-[2.5rem] bg-white/70 dark:bg-white/[0.02] backdrop-blur-2xl shadow-xl overflow-hidden">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3 font-serif text-2xl font-black text-primary">
                                <Settings className="h-6 w-6 text-primary" />
                                Hardware & Testing
                            </CardTitle>
                            <CardDescription className="text-sm font-medium text-muted-foreground mt-1">
                                Technical setup for Capacitor mobile devices.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-muted/20 rounded-2xl border border-primary/5">
                                <div>
                                    <h3 className="font-bold text-foreground">1. Setup Channel (Android)</h3>
                                    <p className="text-xs text-muted-foreground font-medium">Required for custom sounds to play in background.</p>
                                </div>
                                <Button
                                    onClick={handleSetup}
                                    disabled={channelCreated}
                                    variant={channelCreated ? "secondary" : "default"}
                                    className="rounded-xl font-bold h-11 px-5 shadow-sm"
                                >
                                    {channelCreated ? <CheckCircle className="h-4 w-4 mr-2" /> : null}
                                    {channelCreated ? "Ready" : "Initialize"}
                                </Button>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-muted/20 rounded-2xl border border-primary/5">
                                <div>
                                    <h3 className="font-bold text-foreground">2. Test Notification Alerts</h3>
                                    <p className="text-xs text-muted-foreground font-medium">Schedules a sample Adhan 10s from now.</p>
                                </div>
                                <Button
                                    onClick={handleTest}
                                    disabled={isScheduling}
                                    className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold h-11 px-5 shadow-lg shadow-emerald-500/10"
                                >
                                    {isScheduling ? "Scheduling..." : "Run Test"}
                                    <PlayCircle className="h-4 w-4 ml-2 animate-pulse" />
                                </Button>
                            </div>

                            <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-xs text-amber-800 dark:text-amber-200 leading-relaxed font-medium">
                                <span className="font-bold block mb-1">Important Android/iOS instruction:</span>
                                For this to work efficiently with high-priority audio alerts, ensure you have placed an <code>adhan.mp3</code> file in <code>android/app/src/main/res/raw/</code> and rebuilt the app binary.
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
            <Footer />
        </div>
    );
}
