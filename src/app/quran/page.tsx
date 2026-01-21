"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useQuery } from "@tanstack/react-query";
import { getSurahs, Surah } from "@/lib/api/quran";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Search } from "lucide-react";

export default function QuranPage() {
    const { data: surahs, isLoading } = useQuery({
        queryKey: ["surahs"],
        queryFn: getSurahs,
    });

    const [searchQuery, setSearchQuery] = useState("");

    const filteredSurahs = surahs?.filter(
        (surah) =>
            surah.name_simple.toLowerCase().includes(searchQuery.toLowerCase()) ||
            surah.translated_name.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen flex flex-col bg-background font-sans">
            <Navbar />

            <main className="flex-grow container mx-auto px-4 py-24">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">
                        The Holy Quran
                    </h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                        Read, listen, and reflect upon the words of Allah.
                    </p>

                    <div className="relative max-w-md mx-auto">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search Surah..."
                            className="pl-10 bg-card/50 backdrop-blur-sm border-primary/20 focus:border-primary"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[...Array(9)].map((_, i) => (
                            <Skeleton key={i} className="h-24 w-full rounded-lg" />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredSurahs?.map((surah) => (
                            <Link key={surah.id} href={`/quran/${surah.id}`}>
                                <Card className="h-full hover:bg-primary/5 transition-colors border-primary/10 hover:border-primary/30 cursor-pointer group">
                                    <CardContent className="flex items-center justify-between p-6">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                                {surah.id}
                                            </div>
                                            <div>
                                                <h3 className="font-serif font-bold text-lg group-hover:text-primary transition-colors">
                                                    {surah.name_simple}
                                                </h3>
                                                <p className="text-xs text-muted-foreground">
                                                    {surah.translated_name.name}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-arabic text-xl text-primary/80">
                                                {surah.name_arabic}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {surah.verses_count} Ayahs
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
