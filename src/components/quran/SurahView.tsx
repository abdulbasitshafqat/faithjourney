"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useQuery } from "@tanstack/react-query";
import { getSurahDetails, getAyahs, getSurahRecitation, Word } from "@/lib/api/quran";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Play, Pause, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { useFontSize } from "@/components/providers/FontSizeProvider";
import { cn } from "@/lib/utils";

interface SurahViewProps {
    id: number;
}

import { motion } from "framer-motion";
import { useProgress } from "@/hooks/useProgress";
import { TafseerDrawer } from "./TafseerDrawer";
import { Ayah } from "@/lib/api/quran";

import { useAudioPlayer } from "@/components/providers/AudioPlayerContext";

export default function SurahView({ id }: SurahViewProps) {
    const { updateProgress } = useProgress();
    const router = useRouter();

    const [selectedAyahForTafseer, setSelectedAyahForTafseer] = useState<Ayah | null>(null);
    const [isTafseerOpen, setIsTafseerOpen] = useState(false);

    const { data: surah, isLoading: isSurahLoading } = useQuery({
        queryKey: ["surah", id],
        queryFn: () => getSurahDetails(id),
    });

    const { data: ayahs, isLoading: isAyahsLoading } = useQuery({
        queryKey: ["ayahs", id],
        queryFn: () => getAyahs(id),
    });

    const {
        isPlaying,
        isLoading: isAudioLoading,
        currentSurahId,
        activeVerseKey,
        activeWordPosition,
        playSurah,
        togglePlay,
        audioLanguage,
        setAudioLanguage
    } = useAudioPlayer();

    const { fontSize } = useFontSize();
    const [jumpAyah, setJumpAyah] = useState("");

    const handleJump = (e: React.FormEvent) => {
        e.preventDefault();
        const element = document.getElementById(`ayah-${id}-${jumpAyah}`);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "center" });
            setJumpAyah("");
        }
    };

    // Auto-scroll to active ayah
    useEffect(() => {
        if (activeVerseKey && currentSurahId === id) {
            const element = document.getElementById(`ayah-${activeVerseKey.replace(":", "-")}`);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }, [activeVerseKey, currentSurahId, id]);

    if (isSurahLoading || isAyahsLoading) {
        return (
            <div className="min-h-screen flex flex-col bg-background font-sans">
                <Header />
                <main className="flex-grow container mx-auto px-4 py-24">
                    <Skeleton className="h-12 w-1/2 mx-auto mb-8" />
                    <div className="space-y-4">
                        {[...Array(5)].map((_, i) => (
                            <Skeleton key={i} className="h-32 w-full rounded-lg" />
                        ))}
                    </div>
                </main>
            </div>
        );
    }

    if (!surah || !ayahs) return null;

    return (
        <div className="min-h-screen flex flex-col bg-background font-sans pt-16">
            <Header />

            {/* Sticky Header for Audio Player & Navigation */}
            <div className="sticky top-16 z-40 bg-background/80 backdrop-blur-md border-b border-border/50 py-4">
                <div className="container mx-auto px-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => router.push(id > 1 ? `/quran/${id - 1}` : "/quran")}
                            disabled={id <= 1}
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </Button>
                        <div className="text-center">
                            <h2 className="font-serif font-bold text-lg">{surah.name_simple}</h2>
                            <p className="text-xs text-muted-foreground">{surah.translated_name.name}</p>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => router.push(id < 114 ? `/quran/${id + 1}` : "/quran")}
                            disabled={id >= 114}
                        >
                            <ChevronRight className="h-5 w-5" />
                        </Button>
                    </div>

                    {/* Fast Jump */}
                    <form onSubmit={handleJump} className="flex items-center space-x-2">
                        <span className="text-sm font-medium whitespace-nowrap hidden md:inline">Quick Jump:</span>
                        <Input
                            type="number"
                            placeholder="Ayah..."
                            className="w-20 h-8 text-sm"
                            value={jumpAyah}
                            onChange={(e) => setJumpAyah(e.target.value)}
                            min={1}
                        />
                    </form>

                    <div className="flex items-center space-x-3">
                        {audioLanguage === 'ur' && (
                            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded hidden md:inline-block font-medium animate-pulse">
                                Urdu Translation Sync Active
                            </span>
                        )}
                        <div className="flex bg-muted/50 rounded-lg p-0.5">
                            <button
                                onClick={() => setAudioLanguage('ar')}
                                className={`px-2 py-1 text-xs font-medium rounded-md transition-all ${audioLanguage === 'ar' ? 'bg-background shadow-sm text-primary' : 'text-muted-foreground hover:text-primary'}`}
                            >
                                AR
                            </button>
                            <button
                                onClick={() => setAudioLanguage('ur')}
                                className={`px-2 py-1 text-xs font-medium rounded-md transition-all ${audioLanguage === 'ur' ? 'bg-background shadow-sm text-primary' : 'text-muted-foreground hover:text-primary'}`}
                            >
                                UR
                            </button>
                        </div>

                        <Button
                            size="icon"
                            className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                            onClick={() => {
                                if (currentSurahId === id) {
                                    togglePlay();
                                } else {
                                    playSurah(id, surah.name_simple);
                                }
                            }}
                            disabled={isAudioLoading}
                        >
                            {currentSurahId === id && isPlaying ? (
                                <Pause className="h-5 w-5" />
                            ) : (
                                <Play className="h-5 w-5 ml-1" />
                            )}
                        </Button>
                    </div>
                </div>
            </div>

            <main className="flex-grow container mx-auto px-4 py-8">
                {/* Bismillah - Show for all except Surah Al-Fatihah (1) and At-Tawbah (9) */}
                {Number(surah.id) !== 1 && Number(surah.id) !== 9 && surah.name_simple !== "Al-Fatihah" && (
                    <div key="bismillah-header" className="mb-10 mt-6 text-center font-arabic text-3xl md:text-5xl text-primary py-2 max-w-full overflow-hidden flex justify-center">
                        <span className="whitespace-nowrap px-4 drop-shadow-sm">﷽</span>
                    </div>
                )}

                <div className="space-y-6 max-w-4xl mx-auto">
                    {ayahs.map((ayah) => {
                        // 20: English, 54/234: Urdu
                        const englishTranslation = ayah.translations?.find(t => t.resource_id === 20)?.text;
                        const urduTranslation = ayah.translations?.find(t => t.resource_id === 54 || t.resource_id === 234)?.text;

                        const isAyahActive = activeVerseKey === ayah.verse_key;

                        return (
                            <motion.div
                                key={ayah.id}
                                initial={{ opacity: 0.95 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ margin: "-20% 0px -50% 0px" }}
                                onViewportEnter={() => {
                                    const ayahNum = parseInt(ayah.verse_key.split(":")[1]);
                                    updateProgress(id, ayahNum);
                                }}
                            >
                                <Card
                                    id={`ayah-${ayah.verse_key.replace(":", "-")}`}
                                    className={cn(
                                        "border-none shadow-sm transition-all duration-500 cursor-pointer hover:shadow-md hover:scale-[1.005] active:scale-[0.995]",
                                        isAyahActive ? 'bg-primary/5 ring-1 ring-primary/50' : 'bg-card/50 hover:bg-card'
                                    )}
                                    onClick={() => {
                                        setSelectedAyahForTafseer(ayah);
                                        setIsTafseerOpen(true);
                                    }}
                                >
                                    <CardContent className="p-6">
                                        <div className="flex flex-col space-y-8">
                                            {/* Arabic Text */}
                                            <div className="flex justify-between items-start w-full">
                                                <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-xs text-primary font-medium shrink-0 mt-1 font-sans">
                                                    {ayah.verse_key.split(":")[1]}
                                                </div>

                                                <div
                                                    className="text-right w-full pl-4 leading-[2.2] flex flex-wrap justify-end gap-x-1"
                                                    dir="rtl"
                                                >
                                                    {ayah.words?.map((word, wordIndex) => {
                                                        const isWordActive = isAyahActive && activeWordPosition === word.position;

                                                        // Handle end of verse marker
                                                        if (word.char_type_name === "end") {
                                                            return (
                                                                <span
                                                                    key={word.id}
                                                                    className="text-primary font-arabic select-none text-2xl mx-1"
                                                                    style={{ fontSize: `${fontSize * 0.8}px` }}
                                                                >
                                                                    {word.text_uthmani}
                                                                </span>
                                                            )
                                                        }

                                                        return (
                                                            <span
                                                                key={word.id}
                                                                className={cn(
                                                                    "font-arabic transition-all duration-200 cursor-pointer rounded px-0.5",
                                                                    isWordActive
                                                                        ? "text-primary drop-shadow-[0_0_10px_rgba(var(--primary),0.6)] font-semibold scale-105"
                                                                        : "text-primary hover:text-primary/80"
                                                                )}
                                                                style={{ fontSize: `${fontSize}px` }}
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    // Optional: seek to word
                                                                }}
                                                            >
                                                                {word.text_uthmani + " "}
                                                            </span>
                                                        );
                                                    }) || (
                                                            // Fallback if words data is missing
                                                            <p
                                                                className="font-arabic text-primary"
                                                                style={{ fontSize: `${fontSize}px` }}
                                                            >
                                                                {ayah.text_uthmani}
                                                            </p>
                                                        )}
                                                </div>
                                            </div>

                                            {/* Translations Container */}
                                            <div className="grid gap-6 pt-6 border-t border-border/50">
                                                {/* Transliteration */}
                                                {ayah.translations?.find(t => t.resource_id === 57)?.text && (
                                                    <div className="text-left bg-muted/30 p-4 rounded-lg border border-border/10">
                                                        <p className="text-sm font-bold text-primary/70 uppercase tracking-widest mb-1">Transliteration</p>
                                                        <p className="text-base md:text-lg text-foreground/80 italic font-serif leading-relaxed">
                                                            {ayah.translations?.find(t => t.resource_id === 57)?.text.replace(/<sup.*?<\/sup>/g, "")}
                                                        </p>
                                                    </div>
                                                )}

                                                {/* Urdu Translation */}
                                                {urduTranslation && (
                                                    <div className="text-right" dir="rtl">
                                                        <p className="text-xl md:text-2xl text-foreground/90 font-serif leading-loose font-arabic">
                                                            {urduTranslation.replace(/<sup.*?<\/sup>/g, "")}
                                                        </p>
                                                    </div>
                                                )}

                                                {/* English Translation */}
                                                {englishTranslation && (
                                                    <div className="text-left" dir="ltr">
                                                        <p className="text-lg md:text-xl text-muted-foreground font-serif leading-relaxed">
                                                            {englishTranslation.replace(/<sup.*?<\/sup>/g, "")}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        );
                    })}
                </div>
            </main>

            <Footer />
            <TafseerDrawer ayah={selectedAyahForTafseer} isOpen={isTafseerOpen} onClose={() => setIsTafseerOpen(false)} />
        </div>
    );
}
