import { getSupportedBooks } from '@/lib/api/hadith';
import BookCard from '@/components/hadith/BookCard';
import { Header } from "@/components/layout/Header";

export const metadata = {
    title: 'Hadith Library | FaithJourney',
    description: 'Explore the authentic collections of the Prophet Muhammad (ﷺ).',
};

export default function HadithDashboard() {
    const books = getSupportedBooks();

    return (
        <main className="min-h-screen bg-slate-50 font-sans">
            <Header />
            <div className="py-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 font-serif">
                            Hadith <span className="text-emerald-600">Collection</span>
                        </h1>
                        <p className="text-lg text-slate-600">
                            Explore the authentic narrations of Prophet Muhammad (ﷺ).
                            May these teachings illuminate your path.
                        </p>
                        <div className="mt-8 flex justify-center">
                            <div className="h-1 w-24 bg-gradient-to-r from-emerald-400 to-amber-400 rounded-full" />
                        </div>
                    </div>

                    {/* Books Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {books.map((book) => (
                            <BookCard
                                key={book.id}
                                {...book}
                            />
                        ))}
                    </div>

                    {/* Decorative Bottom Section */}
                    <div className="mt-20 text-center">
                        <p className="text-slate-400 text-sm">
                            Data provided by open-source Hadith API
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
