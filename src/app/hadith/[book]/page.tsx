
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBookSections, getSupportedBooks } from '@/lib/api/hadith';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { Header } from "@/components/layout/Header";
import { Card, CardContent } from "@/components/ui/card";

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
        <main className="min-h-screen bg-background py-24 px-4 sm:px-6 lg:px-8">
            <Header />
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-10">
                    <Link
                        href="/hadith"
                        className="inline-flex items-center text-primary hover:text-primary/80 font-medium mb-6 transition-colors"
                    >
                        <ArrowLeft size={18} className="mr-2" />
                        Back to Library
                    </Link>

                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">
                        {bookData.name}
                    </h1>
                    <p className="text-lg text-muted-foreground font-medium">
                        {bookData.author} • {chapters.length} Chapters
                    </p>
                </div>

                {/* Chapters List */}
                <Card className="bg-card/50 backdrop-blur-sm border-primary/10 overflow-hidden shadow-xl">
                    <CardContent className="p-0">
                        {chapters.length > 0 ? (
                            <div className="divide-y divide-primary/5">
                                {chapters.map((chapter) => (
                                    <Link
                                        key={chapter.number}
                                        href={`/hadith/${bookId}/${chapter.number}`}
                                        className="group flex items-center p-6 hover:bg-primary/5 transition-all duration-200"
                                    >
                                        <div className="flex-shrink-0 w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold text-lg mr-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                                            {chapter.number}
                                        </div>
                                        <div className="flex-grow">
                                            <h3 className="text-xl font-medium text-foreground group-hover:text-primary transition-colors">
                                                {chapter.name}
                                            </h3>
                                        </div>
                                        <div className="flex-shrink-0 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-1">
                                            <BookOpen size={20} />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="p-12 text-center text-muted-foreground">
                                No chapters found. Please check your connection.
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}
