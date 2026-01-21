"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { articles } from "@/lib/data/knowledge";

export default function KnowledgePage() {
    return (
        <div className="min-h-screen flex flex-col bg-background font-sans">
            <Navbar />

            <main className="flex-grow">
                {/* Hero Section */}
                <section className="bg-primary/5 py-20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">
                            Islamic Knowledge & Wisdom
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                            Deepen your understanding with articles on faith, history, and spiritual practice.
                        </p>
                    </div>
                </section>

                <section className="py-16 container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {articles.map((article) => (
                            <Link key={article.slug} href={`/knowledge/${article.slug}`}>
                                <Card className="h-full hover:shadow-lg transition-all duration-300 border-none bg-card group cursor-pointer overflow-hidden">
                                    <div className="h-2 bg-primary/20 group-hover:bg-primary transition-colors" />
                                    <CardHeader>
                                        <div className="flex justify-between items-center mb-2">
                                            <Badge variant="secondary" className="bg-secondary/20 text-secondary-foreground hover:bg-secondary/30">
                                                {article.category}
                                            </Badge>
                                            <div className="flex items-center text-xs text-muted-foreground">
                                                <Clock className="w-3 h-3 mr-1" />
                                                {article.readTime}
                                            </div>
                                        </div>
                                        <CardTitle className="font-serif text-2xl text-primary group-hover:text-primary/90">
                                            {article.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription className="text-base line-clamp-3 mb-4">
                                            {article.description}
                                        </CardDescription>
                                        <div className="flex items-center text-primary font-medium text-sm group-hover:translate-x-1 transition-transform">
                                            Read Article <ArrowRight className="ml-2 w-4 h-4" />
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
