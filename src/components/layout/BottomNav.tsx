"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, BookOpen, Clock, Heart, Menu, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function BottomNav() {
    const pathname = usePathname();

    // Hide on auth pages
    if (pathname.startsWith("/auth")) return null;

    const links = [
        { name: "Home", href: "/", icon: Home },
        { name: "Quran", href: "/quran", icon: BookOpen },
        { name: "Prayer", href: "/prayer-times", icon: Clock },
        { name: "Duas", href: "/duas", icon: Heart },
        { name: "Wonders", href: "/wonders", icon: Sparkles },
        { name: "More", href: "/settings", icon: Menu },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-t border-border/50 pb-safe pt-2 px-2 md:hidden safe-area-bottom">
            <nav className="flex items-center justify-around">
                {links.map((link) => {
                    const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-200 w-16",
                                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            <div
                                className={cn(
                                    "p-1.5 rounded-xl transition-all duration-300 mb-0.5",
                                    isActive ? "bg-primary/10 translate-y-[-2px]" : "bg-transparent"
                                )}
                            >
                                <link.icon className={cn("h-6 w-6", isActive && "fill-current")} />
                            </div>
                            <span className="text-[10px] font-medium opacity-80">{link.name}</span>
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}
