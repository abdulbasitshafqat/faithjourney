import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PrayerCard } from "@/components/prayer-times/PrayerCard";

export default function PrayerTimesPage() {
    return (
        <div className="min-h-screen flex flex-col bg-background font-sans">
            <Header />

            <main className="flex-grow container mx-auto px-4 py-24">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">
                        Prayer Times
                    </h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Accurate prayer timings calculated based on your precise location.
                        May your prayers be accepted.
                    </p>
                </div>

                <PrayerCard />
            </main>

            <Footer />
        </div>
    );
}
