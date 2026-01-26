"use client";

import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Droplets } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const wuduSteps = [
    {
        step: 1,
        title: "Intention (Niyyah)",
        description: "Make the intention in your heart to perform Wudu for the sake of Allah. You can say 'Bismillah' (In the name of Allah) to begin.",
        image: null
    },
    {
        step: 2,
        title: "Wash Hands",
        description: "Wash both hands up to the wrists three times. Ensure water reaches between the fingers.",
        image: null
    },
    {
        step: 3,
        title: "Rinse Mouth (Madmadah)",
        description: "Take a handful of water into your mouth and rinse it thoroughly three times.",
        image: null
    },
    {
        step: 4,
        title: "Rinse Nose (Istinshaq)",
        description: "Sniff water into your nostrils with your right hand and blow it out with your left hand. Do this three times.",
        image: null
    },
    {
        step: 5,
        title: "Wash Face",
        description: "Wash your entire face three times, from the hairline to the chin and from ear to ear.",
        image: null
    },
    {
        step: 6,
        title: "Wash Arms",
        description: "Wash your right arm up to and including the elbow three times, then do the same for the left arm.",
        image: null
    },
    {
        step: 7,
        title: "Wipe Head (Masah)",
        description: "Wet your hands and wipe over your head, starting from the front to the back and bringing them forward again. Wipe your ears with your index fingers inside and thumbs outside. Do this once.",
        image: null
    },
    {
        step: 8,
        title: "Wash Feet",
        description: "Wash your right foot up to and including the ankles three times, ensuring water reaches between the toes. Repeat for the left foot.",
        image: null
    },
    {
        step: 9,
        title: "Dua After Wudu",
        description: "Recite the Shahada: 'Ash-hadu an la ilaha illallah wahdahu la sharika lah, wa ash-hadu anna Muhammadan abduhu wa rasuluh.' (I bear witness that there is no god but Allah alone, without partner, and I bear witness that Muhammad is His servant and Messenger.)",
        image: null
    }
];

export default function WuduGuide() {
    return (
        <div className="min-h-screen flex flex-col bg-background font-sans">
            <Header />
            <main className="flex-grow pt-24 pb-16">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="mb-12 text-center">
                        <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-3xl flex items-center justify-center mx-auto mb-6 rotate-3 shadow-lg shadow-blue-500/10 transition-transform hover:rotate-6">
                            <Droplets className="h-10 w-10 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary tracking-tight mb-3">
                            Wudu Guide
                        </h1>
                        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                            A step-by-step visual and textual guide to performing ablution correctly before prayer.
                        </p>
                    </div>

                    <div className="space-y-12 relative">
                        {/* Decorative Line */}
                        <div className="absolute left-[20px] md:left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-primary/30 via-primary/10 to-transparent -translate-x-1/2 hidden md:block" />

                        {wuduSteps.map((item, index) => (
                            <div key={index} className="relative flex flex-col md:flex-row items-center gap-8 md:gap-0 group">
                                {/* Desktop Layout: Left/Right Alternating */}
                                <div className={`flex-1 w-full order-2 md:order-none ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16 md:order-last'}`}>
                                    <div className={`p-8 rounded-[2rem] bg-card/60 backdrop-blur-sm border border-primary/10 shadow-sm transition-all duration-500 group-hover:shadow-xl group-hover:border-primary/20 ${index % 2 === 0 ? 'hover:-translate-x-1' : 'hover:translate-x-1'}`}>
                                        <h3 className="font-serif text-2xl font-bold text-primary mb-3 flex items-center gap-3 md:justify-end">
                                            {item.step === 9 && <CheckCircle2 className="h-6 w-6 text-emerald-500 hidden md:block" />}
                                            {item.title}
                                            {item.step === 9 && <CheckCircle2 className="h-6 w-6 text-emerald-500 md:hidden" />}
                                        </h3>
                                        <p className="text-muted-foreground leading-relaxed text-lg">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Center Circle */}
                                <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-2xl bg-primary text-primary-foreground font-bold text-xl shadow-lg shadow-primary/20 transition-transform group-hover:scale-110 group-hover:rotate-6 order-1 md:order-none">
                                    {item.step}
                                </div>

                                {/* Placeholder for balance on desktop */}
                                <div className="flex-1 hidden md:block" />
                            </div>
                        ))}
                    </div>

                    <div className="mt-20 p-8 md:p-12 rounded-[2.5rem] bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-5">
                            <Droplets className="w-32 h-32 text-emerald-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-emerald-800 dark:text-emerald-400 font-serif mb-4">Final Remarks</h3>
                        <p className="text-emerald-700/80 dark:text-emerald-300/80 text-lg leading-relaxed max-w-2xl mx-auto">
                            Ensure the water reaches every part required. It is recommended to minimize water waste as per the Sunnah. Your prayer is only valid with a proper Wudu.
                        </p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
