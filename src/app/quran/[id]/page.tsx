"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useQuery } from "@tanstack/react-query";
import { getSurahDetails, getAyahs, getSurahAudio } from "@/lib/api/quran";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Play, Pause, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { useFontSize } from "@/components/providers/FontSizeProvider";

export default function SurahPage() {
    const params = useParams();
    const router = useRouter();
    const id = Number(params.id);

    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const { data: surah, isLoading: isSurahLoading } = useQuery({
        queryKey: ["surah", id],
        queryFn: () => getSurahDetails(id),
    });

    const { data: ayahs, isLoading: isAyahsLoading } = useQuery({
        queryKey: ["ayahs", id],
        queryFn: () => getAyahs(id),
    });

    const [audioLanguage, setAudioLanguage] = useState<'ar' | 'ur'>('ar');

    const { data: audioUrl } = useQuery({
        queryKey: ["audio", id, audioLanguage],
        queryFn: () => getSurahAudio(id, 7, audioLanguage),
    });

    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play();
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying]);

    const { fontSize } = useFontSize();
    const [jumpAyah, setJumpAyah] = useState("");

    const handleJump = (e: React.FormEvent) => {
        e.preventDefault();
        const element = document.getElementById(`ayah-${jumpAyah}`);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "center" });
            setJumpAyah("");
        }
    };

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    };

    const handleAudioEnded = () => {
        setIsPlaying(false);
    };

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

                    {audioUrl && (
                        <div className="flex items-center space-x-3">
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

                            <audio
                                ref={audioRef}
                                src={audioUrl}
                                onEnded={handleAudioEnded}
                                className="hidden"
                            />
                            <Button
                                size="icon"
                                className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                                onClick={togglePlay}
                            >
                                {isPlaying ? (
                                    <Pause className="h-5 w-5" />
                                ) : (
                                    <Play className="h-5 w-5 ml-1" />
                                )}
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            <main className="flex-grow container mx-auto px-4 py-8">
                {/* Bismillah - Show for all except Surah Al-Fatihah (1) and At-Tawbah (9) */}
                {/* Bismillah - Show for all except Surah Al-Fatihah (1) and At-Tawbah (9) */}
                {Number(surah.id) !== 1 && Number(surah.id) !== 9 && surah.name_simple !== "Al-Fatihah" && (
                    <div key="bismillah-header" className="mb-12 mt-8 text-center font-arabic text-4xl md:text-5xl text-primary leading-[3] py-2">
                        ﷽
                    </div>
                )}

                <div className="space-y-6 max-w-4xl mx-auto">
                    {ayahs.map((ayah) => {
                        // 20: English, 234: Urdu
                        const englishTranslation = ayah.translations?.find(t => t.resource_id === 20)?.text;
                        const urduTranslation = ayah.translations?.find(t => t.resource_id === 234)?.text;

                        return (
                            <Card key={ayah.id} id={`ayah-${ayah.verse_key.split(":")[1]}`} className="border-none shadow-sm bg-card/50 hover:bg-card transition-colors">
                                <CardContent className="p-6">
                                    <div className="flex flex-col space-y-8">
                                        {/* Arabic Text */}
                                        <div className="flex justify-between items-start w-full">
                                            <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-xs text-primary font-medium shrink-0 mt-1 font-sans">
                                                {ayah.verse_key.split(":")[1]}
                                            </div>
                                            <p
                                                className="font-arabic text-right leading-[2.2] text-primary w-full pl-4"
                                                style={{ fontSize: `${fontSize}px` }}
                                            >
                                                {ayah.text_uthmani}
                                            </p>
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
                        );
                    })}
                </div>
            </main>

            <Footer />
        </div>
    );
}
