"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { hajjGuide } from "@/lib/data/guides-content";
import { MapPin, ArrowRight } from "lucide-react";

export default function HajjGuidePage() {
    return (
        <div className="min-h-screen flex flex-col bg-background font-sans">
            <Header />

            <main className="flex-grow pt-24 pb-16">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">
                            {hajjGuide.title}
                        </h1>
                        <p className="text-lg text-muted-foreground">
                            {hajjGuide.description}
                        </p>
                    </div>

                    <div className="relative">
                        {/* Vertical Connector Line (Desktop) */}
                        <div className="absolute left-[28px] md:left-1/2 top-4 bottom-4 w-0.5 bg-dashed border-l-2 border-primary/20 -translate-x-1/2 hidden md:block border-dashed" />

                        <div className="space-y-12">
                            {hajjGuide.days.map((day, index) => (
                                <div key={index} className="relative flex flex-col md:flex-row gap-8 md:gap-0">

                                    {/* Timeline Marker */}
                                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-4 z-10 w-14 h-14 rounded-full bg-background border-4 border-primary items-center justify-center font-bold text-sm shadow-md transition-transform hover:scale-110">
                                        {index + 1}
                                    </div>

                                    {/* Alternating Side Content */}
                                    <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16 md:ml-auto'}`}>
                                        <Card className="border border-primary/10 bg-card/40 hover:bg-card/75 transition-all duration-300 shadow-none hover:shadow-xl hover:border-primary/20 hover:translate-y-[-2px] rounded-[2rem] overflow-hidden">
                                            <CardContent className="p-8 space-y-6">
                                                <div className={`flex flex-col ${index % 2 === 0 ? 'md:items-end' : 'md:items-start'}`}>
                                                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest rounded-full mb-3">
                                                        {day.day}
                                                    </span>
                                                    <h3 className="text-2xl font-serif font-bold text-foreground leading-tight mb-2">{day.title}</h3>
                                                </div>

                                                <ul className="space-y-4">
                                                    {day.steps.map((step, sIdx) => (
                                                        <li key={sIdx} className={`flex items-start gap-3 text-muted-foreground text-base leading-relaxed ${index % 2 === 0 ? 'md:flex-row-reverse md:text-right' : 'md:text-left'}`}>
                                                            <span className="h-2 w-2 rounded-full bg-primary/40 mt-2.5 shrink-0" />
                                                            <span>{step}</span>
                                                        </li>
                                                    ))}
                                                </ul>

                                                {(day as any).dua && (
                                                    <div className="bg-amber-500/5 p-6 rounded-2xl border border-amber-500/10 space-y-4 text-left">
                                                        <span className="inline-block px-3 py-0.5 bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[10px] font-bold uppercase tracking-widest rounded-full">Best Invocation</span>
                                                        <p className="font-arabic text-3xl text-right text-amber-600 dark:text-amber-400 leading-[2.5]" dir="rtl">
                                                            {(day as any).dua.arabic}
                                                        </p>
                                                        <div className="border-t border-amber-500/5 pt-4 space-y-1">
                                                            <p className="text-md font-bold text-foreground/80 leading-normal">{(day as any).dua.transliteration}</p>
                                                            <p className="text-sm text-muted-foreground italic">"{(day as any).dua.meaning}"</p>
                                                        </div>
                                                    </div>
                                                )}
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-20 p-8 text-center bg-muted/20 rounded-3xl border border-primary/5">
                        <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
                        <h3 className="text-xl font-bold mb-2">Hajj Mabrur</h3>
                        <p className="text-muted-foreground">May Allah accept the Hajj of all pilgrims.</p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
