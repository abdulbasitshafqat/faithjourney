
"use client";

import Link from "next/link";
import { Menu, Bookmark, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { GlobalSettings } from "@/components/ui/global-settings";
import { cn } from "@/lib/utils";
// Force HMR update

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [user, setUser] = useState<any>(null);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);

            // Calculate scroll progress for the progress bar
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            setScrollProgress(scrolled);
        };
        window.addEventListener("scroll", handleScroll);

        // Auth listener
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => {
            window.removeEventListener("scroll", handleScroll);
            subscription.unsubscribe();
        };
    }, []);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
    };

    return (
        <header
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled
                ? "bg-background/80 backdrop-blur-md border-b shadow-sm"
                : "bg-transparent"
                }`}
        >
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2 group">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Moon className="h-5 w-5 text-primary rotate-[-15deg]" />
                    </div>
                    <span className="text-2xl font-serif font-bold text-primary tracking-tight">
                        Faith Journey
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-8">
                    {[
                        { name: "Quran", href: "/quran" },
                        { name: "Hadith", href: "/hadith" },
                        { name: "Duas", href: "/duas" },
                        { name: "Prayer Times", href: "/prayer-times" },
                        { name: "Tasbih", href: "/tasbih" },
                        { name: "Knowledge", href: "/knowledge" },
                    ].map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "text-sm font-medium transition-all duration-200 relative py-1",
                                pathname.startsWith(link.href)
                                    ? "text-primary"
                                    : "text-foreground/70 hover:text-primary"
                            )}
                        >
                            {link.name}
                            {pathname.startsWith(link.href) && (
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full" />
                            )}
                        </Link>
                    ))}
                </nav>

                {/* Actions */}
                <div className="hidden md:flex items-center space-x-4">
                    {user ? (
                        <>
                            <Link href="/bookmarks" title="My Bookmarks">
                                <Button variant="ghost" size="icon" className="text-primary hover:text-primary/80">
                                    <Bookmark className="h-5 w-5" />
                                </Button>
                            </Link>
                            <Button variant="outline" size="sm" onClick={handleSignOut}>
                                Sign Out
                            </Button>
                        </>
                    ) : (
                        <Link href="/auth">
                            <Button variant="outline" size="sm">
                                Sign In
                            </Button>
                        </Link>
                    )}
                    <GlobalSettings />
                    <Link href="/settings">
                        <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-primary">
                            More
                        </Button>
                    </Link>
                </div>

                {/* Mobile Menu */}
                <div className="md:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-12 w-12 hover:bg-primary/5">
                                <Menu className="h-8 w-8 text-primary" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px] sm:w-[350px] border-l-primary/10 bg-background/95 backdrop-blur-xl">
                            <SheetHeader className="text-left border-b border-primary/10 pb-6 mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                                        <Moon className="h-6 w-6 text-primary rotate-[-15deg]" />
                                    </div>
                                    <SheetTitle className="font-serif text-2xl text-primary tracking-tight">Faith Journey</SheetTitle>
                                </div>
                            </SheetHeader>

                            <div className="flex flex-col h-full">
                                <div className="flex flex-col gap-2">
                                    {[
                                        { name: "Quran", href: "/quran" },
                                        { name: "Hadith", href: "/hadith" },
                                        { name: "Prayer Times", href: "/prayer-times" },
                                        { name: "Duas & Azkar", href: "/duas" },
                                        { name: "Tasbih", href: "/tasbih" },
                                        { name: "Names of Allah", href: "/names" },
                                        { name: "Knowledge", href: "/knowledge" },
                                    ].map((link) => (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            className={cn(
                                                "flex items-center justify-between p-3 rounded-xl transition-all duration-200 group",
                                                pathname.startsWith(link.href)
                                                    ? "bg-primary/10 text-primary"
                                                    : "hover:bg-muted text-foreground/80 hover:text-primary"
                                            )}
                                        >
                                            <span className="text-lg font-medium font-serif">{link.name}</span>
                                            {pathname.startsWith(link.href) && (
                                                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                            )}
                                        </Link>
                                    ))}

                                    {user && (
                                        <Link href="/bookmarks" className="flex items-center justify-between p-3 rounded-xl hover:bg-muted text-primary transition-all duration-200 mt-2 border border-primary/10">
                                            <span className="text-lg font-medium font-serif flex items-center gap-2">
                                                <Bookmark className="h-4 w-4" /> My Bookmarks
                                            </span>
                                        </Link>
                                    )}
                                </div>

                                <div className="mt-auto pb-8 pt-6 border-t border-primary/10 flex flex-col gap-4">
                                    <div className="flex flex-col gap-3">
                                        {user ? (
                                            <Button variant="outline" className="w-full h-11 rounded-xl border-primary/20 hover:bg-destructive/5 hover:text-destructive hover:border-destructive/30 justify-start px-4" onClick={handleSignOut}>
                                                Sign Out
                                            </Button>
                                        ) : (
                                            <Link href="/auth">
                                                <Button variant="outline" className="w-full h-11 rounded-xl border-primary/20 justify-start px-4 font-serif">
                                                    Sign In
                                                </Button>
                                            </Link>
                                        )}
                                        <Link href="/settings">
                                            <Button className="w-full h-11 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 justify-between px-4 font-serif group">
                                                More Settings
                                                <span className="bg-white/20 p-1 rounded-md group-hover:bg-white/30 transition-colors">
                                                    <Menu className="h-4 w-4" />
                                                </span>
                                            </Button>
                                        </Link>
                                    </div>
                                    <div className="flex justify-center bg-muted/30 p-4 rounded-2xl">
                                        <GlobalSettings />
                                    </div>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>

            {/* Reading Progress Bar (visible on Quran/Hadith pages) */}
            {(pathname.includes("/quran") || pathname.includes("/hadith")) && (
                <div className="h-1 w-full bg-primary/5 absolute bottom-0">
                    <div
                        className="h-full bg-primary transition-all duration-150 ease-out"
                        style={{ width: `${scrollProgress}%` }}
                    />
                </div>
            )}
        </header>
    );
}
