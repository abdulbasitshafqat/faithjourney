
"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GlobalSettings } from "@/components/ui/global-settings";
import { duasData, duaCategories } from "@/lib/data/duas";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Bookmark, Loader2 } from "lucide-react";
import { toggleBookmark, checkBookmarksBatch } from "@/lib/api/bookmarks";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { useFontSize } from "@/components/providers/FontSizeProvider";

// Deep Emerald & Gold Theme Constants
const THEME = {
    bg: "bg-[#0A261E]", // Deep Emerald
    cardBg: "bg-[#113026]", // Lighter Emerald for cards
    textPrimary: "text-[#E6D5A7]", // Soft Gold
    textSecondary: "text-[#B0C4B1]", // Sage Green
    accent: "text-[#D4AF37]", // Metallic Gold
    border: "border-[#1F4D3E]", // Emerald Border
};

// Define local interface for Dua
interface Dua {
    id: string;
    category_id: string;
    arabic_text: string;
    translations: {
        en: string;
        ur: string;
    };
    transliteration: string;
    reference: string;
    virtue?: string;
    repeat_count: number;
}

export default function CategoryView({ categoryKey }: { categoryKey: string }) {
    const { fontSize } = useFontSize();
    const [mounted, setMounted] = useState(false);
    const [bookmarkedIds, setBookmarkedIds] = useState<Record<string, boolean>>({});
    const [loadingBookmarks, setLoadingBookmarks] = useState<Record<string, boolean>>({});
    const [user, setUser] = useState<User | null>(null);

    // Resolve category
    const categoryTitle = duaCategories[categoryKey as keyof typeof duaCategories];
    const categoryDuas = duasData.filter(d => d.category_id === categoryKey);

    useEffect(() => {
        setMounted(true);

        const checkStatus = async () => {
            const { data } = await supabase.auth.getUser();
            setUser(data.user);

            if (data.user && categoryDuas.length > 0) {
                const ids = categoryDuas.map(d => d.id);
                const status = await checkBookmarksBatch(ids, 'dua');
                setBookmarkedIds(status);
            }
        };
        checkStatus();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categoryKey]);

    const handleBookmark = async (dua: Dua) => {
        if (!user) {
            alert("Please sign in to bookmark Duas.");
            return;
        }

        setLoadingBookmarks(prev => ({ ...prev, [dua.id]: true }));
        try {
            const metadata = {
                title: categoryTitle,
                arabicText: dua.arabic_text,
                englishText: dua.translations.en,
                urduText: dua.translations.ur,
                reference: dua.reference
            };
            const result = await toggleBookmark(dua.id, 'dua', metadata);
            setBookmarkedIds(prev => ({ ...prev, [dua.id]: result.action === 'added' }));
        } catch (error) {
            console.error("Error bookmarking:", error);
        } finally {
            setLoadingBookmarks(prev => ({ ...prev, [dua.id]: false }));
        }
    };

    if (!mounted) return null;

    return (
        <div className={`min-h-screen flex flex-col ${THEME.bg} font-sans transition-colors duration-300`}>
            <Header />

            <main className="flex-grow container mx-auto px-4 py-24">
                {/* Header Navigation */}
                <div className="max-w-4xl mx-auto mb-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-4 self-start md:self-auto">
                        <Link href="/duas">
                            <Button variant="ghost" className={`${THEME.textPrimary} hover:text-white hover:bg-white/10`}>
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Categories
                            </Button>
                        </Link>
                    </div>

                    <div className="bg-[#113026] p-2 rounded-xl shadow-lg border border-[#1F4D3E]">
                        <GlobalSettings />
                    </div>
                </div>

                {/* Category Title */}
                <div className="text-center mb-12">
                    <h1 className={`text-3xl md:text-5xl font-serif font-bold ${THEME.textPrimary} mb-4 drop-shadow-md flex flex-col items-center gap-2`}>
                        <span>{categoryTitle?.split(" (")[0]}</span>
                        {categoryTitle?.includes(" (") && (
                            <span className="text-2xl md:text-3xl font-thin font-serif opacity-90 mt-1">
                                {categoryTitle.split(" (")[1].replace(")", "")}
                            </span>
                        )}
                    </h1>
                    <div className="h-1 w-24 mx-auto bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
                </div>

                {/* Duas List */}
                <div className="max-w-4xl mx-auto space-y-8">
                    {categoryDuas.map((dua, index) => {
                        const isBookmarked = bookmarkedIds[dua.id];
                        const isLoading = loadingBookmarks[dua.id];

                        return (
                            <Card key={dua.id} className={`${THEME.cardBg} ${THEME.border} shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group`}>
                                {/* Decorative Top Border */}
                                <div className="h-1.5 w-full bg-gradient-to-r from-[#1F4D3E] via-[#D4AF37] to-[#1F4D3E]" />

                                <CardHeader className="pb-4 border-b border-[#1F4D3E]/50">
                                    <div className="flex justify-between items-center">
                                        <CardTitle className={`font-serif text-xl ${THEME.accent} flex items-center gap-3`}>
                                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#1F4D3E] text-sm font-bold border border-[#D4AF37]/30">
                                                {index + 1}
                                            </span>
                                            <span className="text-sm opacity-60 font-normal tracking-widest uppercase">
                                                {dua.id}
                                            </span>
                                        </CardTitle>
                                        <div className="flex items-center gap-2">
                                            {dua.repeat_count > 0 && (
                                                <Badge variant="outline" className="border-[#D4AF37]/30 text-[#D4AF37] bg-[#D4AF37]/5 px-3 py-1">
                                                    {dua.repeat_count}x
                                                </Badge>
                                            )}
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleBookmark(dua)}
                                                disabled={isLoading}
                                                className={`rounded-full transition-all ${isBookmarked ? 'bg-[#D4AF37]/20 text-[#D4AF37]' : 'text-slate-400 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37]'}`}
                                            >
                                                {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Bookmark size={18} fill={isBookmarked ? "currentColor" : "none"} />}
                                            </Button>
                                        </div>
                                    </div>
                                </CardHeader>

                                <CardContent className="space-y-8 pt-8">
                                    {/* Arabic */}
                                    <div className="relative">
                                        <p
                                            className="font-arabic text-right leading-[2.5] text-[#FFFFFF] px-4 drop-shadow-sm selection:bg-[#D4AF37]/30"
                                            style={{ fontSize: `${fontSize * 1.8}px` }}
                                        >
                                            {dua.arabic_text}
                                        </p>
                                    </div>

                                    {/* Transliteration */}
                                    <div className="bg-[#0A261E]/50 p-6 rounded-xl border border-[#1F4D3E]/50 mx-2">
                                        <p className={`text-xs font-bold ${THEME.textSecondary} uppercase tracking-wider mb-2 opacity-70`}>Transliteration</p>
                                        <p
                                            className={`${THEME.textPrimary} italic font-serif leading-relaxed`}
                                            style={{ fontSize: `${fontSize}px` }}
                                        >
                                            {dua.transliteration}
                                        </p>
                                    </div>

                                    {/* Translations Grid */}
                                    <div className="grid md:grid-cols-2 gap-8 pt-4 px-2">
                                        <div className="space-y-3">
                                            <p className={`text-xs font-bold ${THEME.textSecondary} uppercase tracking-wider opacity-70`}>English</p>
                                            <p
                                                className="text-[#E0E0E0] leading-relaxed"
                                                style={{ fontSize: `${fontSize * 0.9}px` }}
                                            >
                                                {dua.translations.en}
                                            </p>
                                        </div>
                                        <div className="space-y-3 text-right" dir="rtl">
                                            <p className={`text-xs font-bold ${THEME.textSecondary} uppercase tracking-wider opacity-70`}>اردو</p>
                                            <p
                                                className="text-[#E0E0E0] leading-loose font-arabic"
                                                style={{ fontSize: `${fontSize * 1.1}px` }}
                                            >
                                                {dua.translations.ur}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Reference Section */}
                                    <div className="pt-6 mt-4 border-t border-[#1F4D3E]/50">
                                        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                                            <div className="flex-1">
                                                {dua.virtue && (
                                                    <div className="flex gap-3 mb-4 bg-[#D4AF37]/5 p-4 rounded-lg border border-[#D4AF37]/10">
                                                        <div className="h-full w-1 bg-[#D4AF37]/50 rounded-full" />
                                                        <p className={`text-sm ${THEME.textSecondary} leading-relaxed`}>
                                                            <span className={`font-semibold ${THEME.accent} block mb-1`}>Virtue / Context:</span>
                                                            {dua.virtue}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                            <Badge variant="outline" className={`w-fit whitespace-nowrap border-[#1F4D3E] ${THEME.textSecondary} text-xs font-normal opacity-70 mt-1`}>
                                                Ref: {dua.reference}
                                            </Badge>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}

                    {categoryDuas.length === 0 && (
                        <div className="text-center py-20 bg-[#113026]/50 rounded-2xl border border-[#1F4D3E] border-dashed">
                            <p className={THEME.textSecondary}>No supplications found for this category.</p>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
