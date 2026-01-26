"use client";

import { useEffect, useState } from "react";
import { Moon } from "lucide-react";

export function SplashScreen({ onFinish }: { onFinish: () => void }) {
    const [isVisible, setIsVisible] = useState(true);
    const [shouldRender, setShouldRender] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(() => {
                setShouldRender(false);
                onFinish();
            }, 700); // Smooth fade out
        }, 2200); // Premium visible duration

        return () => clearTimeout(timer);
    }, [onFinish]);

    if (!shouldRender) return null;

    return (
        <div
            className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background transition-opacity duration-700 ${isVisible ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        >
            <div className="relative flex flex-col items-center">
                <div className="mb-8 relative">
                    <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-150 animate-pulse" />
                    <Moon className="h-20 w-20 text-primary relative z-10 rotate-[-15deg]" />
                </div>

                <h1 className="text-5xl md:text-6xl font-serif font-bold text-primary tracking-tight animate-in fade-in zoom-in duration-1000 slide-in-from-bottom-6">
                    Faith Journey <span className="text-foreground">Pro</span>
                </h1>

                <div className="mt-12 flex gap-3">
                    <div className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <div className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <div className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce" />
                </div>
            </div>
        </div>
    );
}
