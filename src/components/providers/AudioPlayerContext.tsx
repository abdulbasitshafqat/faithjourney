"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { getSurahRecitation, SurahAudioData, AudioTimestamp } from "@/lib/api/quran";

interface AudioPlayerContextType {
    isPlaying: boolean;
    isLoading: boolean;
    currentSurahId: number | null;
    currentSurahName: string;
    activeVerseKey: string | null;
    activeWordPosition: number | null;
    reciterId: number;
    audioLanguage: 'ar' | 'ur';
    setAudioLanguage: (lang: 'ar' | 'ur') => void;
    setReciterId: (id: number) => void;
    playSurah: (surahId: number, surahName: string) => void;
    pauseAudio: () => void;
    resumeAudio: () => void;
    stopAudio: () => void;
    togglePlay: () => void;
    playbackProgress: number;
    seekToPercent: (percent: number) => void;
}

const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(undefined);

export const reciterList = [
    { id: 7, name: "Mishary Rashid Alafasy" },
    { id: 1, name: "Abdul Rahman Al-Sudais" },
    { id: 12, name: "Maher Al Muaiqly" },
];

export function AudioPlayerProvider({ children }: { children: React.ReactNode }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [currentSurahId, setCurrentSurahId] = useState<number | null>(null);
    const [currentSurahName, setCurrentSurahName] = useState("");
    const [activeVerseKey, setActiveVerseKey] = useState<string | null>(null);
    const [activeWordPosition, setActiveWordPosition] = useState<number | null>(null);
    const [reciterId, setReciterId] = useState(7);
    const [audioLanguage, setAudioLanguage] = useState<'ar' | 'ur'>('ar');
    const [playbackProgress, setPlaybackProgress] = useState(0);
    const [audioData, setAudioData] = useState<SurahAudioData | null>(null);

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const audioDataRef = useRef<SurahAudioData | null>(null);
    const activeVerseKeyRef = useRef<string | null>(null);
    const isPlayingRef = useRef(false);
    isPlayingRef.current = isPlaying;

    useEffect(() => {
        audioDataRef.current = audioData;
    }, [audioData]);

    useEffect(() => {
        activeVerseKeyRef.current = activeVerseKey;
    }, [activeVerseKey]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const audio = new Audio();
            audioRef.current = audio;

            const onPlay = () => setIsPlaying(true);
            const onPause = () => setIsPlaying(false);
            const onEnded = () => {
                setIsPlaying(false);
                setActiveVerseKey(null);
                setActiveWordPosition(null);
                setPlaybackProgress(100);
            };
            const onTimeUpdate = () => {
                if (!audioRef.current) return;
                const duration = audioRef.current.duration || 1;
                setPlaybackProgress((audioRef.current.currentTime / duration) * 100);

                const currentAudioData = audioDataRef.current;
                if (!currentAudioData?.timestamps) return;
                const currentTimeMs = audioRef.current.currentTime * 1000;

                // Find active Verse
                const activeVerse = currentAudioData.timestamps.find(
                    (t: AudioTimestamp) => currentTimeMs >= t.timestamp_from && currentTimeMs < t.timestamp_to
                );

                if (activeVerse) {
                    if (activeVerse.verse_key !== activeVerseKeyRef.current) {
                        setActiveVerseKey(activeVerse.verse_key);
                    }

                    // Find active Word in the verse segments
                    const activeSegment = activeVerse.segments.find(
                        (s: number[]) => currentTimeMs >= s[1] && currentTimeMs < s[2]
                    );

                    if (activeSegment) {
                        setActiveWordPosition(activeSegment[0]);
                    } else {
                        setActiveWordPosition(null);
                    }
                }
            };

            const onLoadStart = () => setIsLoading(true);
            const onCanPlay = () => setIsLoading(false);
            const onPlaying = () => {
                setIsLoading(false);
                setIsPlaying(true);
            };
            const onWaiting = () => setIsLoading(true);

            audio.addEventListener("play", onPlay);
            audio.addEventListener("pause", onPause);
            audio.addEventListener("ended", onEnded);
            audio.addEventListener("timeupdate", onTimeUpdate);
            audio.addEventListener("loadstart", onLoadStart);
            audio.addEventListener("canplay", onCanPlay);
            audio.addEventListener("playing", onPlaying);
            audio.addEventListener("waiting", onWaiting);

            return () => {
                audio.pause();
                audio.removeEventListener("play", onPlay);
                audio.removeEventListener("pause", onPause);
                audio.removeEventListener("ended", onEnded);
                audio.removeEventListener("timeupdate", onTimeUpdate);
                audio.removeEventListener("loadstart", onLoadStart);
                audio.removeEventListener("canplay", onCanPlay);
                audio.removeEventListener("playing", onPlaying);
                audio.removeEventListener("waiting", onWaiting);
            };
        }
    }, []);

    const playSurah = async (surahId: number, surahName: string) => {
        if (!audioRef.current) return;

        try {
            // Check if this Surah is already loaded in the audio element and we're just paused
            if (currentSurahId === surahId && audioRef.current.src) {
                if (audioRef.current.paused) {
                    setIsLoading(true);
                    audioRef.current.play().then(() => {
                        setIsLoading(false);
                        setIsPlaying(true);
                    }).catch(e => {
                        console.error("Playback resume error:", e);
                        setIsLoading(false);
                        setIsPlaying(false);
                    });
                }
                return;
            }

            setIsLoading(true);
            setCurrentSurahId(surahId);
            setCurrentSurahName(surahName);

            // Fetch high quality recitation endpoints
            const data = await getSurahRecitation(surahId, reciterId, audioLanguage);
            setAudioData(data);

            audioRef.current.src = data.audioUrl;
            audioRef.current.load();
            audioRef.current.play().catch(e => {
                console.error("Playback error:", e);
                setIsLoading(false);
                setIsPlaying(false);
            });
        } catch (error) {
            console.error("Failed to load surah recitation:", error);
            setIsLoading(false);
            setIsPlaying(false);
        }
    };

    const pauseAudio = () => {
        if (audioRef.current) {
            audioRef.current.pause();
        }
    };

    const resumeAudio = () => {
        if (audioRef.current && audioRef.current.src) {
            audioRef.current.play().catch(e => console.error(e));
        }
    };

    const stopAudio = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.src = "";
        }
        setCurrentSurahId(null);
        setCurrentSurahName("");
        setIsPlaying(false);
        setActiveVerseKey(null);
        setActiveWordPosition(null);
        setPlaybackProgress(0);
    };

    const togglePlay = () => {
        if (isPlaying) {
            pauseAudio();
        } else {
            resumeAudio();
        }
    };

    const seekToPercent = (percent: number) => {
        if (audioRef.current && audioRef.current.duration) {
            const time = (percent / 100) * audioRef.current.duration;
            audioRef.current.currentTime = time;
        }
    };

    // Re-trigger playback ONLY if reciter or language changes
    useEffect(() => {
        if (currentSurahId && isPlayingRef.current) {
            const timer = setTimeout(() => {
                playSurah(currentSurahId, currentSurahName);
            }, 0);
            return () => clearTimeout(timer);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reciterId, audioLanguage]);

    return (
        <AudioPlayerContext.Provider
            value={{
                isPlaying,
                isLoading,
                currentSurahId,
                currentSurahName,
                activeVerseKey,
                activeWordPosition,
                reciterId,
                audioLanguage,
                setAudioLanguage,
                setReciterId,
                playSurah,
                pauseAudio,
                resumeAudio,
                stopAudio,
                togglePlay,
                playbackProgress,
                seekToPercent
            }}
        >
            {children}
        </AudioPlayerContext.Provider>
    );
}

export function useAudioPlayer() {
    const context = useContext(AudioPlayerContext);
    if (context === undefined) {
        throw new Error("useAudioPlayer must be used within an AudioPlayerProvider");
    }
    return context;
}
