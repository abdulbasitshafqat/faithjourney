
import { notFound } from 'next/navigation';
import { getSupportedBooks, getBookSections, getHadithsForSection } from '@/lib/api/hadith';
import HadithFeed from '@/components/hadith/HadithFeed';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface PageProps {
    params: Promise<{
        book: string;
        section: string;
    }>;
}

export async function generateMetadata({ params }: PageProps) {
    const { book: bookId, section: sectionId } = await params;
    const book = getSupportedBooks().find(b => b.id === bookId);
    if (!book) return { title: 'Hadith Not Found' };

    return {
        title: `${book.name} - Chapter ${sectionId} | FaithJourney`,
        description: `Read authentic Hadiths from ${book.name}, Chapter ${sectionId}.`,
    };
}

export default async function HadithReaderPage({ params }: PageProps) {
    const { book: bookId, section: sectionId } = await params;
    const bookData = getSupportedBooks().find(b => b.id === bookId);

    if (!bookData) {
        notFound();
    }

    // Fetch English (includes Arabic)
    const engData = await getHadithsForSection(bookId as any, sectionId, 'eng');
    // Fetch Urdu
    const urdData = await getHadithsForSection(bookId as any, sectionId, 'urd');

    if (!engData || engData.arabic.length === 0) {
        return (
            <main className="min-h-screen bg-slate-50 py-12 px-4 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-slate-700 mb-2">Chapter Not Found</h2>
                    <p className="text-slate-500 mb-6">Could not load Hadiths for this chapter.</p>
                    <Link href={`/hadith/${bookId}`} className="btn btn-primary">
                        Return to Chapters
                    </Link>
                </div>
            </main>
        );
    }

    // Combine Data
    const combinedHadiths = engData.translation.map((engHadith, index) => {
        // Find matching Arabic (usually same index, but try matching number)
        const arabic = engData.arabic.find(h => h.hadithnumber === engHadith.hadithnumber) || engData.arabic[index];
        const urdu = urdData.translation.find(h => h.hadithnumber === engHadith.hadithnumber);

        return {
            arabic,
            english: engHadith,
            urdu
        };
    });

    // Get Chapter Name (Fetch sections again or just show number? Ideally we want the name)
    const sections = await getBookSections(bookId as any);
    const currentSection = sections.find(s => s.number === sectionId);
    const chapterName = currentSection ? currentSection.name : `Chapter ${sectionId}`;

    return (
        <main className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-10">
                    <Link
                        href={`/hadith/${bookId}`}
                        className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium mb-6 transition-colors"
                    >
                        <ArrowLeft size={20} className="mr-2" />
                        Back to Chapters
                    </Link>

                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 font-serif mb-2 leading-tight">
                        {chapterName}
                    </h1>
                    <p className="text-slate-600 font-medium">
                        {bookData.name}
                    </p>
                </div>

                <HadithFeed
                    hadiths={combinedHadiths}
                    bookName={bookData.name}
                    chapterName={chapterName}
                />
            </div>
        </main>
    );
}
