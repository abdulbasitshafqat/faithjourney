'use client';

import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Progress {
    last_surah_id: number;
    last_ayah_id: number;
    updated_at: string;
}

export function ResumeJourney() {
    // const supabase = createClientComponentClient();
    const [progress, setProgress] = useState<Progress | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProgress() {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                setLoading(false);
                return;
            }

            const { data } = await supabase
                .from('user_progress')
                .select('*')
                .eq('user_id', user.id)
                .single();

            setProgress(data);
            setLoading(false);
        }
        fetchProgress();
    }, [supabase]);

    if (!loading && !progress) return null;

    if (loading) return (
        <Card className="border-none shadow-sm bg-primary/5 animate-pulse h-32">
            <CardContent className="h-full" />
        </Card>
    );

    // Assuming we have a map or helper to get Surah Name from ID. 
    // For now, displaying ID or fetching if we have a util.
    // I'll assume just ID for simplicity or "Surah #X".
    // Or I can import the surah list if available.
    // I'll use IDs for now or simple text.

    return (
        <Card className="border-none shadow-xl bg-gradient-to-r from-emerald-900 to-emerald-800 text-white overflow-hidden relative group">
            <div className="absolute top-0 right-0 p-10 bg-white/5 rounded-full blur-3xl -mr-10 -mt-10" />
            <CardContent className="p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
                <div className="space-y-4 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-emerald-300 text-[10px] font-bold uppercase tracking-widest backdrop-blur-md">
                        <BookOpen className="h-3 w-3" />
                        Continue Reading
                    </div>
                    <h3 className="text-2xl md:text-3xl font-serif font-black leading-tight text-white">
                        Resume from Surah {progress?.last_surah_id}
                    </h3>
                    <p className="text-emerald-100/70 font-medium">
                        Ayah {progress?.last_ayah_id} • Last read recently
                    </p>
                </div>

                <Button className="h-12 px-8 rounded-xl bg-white text-emerald-900 font-bold hover:bg-emerald-50 shadow-lg transition-all group-hover:scale-105" asChild>
                    <Link href={`/quran/${progress?.last_surah_id}#ayah-${progress?.last_ayah_id}`}>
                        Resume Journey <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </CardContent>
        </Card>
    );
}
