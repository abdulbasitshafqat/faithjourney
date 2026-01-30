'use client';

import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Flame } from 'lucide-react';

export function SpiritualStreak() {
    // const supabase = createClientComponentClient();
    const [streak, setStreak] = useState(0);

    useEffect(() => {
        async function fetchStreak() {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return; // Don't show if not logged in
            const { data } = await supabase.from('user_streaks').select('current_streak').eq('user_id', user.id).single();
            if (data) setStreak(data.current_streak);
        }
        fetchStreak();
    }, [supabase]);

    if (!streak) return null;

    return (
        <Card className="relative overflow-hidden border-orange-500/20 bg-gradient-to-br from-orange-500/10 to-transparent mb-8">
            <CardContent className="p-6 flex items-center justify-between relative z-10">
                <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-orange-600 mb-1">Daily Streak</p>
                    <p className="text-4xl font-black text-orange-700">{streak} <span className="text-lg font-medium text-orange-600/70">Days</span></p>
                </div>
                <div className="h-14 w-14 rounded-full bg-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/30 animate-pulse">
                    <Flame className="h-8 w-8 text-white fill-white" />
                </div>
            </CardContent>
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl -mr-10 -mt-10" />
        </Card>
    );
}
