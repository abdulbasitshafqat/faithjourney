"use client";

import { useRef, useState, useEffect } from "react";
import { Wonder } from "@/components/wonders/WonderCard";
import wondersData from "@/lib/data/wonders.json";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight, Share2, Info } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export function WondersSection() {
    const [wonders, setWonders] = useState<Wonder[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);

    // Load random wonders on mount
    useEffect(() => {
        // Shuffle and pick 7 random wonders
        const shuffled = [...wondersData].sort(() => 0.5 - Math.random());
        setWonders(shuffled.slice(0, 7) as Wonder[]);
    }, []);

    const handleNext = () => {
        setActiveIndex((prev) => (prev + 1) % wonders.length);
    };

    const handlePrev = () => {
        setActiveIndex((prev) => (prev - 1 + wonders.length) % wonders.length);
    };

    if (wonders.length === 0) return null;

    const activeWonder = wonders[activeIndex];

    return (
        <section className="py-24 relative overflow-hidden bg-black text-white">
            {/* Ambient Background */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-black via-slate-950 to-emerald-950/20" />
                <div
                    className="absolute inset-0 opacity-20 transition-opacity duration-1000 bg-cover bg-center blur-3xl scale-110"
                    style={{ backgroundImage: `url(${activeWonder.visual_asset})` }}
                />
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-soft-light" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em] backdrop-blur-md">
                            <Sparkles className="h-3 w-3" />
                            Divine Signs
                        </div>
                        <h2 className="text-4xl md:text-6xl font-serif font-black text-white tracking-tighter">
                            Wonders of the Divine
                        </h2>
                        <p className="text-gray-400 text-lg max-w-xl font-medium leading-relaxed">
                            Discover the breathtaking scientific miracles and cosmic signs revealed in the Holy Quran centuries before modern discovery.
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={handlePrev}
                                className="h-12 w-12 rounded-full border-white/10 bg-white/5 hover:bg-white/10 hover:text-white transition-all"
                            >
                                <ChevronLeft className="h-5 w-5" />
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={handleNext}
                                className="h-12 w-12 rounded-full border-white/10 bg-white/5 hover:bg-white/10 hover:text-white transition-all"
                            >
                                <ChevronRight className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Main Card Display - Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[400px] max-w-7xl mx-auto">
                    {wonders.map((wonder, i) => (
                        <div
                            key={wonder.id}
                            className={cn(
                                "group relative rounded-[2rem] overflow-hidden border border-white/10 shadow-xl transition-all duration-500 hover:shadow-2xl hover:scale-[1.01] bg-white/5 backdrop-blur-sm",
                                (i === 0 || i === 3) ? "md:col-span-2" : "md:col-span-1"
                            )}
                        >
                            {/* Background Image */}
                            <div className="absolute inset-0 bg-slate-900">
                                <img
                                    src={wonder.visual_asset}
                                    alt={wonder.title}
                                    className="w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-70 transition-opacity" />
                            </div>

                            {/* Content */}
                            <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                <div className="transform translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 transition-transform duration-500">
                                    <span className="inline-block px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-lg text-emerald-300 text-[10px] font-bold uppercase tracking-widest mb-3 backdrop-blur-md">
                                        {wonder.category}
                                    </span>
                                    <h3 className={cn(
                                        "font-serif font-black text-white leading-[1.1] mb-2 drop-shadow-lg",
                                        (i === 0 || i === 3) ? "text-3xl md:text-5xl" : "text-2xl md:text-3xl"
                                    )}>
                                        {wonder.title}
                                    </h3>

                                    <div className="space-y-3 opacity-100 h-auto md:opacity-0 md:h-0 md:group-hover:opacity-100 md:group-hover:h-auto transition-all duration-500 delay-100 overflow-hidden">
                                        <p className="text-white/90 text-sm md:text-base font-medium leading-relaxed line-clamp-3">
                                            {wonder.scientific_fact}
                                        </p>
                                        <div className="pt-2 flex items-center gap-2 text-emerald-400 text-xs font-mono">
                                            <Info className="h-3 w-3" />
                                            {wonder.verse_reference}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-20 text-center">
                    <Button
                        size="lg"
                        variant="outline"
                        className="h-14 px-8 rounded-full border-white/10 bg-white/5 hover:bg-white/10 hover:text-white text-white font-bold tracking-wide transition-all"
                        asChild
                    >
                        <Link href="/wonders">
                            View All Divine Signs <ArrowRight className="h-4 w-4 ml-2" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
