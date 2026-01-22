"use client";

import { useEffect, useState } from "react";
import { calculateQibla } from "@/lib/qibla";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Compass as CompassIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Compass() {
    const [heading, setHeading] = useState<number>(0);
    const [qibla, setQibla] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [permissionGranted, setPermissionGranted] = useState(false);

    useEffect(() => {
        if (!navigator.geolocation) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setError("Geolocation is not supported");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                const qiblaDir = calculateQibla(latitude, longitude);
                setQibla(qiblaDir);
            },
            () => setError("Unable to retrieve location")
        );
    }, []);

    const requestAccess = async () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (typeof (DeviceOrientationEvent as any).requestPermission === "function") {
            try {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const permission = await (DeviceOrientationEvent as any).requestPermission();
                if (permission === "granted") {
                    setPermissionGranted(true);
                    window.addEventListener("deviceorientation", handleOrientation);
                } else {
                    setError("Permission denied");
                }
            } catch {
                setError("Error requesting permission");
            }
        } else {
            // Non-iOS 13+ devices
            setPermissionGranted(true);
            window.addEventListener("deviceorientation", handleOrientation);
        }
    };

    const handleOrientation = (event: DeviceOrientationEvent) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const anyEvent = event as any;
        const compass = anyEvent.webkitCompassHeading || Math.abs(event.alpha! - 360);
        setHeading(compass);
    };

    useEffect(() => {
        return () => {
            window.removeEventListener("deviceorientation", handleOrientation);
        };
    }, []);

    return (
        <Card className="w-full max-w-md mx-auto mt-8 bg-card/50 backdrop-blur-sm border-primary/10 shadow-lg">
            <CardHeader className="text-center">
                <CardTitle className="text-3xl font-serif text-primary flex items-center justify-center gap-2">
                    <CompassIcon className="h-8 w-8" />
                    Qibla Compass
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center pb-12">
                {error ? (
                    <p className="text-red-500">{error}</p>
                ) : !qibla ? (
                    <p className="text-muted-foreground">Locating...</p>
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                ) : !permissionGranted && typeof (DeviceOrientationEvent as any).requestPermission === "function" ? (
                    <Button onClick={requestAccess}>Enable Compass</Button>
                ) : (
                    <div className="relative w-64 h-64 mt-8">
                        {/* Compass Rose */}
                        <div
                            className="absolute inset-0 border-4 border-primary/20 rounded-full flex items-center justify-center transition-transform duration-500 ease-out"
                            style={{ transform: `rotate(${-heading}deg)` }}
                        >
                            <div className="absolute top-2 text-xs font-bold text-muted-foreground">N</div>
                            <div className="absolute bottom-2 text-xs font-bold text-muted-foreground">S</div>
                            <div className="absolute left-2 text-xs font-bold text-muted-foreground">W</div>
                            <div className="absolute right-2 text-xs font-bold text-muted-foreground">E</div>

                            {/* Qibla Indicator */}
                            <div
                                className="absolute w-1 h-1/2 bg-transparent origin-bottom"
                                style={{ transform: `rotate(${qibla}deg)` }}
                            >
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-2">
                                    <div className="w-4 h-4 bg-primary rounded-full shadow-lg animate-pulse" />
                                    <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[12px] border-b-primary absolute top-4 left-1/2 -translate-x-1/2 rotate-180" />
                                </div>
                            </div>
                        </div>

                        {/* Center Dot */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-3 h-3 bg-foreground rounded-full" />
                        </div>
                    </div>
                )}

                {qibla && (
                    <div className="mt-8 text-center">
                        <p className="text-muted-foreground">Qibla Direction</p>
                        <p className="text-2xl font-bold text-primary">{Math.round(qibla)}°</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
