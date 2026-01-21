
'use client';

import { useEffect, useState } from 'react';
import { getBookmarks, Bookmark, toggleBookmark } from '@/lib/api/bookmarks';
import { supabase } from '@/lib/supabase';
import { Bookmark as BookmarkIcon, Trash2, ArrowRight, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function BookmarksPage() {
    const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const checkUser = async () => {
            const { data } = await supabase.auth.getUser();
            setUser(data.user);
            if (data.user) {
                loadBookmarks();
            } else {
                setLoading(false);
            }
        };
        checkUser();
    }, []);

    const loadBookmarks = async () => {
        setLoading(true);
        try {
            const data = await getBookmarks();
            setBookmarks(data);
        } catch (error) {
            console.error('Error loading bookmarks:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleRemove = async (itemId: string, type: 'hadith' | 'dua') => {
        try {
            await toggleBookmark(itemId, type, {});
            setBookmarks(prev => prev.filter(b => !(b.item_id === itemId && b.type === type)));
        } catch (error) {
            console.error('Error removing bookmark:', error);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center px-4">
                <BookmarkIcon size={64} className="text-slate-300 mb-6" />
                <h1 className="text-2xl font-bold text-slate-900 mb-2">Please Sign In</h1>
                <p className="text-slate-600 mb-8 text-center max-w-md">
                    You need to be signed in to view and manage your bookmarked items.
                </p>
                <Link href="/auth" className="px-8 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-colors">
                    Log In / Sign Up
                </Link>
            </div>
        );
    }

    const hadithBookmarks = bookmarks.filter(b => b.type === 'hadith');
    const duaBookmarks = bookmarks.filter(b => b.type === 'dua');

    return (
        <main className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 font-serif mb-2">
                            My <span className="text-emerald-600">Bookmarks</span>
                        </h1>
                        <p className="text-slate-600">
                            Your personal collection of saved knowledge and prayers.
                        </p>
                    </div>
                </div>

                <Tabs defaultValue="hadith" className="w-full">
                    <TabsList className="bg-white p-1 rounded-xl border border-slate-200 mb-8">
                        <TabsTrigger value="hadith" className="px-8 py-2 data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-700">
                            Hadiths ({hadithBookmarks.length})
                        </TabsTrigger>
                        <TabsTrigger value="dua" className="px-8 py-2 data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-700">
                            Duas ({duaBookmarks.length})
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="hadith">
                        {hadithBookmarks.length > 0 ? (
                            <div className="space-y-6">
                                {hadithBookmarks.map((bookmark) => (
                                    <div key={bookmark.id} className="bg-white rounded-2xl p-6 shadow-sm border border-emerald-50/50 hover:shadow-md transition-shadow">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded mb-2 inline-block">
                                                    {bookmark.metadata.bookName}
                                                </span>
                                                <h3 className="text-lg font-bold text-slate-800">
                                                    {bookmark.metadata.chapterName}
                                                </h3>
                                            </div>
                                            <button
                                                onClick={() => handleRemove(bookmark.item_id, 'hadith')}
                                                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                                                title="Remove Bookmark"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>

                                        <p className="text-slate-600 line-clamp-3 mb-6 italic">
                                            "{bookmark.metadata.englishText}"
                                        </p>

                                        <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                                            <span className="text-sm text-slate-400">
                                                Hadith #{bookmark.metadata.hadithnumber}
                                            </span>
                                            <Link
                                                href={`/hadith/${bookmark.metadata.bookName.toLowerCase().replace('sahih ', '').replace('sunan ', '')}/${bookmark.metadata.hadithnumber}`}
                                                className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium text-sm"
                                            >
                                                View Original <ArrowRight size={16} className="ml-1" />
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <EmptyState type="Hadiths" href="/hadith" />
                        )}
                    </TabsContent>

                    <TabsContent value="dua">
                        {duaBookmarks.length > 0 ? (
                            <div className="space-y-6">
                                {duaBookmarks.map((bookmark) => (
                                    <div key={bookmark.id} className="bg-white rounded-2xl p-6 shadow-sm border border-emerald-50/50 hover:shadow-md transition-shadow">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded mb-2 inline-block">
                                                    {bookmark.metadata.title}
                                                </span>
                                            </div>
                                            <button
                                                onClick={() => handleRemove(bookmark.item_id, 'dua')}
                                                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                                                title="Remove Bookmark"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="text-right">
                                                <p className="font-arabic text-xl md:text-2xl leading-loose text-slate-800">
                                                    {bookmark.metadata.arabicText}
                                                </p>
                                            </div>

                                            <div className="space-y-2">
                                                <p className="text-slate-600">
                                                    {bookmark.metadata.englishText}
                                                </p>
                                                {bookmark.metadata.urduText && (
                                                    <p className="text-slate-600 text-right font-arabic" dir="rtl">
                                                        {bookmark.metadata.urduText}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="pt-2 border-t border-slate-50 flex justify-between items-center">
                                                <span className="text-xs text-slate-400">
                                                    Reference: {bookmark.metadata.reference}
                                                </span>
                                                {/* 
                                                  Ideally we would link back to the specific dua, but our routing is by category.
                                                  We can link to the category page.
                                                  We don't have the category key in metadata easily unless we map titles to keys or store key.
                                                  For now, we can link to the general duas page or just remove the link.
                                                  Let's add a general link to the dua section.
                                                */}
                                                <Link
                                                    href="/duas"
                                                    className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium text-sm"
                                                >
                                                    View All <ArrowRight size={16} className="ml-1" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <EmptyState type="Duas" href="/duas" />
                        )}
                    </TabsContent>
                </Tabs>
            </div>
        </main>
    );
}

function EmptyState({ type, href }: { type: string, href: string }) {
    return (
        <div className="bg-white rounded-3xl p-16 text-center border-2 border-dashed border-slate-100">
            <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookmarkIcon size={32} className="text-slate-300" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">No {type} Saved</h2>
            <p className="text-slate-500 mb-8 max-w-sm mx-auto">
                Explore our collection and bookmark your favorite {type.toLowerCase()} to see them here.
            </p>
            <Link href={href} className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-colors">
                Explore {type} <ArrowRight size={18} className="ml-2" />
            </Link>
        </div>
    );
}
