"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { calculateQibla } from "@/lib/qibla";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Compass as CompassIcon, Navigation2, Sparkles, LocateFixed, Info, AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Geolocation } from '@capacitor/geolocation';
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface ExtendedWindow extends Window {
    DeviceOrientationEvent?: typeof DeviceOrientationEvent & {
        requestPermission?: () => Promise<PermissionState>;
    };
}

export function Compass() {
    const { toast } = useToast();
    const [heading, setHeading] = useState<number>(0); // Magnetic North
    const [qiblaAngle, setQiblaAngle] = useState<number | null>(null); // Angle from North to Makkah
    const [error, setError] = useState<string | null>(null);
    const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [permissionGranted, setPermissionGranted] = useState(false);
    const [isManualRotation, setIsManualRotation] = useState(false);

    const fetchLocation = useCallback(async () => {
        try {
            let latitude, longitude;
            const isNative = typeof window !== 'undefined' && (window as any).Capacitor?.isNativePlatform();
            
            if (isNative) {
                const perm = await Geolocation.checkPermissions();
                if (perm.location !== 'granted') {
                    const req = await Geolocation.requestPermissions();
                    if (req.location !== 'granted') {
                        throw new Error("Location permission denied.");
                    }
                }

                const position = await Geolocation.getCurrentPosition({
                    enableHighAccuracy: true,
                    timeout: 10000
                });
                latitude = position.coords.latitude;
                longitude = position.coords.longitude;
            } else {
                // Browser Native Geolocation Fallback
                if (typeof navigator !== 'undefined' && navigator.geolocation) {
                    const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
                        navigator.geolocation.getCurrentPosition(resolve, reject, {
                            enableHighAccuracy: true,
                            timeout: 8000
                        });
                    });
                    latitude = pos.coords.latitude;
                    longitude = pos.coords.longitude;
                } else {
                    // Default to Karachi, Pakistan coordinates if no geolocation is available
                    latitude = 24.8607;
                    longitude = 67.0011;
                    toast({
                        title: "Default Location Used",
                        description: "Could not retrieve GPS. Calculating Qibla from Karachi, Pakistan."
                    });
                }
            }

            setLocation({ lat: latitude, lng: longitude });
            const qiblaDir = calculateQibla(latitude, longitude);
            setQiblaAngle(qiblaDir);
        } catch (err) {
            console.error("Location error:", err);
            // Default fallback instead of hard error screen
            const fallbackLat = 24.8607;
            const fallbackLng = 67.0011;
            setLocation({ lat: fallbackLat, lng: fallbackLng });
            const qiblaDir = calculateQibla(fallbackLat, fallbackLng);
            setQiblaAngle(qiblaDir);
            
            toast({
                title: "Default Location Set",
                description: "GPS blocked or unavailable. Falling back to default coordinates."
            });
        }
    }, [toast]);

    useEffect(() => {
        fetchLocation();

        // Check if orientation sensors are available or if we are on a desktop platform
        const checkSensorSupport = () => {
            const hasSensor = typeof window !== 'undefined' && ('DeviceOrientationEvent' in window || 'DeviceMotionEvent' in window);
            const isTouch = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
            
            // If orientation sensors are not fully available or it's a desktop browser, enable manual mode
            if (!isTouch || !hasSensor) {
                setIsManualRotation(true);
                setPermissionGranted(true); // Bypass permission gating for manual mode
            }
        };
        checkSensorSupport();
    }, [fetchLocation]);

    // Smoothing factor (0 = no smoothing, 1 = no change). Lower = smoother but slower.
    const SMOOTHING_FACTOR = 0.15;
    const lastHeading = useRef<number>(0);

    const handleOrientation = useCallback((event: DeviceOrientationEvent) => {
        const webkitEvent = event as DeviceOrientationEvent & { webkitCompassHeading?: number };
        let compass = null;

        if (typeof webkitEvent.webkitCompassHeading === 'number') {
            // iOS: Direct magnetic heading
            compass = webkitEvent.webkitCompassHeading;
        } else if (typeof event.alpha === 'number') {
            // Android: deviceorientationabsolute or deviceorientation with absolute=true
            // alpha: 0=North, 90=West, 180=South, 270=East (increasing counter-clockwise)
            // Heading (clockwise from North): 360 - alpha
            compass = (360 - event.alpha) % 360;
        }

        if (compass !== null) {
            // Low-pass filter for smoothing
            let diff = compass - lastHeading.current;
            // Handle wrap-around (e.g. 359 -> 1)
            if (diff > 180) diff -= 360;
            if (diff < -180) diff += 360;

            lastHeading.current += diff * SMOOTHING_FACTOR;
            // Normalize to 0-360
            lastHeading.current = (lastHeading.current + 360) % 360;

            setHeading(lastHeading.current);
        }
    }, []);

    const requestAccess = async () => {
        // Handle iOS 13+ permission
        const win = window as unknown as ExtendedWindow;
        const DeviceEvent = win.DeviceOrientationEvent;

        if (DeviceEvent && typeof DeviceEvent.requestPermission === "function") {
            try {
                const permission = await DeviceEvent.requestPermission();
                if (permission === "granted") {
                    setPermissionGranted(true);
                    window.addEventListener("deviceorientation", handleOrientation);
                } else {
                    setError("Motion sensor permission denied. Please enable access in settings.");
                }
            } catch (err) {
                console.error("Permission error:", err);
                setPermissionGranted(true);
                window.addEventListener("deviceorientation", handleOrientation);
            }
        } else {
            // Android: Prefer absolute orientation
            setPermissionGranted(true);
            if ('ondeviceorientationabsolute' in (window as unknown as Record<string, unknown>)) {
                window.addEventListener("deviceorientationabsolute", handleOrientation);
            } else {
                window.addEventListener("deviceorientation", handleOrientation);
            }
        }
    };

    useEffect(() => {
        return () => {
            window.removeEventListener("deviceorientation", handleOrientation);
            window.removeEventListener("deviceorientationabsolute", handleOrientation);
        };
    }, [handleOrientation]);

    // The angle we want the arrow to point (Relative to the top of the phone)
    // qiblaAngle is degrees from North (clockwise)
    // heading is the degree of magnetic North relative to the top of the phone (clockwise)
    // Arrow direction = (qiblaAngle - heading + 360) % 360
    const relativeQiblaAngle = qiblaAngle !== null ? (qiblaAngle - heading + 360) % 360 : 0;

    // Status Logic
    const isAligned = Math.abs(relativeQiblaAngle) < 8 || Math.abs(relativeQiblaAngle - 360) < 8;

    return (
        <div className="w-full max-w-md mx-auto space-y-6">
            <Card className={cn(
                "relative overflow-hidden transition-all duration-700 bg-card/90 backdrop-blur-3xl border-primary/10 rounded-[3rem] shadow-2xl",
                isAligned && "ring-8 ring-primary/20 shadow-[0_0_60px_rgba(var(--primary),0.2)]"
            )}>
                {/* Visual Feedback for Alignment */}
                <div className={cn(
                    "absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent transition-opacity duration-1000",
                    isAligned ? "opacity-100" : "opacity-0"
                )} />

                <CardHeader className="text-center pt-12 pb-6">
                    <div className="flex flex-col items-center gap-2 mb-4">
                        <div className="flex items-center justify-center gap-2 bg-primary/5 w-fit mx-auto px-5 py-2 rounded-full border border-primary/10">
                            <LocateFixed className="h-3.5 w-3.5 text-primary" />
                            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-primary/80">Sensor Fusion v2.0</span>
                        </div>
                        {location && (
                            <span className="text-[10px] font-mono font-bold text-primary bg-primary/10 px-3 py-1 rounded-md border border-primary/10 animate-in fade-in slide-in-from-top-1">
                                GPS: {location.lat.toFixed(5)}°, {location.lng.toFixed(5)}°
                            </span>
                        )}
                    </div>
                    <CardTitle className="text-5xl font-serif font-black text-primary tracking-tighter">Kaaba Finder</CardTitle>
                    <CardDescription className="text-sm font-bold text-muted-foreground/60 max-w-[280px] mx-auto mt-2 leading-relaxed">
                        Hold your phone <span className="text-primary italic">flat</span> and stay away from metallic objects.
                    </CardDescription>
                </CardHeader>

                <CardContent className="flex flex-col items-center pb-14 px-8">
                    {error ? (
                        <div className="bg-destructive/5 p-8 rounded-[2.5rem] border border-destructive/20 text-center space-y-6 animate-in fade-in zoom-in duration-500">
                            <AlertCircle className="h-16 w-16 text-destructive mx-auto opacity-50" />
                            <div className="space-y-2">
                                <p className="text-destructive font-black text-xl font-serif tracking-tight">Technical Hindrance</p>
                                <p className="text-destructive/80 font-medium text-sm leading-relaxed">{error}</p>
                            </div>
                            <Button onClick={() => window.location.reload()} variant="destructive" className="h-14 w-full rounded-2xl font-bold shadow-xl">
                                <RefreshCw className="mr-2 h-5 w-5" />
                                Re-Initialize App
                            </Button>
                        </div>
                    ) : !qiblaAngle ? (
                        <div className="py-24 flex flex-col items-center gap-8">
                            <div className="relative">
                                <div className="h-24 w-24 rounded-full border-[6px] border-primary/10 border-t-primary animate-spin" />
                                <CompassIcon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-10 w-10 text-primary/30" />
                            </div>
                            <div className="space-y-1 text-center">
                                <p className="text-xs font-black uppercase tracking-[0.3em] text-primary animate-pulse">Scanning Satellites</p>
                                <p className="text-[10px] font-bold text-muted-foreground italic">Fetching high-precision coordinates...</p>
                            </div>
                        </div>
                    ) : !permissionGranted ? (
                        <div className="py-12 text-center space-y-8 animate-in fade-in slide-in-from-bottom-5">
                            <div className="relative">
                                <div className="absolute inset-0 bg-primary/20 blur-[50px] rounded-full scale-150 opacity-40" />
                                <div className="relative p-8 bg-white dark:bg-white/5 rounded-[3rem] shadow-2xl inline-block border border-primary/5">
                                    <div className="flex items-center justify-center -space-x-4">
                                        <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center animate-bounce-slow">
                                            <CompassIcon className="h-8 w-8 text-primary" />
                                        </div>
                                        <div className="w-16 h-16 rounded-full bg-secondary/10 border border-secondary/20 flex items-center justify-center animate-bounce-slow delay-300">
                                            <Navigation2 className="h-8 w-8 text-secondary" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <h3 className="text-2xl font-serif font-black text-primary tracking-tight">Calibrate Sensors</h3>
                                <p className="text-sm text-muted-foreground/80 max-w-[280px] mx-auto font-medium">We require access to magnetic sensors to point you towards Makkah with precision.</p>
                            </div>
                            <Button onClick={requestAccess} className="bg-primary text-white h-16 w-full rounded-2xl shadow-[0_20px_40px_rgba(var(--primary),0.3)] font-black text-lg flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all">
                                <Sparkles className="h-5 w-5 fill-current" />
                                Start Finding Qibla
                            </Button>
                        </div>
                    ) : (
                        <div className="relative py-12 flex flex-col items-center">
                            {/* ALIGNMENT HALO */}
                            <div className={cn(
                                "absolute w-[300px] h-[300px] rounded-full blur-[80px] transition-all duration-1000",
                                isAligned ? "bg-primary/30 opacity-100 scale-125" : "bg-primary/5 opacity-40 scale-100"
                            )} />

                            <div className="relative w-80 h-80">
                                {/* Fixed Compass Housing */}
                                <div className="absolute inset-0 border-[2px] border-primary/10 rounded-full" />
                                <div className="absolute inset-4 border-[1px] border-primary/5 rounded-full" />

                                {/* Degree markings on Housing */}
                                <div className="absolute inset-0 opacity-10 group">
                                    {[...Array(72)].map((_, i) => (
                                        <div key={i} className="absolute inset-0 flex items-start justify-center" style={{ transform: `rotate(${i * 5}deg)` }}>
                                            <div className={cn("bg-primary", i % 18 === 0 ? "h-6 w-1" : i % 2 === 0 ? "h-3 w-0.5" : "h-1 w-px")} />
                                        </div>
                                    ))}
                                </div>

                                {/* Rotating Inner Compass Dial (Orientation) */}
                                <div
                                    className="absolute inset-0 transition-transform duration-500 ease-out will-change-transform"
                                    style={{ transform: `rotate(${-heading}deg)` }}
                                >
                                    {/* Major Cardinals */}
                                    <div className="absolute top-10 left-1/2 -translate-x-1/2 text-2xl font-serif font-black text-primary/80">N</div>
                                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-2xl font-serif font-black text-primary/30">S</div>
                                    <div className="absolute left-10 top-1/2 -translate-y-1/2 text-2xl font-serif font-black text-primary/30">W</div>
                                    <div className="absolute right-10 top-1/2 -translate-y-1/2 text-2xl font-serif font-black text-primary/30">E</div>

                                    {/* Qibla Marker on Rotation Dial */}
                                    <div
                                        className="absolute inset-0 flex items-start justify-center"
                                        style={{ transform: `rotate(${qiblaAngle}deg)` }}
                                    >
                                        <div className="-mt-12 flex flex-col items-center group/marker">
                                            <div className={cn(
                                                "w-16 h-16 rounded-[1.5rem] bg-white dark:bg-[#1a1a17] shadow-2xl flex items-center justify-center border-[3px] transition-all duration-700",
                                                isAligned ? "border-primary scale-125 rotate-45 shadow-primary/30" : "border-primary/5 group-hover/marker:border-primary/20 rotate-0"
                                            )}>
                                                <div className={cn("transition-transform duration-700", isAligned ? "-rotate-45" : "rotate-0")}>
                                                    <Sparkles className={cn("h-8 w-8 text-primary", isAligned && "animate-pulse")} />
                                                </div>
                                            </div>
                                            <div className={cn(
                                                "w-1.5 h-32 bg-gradient-to-t from-transparent via-primary/20 to-primary transition-all duration-700 mt-4",
                                                isAligned ? "opacity-100 h-40" : "opacity-40"
                                            )} />
                                        </div>
                                    </div>
                                </div>

                                {/* Fixed Central Hub */}
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <div className="relative">
                                        <div className={cn(
                                            "w-20 h-20 bg-white/70 dark:bg-[#22221e]/70 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-primary/10 flex flex-col items-center justify-center overflow-hidden transition-all duration-500",
                                            isAligned && "scale-110 border-primary/30"
                                        )}>
                                            <p className="text-[10px] font-black tracking-tighter text-primary/60 uppercase leading-none mb-1">Heading</p>
                                            <p className="text-xl font-serif font-black text-primary leading-none">{Math.round(heading)}°</p>
                                            {isAligned && <div className="absolute bottom-0 inset-x-0 h-1 bg-primary animate-pulse" />}
                                        </div>
                                        <div className="absolute -inset-4 bg-primary/5 rounded-full -z-10 animate-pulse" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {qiblaAngle && (
                        <div className="w-full grid grid-cols-2 gap-5 mt-10">
                            <div className="bg-primary/5 rounded-[2rem] p-6 text-center border border-primary/5 shadow-inner">
                                <p className="text-[10px] font-black uppercase text-muted-foreground/70 mb-2 tracking-[0.2em]">Qibla Bearing</p>
                                <p className="text-4xl font-serif font-black text-primary leading-none">{Math.round(qiblaAngle)}°</p>
                            </div>
                            <div className={cn(
                                "rounded-[2rem] p-6 text-center border transition-all duration-700 shadow-lg flex flex-col justify-center",
                                isAligned ? "bg-primary text-white border-primary" : "bg-white/40 dark:bg-white/5 text-primary border-primary/5"
                            )}>
                                <p className={cn("text-[10px] font-black uppercase mb-2 tracking-[0.2em]", isAligned ? "text-white/60" : "text-muted-foreground/70")}>Guidance</p>
                                <p className="text-xl font-serif font-black tracking-tight italic leading-tight">
                                    {isAligned ? "Aligned with Makkah" : "Turn towards Sparkle"}
                                </p>
                            </div>
                        </div>
                    )}

                    {isManualRotation && (
                        <div className="w-full mt-6 bg-primary/5 rounded-[2rem] p-6 border border-primary/5 shadow-inner space-y-3">
                            <div className="flex justify-between items-center text-xs font-black uppercase text-secondary tracking-widest">
                                <span>Compass Rotation Dial</span>
                                <span className="font-mono text-primary bg-primary/10 px-2 py-0.5 rounded">{Math.round(heading)}° N</span>
                            </div>
                            <input 
                                type="range" 
                                min="0" 
                                max="359" 
                                value={heading} 
                                onChange={(e) => setHeading(parseInt(e.target.value))}
                                className="w-full h-2 bg-primary/10 rounded-lg appearance-none cursor-pointer accent-primary focus:outline-none"
                            />
                            <p className="text-[10px] font-bold text-muted-foreground/60 text-center leading-relaxed">
                                Drag the slider to rotate the compass and find the correct Qibla bearing relative to your position!
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 gap-4">
                <Card className="bg-card/40 backdrop-blur-2xl rounded-[2.5rem] border-primary/5 p-6 shadow-sm">
                    <CardContent className="p-0 flex items-center gap-5">
                        <div className="p-4 bg-primary/10 rounded-2xl shadow-inner">
                            <Info className="h-6 w-6 text-primary" />
                        </div>
                        <div className="space-y-1 flex-1">
                            <h4 className="text-sm font-serif font-black text-primary">How to calibrate?</h4>
                            <p className="text-[11px] text-muted-foreground font-medium leading-relaxed">
                                Move your device in a <span className="text-primary font-bold">figure-8 (∞)</span> motion to reset the magnetic sensors if the direction feels inaccurate. Stay clear of magnets and electronics.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
