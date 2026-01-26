"use client";

import { useState } from "react";
import { WonderCard, Wonder } from "@/components/wonders/WonderCard";
import wondersData from "@/lib/data/wonders.json";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export default function WondersPage() {
    const [selectedCategory, setSelectedCategory] = useState("All");

    const categories = ["All", ...Array.from(new Set(wondersData.map((w) => w.category)))];

    const filteredWonders = selectedCategory === "All"
        ? wondersData
        : wondersData.filter((w) => w.category === selectedCategory);

    return (
        <div className="min-h-screen w-full bg-gradient-to-b from-[#022c22] via-[#0f172a] to-[#022c22] px-4 py-8 md:px-8">
            {/* Background Decor */}
            <div className="fixed inset-0 z-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay"></div>

            <div className="relative z-10 mx-auto max-w-7xl">
                {/* Header */}
                <header className="mb-12 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-4 font-serif text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 to-amber-100 md:text-6xl drop-shadow-md"
                    >
                        Wonders of the Divine
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="mx-auto max-w-2xl text-lg text-emerald-100/80 font-sans"
                    >
                        Explore the miraculous scientific truths revealed in the Quran centuries before modern discovery. A journey through cosmos, earth, and life.
                    </motion.p>
                </header>

                {/* Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mb-12 flex flex-wrap justify-center gap-2"
                >
                    {categories.map((cat) => (
                        <Button
                            key={cat}
                            variant={selectedCategory === cat ? "default" : "outline"}
                            onClick={() => setSelectedCategory(cat)}
                            className={`rounded-full border-emerald-500/30 px-6 backdrop-blur-md transition-all
                ${selectedCategory === cat
                                    ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/50"
                                    : "bg-white/5 hover:bg-white/10 text-emerald-100 dark:border-emerald-800"
                                }`}
                        >
                            {cat}
                        </Button>
                    ))}
                </motion.div>

                {/* Grid */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 auto-rows-min">
                    <AnimatePresence mode="popLayout">
                        {filteredWonders.map((wonder, index) => (
                            <WonderCard
                                key={wonder.id}
                                wonder={wonder}
                                index={index}
                            />
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
