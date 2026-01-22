
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
                            <Button variant="ghost" size="icon">
                                <Menu className="h-6 w-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right">
                            <SheetHeader className="text-left border-b pb-4">
                                <SheetTitle className="font-serif text-2xl text-primary">Faith Journey</SheetTitle>
                            </SheetHeader>
                            <div className="flex flex-col space-y-6 mt-8">
                                <Link href="/quran" className={cn(
                                    "text-lg font-medium transition-colors",
                                    pathname === "/quran" ? "text-primary" : "text-foreground/70"
                                )}>
                                    Quran
                                </Link>
                                <Link href="/hadith" className={cn(
                                    "text-lg font-medium transition-colors",
                                    pathname === "/hadith" ? "text-primary" : "text-foreground/70"
                                )}>
                                    Hadith
                                </Link>
                                <Link href="/prayer-times" className={cn(
                                    "text-lg font-medium transition-colors",
                                    pathname === "/prayer-times" ? "text-primary" : "text-foreground/70"
                                )}>
                                    Prayer Times
                                </Link>
                                <Link href="/duas" className={cn(
                                    "text-lg font-medium transition-colors",
                                    pathname.startsWith("/duas") ? "text-primary" : "text-foreground/70"
                                )}>
                                    Duas & Azkar
                                </Link>
                                <Link href="/tasbih" className={cn(
                                    "text-lg font-medium transition-colors",
                                    pathname.startsWith("/tasbih") ? "text-primary" : "text-foreground/70"
                                )}>
                                    Tasbih
                                </Link>
                                <Link href="/knowledge" className={cn(
                                    "text-lg font-medium transition-colors",
                                    pathname.startsWith("/knowledge") ? "text-primary" : "text-foreground/70"
                                )}>
                                    Knowledge
                                </Link>
                                {user && (
                                    <Link href="/bookmarks" className="text-lg font-medium text-primary flex items-center">
                                        <Bookmark className="mr-2 h-5 w-5" /> My Bookmarks
                                    </Link>
                                )}
                                <div className="pt-4 border-t flex flex-col gap-2">
                                    {user ? (
                                        <Button variant="outline" className="w-full" onClick={handleSignOut}>
                                            Sign Out
                                        </Button>
                                    ) : (
                                        <Link href="/auth">
                                            <Button variant="outline" className="w-full">
                                                Sign In
                                            </Button>
                                        </Link>
                                    )}
                                    <Link href="/settings">
                                        <Button className="w-full bg-primary text-primary-foreground">
                                            More Settings
                                        </Button>
                                    </Link>
                                    <div className="pt-4 flex justify-center">
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
