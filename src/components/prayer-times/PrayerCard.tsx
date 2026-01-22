"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPrayerTimes } from "@/lib/api/prayer-times";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin, Sunrise, Sun, Sunset, Moon, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PrayerCard() {
    const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!navigator.geolocation) {
            setError("Geolocation is not supported by your browser");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setCoords({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
            },
            () => {
                setError("Unable to retrieve your location");
            }
        );
    }, []);

    const { data, isLoading, isError } = useQuery({
        queryKey: ["prayerTimes", coords?.lat, coords?.lng],
        queryFn: () => getPrayerTimes(coords!.lat, coords!.lng),
        enabled: !!coords,
    });

    if (error) {
        return (
            <Card className="w-full max-w-md mx-auto mt-8">
                <CardContent className="pt-6 text-center text-red-500">
                    <p>{error}</p>
                    <Button
                        variant="outline"
                        className="mt-4"
                        onClick={() => window.location.reload()}
                    >
                        Retry
                    </Button>
                </CardContent>
            </Card>
        );
    }

    if (isLoading || !coords) {
        return (
            <Card className="w-full max-w-md mx-auto mt-8">
                <CardHeader>
                    <Skeleton className="h-8 w-3/4 mx-auto" />
                </CardHeader>
                <CardContent className="space-y-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <Skeleton key={i} className="h-12 w-full" />
                    ))}
                </CardContent>
            </Card>
        );
    }

    if (isError) {
        return (
            <Card className="w-full max-w-md mx-auto mt-8">
                <CardContent className="pt-6 text-center text-red-500">
                    Failed to load prayer times.
                </CardContent>
            </Card>
        );
    }

    const timings = data?.data.timings;
    const date = data?.data.date.readable;
    const hijri = data?.data.date.hijri;

    const prayers = [
        { name: "Fajr", time: timings?.Fajr, icon: Moon, gradient: "from-indigo-500 to-purple-500" },
        { name: "Sunrise", time: timings?.Sunrise, icon: Sunrise, gradient: "from-orange-400 to-amber-500" },
        { name: "Dhuhr", time: timings?.Dhuhr, icon: Sun, gradient: "from-blue-400 to-cyan-400" },
        { name: "Asr", time: timings?.Asr, icon: Sun, gradient: "from-amber-500 to-orange-500" },
        { name: "Maghrib", time: timings?.Maghrib, icon: Sunset, gradient: "from-purple-500 to-pink-500" },
        { name: "Isha", time: timings?.Isha, icon: Moon, gradient: "from-indigo-600 to-blue-600" },
    ];

    // Helper to format time to 12h
    const formatTime = (timeStr?: string) => {
        if (!timeStr) return "--:--";
        // API returns 24h format "HH:MM" (sometimes with seconds, but aladhan usually HH:MM)
        // Check if it has timezone like "05:36 (PKT)" and strip it
        const cleanTime = timeStr.split(" ")[0];
        const [hours, minutes] = cleanTime.split(":");
        const h = parseInt(hours, 10);
        const ampm = h >= 12 ? "PM" : "AM";
        const h12 = h % 12 || 12;
        return `${h12}:${minutes} ${ampm}`;
    };

    return (
        <Card className="w-full max-w-md mx-auto mt-8 bg-transparent border-none shadow-none">
            <CardHeader className="text-center pb-8 pt-0">
                <div className="flex flex-col items-center justify-center space-y-2 mb-4">
                    <div className="flex items-center space-x-2 text-muted-foreground bg-muted/50 px-4 py-1.5 rounded-full backdrop-blur-md">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm font-medium">Located via GPS</span>
                    </div>
                </div>

                <h2 className="text-3xl font-serif font-bold text-foreground mb-1">{date}</h2>
                <p className="text-primary font-medium">{hijri?.day} {hijri?.month.en} {hijri?.year} AH</p>

                {data && (
                    <div className="mt-6 flex items-center justify-center gap-8 text-sm font-medium text-muted-foreground">
                        <div className="flex flex-col items-center">
                            <Sunrise className="h-6 w-6 text-orange-500 mb-1" />
                            <span>Sunrise {formatTime(timings?.Sunrise)}</span>
                        </div>
                        <div className="w-px h-8 bg-border" />
                        <div className="flex flex-col items-center">
                            <Sunset className="h-6 w-6 text-indigo-500 mb-1" />
                            <span>Sunset {formatTime(timings?.Maghrib)}</span>
                        </div>
                    </div>
                )}
            </CardHeader>
            <CardContent className="space-y-4 px-0">
                {prayers.map((prayer) => (
                    <div
                        key={prayer.name}
                        className={`relative overflow-hidden flex items-center justify-between p-6 rounded-2xl shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98] cursor-default group`}
                    >
                        {/* Gradient Background */}
                        <div className={`absolute inset-0 bg-gradient-to-r ${prayer.gradient} opacity-90`} />

                        {/* Decorative Shape (Mountains/Waves) similar to reference - Simplified with CSS/SVG */}
                        <div className="absolute bottom-0 left-0 right-0 h-12 bg-white/10 backdrop-blur-[1px] skew-y-[-2deg] translate-y-4 rounded-full" />

                        <div className="relative z-10 flex items-center space-x-4">
                            <span className="font-serif font-bold text-2xl text-white tracking-wide">{prayer.name}</span>
                        </div>

                        <div className="relative z-10 flex items-center gap-3">
                            <span className="font-sans text-2xl font-bold text-white tracking-wider">
                                {formatTime(prayer.time)}
                            </span>
                            <Volume2 className="h-5 w-5 text-white/80" />
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
