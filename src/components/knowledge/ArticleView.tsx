"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, Share2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { articles } from "@/lib/data/knowledge";
import { Badge } from "@/components/ui/badge";

interface ArticleViewProps {
    slug: string;
}

export default function ArticleView({ slug }: ArticleViewProps) {
    const router = useRouter();

    const article = articles.find((a) => a.slug === slug);

    if (!article) {
        return (
            <div className="min-h-screen flex flex-col bg-background font-sans">
                <Header />
                <main className="flex-grow container mx-auto px-4 py-24 text-center">
                    <h1 className="text-3xl font-serif text-primary mb-4">Article Not Found</h1>
                    <Button onClick={() => router.push("/knowledge")}>Back to Knowledge</Button>
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-background font-sans">
            <Header />

            <main className="flex-grow">
                {/* Immersive Header */}
                <div className="relative bg-primary/5 pt-32 pb-20 overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-70" />
                    <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-[80px]" />

                    <div className="container mx-auto px-4 max-w-4xl relative z-10">
                        <Button variant="ghost" className="mb-8 pl-0 hover:bg-transparent hover:text-primary group" onClick={() => router.push("/knowledge")}>
                            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" /> Back to Knowledge
                        </Button>

                        <div className="flex flex-wrap items-center gap-4 mb-6">
                            <Badge variant="outline" className="border-primary/30 text-primary bg-background/40 backdrop-blur-sm px-3 py-1">
                                {article.category}
                            </Badge>
                            <span className="flex items-center text-sm font-medium text-muted-foreground">
                                <Clock className="w-4 h-4 mr-2 text-secondary" /> {article.readTime}
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground mb-8 leading-tight">
                            {article.title}
                        </h1>

                        <p className="text-xl text-muted-foreground/90 font-light leading-relaxed max-w-2xl border-l-4 border-primary/20 pl-6">
                            {article.description}
                        </p>
                    </div>
                </div>

                <article className="container mx-auto px-4 py-16 max-w-3xl">
                    <div
                        className="prose prose-lg dark:prose-invert prose-headings:font-serif prose-headings:text-foreground prose-headings:font-bold prose-p:text-muted-foreground prose-p:leading-8 prose-li:text-muted-foreground prose-strong:text-foreground prose-blockquote:border-l-primary prose-blockquote:bg-primary/5 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-lg max-w-none"
                        dangerouslySetInnerHTML={{ __html: article.content }}
                    />

                    <div className="mt-20 pt-10 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="text-center md:text-left">
                            <h4 className="font-serif font-bold text-lg text-foreground">Faith Journey Team</h4>
                            <p className="text-sm text-muted-foreground">Curated knowledge for spiritual growth.</p>
                        </div>
                        <Button variant="outline" className="rounded-full border-primary/20 hover:bg-primary/5 hover:text-primary" onClick={() => navigator.share({ title: article.title, url: window.location.href })}>
                            <Share2 className="w-4 h-4 mr-2" /> Share Article
                        </Button>
                    </div>
                </article>
            </main>

            <Footer />
        </div>
    );
}
