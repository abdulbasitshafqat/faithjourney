"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    // Show button when page is scrolled down
    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Set the top cordinate to 0
    // make scrolling smooth
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);
        return () => {
            window.removeEventListener("scroll", toggleVisibility);
        };
    }, []);

    return (
        <div className="fixed bottom-8 right-8 z-50">
            <Button
                variant="default" // Using default primary styling
                size="icon"
                onClick={scrollToTop}
                className={cn(
                    "rounded-full shadow-lg transition-all duration-300 ease-in-out hover:scale-110",
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none",
                    "bg-primary text-primary-foreground hover:bg-primary/90"
                )}
                aria-label="Scroll to top"
            >
                <ArrowUp className="h-5 w-5" />
            </Button>
        </div>
    );
}
