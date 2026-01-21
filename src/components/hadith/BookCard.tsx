
import Link from 'next/link';
import { Book } from 'lucide-react';

interface BookCardProps {
    id: string;
    name: string;
    author: string;
    total: number;
    description: string;
}

export default function BookCard({ id, name, author, total, description }: BookCardProps) {
    return (
        <Link
            href={`/hadith/${id}`}
            className="group relative overflow-hidden rounded-2xl bg-white border border-emerald-100/50 hover:border-emerald-500/50 transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1"
        >
            {/* Emerald Gradient Overlay on Hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/0 to-emerald-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="p-6 relative z-10 flex flex-col h-full">
                <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl group-hover:bg-emerald-600 group-hover:text-amber-300 transition-colors duration-300">
                        <Book size={24} />
                    </div>
                    <span className="text-xs font-medium px-2.5 py-1 bg-amber-50 text-amber-700 rounded-full border border-amber-100">
                        {total.toLocaleString()} Hadiths
                    </span>
                </div>

                <h3 className="text-xl font-bold text-slate-800 mb-1 font-serif group-hover:text-emerald-700 transition-colors">
                    {name}
                </h3>

                <p className="text-sm font-medium text-emerald-600 mb-3">
                    {author}
                </p>

                <p className="text-sm text-slate-500 leading-relaxed mb-4 flex-grow">
                    {description}
                </p>

                <div className="flex items-center text-sm font-medium text-emerald-600 group-hover:text-emerald-700">
                    <span className="border-b border-transparent group-hover:border-emerald-600 transition-all">
                        Read Collection
                    </span>
                    <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </div>
            </div>

            {/* Decorative Gold Accent */}
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-amber-50 rounded-tl-full -mr-4 -mb-4 opacity-50 group-hover:scale-110 transition-transform duration-500" />
        </Link>
    );
}
