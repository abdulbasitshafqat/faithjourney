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
                            <Card key={index} className="transition-all hover:bg-muted/50">
                                <div className="flex flex-col md:flex-row">
                                    <div className="w-full md:w-32 bg-primary/10 flex items-center justify-center p-4 md:p-0 font-bold text-2xl text-primary font-serif">
                                        Takbir {index + 1}
                                    </div>
                                    <CardContent className="p-6 flex-grow">
                                        <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                                        <p className="text-muted-foreground text-lg">{step.description}</p>
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
