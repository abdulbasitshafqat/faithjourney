"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";

import { namesOfAllah } from "@/lib/data/names";

// Using the imported data
const names = namesOfAllah;

export default function NamesPage() {
    return (
        <div className="min-h-screen flex flex-col bg-background font-sans">
            <Navbar />

            <main className="flex-grow container mx-auto px-4 py-24">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">
                        99 Names of Allah
                    </h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        "And to Allah belong the best names, so invoke Him by them." (Quran 7:180)
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {names.map((name) => (
                        <Card key={name.id} className="bg-card/50 hover:bg-primary/5 transition-colors border-primary/10 hover:border-primary/30 text-center group cursor-pointer">
                            <CardContent className="p-6 flex flex-col items-center justify-center h-full space-y-2">
                                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center mb-2 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                    {name.id}
                                </div>
                                <h3 className="font-arabic text-3xl text-primary mb-1">{name.arabic}</h3>
                                <p className="font-serif font-bold text-foreground">{name.transliteration}</p>
                                <p className="text-xs text-muted-foreground">{name.meaning}</p>
                            </CardContent>
                        </Card>
                    ))}

                    {/* Placeholder for remaining names */}
                    <Card className="bg-muted/20 border-dashed border-primary/20 flex items-center justify-center col-span-2 md:col-span-1 lg:col-span-1">
                        <p className="text-sm text-muted-foreground p-4 text-center">Full list coming soon...</p>
                    </Card>
                </div>
            </main>

            <Footer />
        </div>
    );
}
