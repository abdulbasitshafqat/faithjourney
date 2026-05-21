import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BookOpen, Info } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function RakatTablesPage() {
    const prayers = [
        {
            name: "Fajr",
            time: "Dawn (Before Sunrise)",
            rakats: [
                { type: "Sunnah (Muakkadah)", count: 2, desc: "Highly emphasized. Better than the world and what it contains." },
                { type: "Fard", count: 2, desc: "Compulsory. Recite aloud." }
            ],
            total: 4
        },
        {
            name: "Dhuhr",
            time: "After Noon (Zawal)",
            rakats: [
                { type: "Sunnah (Muakkadah)", count: 4, desc: "Offer 4 units before Fard." },
                { type: "Fard", count: 4, desc: "Compulsory. Silent recitation." },
                { type: "Sunnah (Muakkadah)", count: 2, desc: "Offer 2 units after Fard." },
                { type: "Nafl", count: 2, desc: "Optional." }
            ],
            total: 12
        },
        {
            name: "Asr",
            time: "Mid-Afternoon",
            rakats: [
                { type: "Sunnah (Ghair Muakkadah)", count: 4, desc: "Optional but rewarding. Prophet (SAW) made dua for those who pray these." },
                { type: "Fard", count: 4, desc: "Compulsory. Silent recitation." }
            ],
            total: 8
        },
        {
            name: "Maghrib",
            time: "Sunset",
            rakats: [
                { type: "Fard", count: 3, desc: "Compulsory. First 2 aloud, 3rd silent." },
                { type: "Sunnah (Muakkadah)", count: 2, desc: "Offer after Fard." },
                { type: "Nafl", count: 2, desc: "Optional." }
            ],
            total: 7
        },
        {
            name: "Isha",
            time: "Night",
            rakats: [
                { type: "Sunnah (Ghair Muakkadah)", count: 4, desc: "Optional." },
                { type: "Fard", count: 4, desc: "Compulsory. First 2 aloud, last 2 silent." },
                { type: "Sunnah (Muakkadah)", count: 2, desc: "Offer after Fard." },
                { type: "Nafl", count: 2, desc: "Optional." },
                { type: "Witr", count: 3, desc: "Essential (Wajib). Offer at end of night or before sleep." },
                { type: "Nafl", count: 2, desc: "Optional (after Witr)." }
            ],
            total: 17
        }
    ];

    return (
        <div className="container mx-auto px-4 py-8 space-y-8 pb-32">
            <div className="flex items-center gap-4 mb-8">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/guides"><ArrowLeft className="h-6 w-6" /></Link>
                </Button>
                <div>
                    <h1 className="text-3xl md:text-4xl font-serif font-bold text-primary">Prayer Rak'ah Guide</h1>
                    <p className="text-muted-foreground">Detailed breakdown of Fard, Sunnah, and Nafl prayers.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {prayers.map((prayer) => (
                    <Card key={prayer.name} className="overflow-hidden border-none shadow-lg bg-white/50 dark:bg-black/20 backdrop-blur-md">
                        <div className="h-2 w-full bg-primary/20">
                            <div className="h-full bg-primary w-1/3" />
                        </div>
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <CardTitle className="text-2xl font-serif font-black">{prayer.name}</CardTitle>
                                <Badge variant="outline" className="text-primary border-primary/20">{prayer.total} Rak'ats</Badge>
                            </div>
                            <CardDescription className="flex items-center gap-2">
                                <Info className="h-4 w-4" /> {prayer.time}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="w-full text-left">
                                <div className="border-b border-primary/10 pb-2 mb-2 flex justify-between font-bold text-sm text-primary">
                                    <span>Type</span>
                                    <span>Count</span>
                                </div>
                                <div className="space-y-3">
                                    {prayer.rakats.map((rakat, i) => (
                                        <div key={i} className="flex justify-between items-start hover:bg-primary/5 p-2 rounded-lg transition-colors group">
                                            <div className="flex flex-col">
                                                <span className="font-medium">{rakat.type}</span>
                                                <span className="text-[10px] text-muted-foreground font-normal transition-all">
                                                    {rakat.desc}
                                                </span>
                                            </div>
                                            <span className="font-bold text-lg">{rakat.count}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Additional Info / Jummah */}
            <Card className="border-none bg-primary/5">
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <BookOpen className="h-6 w-6 text-primary" />
                        <CardTitle className="text-xl font-serif">Jumu'ah (Friday) Prayer</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="space-y-2 text-muted-foreground pl-12 md:pl-16">
                    <p>Replaces Dhuhr on Fridays for men (in congregation).</p>
                    <ul className="list-disc list-outside space-y-1 ml-4">
                        <li><span className="font-bold text-primary">Sunnah (Muakkadah):</span> 4 Rak'ats before Khutbah.</li>
                        <li><span className="font-bold text-primary">Fard:</span> 2 Rak'ats (with Imam).</li>
                        <li><span className="font-bold text-primary">Sunnah (Muakkadah):</span> 4 Rak'ats (or 2+2) after Fard.</li>
                    </ul>
                </CardContent>
            </Card>
        </div>
    );
}
