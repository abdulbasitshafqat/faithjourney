"use client";

import { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Share2, Maximize2, Minimize2 } from "lucide-react";
import { cn } from "@/lib/utils"; // Assuming utils exists, verified in early steps
import { Button } from "@/components/ui/button"; // Assuming Shadcn button
import { Badge } from "@/components/ui/badge"; // Assuming Shadcn badge
import { format } from "date-fns";

export interface Wonder {
    id: string;
    category: string;
    title: string;
    verse_arabic: string;
    verse_reference: string;
    scientific_fact: string;
    visual_asset: string;
}

interface WonderCardProps {
    wonder: Wonder;
    index: number;
}

export function WonderCard({ wonder, index }: WonderCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    // 3D Tilt Logic
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 50 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 50 });

    function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        const xPct = (clientX - left) / width - 0.5;
        const yPct = (clientY - top) / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    }

    function onMouseLeave() {
        x.set(0);
        y.set(0);
    }

    const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);
    const brightness = useTransform(mouseY, [-0.5, 0.5], [1.1, 0.9]);

    const handleShare = (e: React.MouseEvent) => {
        e.stopPropagation();
        const text = `"${wonder.title}"\n\n${wonder.verse_arabic}\n${wonder.verse_reference}\n\nScientific Miracle: ${wonder.scientific_fact}\n\nDiscover more at FaithJourney.pro`;
        navigator.clipboard.writeText(text);
        // Could add toast here if toast is available, but simple alert or silent copy works for MVP
        alert("Copied to clipboard!");
    };

    return (
        <motion.div
            ref={ref}
            style={{
                rotateX: isExpanded ? 0 : rotateX,
                rotateY: isExpanded ? 0 : rotateY,
                filter: isExpanded ? "none" : "brightness(1)",
                transformStyle: "preserve-3d",
            }}
            onMouseMove={isExpanded ? undefined : onMouseMove}
            onMouseLeave={isExpanded ? undefined : onMouseLeave}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className={cn(
                "relative rounded-xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-xl transition-all duration-300",
                isExpanded ? "z-50 col-span-full row-span-2 min-h-[400px]" : "h-full min-h-[300px]"
            )}
        >
            {/* Background Gradient/Image Overlay */}
            <div
                className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-br from-emerald-900/40 to-indigo-900/40 opacity-50"
            />

            {/* Content Container */}
            <div className="flex h-full flex-col p-6 text-white" style={{ transform: "translateZ(20px)" }}>
                <div className="mb-4 flex items-start justify-between">
                    <Badge variant="outline" className="border-emerald-400/50 text-emerald-100 bg-emerald-900/20">
                        {wonder.category}
                    </Badge>
                    <div className="flex gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-white/70 hover:bg-white/10 hover:text-white"
                            onClick={handleShare}
                        >
                            <Share2 className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-white/70 hover:bg-white/10 hover:text-white"
                            onClick={() => setIsExpanded(!isExpanded)}
                        >
                            {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                        </Button>
                    </div>
                </div>

                <h3 className="mb-2 text-2xl font-bold font-serif text-amber-50 drop-shadow-sm">
                    {wonder.title}
                </h3>

                <div className="mb-6 grow">
                    <p className="mb-4 text-right font-arabic text-2xl leading-relaxed text-emerald-50">
                        {wonder.verse_arabic}
                    </p>
                    <p className="text-right text-sm text-emerald-200/80 font-serif italic">
                        {wonder.verse_reference}
                    </p>
                </div>

                {/* Fact Section */}
                <motion.div
                    initial={false}
                    animate={{ height: isExpanded ? "auto" : "auto" }}
                    className={cn("overflow-hidden rounded-lg bg-black/20 p-4 border border-white/5", !isExpanded && "line-clamp-3")}
                >
                    <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-indigo-300">
                        Scientific Discovery
                    </h4>
                    <p className="text-sm leading-relaxed text-gray-200 font-sans">
                        {wonder.scientific_fact}
                    </p>
                </motion.div>
            </div>
        </motion.div>
    );
}
