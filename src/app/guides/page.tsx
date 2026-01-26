"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, Droplets, BookOpen, HandHeart, Sparkles, MapPin, Milestone, Users } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const guides = [
    {
        title: "Namaz (Salah)",
        description: "Learn how to perform the five daily prayers with step-by-step instructions. Includes prerequisites, positions, and recitations.",
        icon: BookOpen,
        href: "/guides/salah",
        color: "text-emerald-600 bg-emerald-100 dark:bg-emerald-900/20"
    },
    {
        title: "Ablution (Wudu)",
        description: "A complete guide to performing Wudu (ablution) before prayer. Essential steps and conditions for purification.",
        icon: Droplets,
        href: "/guides/wudu",
        color: "text-blue-600 bg-blue-100 dark:bg-blue-900/20"
    },
    {
        title: "Fasting (Sawm)",
        description: "A comprehensive look at the rules and virtues of fasting during Ramadan. Learn the intentions, suhoor, and iftar.",
        icon: HandHeart,
        href: "/guides/fasting",
        color: "text-orange-600 bg-orange-100 dark:bg-orange-900/20"
    },
    {
        title: "Zakat (Charity)",
        description: "Understanding your obligations for giving Zakat. Includes a calculator to determine your payable amount.",
        icon: Sparkles,
        href: "/guides/zakat",
        color: "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20"
    },
    {
        title: "Hajj (Pilgrimage)",
        description: "A step-by-step guide to the Major Pilgrimage. From Ihram to the days of Tashreeq, follow the path of the prophets.",
        icon: MapPin,
        href: "/guides/hajj",
        color: "text-slate-600 bg-slate-100 dark:bg-slate-900/20"
    },
    {
        title: "Umrah",
        description: "Guide to the Minor Pilgrimage. Learn the rituals of Ihram, Tawaf, Sa'i and Halq in a simplified manner.",
        icon: Milestone,
        href: "/guides/umrah",
        color: "text-teal-600 bg-teal-100 dark:bg-teal-900/20"
    },
    {
        title: "Janazah (Funeral)",
        description: "A guide to the funeral rites and prayer. Understand the rights of the deceased and how to perform Salat al-Janazah.",
        icon: Users,
        href: "/guides/janazah",
        color: "text-indigo-600 bg-indigo-100 dark:bg-indigo-900/20"
    }
];

export default function GuidesIndex() {
    return (
        <div className="min-h-screen flex flex-col bg-background font-sans">
            <Header />
            <main className="flex-grow pt-24 pb-16">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="mb-12 text-center">
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary tracking-tight mb-4">
                            Islamic Guides
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Comprehensive step-by-step guides to essential Islamic practices. Learn Namaz, Wudu, and deepen your understanding of the faith.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {guides.map((guide) => (
                            <Link key={guide.href} href={guide.href} className="group">
                                <Card className="h-full transition-all duration-300 hover:shadow-xl border-primary/10 hover:border-primary/30 bg-card/50 backdrop-blur-md overflow-hidden relative">
                                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <CardHeader>
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${guide.color} transition-transform group-hover:scale-110 group-hover:rotate-3 shadow-sm`}>
                                            <guide.icon className="h-6 w-6" />
                                        </div>
                                        <CardTitle className="text-2xl font-serif group-hover:text-primary transition-colors">
                                            {guide.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription className="text-base line-clamp-3 mb-6 leading-relaxed">
                                            {guide.description}
                                        </CardDescription>
                                        <div className="flex items-center text-primary font-bold text-sm uppercase tracking-wider group-hover:gap-2 transition-all">
                                            Read Guide <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>

                    <div className="mt-20 p-10 rounded-[2rem] bg-primary/5 border border-primary/10 text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-5">
                            <Sparkles className="w-24 h-24" />
                        </div>
                        <h2 className="text-2xl font-serif font-bold text-primary mb-4">More Guides Coming Soon</h2>
                        <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
                            We are continuously working to add more educational content, including guides for Hajj, Umrah, Zakat, and Fasting. Stay tuned for regular updates.
                        </p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
