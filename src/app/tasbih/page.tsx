"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Plus,
    Minus,
    Volume2,
    VolumeX,
    History,
    Sparkles,
    Trophy,
    Trash2,
    Vibrate
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { useMounted } from "@/hooks/use-mounted";
import { format } from "date-fns";

// Types
interface Dhikr {
    id: string;
    arabic: string;
    english: string;
    translation: string;
    target: number;
}

interface SessionLog {
    id: string;
    dhikrName: string;
    count: number;
    timestamp: number;
}

// Default Data
const DEFAULT_AZKAR: Dhikr[] = [
    { id: "subhanallah", arabic: "سُبْحَانَ ٱللَّٰهِ", english: "SubhanAllah", translation: "Glory be to Allah", target: 33 },
    { id: "alhamdulillah", arabic: "ٱلْحَمْدُ لِلَّٰهِ", english: "Alhamdulillah", translation: "All praise is for Allah", target: 33 },
    { id: "allahuakbar", arabic: "ٱللَّٰهُ أَكْبَرُ", english: "Allahu Akbar", translation: "Allah is the Greatest", target: 34 },
    { id: "astaghfirullah", arabic: "أَسْتَغْفِرُ ٱللَّٰهَ", english: "Astaghfirullah", translation: "I seek forgiveness from Allah", target: 100 },
    { id: "la-ilaha-illallah", arabic: "لَا إِلَٰهَ إِلَّا ٱللَّٰهُ", english: "La ilaha illallah", translation: "There is no god but Allah", target: 100 },
    { id: "salawat", arabic: "ٱللَّٰهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ", english: "Salawat", translation: "Blessings upon Muhammad", target: 100 },
];

export default function TasbihPage() {
    const mounted = useMounted();

    // Core State
    const [count, setCount] = useState(0);
    const [target, setTarget] = useState(33);
    const [selectedDhikr, setSelectedDhikr] = useState<Dhikr>(DEFAULT_AZKAR[0]);
    const [isSoundEnabled, setIsSoundEnabled] = useState(true);
    const [isVibrationEnabled, setIsVibrationEnabled] = useState(true);

    // Advanced State
    const [history, setHistory] = useState<SessionLog[]>([]);
    const [customAzkar, setCustomAzkar] = useState<Dhikr[]>([]);
    const [totalToday, setTotalToday] = useState(0);

    // Form State for New Dhikr
    const [newDhikrName, setNewDhikrName] = useState("");
    const [newDhikrTarget, setNewDhikrTarget] = useState("33");

    // Load Data
    useEffect(() => {
        const savedCount = localStorage.getItem("tasbih-count");
        const savedHistory = localStorage.getItem("tasbih-history");
        const savedCustom = localStorage.getItem("tasbih-custom");
        const savedTotal = localStorage.getItem("tasbih-total-today");
        const savedDate = localStorage.getItem("tasbih-last-date");
        const today = new Date().toDateString();

        if (savedCount) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setCount(parseInt(savedCount));
        }
        if (savedHistory) setHistory(JSON.parse(savedHistory));
        if (savedCustom) setCustomAzkar(JSON.parse(savedCustom));

        if (savedDate === today) {
            if (savedTotal) setTotalToday(parseInt(savedTotal));
        } else {
            localStorage.setItem("tasbih-last-date", today);
            setTotalToday(0);
        }
    }, []);

    // Persist Data
    useEffect(() => {
        if (!mounted) return;
        localStorage.setItem("tasbih-count", count.toString());
        localStorage.setItem("tasbih-total-today", totalToday.toString());
        localStorage.setItem("tasbih-history", JSON.stringify(history));
        localStorage.setItem("tasbih-custom", JSON.stringify(customAzkar));
    }, [count, totalToday, history, customAzkar, mounted]);

    const playSound = useCallback(() => {
        if (!isSoundEnabled) return;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.1);
    }, [isSoundEnabled]);

    const vibrate = useCallback(() => {
        if (isVibrationEnabled && navigator.vibrate) {
            navigator.vibrate(15);
        }
    }, [isVibrationEnabled]);

    const logSession = () => {
        if (count === 0) return;
        const log: SessionLog = {
            id: Date.now().toString(),
            dhikrName: selectedDhikr.english,
            count: count,
            timestamp: Date.now()
        };
        setHistory(prev => [log, ...prev].slice(0, 100)); // Keep last 100
        setCount(0);
        alert("Session saved to history!");
    };

    const handleTargetReached = useCallback(() => {
        if (navigator.vibrate) navigator.vibrate([50, 50, 50]);
        playSound();
        // Optional: Auto-log or just notify
    }, [playSound]);

    const increment = () => {
        playSound();
        vibrate();

        setCount((prev) => {
            const next = prev + 1;
            if (next === target) {
                setTimeout(handleTargetReached, 0);
            }
            return next;
        });
        setTotalToday((prev) => prev + 1);
    };

    const handleReset = () => {
        if (confirm("Reset counter? This will verify end of session.")) {
            logSession();
        }
    };

    const handleAddCustom = () => {
        if (!newDhikrName) return;
        const newDhikr: Dhikr = {
            id: `custom-${Date.now()}`,
            english: newDhikrName,
            arabic: "Custom",
            translation: "Personal Dhikr",
            target: parseInt(newDhikrTarget) || 33
        };
        setCustomAzkar([...customAzkar, newDhikr]);
        setNewDhikrName("");
        setSelectedDhikr(newDhikr);
        setCount(0);
        setTarget(newDhikr.target);
    };

    const handleDeleteCustom = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setCustomAzkar(customAzkar.filter(c => c.id !== id));
        if (selectedDhikr.id === id) {
            setSelectedDhikr(DEFAULT_AZKAR[0]);
            setTarget(DEFAULT_AZKAR[0].target);
        }
    };

    if (!mounted) return null;

    return (
        <div className="min-h-screen flex flex-col bg-background font-sans">
            <Header />

            <main className="flex-grow container mx-auto px-4 py-24">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4 flex items-center justify-center gap-2">
                        <Sparkles className="h-8 w-8 text-secondary animate-pulse" />
                        Digital Tasbih
                    </h1>
                </div>

                <div className="max-w-5xl mx-auto">
                    <Tabs defaultValue="counter" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 mb-8 bg-muted/50 p-1 rounded-xl">
                            <TabsTrigger value="counter" className="rounded-lg">Counter</TabsTrigger>
                            <TabsTrigger value="history" className="rounded-lg">History & Customs</TabsTrigger>
                        </TabsList>

                        <TabsContent value="counter" className="space-y-6">
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                                {/* Controls & preset list */}
                                <div className="lg:col-span-4 space-y-4">
                                    <Card className="bg-card/50 backdrop-blur-sm border-primary/10">
                                        <CardHeader>
                                            <CardTitle className="text-sm font-medium">Select Dhikr</CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-2">
                                            <ScrollArea className="h-[300px] pr-4">
                                                <div className="space-y-2">
                                                    {[...DEFAULT_AZKAR, ...customAzkar].map((dhikr) => (
                                                        <Button
                                                            key={dhikr.id}
                                                            variant={selectedDhikr.id === dhikr.id ? "default" : "ghost"}
                                                            className={cn(
                                                                "w-full justify-between h-auto py-3 px-4",
                                                                selectedDhikr.id === dhikr.id ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                                                            )}
                                                            onClick={() => {
                                                                setSelectedDhikr(dhikr);
                                                                setTarget(dhikr.target);
                                                                setCount(0);
                                                            }}
                                                        >
                                                            <div className="flex flex-col items-start gap-1">
                                                                <span className="font-semibold">{dhikr.english}</span>
                                                                <span className="text-xs opacity-70 font-normal">{dhikr.translation}</span>
                                                            </div>
                                                            {dhikr.id.startsWith('custom') && (
                                                                <span onClick={(e) => handleDeleteCustom(dhikr.id, e)} className="text-destructive hover:bg-destructive/10 p-1 rounded">
                                                                    <Trash2 className="h-4 w-4" />
                                                                </span>
                                                            )}
                                                        </Button>
                                                    ))}
                                                </div>
                                            </ScrollArea>
                                        </CardContent>
                                    </Card>

                                    <Card className="bg-card/50">
                                        <CardContent className="p-4 flex flex-col gap-4">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-medium">Sound</span>
                                                <Button
                                                    variant={isSoundEnabled ? "default" : "secondary"}
                                                    size="sm"
                                                    onClick={() => setIsSoundEnabled(!isSoundEnabled)}
                                                    className="w-12 h-8"
                                                >
                                                    {isSoundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                                                </Button>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-medium">Vibration</span>
                                                <Button
                                                    variant={isVibrationEnabled ? "default" : "secondary"}
                                                    size="sm"
                                                    onClick={() => setIsVibrationEnabled(!isVibrationEnabled)}
                                                    className="w-12 h-8"
                                                >
                                                    {isVibrationEnabled ? <Vibrate className="h-4 w-4" /> : <div className="h-4 w-4 relative"><div className="absolute inset-0 border-2 border-current rotate-45 transform" /></div>}
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>

                                {/* Main Counter */}
                                <div className="lg:col-span-8">
                                    <div className="h-full flex flex-col items-center justify-center min-h-[500px] relative">

                                        {/* Radial Progress */}
                                        <div
                                            className="relative w-80 h-80 flex items-center justify-center cursor-pointer active:scale-95 transition-all duration-100 select-none group"
                                            onClick={increment}
                                        >
                                            {/* Glow Effect */}
                                            <div className="absolute inset-0 bg-primary/20 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                            <svg className="absolute w-full h-full -rotate-90 pointer-events-none drop-shadow-2xl">
                                                <circle
                                                    cx="50%" cy="50%" r="46%"
                                                    fill="hsl(var(--background))"
                                                    stroke="hsl(var(--muted))"
                                                    strokeWidth="20"
                                                    className="opacity-30"
                                                />
                                                <circle
                                                    cx="50%" cy="50%" r="46%"
                                                    fill="none"
                                                    stroke="hsl(var(--primary))"
                                                    strokeWidth="20"
                                                    strokeDasharray="290%"
                                                    strokeDashoffset={`${290 - (290 * Math.min(count, target) / target)}%`}
                                                    strokeLinecap="round"
                                                    className="transition-all duration-300 ease-out"
                                                />
                                            </svg>

                                            <div className="relative z-10 text-center flex flex-col items-center">
                                                <span className="text-8xl font-bold tabular-nums tracking-tighter text-primary">
                                                    {count}
                                                </span>
                                                <span className="text-sm text-muted-foreground font-medium uppercase tracking-widest mt-2">
                                                    Target: {target}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="mt-12 text-center space-y-2">
                                            <h2 className="text-4xl font-arabic text-primary">{selectedDhikr.arabic}</h2>
                                            <p className="text-xl font-serif text-foreground/80">{selectedDhikr.english}</p>
                                        </div>

                                        <div className="flex gap-4 mt-8">
                                            <Button variant="outline" size="lg" className="h-12 w-12 rounded-full" onClick={() => setCount(Math.max(0, count - 1))}>
                                                <Minus className="h-6 w-6" />
                                            </Button>
                                            <Button variant="secondary" size="lg" className="h-12 px-8 rounded-full font-bold" onClick={handleReset}>
                                                Save & Reset
                                            </Button>
                                            <Button variant="outline" size="lg" className="h-12 w-12 rounded-full" onClick={increment}>
                                                <Plus className="h-6 w-6" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="history">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Create Custom */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Create Custom Dhikr</CardTitle>
                                        <CardDescription>Add your own phrases to the list.</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-2">
                                            <Label>Name (English/Transliteration)</Label>
                                            <Input
                                                placeholder="e.g. Ya Hayyu Ya Qayyum"
                                                value={newDhikrName}
                                                onChange={(e) => setNewDhikrName(e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Target Count</Label>
                                            <Input
                                                type="number"
                                                value={newDhikrTarget}
                                                onChange={(e) => setNewDhikrTarget(e.target.value)}
                                            />
                                        </div>
                                        <Button className="w-full" onClick={handleAddCustom} disabled={!newDhikrName}>
                                            <Plus className="mr-2 h-4 w-4" /> Add Preset
                                        </Button>
                                    </CardContent>
                                </Card>

                                {/* Stats Card */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Trophy className="h-5 w-5 text-primary" />
                                            Today&apos;s Stats
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-center py-8">
                                            <div className="text-6xl font-bold text-primary mb-2">{totalToday}</div>
                                            <p className="text-muted-foreground">Total Dhikr Performed Today</p>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* History Log */}
                                <Card className="md:col-span-2">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <History className="h-5 w-5" />
                                            Session History
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ScrollArea className="h-[400px]">
                                            {history.length === 0 ? (
                                                <p className="text-center text-muted-foreground py-10">No history yet. Start your journey!</p>
                                            ) : (
                                                <div className="space-y-2">
                                                    {history.map((log) => (
                                                        <div key={log.id} className="flex justify-between items-center p-4 bg-muted/30 rounded-lg border">
                                                            <div>
                                                                <p className="font-semibold">{log.dhikrName}</p>
                                                                <p className="text-xs text-muted-foreground">
                                                                    {format(log.timestamp, "MMM d, h:mm a")}
                                                                </p>
                                                            </div>
                                                            <Badge variant="secondary" className="bg-primary/10 text-primary text-lg px-3 py-1">
                                                                {log.count}
                                                            </Badge>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </ScrollArea>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </main>

            <Footer />
        </div>
    );
}
