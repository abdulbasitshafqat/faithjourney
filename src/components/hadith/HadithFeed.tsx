
'use client';

import { useState, useEffect } from 'react';
import { Share2, Bookmark, Copy, Check, Loader2 } from 'lucide-react';
import { Hadith } from '@/lib/api/hadith';
import { toggleBookmark, checkBookmarksBatch } from '@/lib/api/bookmarks';
import { supabase } from '@/lib/supabase';
import { cn } from '@/lib/utils';

interface HadithFeedProps {
    hadiths: {
        arabic: Hadith;
        english: Hadith;
        visitor?: Hadith;
        urdu?: Hadith;
    }[];
    bookName: string;
    chapterName: string;
}

export default function HadithFeed({ hadiths, bookName, chapterName }: HadithFeedProps) {
    const [showUrdu, setShowUrdu] = useState(false);
    const [copiedId, setCopiedId] = useState<number | null>(null);
    const [bookmarkedIds, setBookmarkedIds] = useState<Record<string, boolean>>({});
    const [loadingBookmarks, setLoadingBookmarks] = useState<Record<string, boolean>>({});
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const checkUser = async () => {
            const { data } = await supabase.auth.getUser();
            setUser(data.user);
        };
        checkUser();

        // Check which ones are bookmarked in batch
        const checkBookmarks = async () => {
            const ids = hadiths.map(item => `${bookName}-${item.english.hadithnumber}`);
            const status = await checkBookmarksBatch(ids, 'hadith');
            setBookmarkedIds(status);
        };

        if (hadiths.length > 0) {
            checkBookmarks();
        }
    }, [hadiths, bookName]);

    const handleCopy = (hadith: { arabic: Hadith; english: Hadith }, id: number) => {
        const text = `${hadith.arabic.text}\n\n${hadith.english.text}\n\n(${bookName}, Hadith ${hadith.english.hadithnumber})`;
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const handleShare = async (hadith: { arabic: Hadith; english: Hadith }) => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Hadith from FaithJourney',
                    text: `${hadith.arabic.text}\n\n${hadith.english.text}\n(${bookName})`,
                    url: window.location.href,
                });
            } catch (err) {
                console.log('Error sharing:', err);
            }
        }
    };

    const handleBookmark = async (hadith: { arabic: Hadith; english: Hadith; urdu?: Hadith }) => {
        if (!user) {
            alert('Please sign in to bookmark Hadiths.');
            return;
        }

        const id = `${bookName}-${hadith.english.hadithnumber}`;
        setLoadingBookmarks(prev => ({ ...prev, [id]: true }));

        try {
            const metadata = {
                bookName,
                chapterName,
                hadithnumber: hadith.english.hadithnumber,
                arabicText: hadith.arabic.text,
                englishText: hadith.english.text,
                urduText: hadith.urdu?.text,
                grades: hadith.english.grades
            };

            const result = await toggleBookmark(id, 'hadith', metadata);
            setBookmarkedIds(prev => ({ ...prev, [id]: result.action === 'added' }));
        } catch (error: any) {
            console.error('Error bookmarking:', error);
            alert(error.message || 'Failed to update bookmark');
        } finally {
            setLoadingBookmarks(prev => ({ ...prev, [id]: false }));
        }
    };

    return (
        <div className="space-y-6">
            {/* Controls */}
            <div className="flex justify-end items-center mb-6 bg-card/50 backdrop-blur-sm p-4 rounded-xl shadow-sm border border-primary/10">
                <span className="text-sm font-medium mr-3 text-muted-foreground">Urdu Translation</span>
                <button
                    onClick={() => setShowUrdu(!showUrdu)}
                    className={cn(
                        "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                        showUrdu ? "bg-primary" : "bg-muted"
                    )}
                >
                    <span
                        className={cn(
                            "inline-block h-4 w-4 transform rounded-full bg-background transition-transform shadow-sm",
                            showUrdu ? "translate-x-6" : "translate-x-1"
                        )}
                    />
                </button>
            </div>

            {/* Hadith Cards */}
            {hadiths.map((item, index) => {
                const hadithId = `${bookName}-${item.english.hadithnumber}`;
                const isBookmarked = bookmarkedIds[hadithId];
                const isLoading = loadingBookmarks[hadithId];

                return (
                    <div
                        key={index}
                        id={`hadith-${item.english.hadithnumber}`}
                        className="bg-card/40 backdrop-blur-md rounded-2xl shadow-xl border border-primary/10 overflow-hidden hover:shadow-2xl transition-all duration-300 group"
                    >
                        {/* Header: Number & Grade */}
                        <div className="bg-primary/5 px-6 py-4 flex justify-between items-center border-b border-primary/10">
                            <span className="inline-flex items-center justify-center px-4 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest">
                                Hadith #{item.english.hadithnumber}
                            </span>
                            {item.english.grades && item.english.grades.length > 0 && (
                                <span className="text-[10px] font-bold px-2.5 py-1 rounded bg-secondary/10 text-secondary-foreground border border-secondary/20 uppercase tracking-tighter">
                                    {item.english.grades[0].grade}
                                </span>
                            )}
                        </div>

                        <div className="p-8 md:p-10">
                            {/* Arabic Text */}
                            <div className="mb-10 text-right" dir="rtl">
                                <p className="text-4xl md:text-5xl text-primary leading-[1.8] font-arabic">
                                    {item.arabic.text}
                                </p>
                            </div>

                            {/* English Translation */}
                            <div className="mb-8">
                                <p className="text-xl text-foreground/90 leading-relaxed font-serif italic">
                                    "{item.english.text}"
                                </p>
                            </div>

                            {/* Urdu Translation */}
                            {showUrdu && item.urdu && (
                                <div className="mb-8 text-right border-t border-primary/5 pt-8" dir="rtl">
                                    <p className="text-2xl text-foreground/80 leading-loose font-arabic">
                                        {item.urdu.text}
                                    </p>
                                </div>
                            )}

                            {/* Action Bar */}
                            <div className="flex items-center justify-end space-x-3 mt-10 pt-6 border-t border-primary/5">
                                <button
                                    onClick={() => handleCopy(item, item.english.hadithnumber)}
                                    className="p-3 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full transition-all duration-300"
                                    title="Copy Text"
                                >
                                    {copiedId === item.english.hadithnumber ? <Check size={20} /> : <Copy size={20} />}
                                </button>

                                <button
                                    onClick={() => handleShare(item)}
                                    className="p-3 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full transition-all duration-300"
                                    title="Share"
                                >
                                    <Share2 size={20} />
                                </button>

                                <button
                                    onClick={() => handleBookmark(item)}
                                    disabled={isLoading}
                                    className={cn(
                                        "p-3 rounded-full transition-all duration-300",
                                        isBookmarked
                                            ? "text-secondary bg-secondary/10"
                                            : "text-muted-foreground hover:text-secondary hover:bg-secondary/10"
                                    )}
                                    title={isBookmarked ? "Remove Bookmark" : "Bookmark Hadith"}
                                >
                                    {isLoading ? (
                                        <Loader2 size={20} className="animate-spin" />
                                    ) : (
                                        <Bookmark size={20} fill={isBookmarked ? "currentColor" : "none"} />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
