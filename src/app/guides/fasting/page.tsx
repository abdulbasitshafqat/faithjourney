"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fastingGuide } from "@/lib/data/guides-content";
import { Moon, Sun, Utensils, AlertCircle } from "lucide-react";

export default function FastingGuidePage() {
    return (
        <div className="min-h-screen flex flex-col bg-background font-sans">
            <Header />

            <main className="flex-grow pt-24 pb-16">
                <div className="container mx-auto px-4 max-w-4xl">
                    {/* Hero */}
                    <div className="text-center mb-12">
                        <div className="w-20 h-20 bg-orange-100 dark:bg-orange-900/30 rounded-3xl flex items-center justify-center mx-auto mb-6 rotate-3 shadow-lg shadow-orange-500/10">
                            <Moon className="h-10 w-10 text-orange-600 dark:text-orange-400" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">
                            {fastingGuide.title}
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            {fastingGuide.description}
                        </p>
                    </div>

                    {/* Steps */}
                    <div className="space-y-8">
                        {fastingGuide.steps.map((step, index) => (
                            <Card key={index} className="border-none shadow-md bg-card/60 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-3 text-2xl font-serif text-primary">
                                        <div className="bg-primary/10 p-2 rounded-lg">
                                            {index === 0 ? <Moon size={24} /> :
                                                index === 1 ? <Utensils size={24} /> :
                                                    index === 3 ? <Sun size={24} /> : <AlertCircle size={24} />}
                                        </div>
                                        {step.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <p className="text-lg text-muted-foreground leading-relaxed">
                                        {step.description}
                                    </p>

                                    {step.arabic && (
                                        <div className="bg-muted/30 p-6 rounded-xl border border-primary/10 mt-4">
                                            <p className="font-arabic text-3xl text-right text-primary leading-loose mb-4" dir="rtl">
                                                {step.arabic}
                                            </p>
                                            <p className="font-medium text-foreground mb-1">{step.transliteration}</p>
                                            <p className="text-sm text-muted-foreground italic">"{step.meaning}"</p>
                                        </div>
                                    )}

                                    {step.dua && (
                                        <div className="bg-muted/30 p-6 rounded-xl border border-primary/10 mt-4">
                                            <p className="text-sm font-bold uppercase tracking-wider opacity-70 mb-2">Dua to Recite</p>
                                            <p className="font-arabic text-3xl text-right text-primary leading-loose mb-4" dir="rtl">
                                                {step.dua.arabic}
                                            </p>
                                            <p className="font-medium text-foreground mb-1">{step.dua.transliteration}</p>
                                            <p className="text-sm text-muted-foreground italic">"{step.dua.meaning}"</p>
                                        </div>
                                    )}

                                    {step.note && (
                                        <div className="flex items-start gap-3 bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/20 text-yellow-700 dark:text-yellow-400">
                                            <AlertCircle className="w-5 h-5 shrink-0" />
                                            <p className="text-sm">{step.note}</p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Rules Grid */}
                    <div className="grid md:grid-cols-3 gap-6 mt-12">
                        {fastingGuide.rules.map((rule, idx) => (
                            <Card key={idx} className="bg-muted/20 border-primary/10">
                                <CardHeader>
                                    <CardTitle className="text-lg font-bold text-primary">{rule.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">{rule.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
