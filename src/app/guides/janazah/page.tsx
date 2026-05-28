"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { janazahGuide } from "@/lib/data/guides-content";
import { HeartHandshake, Users } from "lucide-react";

export default function JanazahGuidePage() {
    return (
        <div className="min-h-screen flex flex-col bg-background font-sans">
            <Header />

            <main className="flex-grow pt-24 pb-16">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="text-center mb-12">
                        <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Users className="h-8 w-8 text-slate-600 dark:text-slate-400" />
                        </div>
                        <h1 className="text-4xl font-serif font-bold text-primary mb-4">
                            {janazahGuide.title}
                        </h1>
                        <p className="text-lg text-muted-foreground">
                            {janazahGuide.description}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 mb-12">
                        <Card className="bg-primary/5 border-primary/20">
                            <CardContent className="p-8">
                                <h3 className="text-xl font-bold font-serif mb-6 text-primary flex items-center gap-2">
                                    <HeartHandshake className="w-5 h-5" /> Rights of the Deceased
                                </h3>
                                <ul className="space-y-4">
                                    {janazahGuide.rights.map((right, idx) => (
                                        <li key={idx} className="flex items-center gap-3">
                                            <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                                                {idx + 1}
                                            </span>
                                            <span className="text-lg font-medium">{right}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>

                        <div className="flex items-center justify-center p-8 bg-muted/10 rounded-2xl text-center text-muted-foreground italic">
                            "Whoever attends the funeral procession until he offers the funeral prayer, then he will receive one Qirat of reward. And whoever accompanies it until the body is buried, will receive two Qirats... like two huge mountains."
                            - (Bukhari)
                        </div>
                    </div>

                    <h2 className="text-3xl font-serif font-bold text-center mb-8">How to Pray Janazah</h2>

                    <div className="space-y-6">
                        {janazahGuide.janazahPrayerSteps.map((step, index) => (
                            <Card key={index} className="transition-all hover:bg-muted/50 overflow-hidden border border-primary/10">
                                <div className="flex flex-col md:flex-row">
                                    <div className="w-full md:w-32 bg-primary/10 flex items-center justify-center p-6 md:p-0 font-bold text-2xl text-primary font-serif">
                                        Takbir {index + 1}
                                    </div>
                                    <CardContent className="p-6 md:p-8 flex-grow">
                                        <h3 className="text-xl font-bold mb-2 text-primary font-serif">{step.title}</h3>
                                        <p className="text-muted-foreground text-base mb-6 leading-relaxed">{step.description}</p>
                                        
                                        {step.arabic && (
                                            <div className="bg-primary/5 dark:bg-primary/10 p-6 rounded-2xl border border-primary/10 text-right mb-4 leading-loose font-arabic text-2xl md:text-3xl text-primary max-w-full overflow-x-auto" dir="rtl">
                                                {step.arabic}
                                            </div>
                                        )}
                                        {step.transliteration && (
                                            <div className="text-left bg-muted/40 p-4 rounded-xl mb-3 text-sm md:text-base italic text-foreground/80 font-serif leading-relaxed border border-border/50">
                                                <p className="text-[10px] font-bold text-primary/70 uppercase tracking-widest mb-1 font-sans">Transliteration</p>
                                                {step.transliteration}
                                            </div>
                                        )}
                                        {step.meaning && (
                                            <div className="text-left bg-muted/20 p-4 rounded-xl text-sm md:text-base text-muted-foreground font-serif leading-relaxed">
                                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1 font-sans font-black">Translation</p>
                                                {step.meaning}
                                            </div>
                                        )}
                                    </CardContent>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
