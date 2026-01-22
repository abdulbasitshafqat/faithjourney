
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
            className="group relative overflow-hidden rounded-2xl bg-card border border-primary/10 hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1"
        >
            {/* Primary Gradient Overlay on Hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="p-6 relative z-10 flex flex-col h-full">
                <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-primary/10 text-primary rounded-xl group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                        <Book size={24} />
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 bg-secondary/10 text-secondary-foreground rounded-full border border-secondary/20 uppercase tracking-wider">
                        {total.toLocaleString()} Hadiths
                    </span>
                </div>

                <h3 className="text-2xl font-serif font-bold text-card-foreground mb-1 group-hover:text-primary transition-colors">
                    {name}
                </h3>

                <p className="text-sm font-bold text-primary mb-3">
                    {author}
                </p>

                <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-grow">
                    {description}
                </p>

                <div className="flex items-center text-sm font-bold text-primary group-hover:text-primary/80">
                    <span className="border-b-2 border-transparent group-hover:border-primary transition-all uppercase tracking-widest text-[10px]">
                        Read Collection
                    </span>
                    <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </div>
            </div>

            {/* Decorative Accent */}
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-primary/5 rounded-tl-full -mr-4 -mb-4 opacity-50 group-hover:scale-110 transition-transform duration-500" />
        </Link>
    );
}
