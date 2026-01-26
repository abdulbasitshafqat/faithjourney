"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SadaqahComponent } from "@/components/support/SadaqahComponent";

export default function SupportPage() {
    return (
        <div className="min-h-screen flex flex-col bg-background font-sans">
            <Header />

            <main className="flex-grow flex items-center justify-center p-4 py-24">
                <SadaqahComponent />
            </main>

            <Footer />
        </div>
    );
}
