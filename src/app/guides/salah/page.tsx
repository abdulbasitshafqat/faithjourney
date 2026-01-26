"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Droplets, User, BookOpen, Volume2, Sparkles, ChevronRight, Scale } from "lucide-react";
import { wuduSteps, salahSteps } from "@/lib/data/salah";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function SalahGuidePage() {
    const [activeTab, setActiveTab] = useState("salah");
    const [school, setSchool] = useState<"hanafi" | "shafi" | "maliki" | "hanbali">("hanafi");

    return (
        <div className="min-h-screen flex flex-col bg-background font-sans">
            <Header />

            <main className="flex-grow pt-24 pb-16">
                {/* Hero Section */}
                <section className="container mx-auto px-4 mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4 tracking-tight">
                        Prayer Guide
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Step-by-step guidance on performing Wudu and Salah according to the Sunnah, providing options for all major schools of thought.
                    </p>
                </section>

                <section className="container mx-auto px-4">
                    <Tabs defaultValue="salah" className="w-full max-w-5xl mx-auto" onValueChange={setActiveTab}>
                        <div className="flex justify-center mb-10">
                            <TabsList className="grid w-full max-w-md grid-cols-2 h-14 rounded-2xl p-1.5 bg-muted/60 backdrop-blur-md border border-primary/5">
                                <TabsTrigger
                                    value="wudu"
                                    className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all duration-300 flex items-center gap-2 font-serif text-lg"
                                >
                                    <Droplets size={20} />
                                    Wudu
                                </TabsTrigger>
                                <TabsTrigger
                                    value="salah"
                                    className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all duration-300 flex items-center gap-2 font-serif text-lg"
                                >
                                    <User size={20} />
                                    Salah
                                </TabsTrigger>
                            </TabsList>
                        </div>

                        {/* Wudu Content */}
                        <TabsContent value="wudu" className="space-y-8 animate-in fade-in-50 slide-in-from-bottom-6 duration-700">
                            <div className="grid gap-6">
                                {wuduSteps.map((step, index) => (
                                    <Card key={index} className="border-none shadow-sm bg-card/60 backdrop-blur-md transition-all hover:shadow-md hover:translate-y-[-2px] overflow-hidden group">
                                        <div className="flex flex-col md:flex-row">
                                            <div className="w-16 md:w-24 bg-primary/5 flex items-center justify-center font-bold text-3xl text-primary font-serif shrink-0 border-r border-primary/5 group-hover:bg-primary/10 transition-colors">
                                                {step.step}
                                            </div>
                                            <CardContent className="p-8 flex-grow">
                                                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                                                    <div className="flex-1">
                                                        <h3 className="text-2xl font-bold text-foreground mb-3 flex items-center gap-2">
                                                            {step.title}
                                                        </h3>
                                                        <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                                                            {step.description}
                                                        </p>

                                                        {step.arabic && (
                                                            <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10 space-y-4">
                                                                <p className="font-arabic text-3xl text-right text-primary leading-loose" dir="rtl">{step.arabic}</p>
                                                                <div className="space-y-1">
                                                                    <p className="text-md font-bold text-foreground/80">{step.transliteration}</p>
                                                                    <p className="text-sm text-muted-foreground italic">"{step.meaning}"</p>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </TabsContent>

                        {/* Salah Content */}
                        <TabsContent value="salah" className="space-y-8 animate-in fade-in-50 slide-in-from-bottom-6 duration-700">
                            {/* School Selector */}
                            <div className="bg-card/40 backdrop-blur-xl border border-primary/10 rounded-[2rem] p-6 mb-10 shadow-xl">
                                <div className="flex items-center gap-3 mb-6 px-2">
                                    <Scale className="h-5 w-5 text-primary" />
                                    <div>
                                        <h4 className="text-lg font-serif font-bold text-primary italic">Select School of Thought</h4>
                                        <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">Adjust the guide to your Madhab</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    {(["hanafi", "shafi", "maliki", "hanbali"] as const).map((s) => (
                                        <Button
                                            key={s}
                                            variant={school === s ? "default" : "outline"}
                                            onClick={() => setSchool(s)}
                                            className={cn(
                                                "h-14 rounded-2xl text-base font-serif capitalize transition-all duration-300",
                                                school === s ? "shadow-lg shadow-primary/20 scale-[1.05]" : "border-primary/5 bg-background/50"
                                            )}
                                        >
                                            {s}
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            <div className="grid gap-8">
                                {salahSteps.map((step, index) => (
                                    <div key={index} className="relative">
                                        <Card className="border-none shadow-xl bg-card border border-primary/5 overflow-hidden group hover:shadow-2xl transition-all duration-300">
                                            <div className="flex flex-col">
                                                <div className="bg-primary/5 px-8 py-5 flex items-center justify-between border-b border-primary/5 group-hover:bg-primary/10 transition-colors">
                                                    <div className="flex items-center gap-4">
                                                        <span className="w-10 h-10 rounded-xl bg-primary text-primary-foreground font-bold text-xl flex items-center justify-center shadow-lg shadow-primary/20">
                                                            {step.step}
                                                        </span>
                                                        <h3 className="text-2xl font-bold text-foreground font-serif">
                                                            {step.title}
                                                        </h3>
                                                    </div>
                                                    <ChevronRight className="text-primary/30 group-hover:translate-x-1 transition-transform" />
                                                </div>

                                                <CardContent className="p-8">
                                                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                                                        <div className="lg:col-span-12 space-y-6">
                                                            <p className="text-muted-foreground text-xl leading-relaxed">
                                                                {step.description}
                                                            </p>

                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                                {step.instruction && (
                                                                    <div className="flex items-start gap-4 text-primary bg-primary/5 p-5 rounded-2xl border border-primary/10">
                                                                        <BookOpen className="w-6 h-6 mt-1 flex-shrink-0" />
                                                                        <div className="space-y-2">
                                                                            <p className="font-black text-xs uppercase tracking-[0.2em] opacity-60">General Step</p>
                                                                            <p className="font-medium text-lg leading-relaxed italic">{step.instruction}</p>
                                                                        </div>
                                                                    </div>
                                                                )}

                                                                {step.variations && (step.variations as any)[school] && (
                                                                    <div className="flex items-start gap-4 text-secondary bg-secondary/5 p-5 rounded-2xl border border-secondary/20 shadow-inner">
                                                                        <Sparkles className="w-6 h-6 mt-1 flex-shrink-0" />
                                                                        <div className="space-y-2">
                                                                            <p className="font-black text-xs uppercase tracking-[0.2em] opacity-60 capitalize">{school} View</p>
                                                                            <p className="font-bold text-lg leading-relaxed">{(step.variations as any)[school]}</p>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>

                                                            {step.arabic && (
                                                                <div className="mt-8 relative pt-10 pb-8 px-8 bg-muted/30 rounded-3xl border border-border/50">
                                                                    <div className="absolute top-0 right-8 -translate-y-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-md">
                                                                        Recitation
                                                                    </div>
                                                                    <p className="font-arabic text-4xl text-center text-primary mb-8 leading-[2.5]" dir="rtl">{step.arabic}</p>
                                                                    <div className="text-center space-y-2 border-t border-primary/5 pt-6">
                                                                        <p className="text-xl font-medium text-foreground">{step.transliteration}</p>
                                                                        <p className="text-lg text-muted-foreground italic max-w-2xl mx-auto">"{step.meaning}"</p>
                                                                        {step.count && (
                                                                            <div className="mt-6 flex justify-center">
                                                                                <span className="inline-flex items-center gap-2 px-6 py-2 bg-primary/10 rounded-full text-sm font-bold text-primary border border-primary/20">
                                                                                    <Volume2 className="h-4 w-4" />
                                                                                    Recite {step.count}
                                                                                </span>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </div>
                                        </Card>

                                        {/* Vertical line connecting cards on desktop */}
                                        {index < salahSteps.length - 1 && (
                                            <div className="hidden lg:block absolute left-10 -bottom-8 w-0.5 h-8 bg-gradient-to-b from-primary/20 to-transparent" />
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div className="mt-16 text-center text-muted-foreground p-8 bg-muted/10 rounded-[2rem] border border-dashed border-primary/20 italic text-lg">
                                Tip: Take your time with each posture to achieve tranquility in prayer.
                            </div>
                        </TabsContent>
                    </Tabs>
                </section>
            </main>

            <Footer />
        </div>
    );
}
