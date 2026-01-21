import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Compass } from "@/components/qibla/Compass";

export default function QiblaPage() {
    return (
        <div className="min-h-screen flex flex-col bg-background font-sans">
            <Header />

            <main className="flex-grow container mx-auto px-4 py-24">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">
                        Qibla Compass
                    </h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Find the direction of the Kaaba from anywhere in the world.
                        Please calibrate your device's compass for best results.
                    </p>
                </div>

                <Compass />
            </main>

            <Footer />
        </div>
    );
}
