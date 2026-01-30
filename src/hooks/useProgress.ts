import { supabase } from '@/lib/supabase';
import { useCallback } from 'react';

export const useProgress = () => {
    // const supabase = createClientComponentClient();

    const updateProgress = useCallback(async (surahId: number, ayahId: number) => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const now = new Date().toISOString();
        const today = new Date().toISOString().split('T')[0]; // UTC YYYY-MM-DD

        // 1. Update Progress
        const { error: progressError } = await supabase
            .from('user_progress')
            .upsert({
                user_id: user.id,
                last_surah_id: surahId,
                last_ayah_id: ayahId,
                updated_at: now
            });

        if (progressError) {
            console.error('Progress Error:', progressError);
        }

        // 2. Update Streak
        // Fetch current streak first
        const { data: streakData } = await supabase
            .from('user_streaks')
            .select('*')
            .eq('user_id', user.id)
            .single();

        let newStreak = 1;
        const lastActivity = streakData?.last_activity_date;
        const currentStreak = streakData?.current_streak || 0;

        if (lastActivity) {
            if (lastActivity === today) {
                // Already active today, streak count remains same
                newStreak = currentStreak;
            } else {
                // Check if last activity was yesterday
                const yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);
                const yesterdayStr = yesterday.toISOString().split('T')[0]; // UTC

                if (lastActivity === yesterdayStr) {
                    newStreak = currentStreak + 1;
                } else {
                    // Streak broken
                    newStreak = 1;
                }
            }
        }

        // Update if needed
        if (lastActivity !== today) {
            const { error: streakError } = await supabase
                .from('user_streaks')
                .upsert({
                    user_id: user.id,
                    current_streak: newStreak,
                    last_activity_date: today,
                    updated_at: now
                });
            if (streakError) console.error('Streak Update Error:', streakError);
        }

    }, [supabase]);

    return { updateProgress };
};
