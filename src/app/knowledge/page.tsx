
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
                <section className="bg-gradient-to-b from-primary/10 via-background to-background pt-32 pb-16 relative overflow-hidden">
                    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                    <div className="absolute -top-40 -right-40 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] mix-blend-multiply" />
                    <div className="absolute top-20 -left-20 w-72 h-72 bg-primary/10 rounded-full blur-[80px] mix-blend-multiply" />

                    <div className="container mx-auto px-4 text-center relative z-10">
                        <Badge variant="outline" className="mb-6 border-primary/20 text-primary bg-background/50 backdrop-blur-md px-4 py-1.5 text-sm font-medium rounded-full shadow-sm">
                            <BookOpen className="w-4 h-4 mr-2" /> Islamic Learning Hub
                        </Badge>
                        <h1 className="text-5xl md:text-7xl font-serif font-bold text-primary mb-6 tracking-tight leading-tight">
                            Journey Into <span className="italic text-secondary">Wisdom</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10 font-light">
                            Curated insights on history, spirituality, and the prophetic path.
                        </p>

                        {/* Search Bar */}
                        <div className="max-w-xl mx-auto relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                <Input
                                    placeholder="Search topic or keyword..."
                                    className="pl-12 h-14 rounded-full border-primary/10 bg-background/90 backdrop-blur-xl shadow-lg hover:shadow-xl focus:shadow-2xl focus:border-primary/30 transition-all font-medium text-lg"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="pb-24 pt-8 container mx-auto px-4">
                    {/* Category Filters */}
                    <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
                        {CATEGORIES.map((cat) => (
                            <Button
                                key={cat}
                                variant="ghost"
                                size="lg"
                                onClick={() => setSelectedCategory(cat)}
                                className={cn(
                                    "rounded-full px-8 h-12 text-base transition-all duration-300 border-2",
                                    selectedCategory === cat
                                        ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/25 hover:bg-primary/90"
                                        : "bg-transparent text-muted-foreground border-muted hover:border-primary/30 hover:text-foreground"
                                )}
                            >
                                {cat}
                            </Button>
                        ))}
                    </div>

                    {/* Featured Article (Only show if no filter active) */}
                    {!searchTerm && selectedCategory === "All" && (
                        <div className="mb-20">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="h-px bg-border flex-1" />
                                <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground/60 flex items-center gap-2">
                                    <Sparkles className="h-4 w-4 text-secondary" /> Editor's Choice
                                </span>
                                <div className="h-px bg-border flex-1" />
                            </div>

                            <Link href={`/knowledge/${featuredArticle.slug}`}>
                                <div className="group relative overflow-hidden rounded-[2.5rem] bg-card border border-border/50 shadow-2xl hover:shadow-[0_20px_50px_rgba(var(--primary),0.15)] transition-all duration-500 cursor-pointer">
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-50 group-hover:opacity-100 transition-opacity" />
                                    <div className="grid md:grid-cols-12 gap-0">
                                        <div className="md:col-span-7 p-10 md:p-14 flex flex-col justify-center relative z-10">
                                            <div className="flex items-center gap-4 mb-6">
                                                <Badge className="bg-primary/90 hover:bg-primary px-3 py-1 text-sm font-medium shadow-sm">{featuredArticle.category}</Badge>
                                                <span className="text-sm font-medium text-muted-foreground/80 flex items-center bg-background/50 px-3 py-1 rounded-full border border-border">
                                                    <Clock className="w-3.5 h-3.5 mr-2" /> {featuredArticle.readTime}
                                                </span>
                                            </div>
                                            <h3 className="text-4xl md:text-5xl font-serif font-bold text-primary group-hover:text-primary/80 transition-colors mb-6 leading-tight">
                                                {featuredArticle.title}
                                            </h3>
                                            <p className="text-lg text-muted-foreground leading-relaxed mb-8 border-l-4 border-secondary/30 pl-6">
                                                {featuredArticle.description}
                                            </p>
                                            <div className="flex items-center text-primary font-bold text-lg group-hover:gap-4 gap-2 transition-all">
                                                Read Article <ArrowRight className="w-5 h-5" />
                                            </div>
                                        </div>
                                        {/* Decorative Illustration Area */}
                                        <div className="md:col-span-5 relative min-h-[300px] h-full bg-primary/5 flex items-center justify-center overflow-hidden">
                                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-background/10 to-primary/10" />
                                            <div className="absolute -right-10 top-1/2 -translate-y-1/2 w-64 h-64 bg-primary rounded-full blur-[100px] opacity-20" />
                                            <div className="relative z-10 p-10 transform group-hover:scale-105 transition-transform duration-700">
                                                <BookOpen className="w-40 h-40 text-primary/20" strokeWidth={1} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    )}

                    {/* Articles Grid */}
                    <div className="mb-10 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Filter className="h-5 w-5 text-primary" />
                            <h2 className="text-2xl font-serif font-bold text-foreground">
                                {searchTerm || selectedCategory !== "All" ? "Search Results" : "More Knowledge"}
                            </h2>
                        </div>
                        <span className="text-sm font-medium text-muted-foreground bg-secondary/10 px-3 py-1 rounded-full">
                            {displayArticles.length} Articles
                        </span>
                    </div>

                    {displayArticles.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {displayArticles.map((article, idx) => (
                                <Link key={article.slug} href={`/knowledge/${article.slug}`}>
                                    <div className="group h-full flex flex-col bg-card rounded-[2rem] border border-border/60 hover:border-primary/30 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden relative">
                                        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

                                        <div className="p-8 flex-grow flex flex-col">
                                            <div className="flex justify-between items-start mb-6">
                                                <Badge variant="secondary" className="bg-secondary/10 text-secondary-foreground hover:bg-secondary/20">
                                                    {article.category}
                                                </Badge>
                                                <span className="text-xs font-semibold text-muted-foreground/60 flex items-center bg-muted/50 px-2 py-1 rounded-md">
                                                    <Clock className="w-3 h-3 mr-1.5" />
                                                    {article.readTime}
                                                </span>
                                            </div>

                                            <h3 className="font-serif text-2xl font-bold text-foreground group-hover:text-primary transition-colors mb-4 leading-tight">
                                                {article.title}
                                            </h3>

                                            <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-3">
                                                {article.description}
                                            </p>

                                            <div className="mt-auto flex items-center text-primary text-sm font-bold group-hover:translate-x-2 transition-transform">
                                                Read More <ArrowRight className="ml-2 w-4 h-4" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-24 bg-muted/20 rounded-[3rem] border border-dashed border-muted-foreground/20">
                            <div className="bg-background w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                                <Search className="w-8 h-8 text-muted-foreground/50" />
                            </div>
                            <h3 className="text-xl font-bold text-foreground mb-2">No articles found</h3>
                            <p className="text-muted-foreground max-w-sm mx-auto mb-6">We couldn't find anything matching your criteria. Try a different keyword.</p>
                            <Button
                                variant="outline"
                                className="rounded-full border-primary/20 text-primary hover:bg-primary/5"
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
