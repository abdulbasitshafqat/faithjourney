"use client";

import { useAudioPlayer, reciterList } from "@/components/providers/AudioPlayerContext";
import { Play, Pause, Music, X, UserCheck, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
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
        audioError,
        currentSurahId,
        currentSurahName,
        activeVerseKey,
        reciterId,
        audioLanguage,
        setReciterId,
        togglePlay,
        stopAudio,
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

    const handleProgressKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (!["ArrowLeft", "ArrowRight", "ArrowDown", "ArrowUp", "Home", "End"].includes(e.key)) return;
        e.preventDefault();
        if (e.key === "Home") seekToPercent(0);
        else if (e.key === "End") seekToPercent(99.9);
        else {
            const direction = e.key === "ArrowRight" || e.key === "ArrowUp" ? 1 : -1;
            seekToPercent(Math.max(0, Math.min(99.9, playbackProgress + direction * 5)));
        }
    };

    return (
        <div className="pointer-events-none fixed bottom-[72px] left-0 right-0 z-[60] px-3 md:bottom-6 md:px-4">
            <div className="group relative mx-auto flex max-w-xl flex-col gap-2 overflow-hidden rounded-2xl border border-primary/10 bg-background/95 p-3 pt-4 shadow-2xl backdrop-blur-2xl pointer-events-auto dark:bg-background/95 sm:gap-3 sm:rounded-3xl sm:p-4">
                
                {/* Visual Progress Bar (Clickable) */}
                <div
                    className="absolute left-0 right-0 top-0 flex h-5 cursor-pointer items-start bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
                    onClick={handleProgressBarClick}
                    onKeyDown={handleProgressKeyDown}
                    role="slider"
                    tabIndex={0}
                    aria-label="Recitation progress"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={Math.round(playbackProgress)}
                    aria-valuetext={`${Math.round(playbackProgress)} percent`}
                >
                    <div className="h-1 w-full bg-primary/5 transition-all duration-300 group-hover:h-1.5">
                        <div
                            className="h-full rounded-r-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-150"
                            style={{ width: `${playbackProgress}%` }}
                        />
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-1">
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
                                {activeVerseKey ? `Ayah ${activeVerseKey}` : "Preparing recitation"}
                                {audioLanguage === "ur" ? " · Arabic + Urdu" : " · Arabic"}
                            </p>
                        </div>
                    </div>

                    {/* Central Playback Controls */}
                    <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                        <Select 
                            value={reciterId.toString()} 
                            onValueChange={(val) => setReciterId(parseInt(val))}
                        >
                            <SelectTrigger aria-label="Choose Arabic reciter" className="min-h-11 flex-1 gap-1 rounded-xl border-none bg-primary/5 px-3 text-xs font-bold shadow-none ring-0 focus:ring-0 sm:w-[170px] sm:flex-none">
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
                            className="h-11 w-11 shrink-0 rounded-full bg-primary text-primary-foreground shadow-lg transition-all hover:scale-105 hover:bg-primary/90 active:scale-95"
                            onClick={togglePlay}
                            disabled={isLoading}
                            aria-label={isPlaying ? "Pause recitation" : "Play recitation"}
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
                            className="h-11 w-11 shrink-0 rounded-full transition-colors hover:bg-destructive/10 hover:text-destructive"
                            onClick={stopAudio} // Stop and dismiss the audio player
                            aria-label="Close recitation player"
                        >
                            <X className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
                {audioError && (
                    <p role="alert" className="text-xs font-medium text-destructive px-1">
                        {audioError}
                    </p>
                )}
            </div>
        </div>
    );
}
