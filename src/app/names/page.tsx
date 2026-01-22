"use client";

import { useState, useMemo } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Volume2, Sparkles, Filter } from "lucide-react";
import { namesOfAllah } from "@/lib/data/names";
import { cn } from "@/lib/utils";

export default function NamesPage() {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredNames = useMemo(() => {
        return namesOfAllah.filter(name =>
            name.transliteration.toLowerCase().includes(searchQuery.toLowerCase()) ||
            name.meaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
            name.arabic.includes(searchQuery)
        );
    }, [searchQuery]);

    return (
        <div className="min-h-screen flex flex-col bg-background font-sans">
            <Header />

            <main className="flex-grow pt-24">
                {/* Hero Section with Decorative Pattern */}
                <section className="relative py-20 overflow-hidden bg-primary/5">
                    <div className="absolute inset-0 opacity-5 pointer-events-none">
                        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--primary)_1px,_transparent_1px)] bg-[length:40px_40px]" />
                    </div>

                    <div className="container mx-auto px-4 text-center relative z-10">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6">
                            <Sparkles size={14} />
                            Divine Attributes
                        </div>
                        <h1 className="text-4xl md:text-7xl font-serif font-bold text-primary mb-6">
                            99 Names <span className="text-foreground">of Allah</span>
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed italic">
                            "And to Allah belong the best names, so invoke Him by them."
                            <span className="block mt-2 font-bold text-primary not-italic text-sm uppercase tracking-wider">— Surah Al-A'raf 7:180</span>
                        </p>
                    </div>
                </section>

                {/* Search & Filter Section */}
                <section className="container mx-auto px-4 -mt-8 relative z-20">
                    <div className="max-w-2xl mx-auto">
                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={20} />
                            <Input
                                placeholder="Search by name, meaning or number..."
                                className="pl-12 h-16 rounded-2xl border-primary/20 bg-card/80 backdrop-blur-xl shadow-xl focus-visible:ring-primary text-lg"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </section>

                {/* Names Grid */}
                <section className="container mx-auto px-4 py-16">
                    {filteredNames.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                            {filteredNames.map((name) => (
                                <Card
                                    key={name.id}
                                    className="group relative overflow-hidden bg-card border-primary/10 hover:border-primary/50 transition-all duration-500 shadow-sm hover:shadow-2xl hover:-translate-y-2 rounded-3xl"
                                >
                                    {/* Abstract Gradient Background */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    <CardContent className="p-8 flex flex-col items-center text-center relative z-10 h-full">
                                        <div className="flex justify-between w-full mb-6">
                                            <span className="w-10 h-10 rounded-xl bg-primary/10 text-primary text-sm font-bold flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                                                {name.id}
                                            </span>
                                            <button className="text-muted-foreground hover:text-primary transition-colors">
                                                <Volume2 size={18} />
                                            </button>
                                        </div>

                                        <div className="flex-grow flex flex-col items-center justify-center">
                                            <h3 className="font-arabic text-5xl text-primary mb-6 group-hover:scale-110 transition-transform duration-500 leading-tight">
                                                {name.arabic}
                                            </h3>
                                            <p className="text-xl font-serif font-bold text-foreground mb-2">
                                                {name.transliteration}
                                            </p>
                                            <p className="text-sm text-muted-foreground leading-relaxed px-2">
                                                {name.meaning}
                                            </p>
                                        </div>

                                        <div className="mt-8 w-12 h-1 bg-primary/10 group-hover:w-full group-hover:bg-primary/30 transition-all duration-500 rounded-full" />
                                    </CardContent>

                                    {/* Decorative Accent */}
                                    <div className="absolute bottom-0 right-0 w-24 h-24 bg-primary/5 rounded-tl-full translate-x-12 translate-y-12 group-hover:translate-x-4 group-hover:translate-y-4 transition-transform duration-700 blur-2xl" />
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <div className="py-20 text-center">
                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-4">
                                <Search size={32} className="text-muted-foreground" />
                            </div>
                            <h3 className="text-xl font-bold text-foreground">No names found</h3>
                            <p className="text-muted-foreground">Try searching with a different keyword.</p>
                        </div>
                    )}
                </section>
            </main>

            <Footer />
        </div>
    );
}
