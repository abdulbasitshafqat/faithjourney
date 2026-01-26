"use client";

import { useState, useEffect, useMemo } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { getPrayerCalendar } from "@/lib/api/prayer-times";
import { Geolocation } from '@capacitor/geolocation';
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar as CalendarIcon, MapPin, ChevronLeft, ChevronRight, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function CalendarPage() {
    const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const perm = await Geolocation.checkPermissions();
                if (perm.location !== 'granted') {
                    await Geolocation.requestPermissions();
                }
                const position = await Geolocation.getCurrentPosition();
                setCoords({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
            } catch (err) {
                console.error("Location error:", err);
                // Fallback: Use Karachi coordinates as default if denied
                setCoords({ lat: 24.8607, lng: 67.0011 });
            }
        };
        fetchLocation();
    }, []);

    const targetMonth = currentDate.getMonth() + 1;
    const targetYear = currentDate.getFullYear();

    const { data, isLoading } = useQuery({
        queryKey: ["calendar", coords?.lat, coords?.lng, targetMonth, targetYear],
        queryFn: () => getPrayerCalendar(coords!.lat, coords!.lng, 1, 1, targetMonth, targetYear),
        enabled: !!coords,
    });

    const handlePrevMonth = () => {
        setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
    };

    const handleToday = () => {
        setCurrentDate(new Date());
    };

    // Calculate empty slots before the first day of the month
    const firstDayOffset = useMemo(() => {
        const firstDay = new Date(targetYear, targetMonth - 1, 1);
        return firstDay.getDay(); // 0 (Sun) to 6 (Sat)
    }, [targetMonth, targetYear]);

    const hijriMonthEn = data?.data[0]?.date.hijri.month.en;
    const hijriYear = data?.data[0]?.date.hijri.year;

    const isToday = (dayStr: string) => {
        const today = new Date();
        const d = parseInt(dayStr);
        return today.getDate() === d && today.getMonth() === currentDate.getMonth() && today.getFullYear() === currentDate.getFullYear();
    };

    return (
        <div className="min-h-screen flex flex-col bg-background font-sans">
            <Header />

            <main className="flex-grow container mx-auto px-4 py-24">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">
                        Islamic Calendar
                    </h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        A dual-calendar view synchronized with your location for accurate Hijri and Gregorian dates.
                    </p>
                </div>

                {!coords ? (
                    <Card className="max-w-4xl mx-auto bg-card/50 backdrop-blur-sm border-primary/10">
                        <CardContent className="p-12 text-center space-y-4">
                            <MapPin className="h-12 w-12 text-primary/40 mx-auto animate-pulse" />
                            <p className="text-muted-foreground">Initializing location-aware calendar...</p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="max-w-4xl mx-auto space-y-6">
                        <Card className="bg-card/70 backdrop-blur-xl border-primary/10 shadow-2xl overflow-hidden rounded-[2rem]">
                            <CardHeader className="bg-primary/5 border-b border-primary/5 flex flex-col md:flex-row items-center justify-between py-8 px-8 gap-4">
                                <div className="space-y-2 text-center md:text-left">
                                    <div className="flex items-center justify-center md:justify-start gap-4 mb-1">
                                        <CardTitle className="font-serif text-3xl text-primary">
                                            {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
                                        </CardTitle>
                                        <Button variant="outline" size="sm" onClick={handleToday} className="rounded-full h-7 text-[10px] font-bold uppercase tracking-wider px-3">
                                            Return to Today
                                        </Button>
                                    </div>
                                    <p className="text-md text-muted-foreground font-semibold flex items-center justify-center md:justify-start gap-2">
                                        <Sparkles className="h-4 w-4 text-secondary" />
                                        {hijriMonthEn ? `${hijriMonthEn} ${hijriYear} AH` : 'Calculating Hijri...'}
                                    </p>
                                </div>
                                <div className="flex items-center gap-3 bg-white/20 p-2 rounded-2xl backdrop-blur-sm border border-white/30 shadow-lg">
                                    <Button variant="ghost" size="icon" onClick={handlePrevMonth} className="h-12 w-12 rounded-xl hover:bg-primary/10">
                                        <ChevronLeft className="h-6 w-6 text-primary" />
                                    </Button>
                                    <div className="w-px h-8 bg-primary/10" />
                                    <Button variant="ghost" size="icon" onClick={handleNextMonth} className="h-12 w-12 rounded-xl hover:bg-primary/10">
                                        <ChevronRight className="h-6 w-6 text-primary" />
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent className="p-1 md:p-6 pb-6">
                                <div className="grid grid-cols-7 gap-px md:gap-2 bg-primary/5 rounded-[1.5rem] overflow-hidden p-2">
                                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                        <div key={day} className="p-3 text-center text-[10px] font-black uppercase tracking-[0.2em] text-primary/70">
                                            {day}
                                        </div>
                                    ))}

                                    {/* Empty slots for previous month offset */}
                                    {isLoading ? (
                                        [...Array(42)].map((_, i) => (
                                            <Skeleton key={`skeleton-${i}`} className="h-20 w-full rounded-2xl bg-muted/50" />
                                        ))
                                    ) : (
                                        <>
                                            {[...Array(firstDayOffset)].map((_, i) => (
                                                <div key={`offset-${i}`} className="h-20 md:h-28 opacity-20" />
                                            ))}

                                            {data?.data.map((day, idx) => {
                                                const active = isToday(day.date.readable.split(' ')[0]);

                                                return (
                                                    <div
                                                        key={idx}
                                                        className={cn(
                                                            "relative group bg-white/40 h-20 md:h-28 rounded-2xl p-3 flex flex-col justify-between transition-all duration-500 border-2",
                                                            active
                                                                ? "border-primary bg-primary/[0.03] shadow-xl scale-[1.02] z-10"
                                                                : "border-transparent hover:border-primary/20 hover:bg-white/60"
                                                        )}
                                                    >
                                                        <div className="flex justify-between items-start">
                                                            <span className={cn(
                                                                "text-xl font-black transition-colors",
                                                                active ? "text-primary" : "text-foreground group-hover:text-primary"
                                                            )}>
                                                                {day.date.readable.split(' ')[0].replace(/^0/, '')}
                                                            </span>
                                                            <div className={cn(
                                                                "h-6 w-6 rounded-lg flex items-center justify-center text-[10px] font-bold transition-all",
                                                                active ? "bg-primary text-white" : "bg-primary/5 text-primary/60 group-hover:bg-primary/10"
                                                            )}>
                                                                {day.date.hijri.day.replace(/^0/, '')}
                                                            </div>
                                                        </div>

                                                        <div className="space-y-0.5">
                                                            <div className={cn(
                                                                "text-[8px] uppercase font-black tracking-widest truncate",
                                                                active ? "text-primary/70" : "text-muted-foreground/60"
                                                            )}>
                                                                {day.date.hijri.month.en}
                                                            </div>
                                                            {active && <div className="h-1 w-1 rounded-full bg-primary animate-pulse mx-auto" />}
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card className="bg-card/40 backdrop-blur-md border-primary/10 rounded-[2rem] p-6 shadow-sm">
                                <CardContent className="p-0 flex items-start gap-4">
                                    <div className="p-3 bg-primary/10 rounded-2xl shadow-inner">
                                        <Info className="h-6 w-6 text-primary" />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="font-serif font-bold text-primary">Calculation Note</h4>
                                        <p className="text-xs text-muted-foreground leading-relaxed">
                                            Islamic dates are calculated using the <strong>Umm al-Qura</strong> system. Actual sighting of the crescent moon may result in a 1-2 day variance in your local region.
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="bg-card/40 backdrop-blur-md border-primary/10 rounded-[2rem] p-6 shadow-sm">
                                <CardContent className="p-0 flex items-start gap-4">
                                    <div className="p-3 bg-secondary/10 rounded-2xl shadow-inner">
                                        <CalendarIcon className="h-6 w-6 text-secondary" />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="font-serif font-bold text-primary">Spiritual Milestones</h4>
                                        <p className="text-xs text-muted-foreground leading-relaxed">
                                            Significant days like the white days (<em>Ayyam al-Bid</em>) and major festivals are dynamically calculated based on these astronomical sightings.
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}

import { Sparkles } from "lucide-react";
