
'use client';

import { useState, useEffect } from 'react';
import { Share2, Bookmark, Copy, Check, Loader2 } from 'lucide-react';
import { Hadith } from '@/lib/api/hadith';
import { toggleBookmark, checkBookmarksBatch } from '@/lib/api/bookmarks';
import { supabase } from '@/lib/supabase';
import { cn } from '@/lib/utils';
import { User } from '@supabase/supabase-js';
import { HadithCard } from './HadithCard';

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
                const isBookmarked = bookmarkedIds[hadithId] || false;

                return (
                    <HadithCard
                        key={index}
                        item={item}
                        bookName={bookName}
                        chapterName={chapterName}
                        showUrdu={showUrdu}
                        user={user}
                        isBookmarked={isBookmarked}
                        onBookmarkUpdate={(id, status) => setBookmarkedIds(prev => ({ ...prev, [id]: status }))}
                    />
                );
            })}
        </div>
    );
}
