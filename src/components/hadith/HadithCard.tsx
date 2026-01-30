'use client';
import { Hadith } from '@/lib/api/hadith';
import { cn } from '@/lib/utils';
import { Share2, Bookmark, Copy, Check, Loader2, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { toggleBookmark } from '@/lib/api/bookmarks';
import { User } from '@supabase/supabase-js';

interface HadithCardProps {
    item: {
        arabic: Hadith;
        english: Hadith;
        urdu?: Hadith;
    };
    bookName: string;
    chapterName: string;
    showUrdu: boolean;
    user: User | null;
    isBookmarked: boolean;
    onBookmarkUpdate: (id: string, isBookmarked: boolean) => void;
}

export const HadithCard = ({ item, bookName, chapterName, showUrdu, user, isBookmarked, onBookmarkUpdate }: HadithCardProps) => {
    const [copiedId, setCopiedId] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleCopy = () => {
        const text = `${item.arabic.text}\n\n${item.english.text}\n\n(${bookName}, Hadith ${item.english.hadithnumber})`;
        navigator.clipboard.writeText(text);
        setCopiedId(item.english.hadithnumber);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Hadith from FaithJourney',
                    text: `${item.arabic.text}\n\n${item.english.text}\n(${bookName})`,
                    url: window.location.href,
                });
            } catch (err) {
                console.error('Error sharing:', err);
            }
        }
    };

    const handleBookmark = async () => {
        if (!user) {
            alert('Please sign in to bookmark Hadiths.');
            return;
        }

        const id = `${bookName}-${item.english.hadithnumber}`;
        setIsLoading(true);

        try {
            const metadata = {
                bookName,
                chapterName,
                hadithnumber: item.english.hadithnumber,
                arabicText: item.arabic.text,
                englishText: item.english.text,
                urduText: item.urdu?.text,
                grades: item.english.grades
            };

            const result = await toggleBookmark(id, 'hadith', metadata);
            onBookmarkUpdate(id, result.action === 'added');
        } catch (error) {
            console.error('Error bookmarking:', error);
            alert((error as Error).message || 'Failed to update bookmark');
        } finally {
            setIsLoading(false);
        }
    };

    // Helper to determine grade badge style
    const getGradeStyle = (grade: string) => {
        const g = grade.toLowerCase();
        if (g.includes('sahih')) return "bg-emerald-500 text-white border-emerald-600 shadow-emerald-500/20";
        if (g.includes('hasan')) return "bg-blue-600 text-white border-blue-700 shadow-blue-600/20"; // User asked for Navy Blue, defaulting to standard blue/indigo range
        if (g.includes('da\'if') || g.includes('daif') || g.includes('weak')) return "bg-amber-500 text-black border-amber-600 shadow-amber-500/20";
        return "bg-secondary text-secondary-foreground border-secondary/20"; // Default
    };

    // Helper for localized grade name
    const getLocalizedGrade = (grade: string) => {
        if (!showUrdu) return grade;
        const g = grade.toLowerCase();
        if (g.includes('sahih')) return "صحیح";
        if (g.includes('hasan')) return "حسن";
        if (g.includes('da\'if') || g.includes('daif') || g.includes('weak')) return "ضعیف";
        return grade;
    };

    // Implicit grade for known Sahih books if explicit grades are missing
    const getImplicitGrade = () => {
        if (item.english.grades && item.english.grades.length > 0) return item.english.grades[0];

        const lowerBook = bookName.toLowerCase();
        if (lowerBook.includes('bukhari') || lowerBook.includes('muslim')) {
            return { name: 'Verdict', grade: 'Sahih' };
        }
        return null;
    };

    const grade = getImplicitGrade();

    return (
        <div
            id={`hadith-${item.english.hadithnumber}`}
            className="bg-card/40 backdrop-blur-md rounded-2xl shadow-xl border border-primary/10 overflow-hidden hover:shadow-2xl transition-all duration-300 group"
        >
            {/* Header: Number & Grade */}
            <div className="bg-primary/5 px-6 py-4 flex justify-between items-center border-b border-primary/10">
                <span className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-background border border-primary/10 text-primary text-xs font-black uppercase tracking-widest shadow-sm">
                    Hadith #{item.english.hadithnumber}
                </span>

                {grade && (
                    <span className={cn(
                        "inline-flex items-center gap-1.5 text-[11px] font-bold px-3 py-1.5 rounded-[0.5rem] border shadow-lg uppercase tracking-wider transition-transform group-hover:scale-105",
                        getGradeStyle(grade.grade)
                    )}>
                        {grade.grade.toLowerCase().includes('sahih') && <ShieldCheck className="w-3.5 h-3.5" />}
                        {getLocalizedGrade(grade.grade)}
                    </span>
                )}
            </div>

            <div className="p-8 md:p-10">
                {/* Arabic Text */}
                <div className="mb-10 text-right" dir="rtl">
                    <p className="text-3xl md:text-5xl text-primary leading-[1.8] font-arabic leading-loose">
                        {item.arabic.text}
                    </p>
                </div>

                {/* English Translation */}
                <div className="mb-8">
                    <p className="text-lg md:text-xl text-foreground/90 leading-relaxed font-serif italic text-justify">
                        &quot;{item.english.text}&quot;
                    </p>
                </div>

                {/* Urdu Translation */}
                {showUrdu && item.urdu && (
                    <div className="mb-8 text-right border-t-2 border-primary/10 pt-8 bg-primary/5 p-6 rounded-xl" dir="rtl">
                        <div className="text-xs font-bold text-primary mb-2 uppercase tracking-widest text-left">Urdu translation</div>
                        <p className="text-xl md:text-2xl text-foreground/90 leading-loose font-urdu">
                            {item.urdu.text}
                        </p>
                    </div>
                )}

                {/* Detailed Reference Section */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-2 p-4 bg-muted/30 rounded-lg border border-primary/5">
                        <h4 className="font-bold uppercase tracking-wider text-primary/70 mb-3 border-b border-primary/10 pb-2">Source Reference</h4>
                        <div className="flex justify-between pb-1">
                            <span className="text-muted-foreground">Collection</span>
                            <span className="font-medium text-foreground">{bookName}</span>
                        </div>
                        <div className="flex justify-between pb-1">
                            <span className="text-muted-foreground">Hadith Number</span>
                            <span className="font-mono font-bold text-foreground">{item.english.hadithnumber}</span>
                        </div>
                        {item.english.reference && (
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">In-Book Ref</span>
                                <span className="font-mono text-foreground">Book {item.english.reference.book}, Hadith {item.english.reference.hadith}</span>
                            </div>
                        )}
                    </div>

                    <div className="space-y-2 p-4 bg-muted/30 rounded-lg border border-primary/5">
                        <h4 className="font-bold uppercase tracking-wider text-primary/70 mb-3 border-b border-primary/10 pb-2">Authentication Status</h4>
                        {grade ? (
                            <div className="flex justify-between items-center pb-1">
                                <span className="text-muted-foreground">{grade.name}</span>
                                <span className={cn(
                                    "font-bold text-[10px] px-2 py-0.5 rounded uppercase",
                                    grade.grade.toLowerCase().includes('sahih') ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" :
                                        grade.grade.toLowerCase().includes('hasan') ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" :
                                            "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                                )}>
                                    {grade.grade}
                                </span>
                            </div>
                        ) : (
                            <div className="text-muted-foreground italic tracking-tight">Grade information not available.</div>
                        )}
                    </div>
                </div>

                {/* Action Bar */}
                <div className="flex items-center justify-end space-x-3 mt-10 pt-6 border-t border-primary/5">
                    <button
                        onClick={handleCopy}
                        className="p-3 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full transition-all duration-300"
                        title="Copy Text"
                    >
                        {copiedId === item.english.hadithnumber ? <Check size={20} className="text-emerald-500" /> : <Copy size={20} />}
                    </button>

                    <button
                        onClick={handleShare}
                        className="p-3 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full transition-all duration-300"
                        title="Share"
                    >
                        <Share2 size={20} />
                    </button>

                    <button
                        onClick={handleBookmark}
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
};
