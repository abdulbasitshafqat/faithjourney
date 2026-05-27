"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function SplashScreen({ onFinish }: { onFinish: () => void }) {
    const [isVisible, setIsVisible] = useState(true);
    const [shouldRender, setShouldRender] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(() => {
                setShouldRender(false);
                onFinish();
            }, 800); // Premium smooth dissolve
        }, 3200); // Duration to fully appreciate the animation

        return () => clearTimeout(timer);
    }, [onFinish]);

    if (!shouldRender) return null;

    const letters = Array.from("Faith Journey");

    const textContainerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.06, delayChildren: 0.4 }
        }
    } as any;

    const letterVariants = {
        hidden: { opacity: 0, y: 15, scale: 0.9 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { type: "spring" as const, damping: 12, stiffness: 100 }
        }
    } as any;

    const haloVariants = {
        animate: {
            scale: [1, 2.2],
            opacity: [0.35, 0],
            transition: {
                duration: 2.8,
                repeat: Infinity,
                ease: "easeOut" as const
            }
        }
    } as any;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-b from-[#0b0c0c] via-[#091512] to-[#040505] overflow-hidden select-none"
                >
                    {/* Atmospheric Cosmic Orbs */}
                    <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none animate-pulse duration-[8000ms]" />
                    <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-teal-500/5 rounded-full blur-[80px] pointer-events-none animate-pulse duration-[6000ms]" />

                    <div className="relative flex flex-col items-center z-10">
                        
                        {/* Interactive Sacred Geometry Logo */}
                        <div className="relative mb-10 flex items-center justify-center w-28 h-28">
                            
                            {/* Expanding Spiritual Halos */}
                            <motion.div 
                                variants={haloVariants}
                                animate="animate"
                                className="absolute w-24 h-24 rounded-full border border-emerald-500/20 bg-emerald-500/5"
                            />
                            <motion.div 
                                variants={haloVariants}
                                animate="animate"
                                className="absolute w-24 h-24 rounded-full border border-emerald-400/15 bg-emerald-400/5 [animation-delay:0.9s]"
                            />
                            <motion.div 
                                variants={haloVariants}
                                animate="animate"
                                className="absolute w-24 h-24 rounded-full border border-teal-500/10 bg-teal-500/5 [animation-delay:1.8s]"
                            />

                            {/* Core Glowing Orb */}
                            <div className="absolute inset-2 bg-[#091a16] border border-emerald-500/30 rounded-full blur-[1px] shadow-2xl flex items-center justify-center relative">
                                
                                {/* Dynamic Vector Drawing SVG Moon */}
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    viewBox="0 0 24 24" 
                                    className="w-12 h-12 relative z-10 rotate-[-15deg]"
                                >
                                    <motion.path 
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        animate={{ pathLength: 1, opacity: 1 }}
                                        transition={{ duration: 1.8, ease: "easeInOut", delay: 0.2 }}
                                        fill="url(#gold-glow)"
                                        stroke="#10b981"
                                        strokeWidth="0.5"
                                        strokeLinecap="round"
                                        d="M12 3a9 9 0 1 0 9 9 9.75 9.75 0 0 1-9-9Z"
                                    />
                                    <defs>
                                        <linearGradient id="gold-glow" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#34d399" />
                                            <stop offset="50%" stopColor="#10b981" />
                                            <stop offset="100%" stopColor="#047857" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>
                        </div>

                        {/* Staggered Typography Logo */}
                        <motion.h1 
                            variants={textContainerVariants}
                            initial="hidden"
                            animate="visible"
                            className="text-4xl md:text-5xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-white to-emerald-400 tracking-tight flex"
                        >
                            {letters.map((char, index) => (
                                <motion.span 
                                    key={index} 
                                    variants={letterVariants}
                                    className={char === " " ? "w-3" : ""}
                                >
                                    {char}
                                </motion.span>
                            ))}
                            <motion.span 
                                variants={letterVariants}
                                className="text-white ml-2"
                            >
                                Pro
                            </motion.span>
                        </motion.h1>

                        {/* Serene Floating Subtitle */}
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 0.6, y: 0 }}
                            transition={{ duration: 1.2, delay: 1.8, ease: "easeOut" }}
                            className="mt-3 text-[11px] font-black uppercase tracking-[0.25em] text-emerald-400/80"
                        >
                            Path to Peace & Faith
                        </motion.p>

                        {/* Modern Linear Loading Dot */}
                        <div className="absolute bottom-16 left-0 right-0 flex justify-center">
                            <motion.div 
                                initial={{ width: 0, opacity: 0 }}
                                animate={{ width: 120, opacity: 0.5 }}
                                transition={{ duration: 2, delay: 0.6, ease: "easeInOut" }}
                                className="h-[2px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent relative"
                            >
                                <motion.div 
                                    animate={{ left: ["0%", "100%"] }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute -top-[1px] w-4 h-1 bg-emerald-300 rounded-full blur-[1px]"
                                />
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
