"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface FontSizeContextType {
    fontSize: number;
    setFontSize: (size: number) => void;
}

const FontSizeContext = createContext<FontSizeContextType | undefined>(undefined);

export function FontSizeProvider({ children }: { children: React.ReactNode }) {
    const [fontSize, setFontSizeState] = useState(28); // Default size

    useEffect(() => {
        const savedSize = localStorage.getItem("quran-font-size");
        if (savedSize) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setFontSizeState(Number(savedSize));
        }
    }, []);

    const setFontSize = (size: number) => {
        setFontSizeState(size);
        localStorage.setItem("quran-font-size", size.toString());
    };

    return (
        <FontSizeContext.Provider value={{ fontSize, setFontSize }}>
            {children}
        </FontSizeContext.Provider>
    );
}

export function useFontSize() {
    const context = useContext(FontSizeContext);
    if (context === undefined) {
        throw new Error("useFontSize must be used within a FontSizeProvider");
    }
    return context;
}
