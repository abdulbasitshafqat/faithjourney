"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BookOpen, Clock, Compass, Moon, ChevronDown, Calendar,
  BookCheck, Sparkles, Heart, Star, Quote, ShieldCheck,
  ArrowRight, Lightbulb, Zap
} from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getVerseOfTheDay } from "@/lib/api/quran";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { getDuaOfTheDay } from "@/lib/api/daily-dua";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { data: verse, isLoading } = useQuery({
    queryKey: ["verseOfTheDay"],
    queryFn: getVerseOfTheDay,
    staleTime: 1000 * 60 * 60 * 24,
  });

  const categories = [
    { name: "Quran", href: "/quran", icon: BookOpen, color: "from-emerald-500 to-teal-700", desc: "Read, listen and explore the Holy Word." },
    { name: "Prayer", href: "/prayer-times", icon: Clock, color: "from-blue-500 to-indigo-700", desc: "Precise timings for your location." },
    { name: "Hadith", href: "/hadith", icon: Star, color: "from-amber-500 to-orange-700", desc: "Authentic Prophetic traditions." },
    { name: "Compass", href: "/qibla", icon: Compass, color: "from-rose-500 to-pink-700", desc: "Instantly find the Kaaba direction." },
    { name: "Calendar", href: "/calendar", icon: Calendar, color: "from-purple-500 to-violet-700", desc: "Hijri & Gregorian synchronization." },
    { name: "Guides", href: "/guides", icon: BookCheck, color: "from-cyan-500 to-blue-700", desc: "Learn Salah, Wudu and more." },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#fafaf9] dark:bg-[#0c0c0b] font-sans selection:bg-primary/20">
      <Header />

      <main className="flex-grow">
        {/* HERO SECTION WITH DYNAMIC BLUR */}
        <section className="relative pt-32 pb-24 md:pt-48 md:pb-40 overflow-hidden">
          {/* Background Abstract Elements */}
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 opacity-60" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px] translate-y-1/2 opacity-40" />

          <div className="container mx-auto px-4 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <Sparkles className="h-3 w-3" />
              Premium Spiritual Experience
            </div>

            <h1 className="text-5xl md:text-8xl font-serif font-black text-primary mb-8 leading-[1.1] tracking-tighter animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
              Path to <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-foreground to-primary bg-[length:200%_auto] animate-gradient">Peace & Faith.</span>
            </h1>

            <p className="text-lg md:text-2xl text-muted-foreground/80 max-w-3xl mx-auto mb-12 leading-relaxed font-medium animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
              The most serene digital companion for the modern believer. <br className="hidden md:block" />
              Quran, Prayer Times, and Hadith in a world-class interface.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-500">
              <Button size="lg" className="h-16 px-10 rounded-2xl bg-primary text-white text-lg font-bold shadow-[0_20px_40px_rgba(var(--primary),0.3)] hover:scale-105 active:scale-95 transition-all group" asChild>
                <Link href="/quran" className="flex items-center gap-3">
                  Begin Reading <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="ghost" className="h-16 px-10 rounded-2xl border-2 border-primary/10 hover:bg-primary/5 text-lg font-bold group" asChild>
                <Link href="/prayer-times">Prayer Times</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* DYNAMIC CATEGORY GRID */}
        <section className="py-24 relative">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6 text-center md:text-left">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-serif font-black text-primary tracking-tight">Core Essentials</h2>
                <p className="text-muted-foreground text-lg max-w-xl font-medium">Every tool you need to stay connected to your faith, meticulously designed for clarity.</p>
              </div>
              <div className="h-px flex-1 bg-primary/10 mx-10 hidden md:block" />
              <Link href="/settings" className="flex items-center gap-2 text-primary font-black uppercase text-[10px] tracking-widest hover:gap-4 transition-all">
                Explore All Features <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((cat, i) => (
                <Link key={i} href={cat.href} className="group">
                  <Card className="h-full border-none rounded-[2.5rem] bg-white/50 dark:bg-white/[0.02] backdrop-blur-md shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden relative group">
                    <div className={cn("absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-700", cat.color)} />

                    <CardHeader className="p-8">
                      <div className={cn(
                        "w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-2xl transition-all duration-700 group-hover:scale-110 group-hover:rotate-6 bg-gradient-to-br text-white",
                        cat.color
                      )}>
                        <cat.icon className="h-8 w-8" />
                      </div>
                      <CardTitle className="text-3xl font-serif font-black text-primary leading-none mb-3">{cat.name}</CardTitle>
                      <CardDescription className="text-base font-medium text-muted-foreground leading-relaxed">
                        {cat.desc}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="px-8 pb-8 pt-0">
                      <div className="flex items-center gap-2 text-[10px] font-black uppercase text-primary tracking-[0.2em] transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                        Access Module <Zap className="h-3 w-3 fill-current" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* IMMERSIVE QUOTE SECTION */}
        <section className="py-24 bg-primary text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] -mr-48 -mt-48" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/20 rounded-full blur-[80px] -ml-32 -mb-32" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-12">
              <Quote className="h-16 w-16 mx-auto opacity-20" />
              <h2 className="text-4xl md:text-6xl font-serif font-black italic leading-tight tracking-tighter">
                "Verily, in the remembrance of Allah do hearts find rest."
              </h2>
              <div className="flex items-center justify-center gap-4 text-white/60 font-black uppercase tracking-[0.3em] text-[10px]">
                <div className="h-px w-10 bg-white/20" />
                Surah Ar-Ra'd [13:28]
                <div className="h-px w-10 bg-white/20" />
              </div>
            </div>
          </div>
        </section>

        {/* VERSE OF THE DAY WITH RELATIVE BOX */}
        <section className="py-32 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-8 animate-in fade-in slide-in-from-left-10 duration-1000">
                <div className="inline-flex items-center gap-2 text-secondary font-black uppercase text-[11px] tracking-[0.3em] bg-secondary/5 px-5 py-2 rounded-full border border-secondary/10">
                  <Star className="h-4 w-4 fill-current" />
                  The Daily Reflection
                </div>
                <h2 className="text-5xl md:text-7xl font-serif font-black text-primary leading-none tracking-tighter">
                  A Verse for <br /> Your Soul.
                </h2>
                <p className="text-xl text-muted-foreground font-medium leading-relaxed">
                  Every day we pick a gem from the Holy Quran to illuminate your heart and mind. Reflection is the key to deep faith.
                </p>
                <div className="flex items-center gap-10 pt-4">
                  <div className="space-y-1">
                    <p className="text-3xl font-black text-primary">114</p>
                    <p className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">Surahs</p>
                  </div>
                  <div className="w-px h-10 bg-primary/10" />
                  <div className="space-y-1">
                    <p className="text-3xl font-black text-primary">6,236</p>
                    <p className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">Verses</p>
                  </div>
                  <div className="w-px h-10 bg-primary/10" />
                  <div className="space-y-1">
                    <p className="text-3xl font-black text-primary">Art</p>
                    <p className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">UI Design</p>
                  </div>
                </div>
              </div>

              <div className="relative group animate-in fade-in slide-in-from-right-10 duration-1000">
                <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full group-hover:bg-primary/30 transition-all duration-1000" />
                <Card className="relative z-10 border-none bg-white/70 dark:bg-white/[0.03] backdrop-blur-2xl rounded-[3rem] p-10 md:p-16 shadow-2xl transition-transform duration-700 hover:-translate-y-4">
                  <div className="absolute top-10 right-10 text-primary/10">
                    <BookOpen className="h-24 w-24" />
                  </div>

                  {isLoading ? (
                    <div className="space-y-8">
                      <Skeleton className="h-16 w-3/4 ml-auto rounded-2xl" />
                      <Skeleton className="h-24 w-full rounded-2xl" />
                      <Skeleton className="h-6 w-1/4 rounded-full" />
                    </div>
                  ) : verse ? (
                    <div className="space-y-10 text-center lg:text-right">
                      <p className="font-arabic text-5xl md:text-6xl text-primary leading-[1.8] tracking-widest" dir="rtl">
                        {verse.text_uthmani}
                      </p>
                      <div className="text-center lg:text-left space-y-6 pt-10 border-t border-primary/5">
                        <p className="text-xl md:text-2xl font-serif font-black italic text-foreground tracking-tight leading-relaxed">
                          "{verse.english_translation}"
                        </p>
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                          <div className="flex items-center gap-3 px-4 py-2 bg-primary/5 rounded-2xl border border-primary/10">
                            <BookCheck className="h-4 w-4 text-primary" />
                            <span className="text-sm font-black text-primary/80">
                              Surah {verse.surah_name} : {verse.verse_key}
                            </span>
                          </div>
                          <Button variant="ghost" className="rounded-2xl h-12 px-6 font-bold hover:bg-primary/5" asChild>
                            <Link href={`/quran/${verse.verse_key.split(':')[0]}`}>Read Full Surah</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-center text-muted-foreground">The wisdom awaits. Try refreshing.</p>
                  )}
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* DUA OF THE DAY SECTION */}
        <section className="py-24 bg-primary/5 relative">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-16">
              <div className="flex-1 order-2 md:order-1 relative">
                <Card className="bg-white/80 dark:bg-white/5 backdrop-blur-3xl rounded-[3rem] border-none p-10 md:p-16 shadow-2xl overflow-hidden relative group transition-transform duration-700 hover:scale-[1.01]">
                  <div className="absolute top-0 left-0 w-2 h-full bg-secondary" />
                  <div className="mb-8 flex items-center gap-4">
                    <div className="p-3 bg-secondary/10 rounded-2xl">
                      <Heart className="h-6 w-6 text-secondary fill-current" />
                    </div>
                    <h3 className="text-xl font-serif font-black text-primary italic">Dua of the Day</h3>
                  </div>

                  {(() => {
                    const dua = getDuaOfTheDay();
                    return (
                      <div className="space-y-8">
                        <p className="font-arabic text-4xl text-right text-primary leading-loose" dir="rtl">
                          {dua.arabic_text}
                        </p>
                        <div className="space-y-4">
                          <p className="text-xl font-serif font-black text-foreground italic leading-relaxed">
                            "{dua.translations.en}"
                          </p>
                          <div className="h-px w-20 bg-primary/10" />
                          <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                            <Sparkles className="h-4 w-4 text-secondary" />
                            Daily Spiritual Nourishment
                          </p>
                        </div>
                      </div>
                    );
                  })()}
                </Card>
              </div>
              <div className="flex-1 order-1 md:order-2 space-y-8 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-secondary/10 border border-secondary/20 text-secondary text-[10px] font-black uppercase tracking-[0.2em]">
                  Daily Supplication
                </div>
                <h2 className="text-5xl md:text-7xl font-serif font-black text-primary tracking-tighter leading-none">
                  Prayer for <br /> Every Moment.
                </h2>
                <p className="text-lg text-muted-foreground font-medium leading-relaxed">
                  A daily selected supplication to help you stay connected, grateful, and mindful throughout your day.
                </p>
                <Button className="h-14 rounded-2xl px-8 bg-secondary text-white font-bold shadow-xl shadow-secondary/20 hover:scale-105 transition-all" asChild>
                  <Link href="/duas">Explore All Duas</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* BRAND PHILOSOPHY SECTION */}
        <section className="py-24 bg-muted/20 relative">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="space-y-4 text-center">
                <div className="h-16 w-16 bg-white dark:bg-white/5 rounded-2xl shadow-xl mx-auto flex items-center justify-center text-primary border border-primary/5">
                  <ShieldCheck className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-serif font-black text-primary">Privacy First</h3>
                <p className="text-sm text-muted-foreground font-medium">No tracking, no ads. Just you and your spiritual journey in absolute silence.</p>
              </div>
              <div className="space-y-4 text-center">
                <div className="h-16 w-16 bg-white dark:bg-white/5 rounded-2xl shadow-xl mx-auto flex items-center justify-center text-secondary border border-secondary/5">
                  <Heart className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-serif font-black text-primary">Made with Love</h3>
                <p className="text-sm text-muted-foreground font-medium">Crafted with obsessive attention to detail to honor the beauty of Islamic heritage.</p>
              </div>
              <div className="space-y-4 text-center">
                <div className="h-16 w-16 bg-white dark:bg-white/5 rounded-2xl shadow-xl mx-auto flex items-center justify-center text-blue-500 border border-blue-500/5">
                  <Lightbulb className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-serif font-black text-primary">Daily Wisdom</h3>
                <p className="text-sm text-muted-foreground font-medium">Constantly updated with fresh authentic content to keep your heart alive with faith.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ / SEO SECTION WITH PREMIUM DESIGN */}
        <section className="py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-serif font-black text-center text-primary mb-20 tracking-tighter">Your Questions, <br /> Answered.</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                {[
                  { q: "Is Faith Journey really free?", a: "Faith Journey is a labor of love produced for the sake of the Ummah. Core features will always be free and ad-free." },
                  { q: "How accurate are the prayer times?", a: "We use high-precision GPS coordinates and the latest astronomical algorithms from Aladhan for peak accuracy." },
                  { q: "Are the Hadiths verified?", a: "We only source from primary authentic collections (Sahih Bukhari, Muslim, etc.) to ensure your knowledge is based on Truth." },
                  { q: "Can I use it offline?", a: "The mobile app (PWA) caches your recent readings and prayer times, allowing access even during limited connectivity." },
                ].map((faq, i) => (
                  <div key={i} className="group space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-black text-primary border border-primary/20">
                        0{i + 1}
                      </div>
                      <h4 className="text-xl font-serif font-black text-primary group-hover:text-secondary transition-colors">{faq.q}</h4>
                    </div>
                    <p className="text-muted-foreground font-medium pl-11 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
