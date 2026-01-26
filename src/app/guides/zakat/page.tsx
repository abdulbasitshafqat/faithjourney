"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { zakatGuideContent } from "@/lib/data/guides-content";
import { Calculator, Coins, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function ZakatGuidePage() {
    return (
        <div className="min-h-screen flex flex-col bg-background font-sans">
            <Header />

            <main className="flex-grow pt-24 pb-16">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="text-center mb-12">
                        <div className="w-20 h-20 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-yellow-500/20">
                            <Coins className="h-10 w-10 text-yellow-600 dark:text-yellow-400" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">
                            {zakatGuideContent.title}
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            {zakatGuideContent.description}
                        </p>

                        <div className="mt-8">
                            <Link href="/zakat">
                                <Button size="lg" className="rounded-full px-8 gap-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                                    <Calculator className="w-5 h-5" />
                                    Open Zakat Calculator
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <div className="grid gap-8">
                        {zakatGuideContent.sections.map((section, idx) => (
                            <Card key={idx} className="overflow-hidden border-primary/10">
                                <CardHeader className="bg-muted/30 border-b border-primary/5 pb-4">
                                    <CardTitle className="font-serif text-2xl text-foreground">
                                        {section.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-6 md:p-8">
                                    {section.content && (
                                        <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                                            {section.content}
                                        </p>
                                    )}

                                    {section.description && (
                                        <p className="text-base text-muted-foreground mb-4">
                                            {section.description}
                                        </p>
                                    )}

                                    {section.items && (
                                        <div className="grid md:grid-cols-2 gap-3">
                                            {section.items.map((item, i) => (
                                                <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border/50 hover:border-primary/30 transition-colors">
                                                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                                                    <span className="font-medium text-foreground/80">{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="mt-16 bg-gradient-to-br from-primary/10 to-primary/5 p-8 md:p-12 rounded-3xl text-center border border-primary/10">
                        <h3 className="text-2xl font-bold mb-4 font-serif">Ready to calculate your Zakat?</h3>
                        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                            Use our precise calculator to determine your obligation based on your gold, silver, cash, and business assets.
                        </p>
                        <Link href="/zakat">
                            <Button variant="outline" size="lg" className="rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground gap-2">
                                Go to Calculator <ArrowRight className="w-4 h-4" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
