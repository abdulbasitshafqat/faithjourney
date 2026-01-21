"use client";

import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface SettingsPanelProps {
    fontSize: number;
    setFontSize: (size: number) => void;
}

export function SettingsPanel({ fontSize, setFontSize }: SettingsPanelProps) {
    const { setTheme, theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="flex items-center gap-2">
            {/* Font Size Control */}
            <div className="flex items-center bg-muted/50 rounded-lg p-1 border">
                <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8"
                    onClick={() => setFontSize(Math.max(14, fontSize - 2))}
                    disabled={fontSize <= 14}
                >
                    <span className="text-xs">A-</span>
                </Button>
                <span className="w-8 text-center text-xs font-medium tabular-nums">
                    {fontSize}px
                </span>
                <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8"
                    onClick={() => setFontSize(Math.min(32, fontSize + 2))}
                    disabled={fontSize >= 32}
                >
                    <span className="text-lg">A+</span>
                </Button>
            </div>

            {/* Theme Toggle */}
            <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 border-muted-foreground/20"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
            </Button>
        </div>
    );
}
