'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RotateCcw, Check, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
// import { toast } from '@/hooks/use-toast'; 

// Haptic feedback helper
const vibrate = (pattern: number | number[]) => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(pattern);
    }
};

interface TasbihCardProps {
    title: string;
    target: number;
    arabicText?: string;
    translation?: string;
    transliteration?: string;
    initialCount?: number;
    onComplete?: () => void;
}

export function TasbihCard({
    title = "Istighfar",
    target = 100,
    arabicText = "أَسْتَغْفِرُ ٱللَّٰهَ",
    translation = "I seek forgiveness from Allah",
    initialCount = 0,
    onComplete
}: TasbihCardProps) {
    const [count, setCount] = useState(initialCount);
    const [isCompleted, setIsCompleted] = useState(false);
    const [animate, setAnimate] = useState(false);

    const increment = () => {
        if (count >= target) return;

        const newCount = count + 1;
        setCount(newCount);

        // Trigger generic tap vibration
        vibrate(10);

        // Trigger animation
        setAnimate(true);
        setTimeout(() => setAnimate(false), 200); // Reset animation state

        if (newCount === target) {
            setIsCompleted(true);
            vibrate([50, 50, 50]); // Success vibration
            if (onComplete) onComplete();
        }
    };

    const reset = () => {
        setCount(0);
        setIsCompleted(false);
        vibrate(20);
    };

    const progress = (count / target) * 100;

    return (
        <Card className="relative overflow-hidden border-none shadow-2xl bg-white/50 dark:bg-black/20 backdrop-blur-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />

            <CardHeader className="relative z-10 text-center space-y-4 pb-2">
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-2">
                    <Zap className="h-6 w-6" />
                </div>
                <CardTitle className="text-3xl font-serif font-black">{title}</CardTitle>
                <CardDescription className="text-base font-medium text-muted-foreground">{translation}</CardDescription>
            </CardHeader>

            <CardContent className="relative z-10 p-6 pt-2 space-y-8">
                {/* Arabic Display */}
                <div className="text-center py-6 min-h-[140px] flex items-center justify-center relative">
                    <p className={cn(
                        "font-gulzar text-5xl md:text-6xl text-primary transition-all duration-300",
                        animate ? "scale-105 opacity-80" : "scale-100 opacity-100",
                        isCompleted ? "text-emerald-500" : ""
                    )}>
                        {arabicText}
                    </p>
                </div>

                {/* Progress Circle / Tap Area */}
                <div className="flex justify-center">
                    <button
                        onClick={increment}
                        disabled={isCompleted}
                        className={cn(
                            "w-48 h-48 rounded-full flex flex-col items-center justify-center relative transition-all duration-200 active:scale-95 touch-manipulation outline-none ring-4 ring-offset-4 ring-offset-background",
                            isCompleted
                                ? "bg-emerald-500 text-white ring-emerald-200 cursor-default"
                                : "bg-gradient-to-b from-primary to-primary/80 text-white shadow-[0_20px_50px_rgba(var(--primary),0.3)] ring-transparent hover:ring-primary/20",
                        )}
                        style={{ WebkitTapHighlightColor: 'transparent' }} // Disable blue highlight on mobile
                    >
                        {/* Progress Ring (SVG) could go here for advanced visual, using simple border for now */}

                        {isCompleted ? (
                            <div className="flex flex-col items-center animate-in zoom-in spin-in-12 duration-500">
                                <Check className="h-16 w-16 mb-2" />
                                <span className="text-lg font-bold uppercase tracking-widest">Completed</span>
                            </div>
                        ) : (
                            <>
                                <span className="text-7xl font-sans font-black tracking-tighter tabular-nums leading-none mb-1">
                                    {count}
                                </span>
                                <span className="text-xs font-bold uppercase tracking-[0.2em] opacity-80">
                                    / {target}
                                </span>
                            </>
                        )}
                    </button>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <div
                            className="h-full bg-primary transition-all duration-300 ease-out"
                            style={{ width: `${progress}%`, backgroundColor: isCompleted ? '#10b981' : undefined }}
                        />
                    </div>
                    <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-muted-foreground">
                        <span>Start</span>
                        <span>Goal: {target}</span>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex justify-center pt-4">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={reset}
                        className="text-muted-foreground hover:text-destructive transition-colors"
                    >
                        <RotateCcw className="mr-2 h-4 w-4" /> Reset Counter
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
