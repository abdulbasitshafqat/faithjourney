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

const surahVersesCount = [7,286,200,176,120,165,206,75,129,109,123,111,43,52,99,128,111,110,98,135,112,78,118,64,77,227,93,88,69,60,34,30,73,54,45,83,182,88,75,85,54,53,89,59,37,35,38,29,18,45,60,49,62,55,78,96,29,22,24,13,14,11,11,18,12,12,30,52,52,44,28,28,20,56,40,31,50,40,46,42,29,19,36,25,22,17,19,26,30,20,15,21,11,8,8,19,5,8,8,11,11,8,3,9,5,4,7,3,6,3,5,4,5,6];

function getGlobalAyahId(verseKey: string): number {
    const [surahId, ayahNum] = verseKey.split(":").map(Number);
    let count = 0;
    for (let i = 0; i < surahId - 1; i++) {
        count += surahVersesCount[i];
    }
    return count + ayahNum;
}

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
    const [isPlayingUrdu, setIsPlayingUrdu] = useState(false);

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const urduAudioRef = useRef<HTMLAudioElement | null>(null);
    const audioDataRef = useRef<SurahAudioData | null>(null);
    const activeVerseKeyRef = useRef<string | null>(null);
    const isPlayingRef = useRef(false);
    isPlayingRef.current = isPlaying;

    const audioLanguageRef = useRef(audioLanguage);
    const isPlayingUrduRef = useRef(false);
    const lastPlayedUrduVerseRef = useRef<string | null>(null);

    useEffect(() => {
        audioDataRef.current = audioData;
    }, [audioData]);

    useEffect(() => {
        activeVerseKeyRef.current = activeVerseKey;
    }, [activeVerseKey]);

    useEffect(() => {
        audioLanguageRef.current = audioLanguage;
        if (audioLanguage === 'ar' && isPlayingUrduRef.current) {
            if (urduAudioRef.current) {
                urduAudioRef.current.pause();
            }
            isPlayingUrduRef.current = false;
            setIsPlayingUrdu(false);
            if (audioRef.current && isPlayingRef.current) {
                audioRef.current.play().catch(console.error);
            }
        }
    }, [audioLanguage]);

    const playUrduTranslation = (verseKey: string) => {
        if (!audioRef.current || !urduAudioRef.current) return;

        // Set Urdu state FIRST before pausing Arabic to prevent race condition in onPause listener
        setIsPlayingUrdu(true);
        isPlayingUrduRef.current = true;
        lastPlayedUrduVerseRef.current = verseKey;

        audioRef.current.pause();

        const globalAyahId = getGlobalAyahId(verseKey);
        urduAudioRef.current.src = `https://cdn.islamic.network/quran/audio/64/ur.khan/${globalAyahId}.mp3`;
        urduAudioRef.current.load();
        
        setIsLoading(true);
        urduAudioRef.current.play()
            .then(() => setIsLoading(false))
            .catch(e => {
                console.error("Failed to play Urdu voiceover:", e);
                setIsLoading(false);
                setIsPlayingUrdu(false);
                isPlayingUrduRef.current = false;
                if (audioRef.current && isPlayingRef.current) {
                    audioRef.current.play().catch(console.error);
                }
            });
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            const audio = new Audio();
            audioRef.current = audio;

            const urduAudio = new Audio();
            urduAudioRef.current = urduAudio;

            const onPlay = () => setIsPlaying(true);
            const onPause = () => {
                if (!isPlayingUrduRef.current) {
                    setIsPlaying(false);
                }
            };
            const onEnded = () => {
                setIsPlaying(false);
                setActiveVerseKey(null);
                setActiveWordPosition(null);
                setPlaybackProgress(100);
            };
            const onTimeUpdate = () => {
                if (!audioRef.current) return;
                
                if (isPlayingUrduRef.current) return;

                const duration = audioRef.current.duration || 1;
                setPlaybackProgress((audioRef.current.currentTime / duration) * 100);

                const currentAudioData = audioDataRef.current;
                if (!currentAudioData?.timestamps) return;
                const currentTimeMs = audioRef.current.currentTime * 1000;

                const activeVerse = currentAudioData.timestamps.find(
                    (t: AudioTimestamp) => currentTimeMs >= t.timestamp_from && currentTimeMs < t.timestamp_to
                );

                if (activeVerse) {
                    const prevVerseKey = activeVerseKeyRef.current;
                    
                    if (activeVerse.verse_key !== prevVerseKey) {
                        if (audioLanguageRef.current === 'ur' && prevVerseKey && lastPlayedUrduVerseRef.current !== prevVerseKey) {
                            audioRef.current.currentTime = activeVerse.timestamp_from / 1000;
                            setActiveVerseKey(prevVerseKey);
                            playUrduTranslation(prevVerseKey);
                            return;
                        }
                        setActiveVerseKey(activeVerse.verse_key);
                    }

                    const activeSegment = activeVerse.segments.find(
                        (s: number[]) => currentTimeMs >= s[1] && currentTimeMs < s[2]
                    );

                    if (activeSegment) {
                        setActiveWordPosition(activeSegment[0]);
                    } else {
                        setActiveWordPosition(null);
                    }

                    if (audioLanguageRef.current === 'ur') {
                        const timeRemaining = activeVerse.timestamp_to - currentTimeMs;
                        if (timeRemaining <= 300 && lastPlayedUrduVerseRef.current !== activeVerse.verse_key) {
                            playUrduTranslation(activeVerse.verse_key);
                        }
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

            const onUrduEnded = () => {
                setIsPlayingUrdu(false);
                isPlayingUrduRef.current = false;
                if (audioRef.current && isPlayingRef.current) {
                    audioRef.current.play().catch(console.error);
                }
            };
            const onUrduPlay = () => setIsPlaying(true);
            const onUrduPause = () => {};

            urduAudio.addEventListener("ended", onUrduEnded);
            urduAudio.addEventListener("play", onUrduPlay);
            urduAudio.addEventListener("pause", onUrduPause);

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

                urduAudio.pause();
                urduAudio.removeEventListener("ended", onUrduEnded);
                urduAudio.removeEventListener("play", onUrduPlay);
                urduAudio.removeEventListener("pause", onUrduPause);
            };
        }
    }, []);

    const playSurah = async (surahId: number, surahName: string) => {
        if (!audioRef.current) return;

        try {
            if (currentSurahId === surahId && audioRef.current.src) {
                if (audioRef.current.paused && (!isPlayingUrduRef.current || !urduAudioRef.current || urduAudioRef.current.paused)) {
                    setIsLoading(true);
                    const playerToResume = (audioLanguage === 'ur' && isPlayingUrduRef.current && urduAudioRef.current) 
                        ? urduAudioRef.current 
                        : audioRef.current;

                    playerToResume.play().then(() => {
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
            lastPlayedUrduVerseRef.current = null;
            setIsPlayingUrdu(false);
            isPlayingUrduRef.current = false;

            const data = await getSurahRecitation(surahId, reciterId, 'ar');
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
        setIsPlaying(false);
        if (audioRef.current) {
            audioRef.current.pause();
        }
        if (urduAudioRef.current) {
            urduAudioRef.current.pause();
        }
    };

    const resumeAudio = () => {
        if (audioLanguage === 'ur' && isPlayingUrduRef.current) {
            if (urduAudioRef.current && urduAudioRef.current.src) {
                urduAudioRef.current.play().catch(e => console.error(e));
            }
        } else {
            if (audioRef.current && audioRef.current.src) {
                audioRef.current.play().catch(e => console.error(e));
            }
        }
    };

    const stopAudio = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.src = "";
        }
        if (urduAudioRef.current) {
            urduAudioRef.current.pause();
            urduAudioRef.current.src = "";
        }
        setCurrentSurahId(null);
        setCurrentSurahName("");
        setIsPlaying(false);
        setActiveVerseKey(null);
        setActiveWordPosition(null);
        setPlaybackProgress(0);
        setIsPlayingUrdu(false);
        isPlayingUrduRef.current = false;
        lastPlayedUrduVerseRef.current = null;
    };

    const togglePlay = () => {
        if (isPlaying) {
            pauseAudio();
        } else {
            resumeAudio();
        }
    };

    const seekToPercent = (percent: number) => {
        if (isPlayingUrduRef.current && urduAudioRef.current) {
            urduAudioRef.current.pause();
            urduAudioRef.current.src = "";
        }
        setIsPlayingUrdu(false);
        isPlayingUrduRef.current = false;

        if (audioRef.current && audioRef.current.duration) {
            const time = (percent / 100) * audioRef.current.duration;
            audioRef.current.currentTime = time;
            if (isPlaying) {
                audioRef.current.play().catch(console.error);
            }
        }
    };

    useEffect(() => {
        if (currentSurahId && isPlayingRef.current) {
            const timer = setTimeout(() => {
                playSurah(currentSurahId, currentSurahName);
            }, 0);
            return () => clearTimeout(timer);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reciterId]);

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
