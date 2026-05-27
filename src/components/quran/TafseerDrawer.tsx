"use client";

import { useQuery } from "@tanstack/react-query";
import { getTafseer, Ayah } from "@/lib/api/quran";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from "@/components/ui/sheet";
import { BookOpen, Sparkles, Languages, Loader2 } from "lucide-react";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TafseerDrawerProps {
    ayah: Ayah | null;
    isOpen: boolean;
    onClose: () => void;
}

export function TafseerDrawer({ ayah, isOpen, onClose }: TafseerDrawerProps) {
    const [tafseerLanguage, setTafseerLanguage] = useState<'eng' | 'urd'>('eng');

    // 169: Tafsir Ibn Kathir (English), 160: Tafsir Ibn Kathir (Urdu)
    const tafseerId = tafseerLanguage === 'urd' ? 160 : 169;

    const { data: tafseer, isLoading } = useQuery({
        queryKey: ["tafseer", ayah?.verse_key, tafseerId],
        queryFn: () => getTafseer(ayah!.verse_key, tafseerId),
        enabled: !!ayah && isOpen,
    });

    if (!ayah) return null;

    return (
        <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <SheetContent side="bottom" className="h-[75vh] rounded-t-[2.5rem] border-t-primary/10 bg-background/95 backdrop-blur-2xl p-6 sm:p-8 flex flex-col gap-6">
                <SheetHeader className="text-left pb-4 border-b border-primary/5 flex flex-row items-center justify-between">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-[10px] font-black uppercase tracking-widest mb-2">
                            <BookOpen className="h-3 w-3" />
                            Study Mode • Verse {ayah.verse_key}
                        </div>
                        <SheetTitle className="font-serif text-2xl sm:text-3xl font-black text-primary leading-none">
                            Ayah Reflection
                        </SheetTitle>
                        <SheetDescription className="hidden">Detailed word by word and tafseer study.</SheetDescription>
                    </div>

                    <div className="flex bg-muted/50 rounded-xl p-0.5 mt-2">
                        <button
                            onClick={() => setTafseerLanguage('eng')}
                            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${tafseerLanguage === 'eng' ? 'bg-background shadow-md text-primary' : 'text-muted-foreground hover:text-primary'}`}
                        >
                            English Tafseer
                        </button>
                        <button
                            onClick={() => setTafseerLanguage('urd')}
                            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${tafseerLanguage === 'urd' ? 'bg-background shadow-md text-primary' : 'text-muted-foreground hover:text-primary'}`}
                        >
                            Urdu Tafseer
                        </button>
                    </div>
                </SheetHeader>

                <ScrollArea className="flex-1 pr-4 -mr-4 overflow-y-auto space-y-6">
                    <div className="space-y-6">
                        {/* Word-by-word block */}
                        {ayah.words && ayah.words.length > 0 && (
                            <div className="space-y-3">
                                <h3 className="text-xs font-black uppercase text-secondary tracking-widest flex items-center gap-2">
                                    <Sparkles className="w-3.5 h-3.5" />
                                    Word By Word Breakdown
                                </h3>
                                <div className="flex gap-4 overflow-x-auto pb-4 pt-1 snap-x no-scrollbar" dir="rtl">
                                    {ayah.words
                                        .filter((w) => w.char_type_name !== "end")
                                        .map((word) => (
                                            <div
                                                key={word.id}
                                                className="snap-start flex flex-col items-center justify-between p-4 rounded-2xl bg-primary/5 border border-primary/5 hover:border-primary/10 transition-all min-w-[100px] shrink-0"
                                            >
                                                <span className="font-arabic text-3xl text-primary font-bold mb-2">
                                                    {word.text_uthmani}
                                                </span>
                                                <div className="text-center space-y-0.5" dir="ltr">
                                                    <p className="text-xs font-bold text-foreground truncate max-w-[90px]">
                                                        {word.translation?.text || "..."}
                                                    </p>
                                                    <p className="text-[10px] text-muted-foreground italic truncate max-w-[90px]">
                                                        {word.transliteration?.text || "..."}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        )}

                        {/* Tafseer Content Block */}
                        <div className="space-y-3">
                            <h3 className="text-xs font-black uppercase text-secondary tracking-widest flex items-center gap-2">
                                <Languages className="w-3.5 h-3.5" />
                                {tafseer?.resource_name || "Tafsir Ibn Kathir"}
                            </h3>

                            {isLoading ? (
                                <div className="flex flex-col items-center justify-center py-12 gap-3">
                                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                                    <span className="text-sm font-medium text-muted-foreground animate-pulse">Loading commentary...</span>
                                </div>
                            ) : tafseer ? (
                                <div 
                                    className="p-6 sm:p-8 rounded-3xl bg-muted/40 border border-primary/5 text-base sm:text-lg leading-relaxed text-foreground/90 font-serif space-y-4 tafseer-content"
                                    dangerouslySetInnerHTML={{ __html: tafseer.text }}
                                    dir={tafseerLanguage === 'urd' ? 'rtl' : 'ltr'}
                                />
                            ) : (
                                <p className="text-sm text-muted-foreground text-center py-6">Could not load tafseer. Please try again.</p>
                            )}
                        </div>
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
}
