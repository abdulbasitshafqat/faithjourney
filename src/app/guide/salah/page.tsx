"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Droplets, User, ArrowRight, BookOpen, Volume2 } from "lucide-react";
import { wuduSteps, salahSteps } from "@/lib/data/salah";
import { cn } from "@/lib/utils";

export default function SalahGuidePage() {
    const [activeTab, setActiveTab] = useState("salah");

    return (
        <div className="min-h-screen flex flex-col bg-background font-sans">
            <Header />

            <main className="flex-grow pt-24 pb-16">
                {/* Hero Section */}
                <section className="container mx-auto px-4 mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">
                        Guide to Prayer
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Step-by-step guidance on performing Wudu (ablution) and Salah (prayer) according to the Sunnah, following the Ahle Hadees school of thought.
                    </p>
                </section>

                <section className="container mx-auto px-4">
                    <Tabs defaultValue="salah" className="w-full max-w-4xl mx-auto" onValueChange={setActiveTab}>
                        <div className="flex justify-center mb-8">
                            <TabsList className="grid w-full max-w-md grid-cols-2 h-12 rounded-full p-1 bg-muted/50">
                                <TabsTrigger
                                    value="wudu"
                                    className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300 flex items-center gap-2"
                                >
                                    <Droplets size={18} />
                                    Wudu Guide
                                </TabsTrigger>
                                <TabsTrigger
                                    value="salah"
                                    className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300 flex items-center gap-2"
                                >
                                    <User size={18} />
                                    Salah Guide
                                </TabsTrigger>
                            </TabsList>
                        </div>

                        {/* Wudu Content */}
                        <TabsContent value="wudu" className="space-y-6 animate-in fade-in-50 slide-in-from-bottom-4 duration-500">
                            <Card className="border-none shadow-lg bg-card/60 backdrop-blur-sm">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-2xl text-primary">
                                        <Droplets className="h-6 w-6" />
                                        Steps of Wudu (Ablution)
                                    </CardTitle>
                                    <CardDescription>
                                        Purity is the key to prayer. Follow these steps to perform Wudu correctly.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-8">
                                    {wuduSteps.map((step, index) => (
                                        <div key={index} className="relative pl-8 md:pl-12 border-l-2 border-primary/20 pb-8 last:pb-0 group">
                                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-background border-2 border-primary group-hover:bg-primary transition-colors duration-300" />

                                            <div className="flex flex-col md:flex-row md:items-start gap-4">
                                                <div className="flex-1">
                                                    <h3 className="text-xl font-bold text-foreground flex items-center gap-2 mb-2">
                                                        <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center">
                                                            {step.step}
                                                        </span>
                                                        {step.title}
                                                    </h3>
                                                    <p className="text-muted-foreground mb-4 leading-relaxed">
                                                        {step.description}
                                                    </p>

                                                    {step.arabic && (
                                                        <div className="bg-primary/5 p-4 rounded-xl border border-primary/10 mt-4">
                                                            <p className="font-arabic text-2xl text-right text-primary mb-2" dir="rtl">{step.arabic}</p>
                                                            <p className="text-sm font-bold text-foreground/80 mb-1">{step.transliteration}</p>
                                                            <p className="text-sm text-muted-foreground italic">"{step.meaning}"</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Salah Content */}
                        <TabsContent value="salah" className="space-y-6 animate-in fade-in-50 slide-in-from-bottom-4 duration-500">
                            <Card className="border-none shadow-lg bg-card/60 backdrop-blur-sm">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-2xl text-primary">
                                        <User className="h-6 w-6" />
                                        Steps of Salah (Prayer)
                                    </CardTitle>
                                    <CardDescription>
                                        The believers' ascension. Detailed guide based on authentic hadith.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-12">
                                    {salahSteps.map((step, index) => (
                                        <div key={index} className="relative group">
                                            <div className="flex flex-col gap-4">
                                                <div className="flex items-center gap-4 mb-2">
                                                    <div className="w-10 h-10 rounded-xl bg-primary text-primary-foreground font-bold text-lg flex items-center justify-center shadow-lg shadow-primary/20">
                                                        {step.step}
                                                    </div>
                                                    <h3 className="text-xl md:text-2xl font-bold text-foreground">
                                                        {step.title}
                                                    </h3>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-card border border-primary/10 rounded-2xl p-6 hover:shadow-md transition-shadow">
                                                    <div className="space-y-4">
                                                        <p className="text-muted-foreground leading-relaxed">
                                                            {step.description}
                                                        </p>

                                                        {step.instruction && (
                                                            <div className="flex items-start gap-2 text-sm text-amber-700 dark:text-amber-500 bg-amber-50 dark:bg-amber-950/30 p-3 rounded-lg">
                                                                <BookOpen className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                                                <p>{step.instruction}</p>
                                                            </div>
                                                        )}

                                                        {step.note && (
                                                            <p className="text-xs text-muted-foreground bg-muted p-2 rounded border-l-2 border-primary">
                                                                <span className="font-bold text-primary">Note:</span> {step.note}
                                                            </p>
                                                        )}
                                                    </div>

                                                    {step.arabic && (
                                                        <div className="bg-primary/5 rounded-xl p-5 flex flex-col justify-center">
                                                            <p className="font-arabic text-3xl text-center text-primary mb-4 leading-loose" dir="rtl">{step.arabic}</p>
                                                            <div className="text-center space-y-1">
                                                                <p className="font-medium text-foreground">{step.transliteration}</p>
                                                                <p className="text-sm text-muted-foreground italic">"{step.meaning}"</p>
                                                            </div>
                                                            {step.count && (
                                                                <div className="mt-4 text-center">
                                                                    <span className="inline-block px-3 py-1 bg-background rounded-full text-xs font-bold text-muted-foreground border border-border">
                                                                        Recite {step.count}
                                                                    </span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </section>
            </main>

            <Footer />
        </div>
    );
}
