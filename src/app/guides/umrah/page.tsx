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

                    <div className="relative border-l-2 border-primary/10 ml-6 md:ml-12 space-y-12 pl-8 md:pl-12 py-4">
                        {umrahGuide.steps.map((step, index) => (
                            <div key={index} className="relative">
                                {/* Dot */}
                                <span className="absolute -left-[43px] md:-left-[59px] top-6 w-8 h-8 rounded-full bg-background border-4 border-primary flex items-center justify-center transition-transform hover:scale-110">
                                    <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                                </span>

                                <Card className="border border-primary/10 bg-card/40 hover:bg-card/75 transition-all duration-300 shadow-none hover:shadow-xl hover:border-primary/20 hover:translate-y-[-2px] rounded-[2rem] overflow-hidden">
                                    <CardContent className="p-8 space-y-6">
                                        <div className="flex justify-between items-start gap-4">
                                            <h3 className="text-2xl font-serif font-bold text-foreground flex items-center gap-3">
                                                {step.title}
                                            </h3>
                                            <span className="text-sm font-sans font-bold text-primary/45 tracking-widest bg-primary/5 px-3 py-1 rounded-full">STEP 0{index + 1}</span>
                                        </div>
                                        
                                        <p className="text-muted-foreground text-lg leading-relaxed">
                                            {step.description}
                                        </p>

                                        {step.instruction && (
                                            <p className="text-sm text-foreground/80 bg-primary/5 p-4 rounded-xl border border-primary/5 italic">
                                                💡 {step.instruction}
                                            </p>
                                        )}

                                        {step.arabic && (
                                            <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10 space-y-4">
                                                <p className="font-arabic text-3xl text-right text-primary leading-[2.5]" dir="rtl">
                                                    {step.arabic}
                                                </p>
                                                <div className="border-t border-primary/5 pt-4 space-y-1 text-left">
                                                    <p className="text-md font-bold text-foreground/80 leading-normal">{step.transliteration}</p>
                                                    <p className="text-sm text-muted-foreground italic">"{step.meaning}"</p>
                                                </div>
                                            </div>
                                        )}

                                        {step.specialDua && (
                                            <div className="bg-amber-500/5 p-6 rounded-2xl border border-amber-500/10 space-y-4">
                                                <span className="inline-block px-3 py-0.5 bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[10px] font-bold uppercase tracking-widest rounded-full">Core Invocation</span>
                                                <p className="font-arabic text-3xl text-right text-amber-600 dark:text-amber-400 leading-[2.5]" dir="rtl">
                                                    {step.specialDua.arabic}
                                                </p>
                                                <div className="border-t border-amber-500/5 pt-4 space-y-1 text-left">
                                                    <p className="text-md font-bold text-foreground/80 leading-normal">{step.specialDua.transliteration}</p>
                                                    <p className="text-sm text-muted-foreground italic">"{step.specialDua.meaning}"</p>
                                                </div>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </div>
                        ))}

                        {/* Completion */}
                        <div className="relative">
                            <span className="absolute -left-[43px] md:-left-[59px] top-1 w-8 h-8 rounded-full bg-emerald-500 text-primary-foreground flex items-center justify-center shadow-lg transform translate-y-2">
                                <CheckCircle className="w-5 h-5" />
                            </span>
                            <div className="p-8 rounded-[2rem] bg-emerald-500/5 border border-emerald-500/10 text-emerald-800 dark:text-emerald-400 transition-all hover:bg-emerald-500/10">
                                <h3 className="font-serif text-2xl font-bold mb-2">Umrah Complete</h3>
                                <p className="text-lg opacity-90 leading-relaxed">May Allah accept your Umrah pilgrimage, wash away your sins, and grant you a safe return to your home. Ameen.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
