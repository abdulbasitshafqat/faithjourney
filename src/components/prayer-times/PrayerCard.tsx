"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPrayerTimes } from "@/lib/api/prayer-times";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin, Sunrise, Sun, Sunset, Moon } from "lucide-react";
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
        { name: "Fajr", time: timings?.Fajr, icon: Sunrise },
        { name: "Dhuhr", time: timings?.Dhuhr, icon: Sun },
        { name: "Asr", time: timings?.Asr, icon: Sun },
        { name: "Maghrib", time: timings?.Maghrib, icon: Sunset },
        { name: "Isha", time: timings?.Isha, icon: Moon },
    ];

    return (
        <Card className="w-full max-w-md mx-auto mt-8 bg-card/50 backdrop-blur-sm border-primary/10 shadow-lg">
            <CardHeader className="text-center border-b border-border/50 pb-6">
                <div className="flex items-center justify-center space-x-2 text-muted-foreground mb-2">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">Current Location</span>
                </div>
                <CardTitle className="text-3xl font-serif text-primary">Prayer Times</CardTitle>
                <div className="text-sm text-muted-foreground mt-2">
                    <p>{date}</p>
                    <p className="font-serif text-primary/80">
                        {hijri?.day} {hijri?.month.en} {hijri?.year}
                    </p>
                </div>
            </CardHeader>
            <CardContent className="pt-6">
                <div className="space-y-4">
                    {prayers.map((prayer) => (
                        <div
                            key={prayer.name}
                            className="flex items-center justify-between p-4 rounded-lg bg-background/50 hover:bg-primary/5 transition-colors border border-transparent hover:border-primary/10 group"
                        >
                            <div className="flex items-center space-x-4">
                                <div className="p-2 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                    <prayer.icon className="h-5 w-5" />
                                </div>
                                <span className="font-serif font-medium text-lg">{prayer.name}</span>
                            </div>
                            <span className="font-mono text-xl font-semibold text-primary">
                                {prayer.time?.split(" ")[0]} <span className="text-xs text-muted-foreground">AM/PM</span>
                            </span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
