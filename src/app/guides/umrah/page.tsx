"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { umrahGuide } from "@/lib/data/guides-content";
import { Milestone, CheckCircle } from "lucide-react";

export default function UmrahGuidePage() {
    return (
        <div className="min-h-screen flex flex-col bg-background font-sans">
            <Header />

            <main className="flex-grow pt-24 pb-16">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="text-center mb-12">
                        <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6 rotate-6">
                            <Milestone className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <h1 className="text-4xl font-serif font-bold text-primary mb-4">
                            {umrahGuide.title}
                        </h1>
                        <p className="text-lg text-muted-foreground">
                            {umrahGuide.description}
                        </p>
                    </div>

                    <div className="relative border-l-2 border-primary/20 ml-6 md:ml-12 space-y-12 pl-8 md:pl-12 py-4">
                        {umrahGuide.steps.map((step, index) => (
                            <div key={index} className="relative">
                                {/* Dot */}
                                <span className="absolute -left-[43px] md:-left-[59px] top-6 w-8 h-8 rounded-full bg-background border-4 border-primary flex items-center justify-center">
                                    <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                                </span>

                                <Card className="border-none bg-card/50 hover:bg-card transition-colors shadow-sm">
                                    <CardContent className="p-6 md:p-8">
                                        <h3 className="text-2xl font-serif font-bold text-foreground mb-3 flex items-center gap-3">
                                            <span className="opacity-50 text-3xl font-sans absolute -top-4 -right-2 text-primary/10 select-none">0{index + 1}</span>
                                            {step.title}
                                        </h3>
                                        <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                                            {step.description}
                                        </p>

                                        {step.arabic && (
                                            <div className="bg-primary/5 p-6 rounded-xl border border-primary/10">
                                                <p className="font-arabic text-2xl md:text-3xl text-right text-primary leading-loose mb-3" dir="rtl">
                                                    {step.arabic}
                                                </p>
                                                <div className="border-t border-primary/10 pt-3">
                                                    <p className="font-medium">{step.transliteration}</p>
                                                    <p className="text-sm text-muted-foreground italic mt-1">"{step.meaning}"</p>
                                                </div>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </div>
                        ))}

                        {/* Completion */}
                        <div className="relative">
                            <span className="absolute -left-[43px] md:-left-[59px] top-1 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg transform translate-y-2">
                                <CheckCircle className="w-5 h-5" />
                            </span>
                            <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400">
                                <h3 className="font-bold text-lg mb-1">Umrah Complete</h3>
                                <p>May Allah accept your Umrah and grant you safe return.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
