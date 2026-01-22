"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Clock, Compass, Moon, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getVerseOfTheDay } from "@/lib/api/quran";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export default function Home() {
  const { data: verse, isLoading } = useQuery({
    queryKey: ["verseOfTheDay"],
    queryFn: getVerseOfTheDay,
    staleTime: 1000 * 60 * 60 * 24, // Cache for 24 hours
  });

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      <Header />

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
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto shadow-lg shadow-primary/20" asChild>
                <Link href="/quran">Read Quran</Link>
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto backdrop-blur-sm" asChild>
                <Link href="/prayer-times">Check Prayer Times</Link>
              </Button>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden md:block opacity-50">
            <ChevronDown className="h-6 w-6 text-primary" />
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
              <Link href="/quran">
                <Card className="group bg-card border-none shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer h-full relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                      <BookOpen className="h-6 w-6" />
                    </div>
                    <CardTitle className="font-serif">Holy Quran</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4">
                      Read with clear Uthmani script, translations, and listen to beautiful recitations.
                    </CardDescription>
                    <div className="text-xs font-bold text-primary uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                      Open Reader
                    </div>
                  </CardContent>
                </Card>
              </Link>

              {/* Prayer Times Feature */}
              <Link href="/prayer-times">
                <Card className="group bg-card border-none shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer h-full relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                      <Clock className="h-6 w-6" />
                    </div>
                    <CardTitle className="font-serif">Prayer Times</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4">
                      Accurate timings based on your location with customizable calculation methods.
                    </CardDescription>
                    <div className="text-xs font-bold text-primary uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                      Check Times
                    </div>
                  </CardContent>
                </Card>
              </Link>

              {/* Qibla Feature */}
              <Link href="/qibla">
                <Card className="group bg-card border-none shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer h-full relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                      <Compass className="h-6 w-6" />
                    </div>
                    <CardTitle className="font-serif">Qibla Compass</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4">
                      Find the Qibla direction instantly from anywhere in the world.
                    </CardDescription>
                    <div className="text-xs font-bold text-primary uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                      Open Compass
                    </div>
                  </CardContent>
                </Card>
              </Link>

              {/* Spiritual Tools Feature */}
              <Link href="/tasbih">
                <Card className="group bg-card border-none shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer h-full relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                      <Moon className="h-6 w-6" />
                    </div>
                    <CardTitle className="font-serif">Spiritual Tools</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4">
                      Digital Tasbih, Zakat Calculator, and daily Duas to enrich your spiritual life.
                    </CardDescription>
                    <div className="text-xs font-bold text-primary uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                      Explore Tools
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>

        {/* Daily Verse Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto bg-primary/5 rounded-2xl p-8 md:p-12 relative overflow-hidden">
              {/* Decorative background element */}
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <BookOpen className="w-32 h-32" />
              </div>

              <h3 className="text-2xl font-serif font-bold text-primary mb-6 relative z-10">Verse of the Day</h3>

              {isLoading ? (
                <div className="space-y-4">
                  <Skeleton className="h-8 w-3/4 mx-auto" />
                  <Skeleton className="h-6 w-1/2 mx-auto" />
                  <Skeleton className="h-4 w-1/4 mx-auto" />
                </div>
              ) : verse ? (
                <div className="relative z-10">
                  <blockquote className="text-xl md:text-3xl font-arabic leading-loose text-primary mb-6" dir="rtl">
                    {verse.text_uthmani}
                  </blockquote>
                  <p className="text-lg text-foreground/80 italic mb-6 font-serif">
                    "{verse.english_translation}"
                  </p>
                  <cite className="text-sm text-muted-foreground not-italic font-medium">
                    - Surah {verse.surah_name} [{verse.verse_key}]
                  </cite>

                  <div className="mt-8">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/quran/${verse.verse_key.split(':')[0]}`}>Read Full Surah</Link>
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-muted-foreground">
                  Unable to load verse of the day.
                </div>
              )}
            </div>
          </div>
        </section>

        {/* SEO Rich Content Section */}
        <section className="py-20 bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
                <div>
                  <h2 className="text-3xl font-serif font-bold text-primary mb-6">Designed for Your Spiritual Growth</h2>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    Faith Journey is more than just an <strong>Islamic app</strong>. It is a comprehensive ecosystem designed to help you integrate your faith into your modern lifestyle. Whether you are looking to <strong>read the Holy Quran online</strong>, find <strong>accurate prayer times</strong> for your city, or explore the <strong>authentic collections of Hadith</strong>, we provide a serene and distraction-free experience.
                  </p>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    Our platform is built with a focus on privacy and aesthetic excellence. We believe that spiritual tools should be beautiful, intuitive, and accessible from any device.
                  </p>
                </div>
                <div className="bg-primary/10 aspect-square rounded-3xl flex items-center justify-center p-12">
                  <div className="text-center">
                    <Moon className="w-20 h-20 text-primary mx-auto mb-4 animate-pulse" />
                    <div className="text-2xl font-serif font-bold text-primary">Faith Journey</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-widest mt-2">v2.1 Est. 2024</div>
                  </div>
                </div>
              </div>

              {/* FAQ Section for SEO */}
              <div className="space-y-8">
                <h3 className="text-2xl font-serif font-bold text-center text-primary mb-10">Common Questions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <h4 className="font-bold text-foreground">What makes Faith Journey unique?</h4>
                    <p className="text-sm text-muted-foreground">Unlike many other apps, we prioritize a premium, ad-free experience with a focus on high-quality typography and serene design to minimize distractions during worship.</p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-bold text-foreground">Is the Quran text authentic?</h4>
                    <p className="text-sm text-muted-foreground">Yes, we uses the standardized Uthmani script and verified translations from reputable sources to ensure accuracy for all our users.</p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-bold text-foreground">How are prayer times calculated?</h4>
                    <p className="text-sm text-muted-foreground">We use high-precision astronomical calculations based on your geographic location, supporting various conventions like MWL, ISNA, and others.</p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-bold text-foreground">Is this platform really free?</h4>
                    <p className="text-sm text-muted-foreground">Faith Journey is a labor of love. Core features are free to use, as our primary goal is to provide value to the global Muslim community.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
