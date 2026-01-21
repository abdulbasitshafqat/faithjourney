
"use client";

import Link from "next/link";
import { Menu, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { GlobalSettings } from "@/components/ui/global-settings";
// Force HMR update

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
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
                <Link href="/" className="flex items-center space-x-2">
                    <span className="text-2xl font-serif font-bold text-primary">
                        FaithJourney
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-8">
                    <Link
                        href="/quran"
                        className="text-foreground/80 hover:text-primary transition-colors font-medium"
                    >
                        Quran
                    </Link>
                    <Link
                        href="/hadith"
                        className="text-foreground/80 hover:text-primary transition-colors font-medium"
                    >
                        Hadith
                    </Link>
                    <Link
                        href="/prayer-times"
                        className="text-foreground/80 hover:text-primary transition-colors font-medium"
                    >
                        Prayer Times
                    </Link>
                    <Link
                        href="/tasbih"
                        className="text-foreground/80 hover:text-primary transition-colors font-medium"
                    >
                        Tasbih
                    </Link>
                    <Link
                        href="/knowledge"
                        className="text-foreground/80 hover:text-primary transition-colors font-medium"
                    >
                        Knowledge
                    </Link>
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
                            <div className="flex flex-col space-y-6 mt-8">
                                <Link href="/quran" className="text-lg font-medium">
                                    Quran
                                </Link>
                                <Link href="/hadith" className="text-lg font-medium">
                                    Hadith
                                </Link>
                                <Link href="/prayer-times" className="text-lg font-medium">
                                    Prayer Times
                                </Link>
                                <Link href="/tasbih" className="text-lg font-medium">
                                    Tasbih
                                </Link>
                                <Link href="/knowledge" className="text-lg font-medium">
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
        </header>
    );
}
