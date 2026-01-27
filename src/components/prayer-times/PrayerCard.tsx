"use client";

import { useEffect, useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPrayerTimes, getPrayerCalendar, CALCULATION_METHODS } from "@/lib/api/prayer-times";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin, Sunrise, Sun, Sunset, Moon, Bell, BellOff, Volume2, Settings2, Info, ChevronDown, ChevronUp, Clock, Sparkles, PlayCircle, StopCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Geolocation } from '@capacitor/geolocation';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Toast } from '@capacitor/toast';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { adhanOptions } from "@/lib/data/adhan";
import { cn } from "@/lib/utils";

export function PrayerCard() {
    const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [selectedAdhan, setSelectedAdhan] = useState(adhanOptions[0].id);
    const [scheduledPrayers, setScheduledPrayers] = useState<string[]>([]);
    const [method, setMethod] = useState(1);
    const [school, setSchool] = useState(1);
    const [showSettings, setShowSettings] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [playedPrayers, setPlayedPrayers] = useState<string[]>([]);
    const [previewAudio, setPreviewAudio] = useState<HTMLAudioElement | null>(null);
    const [isPlayingPreview, setIsPlayingPreview] = useState(false);

    // Update current time every second for countdown
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const perm = await Geolocation.checkPermissions();
                if (perm.location !== 'granted') {
                    const req = await Geolocation.requestPermissions();
                    if (req.location !== 'granted') throw new Error("Location permission denied");
                }
                const position = await Geolocation.getCurrentPosition();
                setCoords({ lat: position.coords.latitude, lng: position.coords.longitude });
            } catch (err: any) {
                console.error("Location error:", err);
                setError(err.message || "Unable to retrieve location");
            }
        };

        if (typeof window !== 'undefined') {
            const savedMethod = localStorage.getItem("fj_method");
            const savedSchool = localStorage.getItem("fj_school");
            const savedAdhan = localStorage.getItem("fj_adhan");
            if (savedMethod) setMethod(parseInt(savedMethod));
            if (savedSchool) setSchool(parseInt(savedSchool));
            if (savedAdhan) setSelectedAdhan(savedAdhan);
        }

        fetchLocation();
        checkScheduledNotifications();
    }, []);

    const togglePreview = (adhanId: string) => {
        if (isPlayingPreview && previewAudio) {
            previewAudio.pause();
            previewAudio.currentTime = 0;
            setIsPlayingPreview(false);
            setPreviewAudio(null);

            // If clicking a different one, start it
            if (previewAudio.src !== adhanOptions.find(a => a.id === adhanId)?.url) {
                const url = adhanOptions.find(a => a.id === adhanId)?.url;
                if (url) {
                    const audio = new Audio(url);
                    audio.play().catch(e => console.error(e));
                    audio.onended = () => setIsPlayingPreview(false);
                    setPreviewAudio(audio);
                    setIsPlayingPreview(true);
                }
            }
        } else {
            const url = adhanOptions.find(a => a.id === adhanId)?.url;
            if (url) {
                const audio = new Audio(url);
                audio.play().catch(e => console.error(e));
                audio.onended = () => setIsPlayingPreview(false);
                setPreviewAudio(audio);
                setIsPlayingPreview(true);
            }
        }
    };

    // Stop audio on unmount
    useEffect(() => {
        return () => {
            if (previewAudio) {
                previewAudio.pause();
            }
        };
    }, [previewAudio]);

    const checkScheduledNotifications = async () => {
        try {
            const pending = await LocalNotifications.getPending();
            const tags = Array.from(new Set(pending.notifications.map(n => n.extra?.prayerName).filter(Boolean)));
            setScheduledPrayers(tags as string[]);
        } catch (e) {
            console.error("Failed to check notifications", e);
        }
    };

    const { data, isLoading, isError } = useQuery({
        queryKey: ["prayerTimes", coords?.lat, coords?.lng, method, school],
        queryFn: () => getPrayerTimes(coords!.lat, coords!.lng, method, school),
        enabled: !!coords,
    });

    const calendarQuery = useQuery({
        queryKey: ["prayerCalendar", coords?.lat, coords?.lng, method, school],
        queryFn: () => getPrayerCalendar(coords!.lat, coords!.lng, method, school),
        enabled: !!coords,
    });

    const timings = data?.data.timings;
    const date = data?.data.date.readable;
    const hijri = data?.data.date.hijri;

    const prayers = useMemo(() => [
        { name: "Fajr", time: timings?.Fajr, icon: Moon, color: "from-blue-900 via-indigo-900 to-indigo-800" },
        { name: "Sunrise", time: timings?.Sunrise, icon: Sunrise, color: "from-orange-400 via-amber-300 to-amber-200" },
        { name: "Dhuhr", time: timings?.Dhuhr, icon: Sun, color: "from-blue-400 via-cyan-300 to-cyan-100" },
        { name: "Asr", time: timings?.Asr, icon: Sun, color: "from-amber-500 via-orange-400 to-orange-200" },
        { name: "Maghrib", time: timings?.Maghrib, icon: Sunset, color: "from-orange-600 via-pink-500 to-rose-400" },
        { name: "Isha", time: timings?.Isha, icon: Moon, color: "from-indigo-950 via-purple-900 to-indigo-900" },
    ], [timings]);

    // Check for prayer times and play audio
    useEffect(() => {
        if (!timings || !scheduledPrayers.length) return;

        const now = new Date();
        const currentHours = now.getHours();
        const currentMinutes = now.getMinutes();
        const currentSeconds = now.getSeconds(); // Check down to seconds to avoid miss? 
        const currentDateString = now.toDateString();

        prayers.forEach(prayer => {
            if (!prayer.time) return;
            const [pHours, pMinutes] = prayer.time.split(" ")[0].split(":").map(Number);

            if (currentHours === pHours && currentMinutes === pMinutes) {
                const prayerKey = `${prayer.name}-${currentDateString}`;

                if (scheduledPrayers.includes(prayer.name) && !playedPrayers.includes(prayerKey)) {
                    // Play Audio
                    const adhanUrl = adhanOptions.find(a => a.id === selectedAdhan)?.url;
                    if (adhanUrl) {
                        const audio = new Audio(adhanUrl);
                        audio.play().catch(e => console.error("Audio play failed:", e));

                        // Show toast as backup visual feedback
                        Toast.show({
                            text: `It is time for ${prayer.name}`,
                            duration: 'long'
                        });
                    }

                    setPlayedPrayers(prev => [...prev, prayerKey]);
                }
            }
        });
    }, [currentTime, timings, scheduledPrayers, selectedAdhan, prayers, playedPrayers]);

    const getNextPrayer = useMemo(() => {
        if (!timings) return null;

        const now = currentTime.getTime();
        const prayerList = prayers
            .map(p => {
                if (!p.time) return null;
                const [hours, minutes] = p.time.split(":").map(Number);
                const d = new Date(currentTime);
                d.setHours(hours, minutes, 0, 0);
                return { ...p, timestamp: d.getTime() };
            })
            .filter(Boolean) as (typeof prayers[0] & { timestamp: number })[];

        let next = prayerList.find(p => p.timestamp > now);

        if (!next) {
            const first = prayerList[0];
            const tomorrow = new Date(currentTime);
            tomorrow.setDate(tomorrow.getDate() + 1);
            const [h, m] = first.time!.split(":").map(Number);
            tomorrow.setHours(h, m, 0, 0);
            return { ...first, timestamp: tomorrow.getTime(), isTomorrow: true };
        }

        return next;
    }, [timings, currentTime, prayers]);

    const formatCountdown = (ms: number) => {
        const totalSec = Math.max(0, Math.floor(ms / 1000));
        const h = Math.floor(totalSec / 3600);
        const m = Math.floor((totalSec % 3600) / 60);
        const s = totalSec % 60;
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const toggleNotification = async (prayerName: string) => {
        try {
            const isScheduled = scheduledPrayers.includes(prayerName);
            if (isScheduled) {
                const pending = await LocalNotifications.getPending();
                const toCancel = pending.notifications.filter(n => n.extra?.prayerName === prayerName);
                if (toCancel.length > 0) await LocalNotifications.cancel({ notifications: toCancel });
                setScheduledPrayers(prev => prev.filter(p => p !== prayerName));
                await Toast.show({ text: `${prayerName} notification disabled` });
            } else {
                const perm = await LocalNotifications.checkPermissions();
                if (perm.display !== 'granted') {
                    const req = await LocalNotifications.requestPermissions();
                    if (req.display !== 'granted') return;
                }
                if (!calendarQuery.data) return;

                const adhanUrl = adhanOptions.find(a => a.id === selectedAdhan)?.url;
                const notifications = [];
                const now = new Date();
                const todayIndex = calendarQuery.data.data.findIndex(d => d.date.readable.startsWith(now.getDate().toString().padStart(2, '0')));

                if (todayIndex === -1) return;

                const daysToSchedule = Math.min(7, calendarQuery.data.data.length - todayIndex);
                for (let i = 0; i < daysToSchedule; i++) {
                    const dayData = calendarQuery.data.data[todayIndex + i];
                    const timeStr = (dayData.timings as any)[prayerName];
                    if (!timeStr) continue;
                    const [hours, minutes] = timeStr.split(" ")[0].split(':').map(Number);
                    const scheduleDate = new Date();
                    scheduleDate.setDate(now.getDate() + i);
                    scheduleDate.setHours(hours, minutes, 0, 0);
                    if (i === 0 && scheduleDate < now) continue;

                    notifications.push({
                        title: `Time for ${prayerName}`,
                        body: `It is time for ${prayerName} prayer.`,
                        id: Math.floor(Math.random() * 1000000),
                        schedule: { at: scheduleDate },
                        sound: adhanUrl || undefined,
                        extra: { prayerName }
                    });
                }

                if (notifications.length > 0) {
                    await LocalNotifications.schedule({ notifications });
                    setScheduledPrayers(prev => [...prev, prayerName]);
                    await Toast.show({ text: `${prayerName} alert set for 7 days` });
                }
            }
        } catch (e) {
            console.error(e);
        }
    };

    if (error) return <Card className="max-w-md mx-auto mt-8 bg-destructive/5 border-destructive/20 p-8 text-center text-destructive">
        <p className="font-serif text-xl font-bold mb-4">Location Error</p>
        <p className="mb-6">{error}</p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
    </Card>;

    if (isLoading || !coords) return <div className="max-w-md mx-auto mt-8 space-y-4">
        <Skeleton className="h-64 rounded-3xl" />
        <div className="space-y-3">
            {[1, 2, 3, 4, 5, 6].map(i => <Skeleton key={i} className="h-20 rounded-2xl" />)}
        </div>
    </div>;

    const formatTime = (timeStr?: string) => {
        if (!timeStr) return "--:--";
        const [hours, minutes] = timeStr.split(" ")[0].split(":");
        const h = parseInt(hours, 10);
        return `${h % 12 || 12}:${minutes} ${h >= 12 ? 'PM' : 'AM'}`;
    };

    return (
        <div className="max-w-md mx-auto space-y-6 pb-20">
            {/* NEXT PRAYER HERO */}
            <div className={cn(
                "relative overflow-hidden rounded-[3rem] shadow-2xl transition-all duration-1000 ease-in-out",
                getNextPrayer ? `bg-gradient-to-br ${getNextPrayer.color}` : "bg-primary"
            )}>
                {/* Visual Decorative Circles */}
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-black/10 rounded-full blur-2xl" />

                <div className="relative z-10 pt-12 pb-14 px-8 text-white text-center">
                    <div className="flex items-center justify-center gap-2 mb-8 bg-white/20 backdrop-blur-md w-fit mx-auto px-5 py-1.5 rounded-full border border-white/20 shadow-xl">
                        <MapPin className="h-3 w-3 text-secondary" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Geo-Synchronized</span>
                    </div>

                    <div className="mb-8">
                        <div className="flex items-center justify-center gap-3 text-white/70 mb-2">
                            {getNextPrayer?.icon && <getNextPrayer.icon className="h-5 w-5" />}
                            <span className="font-serif text-xl tracking-tight uppercase opacity-80">Next Prayer</span>
                        </div>
                        <h2 className="text-7xl font-serif font-black tracking-tighter shadow-sm mb-4">
                            {getNextPrayer?.name || "--"}
                        </h2>
                    </div>

                    <div className="bg-white/10 backdrop-blur-2xl rounded-[2rem] py-8 px-8 border border-white/20 shadow-2xl group transition-all hover:bg-white/15">
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center justify-center gap-2 text-white/50 mb-1">
                                <Clock className="h-4 w-4" />
                                <span className="text-xs uppercase font-black tracking-widest">Starts In</span>
                            </div>
                            <div className="text-6xl font-mono font-bold tracking-tighter text-white">
                                {getNextPrayer ? formatCountdown(getNextPrayer.timestamp - currentTime.getTime()) : "00:00:00"}
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 flex items-center justify-center gap-8 text-white/90 text-sm">
                        <div className="flex flex-col items-center">
                            <span className="text-[9px] uppercase font-black opacity-40 mb-1 tracking-widest">Gregorian</span>
                            <span className="font-serif font-bold text-base">{date}</span>
                        </div>
                        <div className="w-px h-10 bg-white/20" />
                        <div className="flex flex-col items-center">
                            <span className="text-[9px] uppercase font-black opacity-40 mb-1 tracking-widest">Hijri</span>
                            <span className="font-serif font-bold text-base">{hijri?.day} {hijri?.month.en} {hijri?.year}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* ADHAN & SETTINGS PANEL */}
            <div className="grid grid-cols-4 gap-4">
                <div className="col-span-3 bg-card/60 backdrop-blur-xl border border-primary/10 rounded-[2rem] p-5 shadow-inner">
                    <div className="flex items-center justify-between mb-4 px-1">
                        <div className="flex items-center gap-2">
                            <Volume2 className="h-4 w-4 text-primary" />
                            <span className="text-[10px] font-black uppercase text-secondary tracking-widest leading-none mt-0.5">Notification Tones</span>
                        </div>
                        {/* Mini Preview Button in Header */}
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 rounded-full hover:bg-primary/10"
                            onClick={(e) => {
                                e.stopPropagation();
                                togglePreview(selectedAdhan);
                            }}
                        >
                            {isPlayingPreview ? (
                                <BellOff className="h-3 w-3 text-red-500 animate-pulse" />
                            ) : (
                                <Clock className="h-3 w-3 text-primary/40" />
                            )}
                        </Button>
                    </div>

                    <div className="flex items-center gap-3">
                        <Select value={selectedAdhan} onValueChange={(val) => {
                            setSelectedAdhan(val);
                            localStorage.setItem("fj_adhan", val);
                        }}>
                            <SelectTrigger className="flex-1 border-none bg-primary/5 h-14 rounded-2xl font-bold text-sm ring-0 focus:ring-0 shadow-none px-5">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="rounded-3xl border-primary/10 shadow-2xl p-2 max-h-[300px]">
                                {adhanOptions.map(a => <SelectItem key={a.id} value={a.id} className="text-sm font-bold py-4 px-4 rounded-xl focus:bg-primary/5">{a.name}</SelectItem>)}
                            </SelectContent>
                        </Select>

                        <Button
                            className={cn(
                                "h-14 w-14 rounded-2xl shrink-0 transition-all shadow-sm",
                                isPlayingPreview
                                    ? "bg-red-50 text-red-600 hover:bg-red-100 border border-red-200"
                                    : "bg-white text-primary border border-primary/10 hover:bg-primary/5 hover:border-primary/20"
                            )}
                            onClick={() => togglePreview(selectedAdhan)}
                        >
                            {isPlayingPreview ? (
                                <StopCircle className="h-6 w-6 fill-current animate-pulse" />
                            ) : (
                                <PlayCircle className="h-6 w-6 fill-current opacity-80" />
                            )}
                        </Button>
                    </div>
                </div>
                <Button
                    variant="ghost"
                    className={cn(
                        "h-full w-full rounded-[2rem] p-0 flex flex-col justify-center gap-1 transition-all duration-500",
                        showSettings ? "bg-primary text-white shadow-2xl rotate-90" : "bg-primary/5 text-primary hover:bg-primary/10"
                    )}
                    onClick={() => setShowSettings(!showSettings)}
                >
                    <Settings2 className="h-8 w-8" />
                </Button>
            </div>

            {/* SMOOTH SETTINGS PANEL */}
            {showSettings && (
                <Card className="bg-card/90 backdrop-blur-2xl border-none rounded-[2.5rem] overflow-hidden animate-in fade-in slide-in-from-top-4 duration-700 shadow-2xl ring-1 ring-primary/5">
                    <CardHeader className="bg-primary pt-8 pb-8 text-white flex flex-row items-center justify-between px-8">
                        <div>
                            <CardTitle className="font-serif text-2xl font-black italic">Precision Settings</CardTitle>
                            <p className="text-white/60 text-[10px] uppercase font-bold tracking-[0.2em] mt-1">Calculated Astronomical Data</p>
                        </div>
                        <Sparkles className="h-7 w-7 text-secondary animate-pulse" />
                    </CardHeader>
                    <CardContent className="p-8 space-y-6">
                        <div className="space-y-3">
                            <label className="text-[11px] font-black uppercase text-secondary tracking-widest ml-1">Calculation Method</label>
                            <Select value={method.toString()} onValueChange={v => setMethod(parseInt(v))}>
                                <SelectTrigger className="rounded-2xl border-primary/10 py-7 px-5 font-bold shadow-none bg-primary/5">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="max-h-[400px] rounded-2xl p-2">
                                    {CALCULATION_METHODS.map(m => <SelectItem key={m.id} value={m.id.toString()} className="text-sm font-medium py-3 rounded-xl">{m.name}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-3">
                            <label className="text-[11px] font-black uppercase text-secondary tracking-widest ml-1">Asr School</label>
                            <Select value={school.toString()} onValueChange={v => setSchool(parseInt(v))}>
                                <SelectTrigger className="rounded-2xl border-primary/10 py-7 px-5 font-bold shadow-none bg-primary/5">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="rounded-2xl p-2">
                                    <SelectItem value="1" className="text-sm font-medium py-3 rounded-xl">Hanafi (Later Asr)</SelectItem>
                                    <SelectItem value="0" className="text-sm font-medium py-3 rounded-xl">Shafi / Maliki / Hanbali</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="bg-primary/5 p-5 rounded-2xl flex gap-4 border border-primary/5 border-dashed">
                            <div className="p-2.5 bg-white rounded-xl shadow-sm h-fit">
                                <Info className="h-5 w-5 text-primary" />
                            </div>
                            <p className="text-[12px] text-foreground/70 leading-relaxed font-medium">
                                Pakistan & India standard: <span className="text-primary font-bold">University of Islamic Sciences, Karachi (Method 1)</span> with <span className="text-primary font-bold">Hanafi</span> Madhab.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* PREMIUM PRAYER LIST */}
            <div className="space-y-5">
                {prayers.map((prayer) => {
                    const isScheduled = scheduledPrayers.includes(prayer.name);
                    const isNext = getNextPrayer?.name === prayer.name;

                    return (
                        <div
                            key={prayer.name}
                            className={cn(
                                "group relative flex items-center justify-between p-6 rounded-[2.5rem] transition-all duration-700 border-2 overflow-hidden",
                                isNext
                                    ? "bg-primary/[0.03] border-primary/40 shadow-2xl scale-[1.02] -translate-y-1"
                                    : "bg-white/40 border-primary/5 hover:border-primary/10 shadow-sm"
                            )}
                        >
                            {isNext && <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-transparent" />}

                            <div className="flex items-center space-x-6 relative z-10">
                                <div className={cn(
                                    "p-4 rounded-2xl transition-all duration-700",
                                    isNext ? "bg-primary text-white scale-110 shadow-xl" : "bg-primary/[0.07] text-primary group-hover:bg-primary group-hover:text-white"
                                )}>
                                    <prayer.icon className="h-7 w-7" />
                                </div>
                                <div className="flex flex-col">
                                    <span className={cn(
                                        "font-serif text-2xl font-black tracking-tight transition-colors",
                                        isNext ? "text-primary" : "text-foreground group-hover:text-primary"
                                    )}>{prayer.name}</span>
                                    {isNext && (
                                        <div className="flex items-center gap-1.5 mt-0.5">
                                            <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
                                            <span className="text-[11px] uppercase font-black tracking-[0.2em] text-primary/70">Current Focus</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center gap-6 relative z-10">
                                <span className={cn(
                                    "font-mono text-3xl font-black lowercase tracking-tighter",
                                    isNext ? "text-primary scale-110" : "text-foreground/80 group-hover:text-primary"
                                )}>
                                    {formatTime(prayer.time)}
                                </span>

                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className={cn(
                                        "rounded-[1.5rem] w-16 h-16 transition-all duration-700 border-2 flex items-center justify-center",
                                        isScheduled
                                            ? "bg-secondary text-white border-secondary shadow-xl hover:rotate-[15deg] active:scale-95"
                                            : "bg-primary/5 text-primary border-transparent hover:bg-primary hover:text-white hover:shadow-2xl hover:border-primary"
                                    )}
                                    onClick={() => prayer.time && toggleNotification(prayer.name)}
                                    disabled={!prayer.time}
                                >
                                    {isScheduled ? <Bell className="h-7 w-7 fill-current" /> : <BellOff className="h-7 w-7" />}
                                </Button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
