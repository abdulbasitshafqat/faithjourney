"use client";

import React, { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { motion } from "framer-motion";
import { Copy, CheckCircle, Heart, Shield, Database, Server, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast"; // Assuming this hook exists or similar
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

const BTC_ADDRESS = "bc1qkpjpfl2cdkep7rhcwjp2cua35ju9pf6lx9jzy0";

export function SadaqahComponent({ className = "", compact = false }: { className?: string, compact?: boolean }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(BTC_ADDRESS);
        setCopied(true);
        // Reset icon after 2 seconds
        setTimeout(() => setCopied(false), 2000);

        // Show Toast (if available in the project context, otherwise the button change is feedback enough)
        // Using a simple alert fallback or just relying on the icon change if toast isn't set up globally yet
        // Ideally we use the toast from shadcn if configured
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className={`w-full max-w-2xl mx-auto ${className}`}
        >
            <Card className="relative overflow-hidden border-emerald-500/20 bg-gradient-to-br from-emerald-900/10 via-background to-emerald-900/5 backdrop-blur-xl shadow-[0_0_40px_-10px_rgba(16,185,129,0.1)]">
                {/* Glow Effect */}
                <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

                <CardHeader className="text-center pb-2">
                    <div className="mx-auto bg-emerald-100 dark:bg-emerald-900/30 w-12 h-12 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/20">
                        <Heart className="w-6 h-6 text-emerald-600 dark:text-emerald-400 fill-emerald-600/20" />
                    </div>
                    <CardTitle className="text-2xl md:text-3xl font-serif font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300">
                        Help Us Keep FaithJourney Ad-Free
                    </CardTitle>
                    <CardDescription className="text-base md:text-lg mt-2 max-w-lg mx-auto">
                        Your contributions help cover server costs and ongoing development as Sadaqah Jariyah for the Ummah.
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-8 pt-6">
                    {/* QR Code Section */}
                    {!compact && (
                        <div className="flex justify-center">
                            <div className="p-4 bg-white rounded-2xl border-2 border-emerald-500/20 shadow-xl relative group">
                                <div className="absolute inset-0 border-2 border-emerald-400/30 rounded-2xl blur-sm group-hover:blur-md transition-all duration-500" />
                                <QRCodeSVG
                                    value={BTC_ADDRESS}
                                    size={200}
                                    level="H"
                                    className="relative z-10"
                                    imageSettings={{
                                        src: "/icon.svg", // Assuming app icon exists
                                        x: undefined,
                                        y: undefined,
                                        height: 34,
                                        width: 34,
                                        excavate: true,
                                    }}
                                />
                            </div>
                        </div>
                    )}

                    {/* Address Copy Section */}
                    <div className="space-y-3 max-w-md mx-auto">
                        <div className="text-xs text-center text-muted-foreground uppercase tracking-widest font-semibold">
                            Bitcoin (BTC) Address
                        </div>
                        <div className="flex items-center gap-2 p-2 pl-4 rounded-xl bg-muted/50 border border-primary/10 group hover:border-emerald-500/30 transition-colors">
                            <code className="flex-1 text-xs md:text-sm font-mono truncate text-emerald-700 dark:text-emerald-300">
                                {BTC_ADDRESS}
                            </code>
                            <Button
                                size="sm"
                                variant={copied ? "default" : "secondary"}
                                onClick={handleCopy}
                                className={`shrink-0 transition-all duration-300 ${copied ? 'bg-emerald-600 hover:bg-emerald-700' : ''}`}
                            >
                                {copied ? (
                                    <CheckCircle className="w-4 h-4 mr-1" />
                                ) : (
                                    <Copy className="w-4 h-4 mr-1" />
                                )}
                                {copied ? "Copied!" : "Copy"}
                            </Button>
                        </div>
                    </div>

                    {/* Transparency Section */}
                    <div className="pt-6 border-t border-border/50">
                        <div className="text-center mb-4">
                            <h4 className="text-sm font-semibold text-muted-foreground flex items-center justify-center gap-2">
                                <Zap className="w-4 h-4 text-amber-500" />
                                Transparent Cost Breakdown
                            </h4>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-xs md:text-sm">
                            <TransparencyItem
                                icon={Server}
                                label="Server Hosting"
                                desc="High-speed global content delivery via Vercel"
                            />
                            <TransparencyItem
                                icon={Shield}
                                label="Database Security"
                                desc="Secure and redundant user data storage"
                            />
                            <TransparencyItem
                                icon={Database}
                                label="API Maintenance"
                                desc="Reliable Quran & Hadith data availability"
                            />
                            <TransparencyItem
                                icon={Heart}
                                label="Ad-Free Experience"
                                desc="100% of funds go to keeping the app clean"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}

function TransparencyItem({ icon: Icon, label, desc }: { icon: any, label: string, desc: string }) {
    return (
        <TooltipProvider>
            <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                    <div className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-help">
                        <div className="p-2 rounded-full bg-primary/5 text-primary">
                            <Icon className="w-4 h-4" />
                        </div>
                        <span className="font-medium opacity-80">{label}</span>
                    </div>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="text-xs max-w-[150px] text-center">
                    {desc}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
