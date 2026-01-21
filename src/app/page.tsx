import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Clock, Compass, Moon } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/20 -z-10" />
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-primary mb-6 leading-tight">
              Your Digital Companion for <br />
              <span className="text-foreground">Spiritual Growth</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Experience the Holy Quran, accurate Prayer Times, and spiritual tools in a serene,
              privacy-focused environment designed for the modern believer.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto">
                <Link href="/quran">Read Quran</Link>
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                <Link href="/prayer-times">Check Prayer Times</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-serif font-bold text-primary mb-4">Everything You Need</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                A complete suite of Islamic tools crafted with care and precision.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Quran Feature */}
              <Card className="bg-card border-none shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="font-serif">Holy Quran</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Read with clear Uthmani script, translations, and listen to beautiful recitations.
                  </CardDescription>
                </CardContent>
              </Card>

              {/* Prayer Times Feature */}
              <Card className="bg-card border-none shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="font-serif">Prayer Times</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Accurate timings based on your location with customizable calculation methods.
                  </CardDescription>
                </CardContent>
              </Card>

              {/* Qibla Feature */}
              <Card className="bg-card border-none shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Compass className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="font-serif">Qibla Compass</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Find the Qibla direction instantly from anywhere in the world.
                  </CardDescription>
                </CardContent>
              </Card>

              {/* Spiritual Tools Feature */}
              <Card className="bg-card border-none shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Moon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="font-serif">Spiritual Tools</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Digital Tasbih, Zakat Calculator, and daily Duas to enrich your spiritual life.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Daily Verse/Dua Section (Placeholder) */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto bg-primary/5 rounded-2xl p-8 md:p-12">
              <h3 className="text-2xl font-serif font-bold text-primary mb-6">Verse of the Day</h3>
              <blockquote className="text-xl md:text-2xl font-serif italic text-foreground/80 mb-6">
                "Indeed, with hardship [will be] ease."
              </blockquote>
              <cite className="text-sm text-muted-foreground not-italic">- Surah Ash-Sharh [94:6]</cite>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
