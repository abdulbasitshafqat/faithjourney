"use client";

import { useAudioPlayer, reciterList } from "@/components/providers/AudioPlayerContext";
import { Play, Pause, Music, X, Volume2, UserCheck, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export function FloatingAudioPlayer() {
    const {
        isPlaying,
        isLoading,
        currentSurahId,
        currentSurahName,
        activeVerseKey,
        reciterId,
        setReciterId,
        togglePlay,
        pauseAudio,
        playbackProgress,
        seekToPercent,
    } = useAudioPlayer();

    // If no Surah is loaded, don't show the player
    if (!currentSurahId) return null;

    const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const width = rect.width;
        const percent = (clickX / width) * 100;
        seekToPercent(percent);
    };

    return (
        <div className="fixed bottom-[76px] md:bottom-6 left-0 right-0 z-50 px-4 pointer-events-none">
            <div className="bg-background/90 dark:bg-background/95 backdrop-blur-2xl border border-primary/10 shadow-2xl rounded-3xl max-w-xl mx-auto p-4 pointer-events-auto flex flex-col gap-3 relative overflow-hidden group">
                
                {/* Visual Progress Bar (Clickable) */}
                <div 
                    className="absolute top-0 left-0 right-0 h-1 bg-primary/5 cursor-pointer group-hover:h-1.5 transition-all duration-300"
                    onClick={handleProgressBarClick}
                >
                    <div 
                        className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-r-full transition-all duration-150"
                        style={{ width: `${playbackProgress}%` }}
                    />
                </div>

                <div className="flex items-center justify-between gap-4 mt-1">
                    {/* Active Surah Meta Info */}
                    <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                            <Music className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                            <h4 className="font-serif font-black text-sm text-foreground truncate leading-tight">
                                {currentSurahName}
                            </h4>
                            <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest mt-0.5">
                                {activeVerseKey ? `Reciting Ayah ${activeVerseKey}` : "Streaming Recitation"}
                            </p>
                        </div>
                    </div>

                    {/* Central Playback Controls */}
                    <div className="flex items-center gap-3">
                        <Select 
                            value={reciterId.toString()} 
                            onValueChange={(val) => setReciterId(parseInt(val))}
                        >
                            <SelectTrigger className="w-[140px] h-9 border-none bg-primary/5 rounded-xl text-xs font-bold ring-0 focus:ring-0 shadow-none px-3 gap-1">
                                <UserCheck className="w-3.5 h-3.5 mr-1 text-primary/60" />
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="rounded-2xl border-primary/10 shadow-2xl p-1 max-h-[300px]">
                                {reciterList.map(r => (
                                    <SelectItem 
                                        key={r.id} 
                                        value={r.id.toString()} 
                                        className="text-xs font-bold py-2 px-3 rounded-lg focus:bg-primary/5"
                                    >
                                        {r.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Button
                            size="icon"
                            variant="default"
                            className="w-10 h-10 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:scale-105 active:scale-95 transition-all shrink-0"
                            onClick={togglePlay}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : isPlaying ? (
                                <Pause className="w-5 h-5 fill-current" />
                            ) : (
                                <Play className="w-5 h-5 ml-0.5 fill-current" />
                            )}
                        </Button>

                        <Button
                            size="icon"
                            variant="ghost"
                            className="w-8 h-8 rounded-full hover:bg-destructive/10 hover:text-destructive shrink-0 transition-colors"
                            onClick={pauseAudio} // Simply pauses the audio
                        >
                            <X className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
