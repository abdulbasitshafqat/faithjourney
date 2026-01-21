"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { duaCategories } from "@/lib/data/duas";
import Link from "next/link";
import { ArrowRight, Moon, Sun, Heart, Shield, Sparkles, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

// Deep Emerald & Gold Theme Constants
const THEME = {
    bg: "bg-[#0A261E]", // Deep Emerald
    cardBg: "bg-[#113026]", // Lighter Emerald for cards
    cardHover: "hover:bg-[#1A4033]",
    textPrimary: "text-[#E6D5A7]", // Soft Gold
    textSecondary: "text-[#B0C4B1]", // Sage Green
    accent: "text-[#D4AF37]", // Metallic Gold
    border: "border-[#1F4D3E]", // Emerald Border
};

// Helper to assign icons (optional enhancement)
const getIcon = (key: string) => {
    if (key.includes("morning") || key.includes("waking")) return <Sun className="w-6 h-6 text-[#D4AF37]" />;
    if (key.includes("evening") || key.includes("night") || key.includes("sleep")) return <Moon className="w-6 h-6 text-[#B0C4B1]" />;
    if (key.includes("healing") || key.includes("mercy")) return <Heart className="w-6 h-6 text-rose-400" />;
    if (key.includes("protection") || key.includes("enemy") || key.includes("evil")) return <Shield className="w-6 h-6 text-emerald-400" />;
    if (key.includes("allah") || key.includes("praise")) return <Sparkles className="w-6 h-6 text-amber-400" />;
    return <BookOpen className="w-6 h-6 text-[#D4AF37]" />;
};

export default function DuasLandingPage() {
    return (
        <div className={`min-h-screen flex flex-col ${THEME.bg} font-sans transition-colors duration-300`}>
            <Navbar />

            <main className="flex-grow container mx-auto px-4 py-24">
                {/* Hero Section */}
                <div className="text-center mb-16 max-w-2xl mx-auto space-y-6">
                    <h1 className={`text-5xl md:text-6xl font-serif font-bold ${THEME.textPrimary} drop-shadow-lg leading-tight`}>
                        Supplications <br />
                        <span className="text-3xl md:text-4xl opacity-80 font-light">& Azkaar</span>
                    </h1>
                    <p className={`${THEME.textSecondary} text-lg leading-relaxed`}>
                        Authentic prayers from the Quran and Sunnah (Hisn al-Muslim). Select a category to begin your spiritual connection.
                    </p>
                    <div className="flex justify-center">
                        <div className="h-1 w-32 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-50" />
                    </div>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {Object.entries(duaCategories).map(([key, label]) => (
                        <Link href={`/duas/${key}`} key={key} className="group">
                            <div className={`${THEME.cardBg} ${THEME.border} border rounded-2xl p-6 h-full transition-all duration-300 ${THEME.cardHover} transform hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between`}>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-start">
                                        <div className="p-3 rounded-full bg-[#0A261E] border border-[#1F4D3E] group-hover:border-[#D4AF37]/50 transition-colors">
                                            {getIcon(key)}
                                        </div>
                                        <ArrowRight className={`w-5 h-5 ${THEME.textSecondary} opacity-0 group-hover:opacity-100 transition-all transform -translate-x-2 group-hover:translate-x-0`} />
                                    </div>

                                    <h3 className={`text-xl font-serif font-semibold ${THEME.textPrimary} group-hover:text-white transition-colors`}>
                                        {label}
                                    </h3>
                                </div>

                                <div className="mt-6 pt-4 border-t border-[#1F4D3E]/50 group-hover:border-[#D4AF37]/30 transition-colors flex justify-end">
                                    <span className={`text-xs uppercase tracking-widest ${THEME.accent} font-medium opacity-80`}>
                                        View Duas
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
}
