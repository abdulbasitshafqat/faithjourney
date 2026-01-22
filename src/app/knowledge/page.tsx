
"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, Clock, ArrowRight, Search, Sparkles, Filter } from "lucide-react";
import Link from "next/link";
import { articles } from "@/lib/data/knowledge";
import { useState } from "react";
import { cn } from "@/lib/utils";

const CATEGORIES = ["All", "Faith", "History", "Practice", "Spirituality"];

export default function KnowledgePage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    const filteredArticles = articles.filter(article => {
        const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            article.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === "All" || article.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const featuredArticle = articles[0]; // For now, just the first one
    const displayArticles = (searchTerm || selectedCategory !== "All")
        ? filteredArticles
        : filteredArticles.filter(a => a.slug !== featuredArticle.slug);

    return (
        <div className="min-h-screen flex flex-col bg-background font-sans">
            <Header />

            <main className="flex-grow">
                {/* Hero Section */}
                <section className="bg-primary/5 pt-24 pb-12 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="container mx-auto px-4 text-center relative z-10">
                        <Badge variant="outline" className="mb-4 border-primary/20 text-primary bg-background/50 backdrop-blur-sm">
                            <BookOpen className="w-3 h-3 mr-2" /> Islamic Learning Hub
                        </Badge>
                        <h1 className="text-4xl md:text-6xl font-serif font-bold text-primary mb-6">
                            Knowledge & Wisdom
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8">
                            Explore the depths of faith through curated articles on history, spirituality, and daily practice.
                        </p>

                        {/* Search Bar */}
                        <div className="max-w-md mx-auto relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search articles..."
                                className="pl-10 h-12 rounded-full border-primary/20 bg-background/80 backdrop-blur-xl shadow-lg focus:ring-primary/20"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </section>

                <section className="py-12 container mx-auto px-4">
                    {/* Category Filters */}
                    <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
                        {CATEGORIES.map((cat) => (
                            <Button
                                key={cat}
                                variant={selectedCategory === cat ? "default" : "outline"}
                                size="sm"
                                onClick={() => setSelectedCategory(cat)}
                                className={cn(
                                    "rounded-full px-6 transition-all",
                                    selectedCategory === cat ? "shadow-md scale-105" : "hover:bg-primary/5 hover:text-primary border-primary/10"
                                )}
                            >
                                {cat}
                            </Button>
                        ))}
                    </div>

                    {/* Featured Article (Only show if no filter active) */}
                    {!searchTerm && selectedCategory === "All" && (
                        <div className="mb-16">
                            <div className="flex items-center gap-2 mb-6">
                                <Sparkles className="h-5 w-5 text-secondary" />
                                <h2 className="text-2xl font-serif font-bold text-primary">Featured Read</h2>
                            </div>
                            <Link href={`/knowledge/${featuredArticle.slug}`}>
                                <Card className="overflow-hidden border-none shadow-xl hover:shadow-2xl transition-all duration-300 group cursor-pointer bg-gradient-to-br from-primary/5 to-transparent relative">
                                    <div className="grid md:grid-cols-2 gap-8 items-center p-8 md:p-12">
                                        <div className="space-y-6 relative z-10">
                                            <div className="flex items-center gap-3">
                                                <Badge className="bg-primary text-primary-foreground">{featuredArticle.category}</Badge>
                                                <span className="text-sm text-muted-foreground flex items-center">
                                                    <Clock className="w-3 h-3 mr-1" /> {featuredArticle.readTime}
                                                </span>
                                            </div>
                                            <h3 className="text-3xl md:text-4xl font-serif font-bold text-foreground group-hover:text-primary transition-colors">
                                                {featuredArticle.title}
                                            </h3>
                                            <p className="text-lg text-muted-foreground leading-relaxed">
                                                {featuredArticle.description}
                                            </p>
                                            <div className="flex items-center text-primary font-bold group-hover:translate-x-2 transition-transform">
                                                Read Full Article <ArrowRight className="ml-2 w-5 h-5" />
                                            </div>
                                        </div>
                                        {/* Decorative Illustration Area */}
                                        <div className="relative h-64 md:h-full min-h-[300px] bg-primary/10 rounded-2xl overflow-hidden flex items-center justify-center">
                                            <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10" />
                                            <BookOpen className="w-32 h-32 text-primary/20" />
                                        </div>
                                    </div>
                                </Card>
                            </Link>
                        </div>
                    )}

                    {/* Articles Grid */}
                    <div className="mb-8 flex items-center gap-2">
                        <Filter className="h-4 w-4 text-muted-foreground" />
                        <h2 className="text-xl font-serif font-bold text-primary">
                            {searchTerm || selectedCategory !== "All" ? "Search Results" : "Recent Articles"}
                        </h2>
                    </div>

                    {displayArticles.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {displayArticles.map((article) => (
                                <Link key={article.slug} href={`/knowledge/${article.slug}`}>
                                    <Card className="h-full hover:shadow-lg transition-all duration-300 border-primary/10 bg-card group cursor-pointer overflow-hidden flex flex-col">
                                        <div className="h-2 bg-secondary/50 group-hover:bg-secondary transition-colors" />
                                        <CardHeader>
                                            <div className="flex justify-between items-center mb-3">
                                                <Badge variant="secondary" className="bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                                    {article.category}
                                                </Badge>
                                                <div className="flex items-center text-xs text-muted-foreground">
                                                    <Clock className="w-3 h-3 mr-1" />
                                                    {article.readTime}
                                                </div>
                                            </div>
                                            <CardTitle className="font-serif text-xl text-primary group-hover:text-primary/80 leading-tight">
                                                {article.title}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="flex-grow flex flex-col justify-between">
                                            <CardDescription className="line-clamp-3 mb-6">
                                                {article.description}
                                            </CardDescription>
                                            <div className="flex items-center text-primary font-medium text-sm group-hover:translate-x-1 transition-transform mt-auto">
                                                Read Article <ArrowRight className="ml-2 w-4 h-4" />
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <div className="bg-muted/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search className="w-8 h-8 text-muted-foreground" />
                            </div>
                            <h3 className="text-xl font-semibold text-foreground">No articles found</h3>
                            <p className="text-muted-foreground">Try adjusting your search or filters.</p>
                            <Button
                                variant="link"
                                className="mt-2 text-primary"
                                onClick={() => { setSearchTerm(""); setSelectedCategory("All"); }}
                            >
                                Clear all filters
                            </Button>
                        </div>
                    )}
                </section>
            </main>
            <Footer />
        </div>
    );
}
