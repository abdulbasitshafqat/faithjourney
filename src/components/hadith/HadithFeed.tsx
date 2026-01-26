
'use client';

import { useState, useEffect } from 'react';
import { Share2, Bookmark, Copy, Check, Loader2 } from 'lucide-react';
import { Hadith } from '@/lib/api/hadith';
import { toggleBookmark, checkBookmarksBatch } from '@/lib/api/bookmarks';
import { supabase } from '@/lib/supabase';
import { cn } from '@/lib/utils';
import { User } from '@supabase/supabase-js';

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
    const [user, setUser] = useState<User | null>(null);

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
                console.error('Error sharing:', err);
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
        } catch (error) {
            console.error('Error bookmarking:', error);
            alert((error as Error).message || 'Failed to update bookmark');
        } finally {
            setLoadingBookmarks(prev => ({ ...prev, [id]: false }));
        }
    };

    return (
        <div className="space-y-6">
            {/* Controls */}
            <div className="flex justify-between items-center mb-8 bg-card/60 backdrop-blur-md p-5 rounded-2xl shadow-lg border border-primary/20">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center font-bold text-primary">ع</div>
                    <div>
                        <h3 className="text-sm font-bold text-foreground">Advanced View</h3>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest leading-none">Translation & References</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-tighter">Urdu Translation</span>
                    <button
                        onClick={() => setShowUrdu(!showUrdu)}
                        className={cn(
                            "relative inline-flex h-7 w-14 items-center rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 shadow-inner",
                            showUrdu ? "bg-primary" : "bg-muted"
                        )}
                    >
                        <span
                            className={cn(
                                "inline-block h-5 w-5 transform rounded-full bg-background transition-transform shadow-md ring-1 ring-black/5",
                                showUrdu ? "translate-x-8" : "translate-x-1"
                            )}
                        />
                    </button>
                </div>
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
                                    &quot;{item.english.text}&quot;
                                </p>
                            </div>

                            {/* Urdu Translation */}
                            {showUrdu && item.urdu && (
                                <div className="mb-8 text-right border-t-2 border-primary/10 pt-8 bg-primary/5 p-6 rounded-xl" dir="rtl">
                                    <div className="text-xs font-bold text-primary mb-2 uppercase tracking-widest text-left">Urdu translation</div>
                                    <p className="text-2xl text-foreground/90 leading-loose font-arabic">
                                        {item.urdu.text}
                                    </p>
                                </div>
                            )}

                            {/* Detailed Reference Section */}
                            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                                <div className="space-y-2 p-4 bg-muted/30 rounded-lg border border-primary/5">
                                    <h4 className="font-bold uppercase tracking-wider text-primary/70">Source Reference</h4>
                                    <div className="flex justify-between border-b border-primary/5 pb-1">
                                        <span className="text-muted-foreground">Collection</span>
                                        <span className="font-medium">{bookName}</span>
                                    </div>
                                    <div className="flex justify-between border-b border-primary/5 pb-1">
                                        <span className="text-muted-foreground">Hadith Number</span>
                                        <span className="font-mono font-bold">{item.english.hadithnumber}</span>
                                    </div>
                                    {item.english.reference && (
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">In-Book Reference</span>
                                            <span className="font-mono">Book {item.english.reference.book}, Hadith {item.english.reference.hadith}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-2 p-4 bg-muted/30 rounded-lg border border-primary/5">
                                    <h4 className="font-bold uppercase tracking-wider text-primary/70">Authentication</h4>
                                    {item.english.grades && item.english.grades.length > 0 ? (
                                        item.english.grades.map((g, i) => (
                                            <div key={i} className="flex justify-between border-b border-primary/5 last:border-0 pb-1">
                                                <span className="text-muted-foreground">{g.name}</span>
                                                <span className={cn(
                                                    "font-bold",
                                                    g.grade.toLowerCase().includes('sahih') ? "text-emerald-600" :
                                                        g.grade.toLowerCase().includes('hasan') ? "text-amber-600" : "text-primary"
                                                )}>{g.grade}</span>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-muted-foreground italic tracking-tight">Grade information not available for this collection.</div>
                                    )}
                                </div>
                            </div>

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
