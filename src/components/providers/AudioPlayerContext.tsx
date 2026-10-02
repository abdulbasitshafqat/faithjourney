"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { getSurahRecitation, VerseAudioFile } from "@/lib/api/quran";

interface AudioPlayerContextType {
    isPlaying: boolean;
    isLoading: boolean;
    audioError: string | null;
    currentSurahId: number | null;
    currentSurahName: string;
    activeVerseKey: string | null;
    activeWordPosition: number | null;
    reciterId: number;
    audioLanguage: "ar" | "ur";
    setAudioLanguage: (lang: "ar" | "ur") => void;
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

// Stable app IDs; the verified audio editions are mapped in quran.ts.
export const reciterList = [
    { id: 7, name: "Mishary Rashid Alafasy" },
    { id: 3, name: "Abdul Rahman Al-Sudais" },
    { id: 1, name: "Abdul Basit Abdul Samad" },
];

export function AudioPlayerProvider({ children }: { children: React.ReactNode }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [audioError, setAudioError] = useState<string | null>(null);
    const [currentSurahId, setCurrentSurahId] = useState<number | null>(null);
    const [currentSurahName, setCurrentSurahName] = useState("");
    const [activeVerseKey, setActiveVerseKey] = useState<string | null>(null);
    const [activeWordPosition, setActiveWordPosition] = useState<number | null>(null);
    const [reciterId, setReciterIdState] = useState(7);
    const [audioLanguage, setAudioLanguageState] = useState<"ar" | "ur">("ar");
    const [playbackProgress, setPlaybackProgress] = useState(0);

    const arabicAudioRef = useRef<HTMLAudioElement | null>(null);
    const urduAudioRef = useRef<HTMLAudioElement | null>(null);
    const verseAudiosRef = useRef<VerseAudioFile[]>([]);
    const verseIndexRef = useRef(0);
    const isPlayingRef = useRef(false);
    const isPlayingUrduRef = useRef(false);
    const audioLanguageRef = useRef<"ar" | "ur">("ar");
    const currentSurahIdRef = useRef<number | null>(null);
    const currentSurahNameRef = useRef("");
    const reciterIdRef = useRef(7);
    const requestIdRef = useRef(0);
    const seekFractionRef = useRef<number | null>(null);
    const mountedRef = useRef(true);

    const updatePlaying = (value: boolean) => {
        isPlayingRef.current = value;
        if (mountedRef.current) setIsPlaying(value);
    };

    const updateActiveVerse = (index: number) => {
        const verse = verseAudiosRef.current[index];
        verseIndexRef.current = index;
        if (mountedRef.current) {
            setActiveVerseKey(verse?.verseKey ?? null);
            setActiveWordPosition(null);
        }
    };

    const playArabicVerse = (index: number, shouldPlay = true, fraction = 0) => {
        const audio = arabicAudioRef.current;
        const verse = verseAudiosRef.current[index];
        if (!audio || !verse) {
            updatePlaying(false);
            if (mountedRef.current) setPlaybackProgress(100);
            return;
        }

        isPlayingUrduRef.current = false;
        if (urduAudioRef.current) {
            urduAudioRef.current.pause();
            urduAudioRef.current.removeAttribute("src");
        }
        updateActiveVerse(index);
        seekFractionRef.current = Math.max(0, Math.min(1, fraction));
        audio.src = verse.audioUrl;
        audio.load();

        if (shouldPlay) {
            setIsLoading(true);
            audio.play().catch((error) => {
                console.error("Arabic recitation playback failed:", error);
                setAudioError("The recitation could not start. Check your connection and try again.");
                setIsLoading(false);
                updatePlaying(false);
            });
        }
    };

    const playUrduTranslation = () => {
        const verse = verseAudiosRef.current[verseIndexRef.current];
        const urduAudio = urduAudioRef.current;
        if (!verse || !urduAudio) {
            playArabicVerse(verseIndexRef.current + 1, true);
            return;
        }

        isPlayingUrduRef.current = true;
        urduAudio.src = `https://cdn.islamic.network/quran/audio/64/ur.khan/${verse.globalAyahId}.mp3`;
        urduAudio.load();
        setIsLoading(true);
        urduAudio.play().catch((error) => {
            console.error("Urdu translation playback failed:", error);
            isPlayingUrduRef.current = false;
            // One missing translation file should not stop the full recitation.
            playArabicVerse(verseIndexRef.current + 1, true);
        });
    };

    useEffect(() => {
        mountedRef.current = true;
        const arabicAudio = new Audio();
        const urduAudio = new Audio();
        arabicAudio.preload = "auto";
        urduAudio.preload = "auto";
        arabicAudioRef.current = arabicAudio;
        urduAudioRef.current = urduAudio;

        const onArabicPlaying = () => {
            setIsLoading(false);
            setAudioError(null);
            updatePlaying(true);
        };
        const onArabicPause = () => {
            if (!isPlayingUrduRef.current && !arabicAudio.ended) updatePlaying(false);
        };
        const onArabicCanPlay = () => {
            const fraction = seekFractionRef.current;
            if (fraction !== null && Number.isFinite(arabicAudio.duration)) {
                arabicAudio.currentTime = fraction * arabicAudio.duration;
                seekFractionRef.current = null;
            }
            setIsLoading(false);
        };
        const onArabicTimeUpdate = () => {
            const total = verseAudiosRef.current.length;
            if (!total) return;
            const verseFraction = Number.isFinite(arabicAudio.duration) && arabicAudio.duration > 0
                ? arabicAudio.currentTime / arabicAudio.duration
                : 0;
            setPlaybackProgress(((verseIndexRef.current + verseFraction) / total) * 100);
        };
        const onArabicEnded = () => {
            if (audioLanguageRef.current === "ur") playUrduTranslation();
            else playArabicVerse(verseIndexRef.current + 1, true);
        };
        const onArabicError = () => {
            if (!verseAudiosRef.current.length || currentSurahIdRef.current === null) return;
            setIsLoading(false);
            setAudioError("This recitation file is temporarily unavailable.");
            updatePlaying(false);
        };
        const onUrduPlaying = () => {
            setIsLoading(false);
            updatePlaying(true);
        };
        const onUrduEnded = () => {
            isPlayingUrduRef.current = false;
            playArabicVerse(verseIndexRef.current + 1, true);
        };
        const onUrduError = () => {
            isPlayingUrduRef.current = false;
            playArabicVerse(verseIndexRef.current + 1, true);
        };
        const onWaiting = () => setIsLoading(true);

        arabicAudio.addEventListener("playing", onArabicPlaying);
        arabicAudio.addEventListener("pause", onArabicPause);
        arabicAudio.addEventListener("canplay", onArabicCanPlay);
        arabicAudio.addEventListener("timeupdate", onArabicTimeUpdate);
        arabicAudio.addEventListener("ended", onArabicEnded);
        arabicAudio.addEventListener("error", onArabicError);
        arabicAudio.addEventListener("waiting", onWaiting);
        urduAudio.addEventListener("playing", onUrduPlaying);
        urduAudio.addEventListener("ended", onUrduEnded);
        urduAudio.addEventListener("error", onUrduError);
        urduAudio.addEventListener("waiting", onWaiting);

        return () => {
            mountedRef.current = false;
            requestIdRef.current += 1;
            arabicAudio.pause();
            urduAudio.pause();
            arabicAudio.removeEventListener("playing", onArabicPlaying);
            arabicAudio.removeEventListener("pause", onArabicPause);
            arabicAudio.removeEventListener("canplay", onArabicCanPlay);
            arabicAudio.removeEventListener("timeupdate", onArabicTimeUpdate);
            arabicAudio.removeEventListener("ended", onArabicEnded);
            arabicAudio.removeEventListener("error", onArabicError);
            arabicAudio.removeEventListener("waiting", onWaiting);
            urduAudio.removeEventListener("playing", onUrduPlaying);
            urduAudio.removeEventListener("ended", onUrduEnded);
            urduAudio.removeEventListener("error", onUrduError);
            urduAudio.removeEventListener("waiting", onWaiting);
        };
        // Audio element listeners are installed once and use refs for current state.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loadRecitation = async (
        surahId: number,
        surahName: string,
        selectedReciterId: number,
        options: { shouldPlay: boolean; verseIndex?: number; verseFraction?: number } = { shouldPlay: true },
    ) => {
        const requestId = ++requestIdRef.current;
        setIsLoading(true);
        setAudioError(null);

        try {
            const data = await getSurahRecitation(surahId, selectedReciterId);
            if (requestId !== requestIdRef.current || !mountedRef.current) return;
            if (!data.verseAudios.length) throw new Error("No recitation files returned");

            verseAudiosRef.current = data.verseAudios;
            currentSurahIdRef.current = surahId;
            currentSurahNameRef.current = surahName;
            setCurrentSurahId(surahId);
            setCurrentSurahName(surahName);
            const nextIndex = Math.min(options.verseIndex ?? 0, data.verseAudios.length - 1);
            playArabicVerse(nextIndex, options.shouldPlay, options.verseFraction ?? 0);
            if (!options.shouldPlay) setIsLoading(false);
        } catch (error) {
            if (requestId !== requestIdRef.current || !mountedRef.current) return;
            console.error("Failed to load Surah recitation:", error);
            setAudioError("Recitation is temporarily unavailable. Please check your connection and retry.");
            setIsLoading(false);
            updatePlaying(false);
        }
    };

    const pauseAudio = () => {
        updatePlaying(false);
        arabicAudioRef.current?.pause();
        urduAudioRef.current?.pause();
    };

    const resumeAudio = () => {
        const activeAudio = isPlayingUrduRef.current ? urduAudioRef.current : arabicAudioRef.current;
        if (!activeAudio?.src) return;
        setIsLoading(true);
        activeAudio.play().catch((error) => {
            console.error("Playback resume failed:", error);
            setAudioError("The recitation could not resume. Please try again.");
            setIsLoading(false);
            updatePlaying(false);
        });
    };

    const playSurah = (surahId: number, surahName: string) => {
        if (!arabicAudioRef.current) return;
        if (currentSurahIdRef.current === surahId && verseAudiosRef.current.length) {
            resumeAudio();
            return;
        }
        void loadRecitation(surahId, surahName, reciterIdRef.current, { shouldPlay: true });
    };

    const stopAudio = () => {
        requestIdRef.current += 1;
        for (const audio of [arabicAudioRef.current, urduAudioRef.current]) {
            if (!audio) continue;
            audio.pause();
            audio.removeAttribute("src");
            audio.load();
        }
        verseAudiosRef.current = [];
        verseIndexRef.current = 0;
        currentSurahIdRef.current = null;
        currentSurahNameRef.current = "";
        isPlayingUrduRef.current = false;
        setCurrentSurahId(null);
        setCurrentSurahName("");
        setActiveVerseKey(null);
        setActiveWordPosition(null);
        setPlaybackProgress(0);
        setAudioError(null);
        setIsLoading(false);
        updatePlaying(false);
    };

    const togglePlay = () => {
        if (isPlayingRef.current) pauseAudio();
        else resumeAudio();
    };

    const seekToPercent = (percent: number) => {
        const total = verseAudiosRef.current.length;
        if (!total) return;
        const normalized = Math.max(0, Math.min(99.999, percent)) / 100;
        const exactIndex = normalized * total;
        const index = Math.min(total - 1, Math.floor(exactIndex));
        playArabicVerse(index, isPlayingRef.current, exactIndex - index);
    };

    const changeReciter = (nextReciterId: number) => {
        if (nextReciterId === reciterIdRef.current) return;
        reciterIdRef.current = nextReciterId;
        setReciterIdState(nextReciterId);

        if (currentSurahIdRef.current !== null) {
            const audio = arabicAudioRef.current;
            const fraction = audio && Number.isFinite(audio.duration) && audio.duration > 0
                ? audio.currentTime / audio.duration
                : 0;
            const wasPlaying = isPlayingRef.current;
            arabicAudioRef.current?.pause();
            urduAudioRef.current?.pause();
            isPlayingUrduRef.current = false;
            void loadRecitation(
                currentSurahIdRef.current,
                currentSurahNameRef.current,
                nextReciterId,
                { shouldPlay: wasPlaying, verseIndex: verseIndexRef.current, verseFraction: fraction },
            );
        }
    };

    const changeAudioLanguage = (nextLanguage: "ar" | "ur") => {
        if (nextLanguage === audioLanguageRef.current) return;
        audioLanguageRef.current = nextLanguage;
        setAudioLanguageState(nextLanguage);

        if (nextLanguage === "ar" && isPlayingUrduRef.current) {
            const shouldPlay = isPlayingRef.current;
            urduAudioRef.current?.pause();
            isPlayingUrduRef.current = false;
            playArabicVerse(verseIndexRef.current + 1, shouldPlay);
        }
    };

    return (
        <AudioPlayerContext.Provider
            value={{
                isPlaying,
                isLoading,
                audioError,
                currentSurahId,
                currentSurahName,
                activeVerseKey,
                activeWordPosition,
                reciterId,
                audioLanguage,
                setAudioLanguage: changeAudioLanguage,
                setReciterId: changeReciter,
                playSurah,
                pauseAudio,
                resumeAudio,
                stopAudio,
                togglePlay,
                playbackProgress,
                seekToPercent,
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
