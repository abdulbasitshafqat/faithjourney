"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RotateCcw, Plus, Minus } from "lucide-react";
import { useState, useEffect } from "react";

export default function TasbihPage() {
    const [count, setCount] = useState(0);
    const [target, setTarget] = useState(33);

    useEffect(() => {
        const savedCount = localStorage.getItem("tasbih-count");
        if (savedCount) setCount(parseInt(savedCount));
    }, []);

    useEffect(() => {
        localStorage.setItem("tasbih-count", count.toString());
    }, [count]);

    const increment = () => {
        setCount((prev) => {
            const newCount = prev + 1;
            if (newCount === target) {
                if (navigator.vibrate) navigator.vibrate(200);
            }
            return newCount;
        });
    };

    const reset = () => {
        if (confirm("Are you sure you want to reset the counter?")) {
            setCount(0);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-background font-sans">
            <Navbar />

            <main className="flex-grow container mx-auto px-4 py-24 flex flex-col items-center justify-center">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">
                        Digital Tasbih
                    </h1>
                    <p className="text-muted-foreground">
                        Keep track of your Dhikr with ease and focus.
                    </p>
                </div>

                <Card className="w-full max-w-sm mx-auto bg-card/50 backdrop-blur-sm border-primary/10 shadow-xl">
                    <CardContent className="p-8 flex flex-col items-center">
                        {/* Display */}
                        <div className="w-48 h-48 rounded-full border-8 border-primary/20 flex items-center justify-center mb-8 bg-background shadow-inner relative">
                            <div className="text-center">
                                <span className="text-6xl font-mono font-bold text-primary block">
                                    {count}
                                </span>
                                <span className="text-xs text-muted-foreground uppercase tracking-widest mt-2 block">
                                    Count
                                </span>
                            </div>

                            {/* Progress Ring (Visual Only for now) */}
                            <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
                                <circle
                                    cx="96"
                                    cy="96"
                                    r="88"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    className="text-primary transition-all duration-300"
                                    strokeDasharray={553}
                                    strokeDashoffset={553 - (553 * (count % target)) / target}
                                    strokeLinecap="round"
                                />
                            </svg>
                        </div>

                        {/* Controls */}
                        <div className="w-full space-y-6">
                            <Button
                                size="lg"
                                className="w-full h-24 text-2xl rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg active:scale-95 transition-transform"
                                onClick={increment}
                            >
                                Tap to Count
                            </Button>

                            <div className="flex items-center justify-between gap-4">
                                <Button variant="outline" size="icon" onClick={reset} title="Reset">
                                    <RotateCcw className="h-5 w-5" />
                                </Button>

                                <div className="flex items-center gap-2 bg-muted/50 px-3 py-1 rounded-lg">
                                    <span className="text-sm text-muted-foreground">Target:</span>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-6 w-6"
                                        onClick={() => setTarget(Math.max(1, target - 1))}
                                    >
                                        <Minus className="h-3 w-3" />
                                    </Button>
                                    <span className="font-mono font-bold w-8 text-center">{target}</span>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-6 w-6"
                                        onClick={() => setTarget(target + 1)}
                                    >
                                        <Plus className="h-3 w-3" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </main>

            <Footer />
        </div>
    );
}
