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
        { name: "Fajr", time: timings?.Fajr, icon: Moon },
        { name: "Sunrise", time: timings?.Sunrise, icon: Sunrise },
        { name: "Dhuhr", time: timings?.Dhuhr, icon: Sun },
        { name: "Asr", time: timings?.Asr, icon: Sun },
        { name: "Maghrib", time: timings?.Maghrib, icon: Sunset },
        { name: "Isha", time: timings?.Isha, icon: Moon },
    ];

    // Helper to format time to 12h
    const formatTime = (timeStr?: string) => {
        if (!timeStr) return "--:--";
        const cleanTime = timeStr.split(" ")[0];
        const [hours, minutes] = cleanTime.split(":");
        const h = parseInt(hours, 10);
        const ampm = h >= 12 ? "PM" : "AM";
        const h12 = h % 12 || 12;
        return `${h12}:${minutes} ${ampm}`;
    };

    return (
        <Card className="w-full max-w-md mx-auto mt-8 bg-card/60 backdrop-blur-md border-primary/10 shadow-xl">
            <CardHeader className="text-center pb-8 border-b border-primary/5">
                <div className="flex flex-col items-center justify-center space-y-2 mb-4">
                    <div className="flex items-center space-x-2 text-primary/80 bg-primary/5 px-4 py-1.5 rounded-full ring-1 ring-primary/10">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm font-medium">Auto-Location</span>
                    </div>
                </div>

                <h2 className="text-3xl font-serif font-bold text-primary mb-1">{date}</h2>
                <p className="text-muted-foreground font-medium">{hijri?.day} {hijri?.month.en} {hijri?.year} AH</p>
            </CardHeader>
            <CardContent className="space-y-3 pt-6 px-6">
                {prayers.map((prayer) => (
                    <div
                        key={prayer.name}
                        className="flex items-center justify-between p-4 rounded-xl bg-background hover:bg-muted/50 transition-all duration-300 border border-primary/5 hover:border-primary/20 hover:shadow-md group"
                    >
                        <div className="flex items-center space-x-4">
                            <div className="p-2.5 rounded-full bg-primary/5 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                                <prayer.icon className="h-5 w-5" />
                            </div>
                            <span className="font-serif font-bold text-lg text-foreground/80 group-hover:text-primary transition-colors">{prayer.name}</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="font-mono text-xl font-bold text-primary">
                                {formatTime(prayer.time)}
                            </span>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
