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
                            Wonders of Allah
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

                {/* Main Card Display */}
                <div className="relative aspect-[4/5] md:aspect-[21/9] max-w-6xl mx-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeWonder.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.5, ease: "circOut" }}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={0.2}
                            onDragEnd={(e, { offset, velocity }) => {
                                const swipe = offset.x; // simple offset check
                                if (swipe < -50) {
                                    handleNext();
                                } else if (swipe > 50) {
                                    handlePrev();
                                }
                            }}
                            className="w-full h-full relative rounded-[3rem] overflow-hidden group shadow-2xl border border-white/10 cursor-grab active:cursor-grabbing"
                        >
                            {/* Card Background Image */}
                            <div className="absolute inset-0">
                                <img
                                    src={activeWonder.visual_asset}
                                    alt={activeWonder.title}
                                    className="w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
                            </div>

                            {/* Card Content */}
                            <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-end md:justify-center md:items-start max-w-4xl">
                                <div className="space-y-6 md:space-y-8 relative">
                                    <div className="overflow-hidden">
                                        <motion.div
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.2 }}
                                            className="inline-block px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-xl text-emerald-300 text-xs font-bold uppercase tracking-widest mb-4"
                                        >
                                            {activeWonder.category}
                                        </motion.div>
                                    </div>

                                    <h3 className="text-3xl md:text-6xl font-serif font-black text-white leading-[1.1] drop-shadow-lg">
                                        {activeWonder.title}
                                    </h3>

                                    <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-white/10 max-w-2xl">
                                        <p className="font-arabic text-2xl md:text-3xl text-right text-emerald-100 mb-6 leading-loose">
                                            {activeWonder.verse_arabic}
                                        </p>
                                        <div className="space-y-4">
                                            <div className="flex items-start gap-4">
                                                <div className="p-2 bg-emerald-500/10 rounded-lg shrink-0 mt-1">
                                                    <Info className="h-4 w-4 text-emerald-400" />
                                                </div>
                                                <div>
                                                    <p className="text-white/90 leading-relaxed font-medium">
                                                        {activeWonder.scientific_fact}
                                                    </p>
                                                    <p className="text-emerald-400/60 text-sm mt-3 font-mono">
                                                        {activeWonder.verse_reference}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Mobile Swipe Hint */}
                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 md:hidden text-white/40 text-xs uppercase tracking-widest animate-pulse">
                                Swipe for more
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Progress Indicator */}
                    <div className="absolute -bottom-10 left-0 right-0 flex justify-center gap-2">
                        {wonders.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveIndex(idx)}
                                className={cn(
                                    "h-1.5 rounded-full transition-all duration-300",
                                    idx === activeIndex ? "w-8 bg-emerald-500" : "w-1.5 bg-white/10 hover:bg-white/30"
                                )}
                            />
                        ))}
                    </div>
                </div>

                <div className="mt-20 text-center">
                    <Button
                        size="lg"
                        variant="outline"
                        className="h-14 px-8 rounded-full border-white/10 bg-white/5 hover:bg-white/10 hover:text-white text-white font-bold tracking-wide"
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
