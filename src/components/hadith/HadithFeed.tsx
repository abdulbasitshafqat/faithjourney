
'use client';

import { useState, useEffect } from 'react';
import { Share2, Bookmark, Copy, Check, Loader2 } from 'lucide-react';
import { Hadith } from '@/lib/api/hadith';
import { toggleBookmark, checkBookmarksBatch } from '@/lib/api/bookmarks';
import { supabase } from '@/lib/supabase';

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
            <div className="flex justify-end items-center mb-6 bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                <span className="text-sm font-medium mr-3 text-slate-600">Urdu Translation</span>
                <button
                    onClick={() => setShowUrdu(!showUrdu)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${showUrdu ? 'bg-emerald-600' : 'bg-slate-200'}`}
                >
                    <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${showUrdu ? 'translate-x-6' : 'translate-x-1'}`}
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
                        className="bg-white rounded-2xl shadow-sm border border-emerald-50/50 overflow-hidden hover:shadow-md transition-shadow"
                    >
                        {/* Header: Number & Grade */}
                        <div className="bg-emerald-50/30 px-6 py-3 flex justify-between items-center border-b border-emerald-50">
                            <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-sm font-bold">
                                #{item.english.hadithnumber}
                            </span>
                            {item.english.grades && item.english.grades.length > 0 && (
                                <span className="text-xs font-medium px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-100">
                                    {item.english.grades[0].grade}
                                </span>
                            )}
                        </div>

                        <div className="p-6 md:p-8">
                            {/* Arabic Text */}
                            <div className="mb-8 text-right" dir="rtl">
                                <p className="text-3xl md:text-4xl text-slate-800 leading-loose font-serif">
                                    {item.arabic.text}
                                </p>
                            </div>

                            {/* English Translation */}
                            <div className="mb-6">
                                <p className="text-lg text-slate-700 leading-relaxed">
                                    {item.english.text}
                                </p>
                            </div>

                            {/* Urdu Translation */}
                            {showUrdu && item.urdu && (
                                <div className="mb-6 text-right border-t border-slate-100 pt-6" dir="rtl">
                                    <p className="text-xl text-slate-600 leading-loose font-serif">
                                        {item.urdu.text}
                                    </p>
                                </div>
                            )}

                            {/* Action Bar */}
                            <div className="flex items-center justify-end space-x-2 mt-8 pt-4 border-t border-slate-50">
                                <button
                                    onClick={() => handleCopy(item, item.english.hadithnumber)}
                                    className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-full transition-colors"
                                    title="Copy Text"
                                >
                                    {copiedId === item.english.hadithnumber ? <Check size={20} /> : <Copy size={20} />}
                                </button>

                                <button
                                    onClick={() => handleShare(item)}
                                    className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-full transition-colors"
                                    title="Share"
                                >
                                    <Share2 size={20} />
                                </button>

                                <button
                                    onClick={() => handleBookmark(item)}
                                    disabled={isLoading}
                                    className={`p-2 rounded-full transition-colors ${isBookmarked ? 'text-amber-500 bg-amber-50' : 'text-slate-400 hover:text-amber-500 hover:bg-amber-50'}`}
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
