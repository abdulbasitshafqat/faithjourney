"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
    RotateCcw,
    Plus,
    Minus,
    Volume2,
    VolumeX,
    History,
    Settings2,
    Sparkles,
    CheckCircle2,
    Trophy
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

// Dhikr Data
const Azkar = [
    { id: "custom", arabic: "ذكر حر", english: "Custom Count", translation: "Free Dhikr", target: 33 },
    { id: "subhanallah", arabic: "سُبْحَانَ ٱللَّٰهِ", english: "SubhanAllah", translation: "Glory be to Allah", target: 33 },
    { id: "alhamdulillah", arabic: "ٱلْحَمْدُ لِلَّٰهِ", english: "Alhamdulillah", translation: "All praise is for Allah", target: 33 },
    { id: "allahuakbar", arabic: "ٱللَّٰهُ أَكْبَرُ", english: "Allahu Akbar", translation: "Allah is the Greatest", target: 34 },
    { id: "astaghfirullah", arabic: "أَسْتَغْفِرُ ٱللَّٰهَ", english: "Astaghfirullah", translation: "I seek forgiveness from Allah", target: 100 },
    { id: "la-ilaha-illallah", arabic: "لَا إِلَٰهَ إِلَّا ٱللَّٰهُ", english: "La ilaha illallah", translation: "There is no god but Allah", target: 100 },
];

export default function TasbihPage() {
    const [count, setCount] = useState(0);
    const [target, setTarget] = useState(33);
    const [selectedDhikr, setSelectedDhikr] = useState(Azkar[0]);
    const [isSoundEnabled, setIsSoundEnabled] = useState(true);
    const [totalToday, setTotalToday] = useState(0);
    const [isPostSalahMode, setIsPostSalahMode] = useState(false);
    const [salahStep, setSalahStep] = useState(0); // 0: SubhanAllah, 1: Alhamdulillah, 2: AllahuAkbar

    // Load persisted data
    useEffect(() => {
        const savedCount = localStorage.getItem("tasbih-count");
        const savedTotal = localStorage.getItem("tasbih-total-today");
        const savedDate = localStorage.getItem("tasbih-last-date");
        const today = new Date().toDateString();

        if (savedCount) setCount(parseInt(savedCount));

        if (savedDate === today) {
            if (savedTotal) setTotalToday(parseInt(savedTotal));
        } else {
            localStorage.setItem("tasbih-last-date", today);
            localStorage.setItem("tasbih-total-today", "0");
            setTotalToday(0);
        }
    }, []);

    // Persist data
    useEffect(() => {
        localStorage.setItem("tasbih-count", count.toString());
        localStorage.setItem("tasbih-total-today", totalToday.toString());
    }, [count, totalToday]);

    const playSound = useCallback(() => {
        if (!isSoundEnabled) return;
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.1);
    }, [isSoundEnabled]);

    const handleTargetReached = useCallback(() => {
        if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
        playSound();

        if (isPostSalahMode) {
            if (salahStep < 2) {
                const nextStep = salahStep + 1;
                const nextDhikr = nextStep === 1 ? Azkar[2] : Azkar[3];
                setSalahStep(nextStep);
                setSelectedDhikr(nextDhikr);
                setTarget(nextDhikr.target);
                setCount(0);
            } else {
                // Finished Post-Salah Cycle
                alert("MashaAllah! You have completed the Post-Salah Dhikr.");
                setIsPostSalahMode(false);
                setSalahStep(0);
                setSelectedDhikr(Azkar[0]);
                setTarget(33);
                setCount(0);
            }
        }
    }, [isPostSalahMode, salahStep, playSound]);

    const increment = () => {
        playSound();
        if (navigator.vibrate) navigator.vibrate(20);

        setCount((prev) => {
            const next = prev + 1;
            if (next === target) {
                setTimeout(handleTargetReached, 0);
            }
            return next;
        });
        setTotalToday((prev) => prev + 1);
    };

    const reset = () => {
        if (confirm("Are you sure you want to reset the current counter?")) {
            setCount(0);
        }
    };

    const startPostSalahMode = () => {
        setIsPostSalahMode(true);
        setSalahStep(0);
        setSelectedDhikr(Azkar[1]); // SubhanAllah
        setTarget(33);
        setCount(0);
    };

    const handleDhikrChange = (dhikrId: string) => {
        const found = Azkar.find(a => a.id === dhikrId);
        if (found) {
            setSelectedDhikr(found);
            setTarget(found.target);
            setCount(0);
            setIsPostSalahMode(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-background font-sans">
            <Header />

            <main className="flex-grow container mx-auto px-4 py-24">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4 flex items-center justify-center gap-2">
                        <Sparkles className="h-8 w-8 text-secondary animate-pulse" />
                        Digital Tasbih
                    </h1>
                    <p className="text-muted-foreground max-w-xl mx-auto">
                        Elevate your spiritual practice with guided Dhikr and daily progress tracking.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
                    {/* Left Side: Stats & Selection */}
                    <div className="lg:col-span-4 space-y-6">
                        <Card className="bg-card/50 backdrop-blur-sm border-primary/10">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
                                    <Trophy className="h-4 w-4 text-secondary" />
                                    Daily Progress
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex justify-between items-end">
                                    <div>
                                        <p className="text-3xl font-bold text-primary">{totalToday}</p>
                                        <p className="text-xs text-muted-foreground">Total counts today</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="flex gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <div key={i} className={cn("w-1.5 h-6 rounded-full", i < (totalToday / 100) ? "bg-primary" : "bg-muted")} />
                                            ))}
                                        </div>
                                        <p className="text-[10px] text-muted-foreground mt-1 uppercase tracking-tighter">Consistency Goal</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-card/50 backdrop-blur-sm border-primary/10">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
                                    <Sparkles className="h-4 w-4 text-secondary" />
                                    Dhikr Presets
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <Button
                                    variant={isPostSalahMode ? "default" : "outline"}
                                    className="w-full justify-start gap-3 h-12"
                                    onClick={startPostSalahMode}
                                >
                                    <CheckCircle2 className="h-4 w-4" />
                                    Post-Salah Cycle (33, 33, 34)
                                </Button>
                                <div className="grid grid-cols-1 gap-2 pt-2">
                                    {Azkar.map((a) => (
                                        <Button
                                            key={a.id}
                                            variant={!isPostSalahMode && selectedDhikr.id === a.id ? "secondary" : "ghost"}
                                            className="justify-start h-10 text-sm"
                                            onClick={() => handleDhikrChange(a.id)}
                                        >
                                            <span className="shrink-0 w-24 text-left font-semibold">{a.english}</span>
                                            <span className="text-muted-foreground text-xs truncate ml-auto">{a.translation}</span>
                                        </Button>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Center: The Counter */}
                    <div className="lg:col-span-8">
                        <Card className="h-full bg-card/40 backdrop-blur-md border-primary/20 shadow-2xl relative overflow-hidden group">
                            {/* Animated Background Element */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10 group-hover:scale-110 transition-transform duration-1000" />

                            <CardContent className="p-8 md:p-12 flex flex-col items-center justify-between h-full">
                                {/* Header / Dhikr Info */}
                                <div className="text-center space-y-2 mb-8">
                                    <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-2">
                                        {isPostSalahMode ? `Post-Salah Step ${salahStep + 1}/3` : 'Active Practice'}
                                    </div>
                                    <h2 className="text-5xl md:text-6xl font-arabic text-primary mb-4 leading-relaxed">
                                        {selectedDhikr.arabic}
                                    </h2>
                                    <p className="text-lg text-muted-foreground italic font-serif">
                                        "{selectedDhikr.translation}"
                                    </p>
                                </div>

                                {/* Main Tap Zone */}
                                <div className="relative mb-12">
                                    <div
                                        className="w-64 h-64 md:w-80 md:h-80 rounded-full border-[12px] border-primary/10 flex items-center justify-center bg-background shadow-2xl relative cursor-pointer active:scale-95 transition-all duration-75 select-none"
                                        onClick={increment}
                                    >
                                        <div className="text-center">
                                            <span className="text-8xl md:text-9xl font-mono font-bold text-primary tracking-tighter block leading-none">
                                                {count}
                                            </span>
                                            <div className="mt-4 flex flex-col items-center">
                                                <div className="h-1.5 w-16 bg-muted rounded-full overflow-hidden mb-2">
                                                    <div
                                                        className="h-full bg-secondary transition-all duration-300"
                                                        style={{ width: `${(count / target) * 100}%` }}
                                                    />
                                                </div>
                                                <span className="text-xs text-muted-foreground uppercase tracking-widest">
                                                    Target: {target}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Circular Progress Ring */}
                                        <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none scale-[1.03]">
                                            <circle
                                                cx="50%"
                                                cy="50%"
                                                r="48.5%"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="12"
                                                className="text-primary/10"
                                            />
                                            <circle
                                                cx="50%"
                                                cy="50%"
                                                r="48.5%"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="12"
                                                className="text-primary transition-all duration-300"
                                                strokeDasharray="305%"
                                                strokeDashoffset={`${305 - (305 * Math.min(count, target)) / target}%`}
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                    </div>

                                    {/* Tap Instructions */}
                                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-primary/10 px-4 py-1 rounded-full whitespace-nowrap">
                                        <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Tap anywhere to count</p>
                                    </div>
                                </div>

                                {/* Quick Tools */}
                                <div className="w-full flex items-center justify-center gap-4">
                                    <Button variant="outline" size="icon" onClick={() => setIsSoundEnabled(!isSoundEnabled)} title="Toggle Sound">
                                        {isSoundEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
                                    </Button>
                                    <Button variant="outline" size="icon" onClick={reset} title="Reset Counter">
                                        <RotateCcw className="h-5 w-5" />
                                    </Button>

                                    <div className="flex items-center gap-2 bg-muted/50 px-4 py-1.5 rounded-full border border-border/50">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-6 w-6 rounded-full hover:bg-background"
                                            onClick={() => setTarget(Math.max(1, target - 1))}
                                        >
                                            <Minus className="h-3 w-3" />
                                        </Button>
                                        <div className="flex flex-col items-center min-w-[4rem]">
                                            <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-tighter">Target</span>
                                            <span className="font-mono font-bold leading-none">{target}</span>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-6 w-6 rounded-full hover:bg-background"
                                            onClick={() => setTarget(target + 1)}
                                        >
                                            <Plus className="h-3 w-3" />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
