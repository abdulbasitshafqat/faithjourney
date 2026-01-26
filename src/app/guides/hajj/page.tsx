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
                                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-0 z-10 w-14 h-14 rounded-full bg-background border-4 border-primary items-center justify-center font-bold text-sm shadow-lg">
                                        {index + 1}
                                    </div>

                                    {/* Left Side Content */}
                                    <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-16 text-right' : 'md:pl-16 md:ml-auto'}`}>
                                        <div className={`p-6 bg-card border border-primary/10 rounded-2xl shadow-sm hover:shadow-md transition-all ${index % 2 !== 0 ? 'md:text-left' : ''}`}>
                                            <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider rounded-full mb-3">
                                                {day.day}
                                            </span>
                                            <h3 className="text-2xl font-serif font-bold text-foreground mb-4">{day.title}</h3>
                                            <ul className="space-y-3">
                                                {day.steps.map((step, sIdx) => (
                                                    <li key={sIdx} className={`flex items-center gap-2 text-muted-foreground ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                                                        {index % 2 !== 0 && <ArrowRight className="w-4 h-4 text-primary shrink-0" />}
                                                        <span>{step}</span>
                                                        {index % 2 === 0 && <ArrowRight className="w-4 h-4 text-primary shrink-0 rotate-180" />}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
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
