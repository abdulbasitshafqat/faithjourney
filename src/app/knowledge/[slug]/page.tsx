"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, Share2 } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { articles } from "@/lib/data/knowledge";
import { Badge } from "@/components/ui/badge";

export default function ArticlePage() {
    const params = useParams();
    const router = useRouter();
    const slug = params.slug;

    const article = articles.find((a) => a.slug === slug);

    if (!article) {
        return (
            <div className="min-h-screen flex flex-col bg-background font-sans">
                <Navbar />
                <main className="flex-grow container mx-auto px-4 py-24 text-center">
                    <h1 className="text-3xl font-serif text-primary mb-4">Article Not Found</h1>
                    <Button onClick={() => router.push("/knowledge")}>Back to Knowledge</Button>
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-background font-sans">
            <Navbar />

            <main className="flex-grow">
                <article className="container mx-auto px-4 py-16 max-w-4xl">
                    <Button variant="ghost" className="mb-8 pl-0 hover:bg-transparent hover:text-primary" onClick={() => router.push("/knowledge")}>
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Knowledge
                    </Button>

                    <header className="mb-12 text-center md:text-left">
                        <Badge variant="outline" className="mb-4 border-primary/20 text-primary">{article.category}</Badge>
                        <h1 className="text-3xl md:text-5xl font-serif font-bold text-primary mb-6 leading-tight">
                            {article.title}
                        </h1>
                        <div className="flex flex-col md:flex-row items-center gap-4 text-muted-foreground text-sm">
                            <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-2" />
                                {article.readTime}
                            </div>
                            <span className="hidden md:inline">•</span>
                            <span>Written by FaithJourney Team</span>
                        </div>
                    </header>

                    <div
                        className="prose prose-lg dark:prose-invert prose-headings:font-serif prose-headings:text-primary prose-p:text-foreground/90 prose-p:leading-relaxed max-w-none"
                        dangerouslySetInnerHTML={{ __html: article.content }}
                    />

                    <div className="mt-16 pt-8 border-t border-border flex justify-between items-center">
                        <p className="text-muted-foreground italic">Share this knowledge</p>
                        <Button variant="outline" size="sm" onClick={() => navigator.share({ title: article.title, url: window.location.href })}>
                            <Share2 className="w-4 h-4 mr-2" /> Share
                        </Button>
                    </div>
                </article>
            </main>

            <Footer />
        </div>
    );
}
