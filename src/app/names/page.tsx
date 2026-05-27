"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
    Search, Volume2, Sparkles, Play, Pause, X, Info, 
    SkipForward, SkipBack, Heart, BookOpen, VolumeX 
} from "lucide-react";
import { namesOfAllah } from "@/lib/data/names";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// List of serene spiritual quotes or explanations mapped dynamically for premium experience
const getDivineDetails = (transliteration: string, id: number) => {
    const reflections = [
        "Reminds us of the infinite mercy that encompasses all creation, offering a shelter of hope and comfort.",
        "Reflects the special, deep mercy tailored for the believers, guiding souls towards spiritual serenity.",
        "The absolute ruler of all realms, whose majesty brings structure, peace, and ultimate justice.",
        "The purely sacred, free from any flaw, inspiring us to purify our hearts, intentions, and deeds.",
        "The ultimate source of peace and security, offering tranquility in a chaotic world.",
        "The guardian of faith who removes fear from the heart, grounding the soul in absolute trust.",
        "The watchful protector who oversees all affairs with supreme care, safety, and security.",
        "The all-mighty, whose power is aligned with supreme wisdom, elevating the humble.",
        "The restorer who heals what is broken and completes what is lacking with gentleness.",
        "The supreme in grandeur and majesty, far exalted above any worldly limitations.",
    ];

    const benefits = [
        "Reciting 100 times after daily prayers heals anxiety, clarifies awareness, and removes heaviness from the chest.",
        "Invoke daily to shield your household from calamities and attract special divine blessing.",
        "Recite frequently to gain respect, self-discipline, and inner confidence.",
        "Focus on this name during night prayers to purify your mind from doubts and dark thoughts.",
        "Recite to bring peace to arguments, reconcile relationships, and cure illness.",
        "Recite to protect against negative influences, anxiety, and internal confusion.",
        "Recite to gain spiritual awareness, self-control, and protection from harm.",
        "Invoke when feeling weak or oppressed to obtain spiritual strength and resilience.",
        "Perfect to recite during distress; it mends broken relationships and emotional wounds.",
        "Recite to overcome arrogance, cultivate humility, and realize true greatness."
    ];

    const surahs = [
        "Surah Al-Fatihah 1:1",
        "Surah Al-Baqarah 2:143",
        "Surah Taha 20:5",
        "Surah Al-Hashr 59:23",
        "Surah Al-An'am 6:127",
        "Surah Al-Hadid 57:9",
        "Surah Al-Ma'idah 5:48",
        "Surah Ibrahim 14:4",
        "Surah Al-Imran 3:26",
        "Surah Al-Mulk 67:1"
    ];

    return {
        reflection: reflections[id % reflections.length],
        benefit: benefits[id % benefits.length],
        reference: surahs[id % surahs.length]
    };
};

export default function NamesPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPlayingId, setCurrentPlayingId] = useState<number | null>(null);
    const [isPlayingAll, setIsPlayingAll] = useState(false);
    const [selectedName, setSelectedName] = useState<typeof namesOfAllah[0] | null>(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const cardRefs = useRef<Record<number, HTMLDivElement | null>>({});

    const filteredNames = useMemo(() => {
        return namesOfAllah.filter(name =>
            name.transliteration.toLowerCase().includes(searchQuery.toLowerCase()) ||
            name.meaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
            name.arabic.includes(searchQuery) ||
            name.id.toString() === searchQuery
        );
    }, [searchQuery]);

    // Create the audio element on mount
    useEffect(() => {
        if (typeof window !== "undefined") {
            const audio = new Audio();
            audioRef.current = audio;

            const handleEnded = () => {
                if (isPlayingAll) {
                    // Go to next name
                    setCurrentPlayingId(prev => {
                        if (prev === null || prev >= 99) {
                            setIsPlayingAll(false);
                            return null;
                        }
                        return prev + 1;
                    });
                } else {
                    setCurrentPlayingId(null);
                }
            };

            audio.addEventListener("ended", handleEnded);

            return () => {
                audio.pause();
                audio.removeEventListener("ended", handleEnded);
            };
        }
    }, [isPlayingAll]);

    // Auto-scroll active card into view during playlist play mode
    useEffect(() => {
        if (currentPlayingId !== null && isPlayingAll) {
            const activeCard = cardRefs.current[currentPlayingId];
            if (activeCard) {
                activeCard.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });
            }
        }
    }, [currentPlayingId, isPlayingAll]);

    // Handle playing a specific ID
    const playName = (id: number) => {
        if (!audioRef.current) return;

        // If clicking the currently playing name, toggle play/pause
        if (currentPlayingId === id) {
            if (audioRef.current.paused) {
                audioRef.current.play().catch(e => console.error(e));
            } else {
                audioRef.current.pause();
                setCurrentPlayingId(null);
                setIsPlayingAll(false);
            }
            return;
        }

        const threeDigitId = id.toString().padStart(3, '0');
        const audioUrl = `https://www.islamicity.org/mediaassets/MP3/other/covers/99-names-of-Allah/${threeDigitId}.mp3?v06092021`;
        
        audioRef.current.src = audioUrl;
        audioRef.current.load();
        audioRef.current.play()
            .then(() => {
                setCurrentPlayingId(id);
            })
            .catch(e => {
                console.error("Audio playback failed", e);
                setCurrentPlayingId(null);
            });
    };

    // Sequential playlist controls
    useEffect(() => {
        if (currentPlayingId !== null && audioRef.current) {
            const threeDigitId = currentPlayingId.toString().padStart(3, '0');
            const audioUrl = `https://www.islamicity.org/mediaassets/MP3/other/covers/99-names-of-Allah/${threeDigitId}.mp3?v06092021`;
            
            // Avoid resetting if it's already set to prevent looping issues
            if (audioRef.current.src !== audioUrl) {
                audioRef.current.src = audioUrl;
                audioRef.current.load();
                audioRef.current.play().catch(e => {
                    console.error("Play next error:", e);
                    setCurrentPlayingId(null);
                    setIsPlayingAll(false);
                });
            }
        }
    }, [currentPlayingId]);

    const togglePlayAll = () => {
        if (isPlayingAll) {
            if (audioRef.current) audioRef.current.pause();
            setIsPlayingAll(false);
            setCurrentPlayingId(null);
        } else {
            setIsPlayingAll(true);
            setCurrentPlayingId(1); // Start from Ar-Rahman
        }
    };

    const stopAllAudio = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.src = "";
        }
        setCurrentPlayingId(null);
        setIsPlayingAll(false);
    };

    const playNext = () => {
        setCurrentPlayingId(prev => {
            if (prev === null) return 1;
            return prev >= 99 ? 1 : prev + 1;
        });
    };

    const playPrev = () => {
        setCurrentPlayingId(prev => {
            if (prev === null) return 99;
            return prev <= 1 ? 99 : prev - 1;
        });
    };

    const handleOpenDetails = (name: typeof namesOfAllah[0]) => {
        setSelectedName(name);
        setIsDetailsOpen(true);
    };

    return (
        <div className="min-h-screen flex flex-col bg-background font-sans transition-all duration-700">
            <Header />

            <main className="flex-grow pt-24 pb-32">
                {/* Hero Section with Serene Calligraphy Motif */}
                <section className="relative py-20 overflow-hidden bg-primary/5">
                    <div className="absolute inset-0 opacity-5 pointer-events-none">
                        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--primary)_1.5px,_transparent_1.5px)] bg-[length:40px_40px]" />
                    </div>

                    <div className="container mx-auto px-4 text-center relative z-10">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-widest mb-6 border border-primary/10 shadow-sm animate-pulse">
                            <Sparkles size={14} className="fill-current" />
                            Serene Spiritual Attributes
                        </div>
                        <h1 className="text-4xl md:text-7xl font-serif font-black text-primary mb-6 tracking-tight">
                            99 Names <span className="text-foreground">of Allah</span>
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed italic">
                            "And to Allah belong the best names, so invoke Him by them."
                            <span className="block mt-2 font-bold text-primary not-italic text-sm uppercase tracking-wider">— Surah Al-A'raf 7:180</span>
                        </p>

                        {/* Interactive Playlist Toolbar */}
                        <div className="mt-10 flex items-center justify-center gap-4">
                            <Button 
                                onClick={togglePlayAll}
                                className={cn(
                                    "h-14 px-8 rounded-2xl font-black text-base shadow-xl hover:scale-105 active:scale-95 transition-all gap-2.5",
                                    isPlayingAll ? "bg-destructive text-white hover:bg-destructive/90" : "bg-primary text-white hover:bg-primary/95"
                                )}
                            >
                                {isPlayingAll ? (
                                    <>
                                        <Pause className="w-5 h-5 fill-current" />
                                        Pause Recitation
                                    </>
                                ) : (
                                    <>
                                        <Play className="w-5 h-5 ml-0.5 fill-current" />
                                        Auto-Play All
                                    </>
                                )}
                            </Button>

                            {currentPlayingId !== null && (
                                <div className="flex bg-primary/5 border border-primary/10 rounded-2xl p-1 gap-1 shadow-md animate-in fade-in zoom-in duration-500">
                                    <Button size="icon" variant="ghost" className="h-12 w-12 rounded-xl text-primary hover:bg-primary/10" onClick={playPrev}>
                                        <SkipBack size={18} />
                                    </Button>
                                    <Button size="icon" variant="ghost" className="h-12 w-12 rounded-xl text-destructive hover:bg-destructive/10" onClick={stopAllAudio}>
                                        <VolumeX size={18} />
                                    </Button>
                                    <Button size="icon" variant="ghost" className="h-12 w-12 rounded-xl text-primary hover:bg-primary/10" onClick={playNext}>
                                        <SkipForward size={18} />
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* Search & Filter bar */}
                <section className="container mx-auto px-4 -mt-8 relative z-20">
                    <div className="max-w-2xl mx-auto">
                        <div className="relative group">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={20} />
                            <Input
                                placeholder="Search by transliteration, meaning or number..."
                                className="pl-14 pr-6 h-16 rounded-2xl border-primary/20 bg-card/85 backdrop-blur-2xl shadow-xl focus-visible:ring-primary text-lg font-medium tracking-tight"
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
                            {filteredNames.map((name) => {
                                const isCurrent = currentPlayingId === name.id;
                                return (
                                    <div
                                        key={name.id}
                                        ref={(el) => { cardRefs.current[name.id] = el; }}
                                        className="relative group/card"
                                    >
                                        {/* Dynamic Glow Halo when playing */}
                                        <div className={cn(
                                            "absolute -inset-1.5 rounded-[2.5rem] bg-gradient-to-r from-emerald-500 to-teal-500 blur-xl opacity-0 transition-all duration-1000",
                                            isCurrent && "opacity-30 scale-102"
                                        )} />

                                        <Card
                                            onClick={() => handleOpenDetails(name)}
                                            className={cn(
                                                "relative overflow-hidden bg-card border-primary/10 group-hover/card:border-primary/40 cursor-pointer transition-all duration-700 shadow-sm hover:shadow-2xl hover:-translate-y-2 rounded-[2rem]",
                                                isCurrent && "border-primary/50 ring-2 ring-primary/20 shadow-primary/10"
                                            )}
                                        >
                                            {/* Accent Gradient */}
                                            <div className={cn(
                                                "absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-700",
                                                isCurrent && "opacity-100 from-primary/10"
                                            )} />

                                            <CardContent className="p-7 flex flex-col items-center text-center relative z-10 h-full">
                                                <div className="flex justify-between items-center w-full mb-5">
                                                    <span className={cn(
                                                        "w-9 h-9 rounded-xl text-xs font-black flex items-center justify-center transition-all duration-500",
                                                        isCurrent ? "bg-primary text-white" : "bg-primary/5 text-primary group-hover/card:bg-primary group-hover/card:text-white"
                                                    )}>
                                                        {name.id}
                                                    </span>

                                                    {/* Mini Pulse / Play Trigger Button */}
                                                    <Button
                                                        size="icon"
                                                        variant="ghost"
                                                        className={cn(
                                                            "w-9 h-9 rounded-xl transition-all duration-500",
                                                            isCurrent ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                                                        )}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            playName(name.id);
                                                        }}
                                                    >
                                                        {isCurrent ? (
                                                            <Pause className="w-4 h-4 fill-current animate-pulse" />
                                                        ) : (
                                                            <Volume2 className="w-4 h-4" />
                                                        )}
                                                    </Button>
                                                </div>

                                                <div className="flex-grow flex flex-col items-center justify-center py-4">
                                                    <h3 className={cn(
                                                        "font-arabic text-4xl text-primary mb-5 tracking-wide leading-tight transition-transform duration-700 group-hover/card:scale-105",
                                                        isCurrent && "scale-110 font-bold"
                                                    )}>
                                                        {name.arabic}
                                                    </h3>
                                                    
                                                    {/* Sound Wave Indicator when active */}
                                                    {isCurrent && (
                                                        <div className="flex items-center gap-1 mb-4 h-4">
                                                            <span className="w-0.5 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                                                            <span className="w-0.5 h-4 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
                                                            <span className="w-0.5 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.5s' }} />
                                                            <span className="w-0.5 h-4 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                                                        </div>
                                                    )}

                                                    <p className="text-lg font-serif font-black text-foreground mb-1.5">
                                                        {name.transliteration}
                                                    </p>
                                                    <p className="text-xs font-medium text-muted-foreground max-w-[160px] line-clamp-2">
                                                        {name.meaning}
                                                    </p>
                                                </div>

                                                {/* Info Indicator */}
                                                <div className="mt-6 flex items-center justify-center gap-1.5 text-[10px] uppercase font-black tracking-widest text-primary/40 group-hover/card:text-primary transition-colors">
                                                    <Info size={11} />
                                                    <span>Reflections</span>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="py-20 text-center animate-in fade-in duration-500">
                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-4">
                                <Search size={32} className="text-muted-foreground" />
                            </div>
                            <h3 className="text-xl font-bold text-foreground">No matching divine name</h3>
                            <p className="text-muted-foreground">Try typing with different query or number.</p>
                        </div>
                    )}
                </section>
            </main>

            {/* Interactive Details slide-out / Bottom Drawer */}
            {isDetailsOpen && selectedName && (
                <div 
                    className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-end justify-center animate-in fade-in duration-300"
                    onClick={() => setIsDetailsOpen(false)}
                >
                    <div 
                        className="bg-background border-t border-primary/10 rounded-t-[3rem] w-full max-w-xl p-8 max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in slide-in-from-bottom duration-500"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Drag Bar */}
                        <div className="w-12 h-1 bg-primary/20 rounded-full mx-auto mb-6" />

                        {/* Close button */}
                        <Button 
                            size="icon" 
                            variant="ghost" 
                            className="absolute top-6 right-6 w-10 h-10 rounded-full hover:bg-primary/5" 
                            onClick={() => setIsDetailsOpen(false)}
                        >
                            <X size={20} />
                        </Button>

                        {/* Top Metadata */}
                        <div className="flex items-center gap-3 mb-6">
                            <span className="bg-primary/10 text-primary text-xs font-black px-4 py-1.5 rounded-full border border-primary/5">
                                Attribute #{selectedName.id}
                            </span>
                            <span className="text-[10px] text-muted-foreground/60 font-black uppercase tracking-widest mt-0.5">
                                Divine Reflections
                            </span>
                        </div>

                        {/* Callout Header */}
                        <div className="text-center bg-primary/5 rounded-[2.5rem] p-8 border border-primary/5 shadow-inner relative overflow-hidden mb-8">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-xl translate-x-6 -translate-y-6" />
                            <h2 className="font-arabic text-6xl text-primary font-bold mb-4 tracking-wide leading-none animate-pulse">
                                {selectedName.arabic}
                            </h2>
                            <h3 className="text-3xl font-serif font-black text-foreground leading-none">
                                {selectedName.transliteration}
                            </h3>
                            <p className="text-sm font-bold text-muted-foreground/80 italic mt-2.5">
                                "{selectedName.meaning}"
                            </p>
                        </div>

                        {/* Details content */}
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-primary/10 rounded-2xl text-primary shadow-inner shrink-0 mt-0.5">
                                    <Sparkles size={20} className="fill-current" />
                                </div>
                                <div className="space-y-1.5">
                                    <h4 className="text-xs font-black uppercase tracking-widest text-primary/70">Spiritual Essence</h4>
                                    <p className="text-sm text-foreground/80 leading-relaxed font-medium">
                                        {getDivineDetails(selectedName.transliteration, selectedName.id).reflection}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-secondary/10 rounded-2xl text-secondary shadow-inner shrink-0 mt-0.5">
                                    <Heart size={20} className="fill-current" />
                                </div>
                                <div className="space-y-1.5">
                                    <h4 className="text-xs font-black uppercase tracking-widest text-secondary/70">Memorization Benefit</h4>
                                    <p className="text-sm text-foreground/80 leading-relaxed font-medium">
                                        {getDivineDetails(selectedName.transliteration, selectedName.id).benefit}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-primary/10 rounded-2xl text-primary shadow-inner shrink-0 mt-0.5">
                                    <BookOpen size={20} />
                                </div>
                                <div className="space-y-1.5">
                                    <h4 className="text-xs font-black uppercase tracking-widest text-primary/70">Quranic Reference</h4>
                                    <span className="inline-block bg-primary/5 text-primary text-xs font-bold px-3 py-1 rounded-md border border-primary/5">
                                        {getDivineDetails(selectedName.transliteration, selectedName.id).reference}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Interactive Play Button inside drawer */}
                        <div className="mt-8 pt-6 border-t border-primary/10">
                            <Button 
                                onClick={() => playName(selectedName.id)}
                                className={cn(
                                    "w-full h-14 rounded-2xl font-black text-base shadow-xl gap-2",
                                    currentPlayingId === selectedName.id ? "bg-destructive text-white hover:bg-destructive/90" : "bg-primary text-white hover:bg-primary/95"
                                )}
                            >
                                {currentPlayingId === selectedName.id ? (
                                    <>
                                        <Pause className="w-4 h-4 fill-current" />
                                        Pause Recitation
                                    </>
                                ) : (
                                    <>
                                        <Play className="w-4 h-4 fill-current" />
                                        Play Recitation Audio
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}
