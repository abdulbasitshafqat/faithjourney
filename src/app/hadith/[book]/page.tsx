
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBookSections, getSupportedBooks } from '@/lib/api/hadith';
import { ArrowLeft, BookOpen } from 'lucide-react';

interface PageProps {
    params: Promise<{
        book: string;
    }>;
}

export async function generateMetadata({ params }: PageProps) {
    const { book: bookId } = await params;
    const book = getSupportedBooks().find(b => b.id === bookId);
    if (!book) return { title: 'Book Not Found' };

    return {
        title: `${book.name} - Chapters | FaithJourney`,
        description: `Browse chapters of ${book.name}.`,
    };
}

export default async function BookChaptersPage({ params }: PageProps) {
    const { book: bookId } = await params;
    const bookData = getSupportedBooks().find(b => b.id === bookId);

    if (!bookData) {
        notFound();
    }

    // By default use 'bukhari' key if somehow type check fails, but validation handles it
    const chapters = await getBookSections(bookId as any);

    return (
        <main className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-10">
                    <Link
                        href="/hadith"
                        className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium mb-6 transition-colors"
                    >
                        <ArrowLeft size={20} className="mr-2" />
                        Back to Library
                    </Link>

                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 font-serif mb-2">
                        {bookData.name}
                    </h1>
                    <p className="text-slate-600">
                        {bookData.author} • {chapters.length} Chapters
                    </p>
                </div>

                {/* Chapters List */}
                <div className="bg-white rounded-2xl shadow-sm border border-emerald-100 overflow-hidden">
                    {chapters.length > 0 ? (
                        <div className="divide-y divide-emerald-50">
                            {chapters.map((chapter) => (
                                <Link
                                    key={chapter.number}
                                    href={`/hadith/${bookId}/${chapter.number}`}
                                    className="group flex items-center p-5 hover:bg-emerald-50/50 transition-colors duration-200"
                                >
                                    <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-bold text-lg mr-4 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                                        {chapter.number}
                                    </div>
                                    <div className="flex-grow">
                                        <h3 className="text-lg font-medium text-slate-800 group-hover:text-emerald-900">
                                            {chapter.name}
                                        </h3>
                                    </div>
                                    <div className="flex-shrink-0 text-slate-400 group-hover:text-emerald-500">
                                        <BookOpen size={20} />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="p-12 text-center text-slate-500">
                            No chapters found. Please check your connection.
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
