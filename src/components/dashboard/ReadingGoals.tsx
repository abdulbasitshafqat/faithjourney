'use client';
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Target, CheckCircle, Pencil } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';

export function ReadingGoals() {
    // Persist goal in localStorage for now
    const [goal, setGoal] = useState('');
    const [isSet, setIsSet] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);

    useEffect(() => {
        const storedGoal = localStorage.getItem('daily_goal_text');
        const storedDate = localStorage.getItem('daily_goal_date');
        const storedCompleted = localStorage.getItem('daily_goal_completed');
        const today = new Date().toISOString().split('T')[0];

        if (storedGoal) {
            setGoal(storedGoal);
            setIsSet(true);
        }

        if (storedDate === today && storedCompleted === 'true') {
            setIsCompleted(true);
        } else if (storedDate !== today) {
            // Reset completion for new day
            localStorage.setItem('daily_goal_completed', 'false');
            setIsCompleted(false);
        }
    }, []);

    const handleSet = () => {
        if (!goal.trim()) return;
        localStorage.setItem('daily_goal_text', goal);
        setIsSet(true);
    };

    const handleComplete = () => {
        setIsCompleted(true);
        localStorage.setItem('daily_goal_completed', 'true');
        localStorage.setItem('daily_goal_date', new Date().toISOString().split('T')[0]);
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#10b981', '#34d399', '#059669']
        });
    };

    return (
        <Card className="border-primary/10 bg-card/50 backdrop-blur-sm h-full">
            <CardContent className="p-6 space-y-4 flex flex-col justify-center h-full">
                <div className="flex items-center gap-2 text-primary font-bold">
                    <Target className="h-5 w-5" />
                    <h3>Daily Goal</h3>
                </div>

                {isSet ? (
                    <div className="text-center py-2 space-y-4">
                        <p className={cn("text-lg font-medium transition-all", isCompleted && "line-through text-muted-foreground opacity-50")}>
                            "{goal}"
                        </p>

                        {!isCompleted ? (
                            <Button onClick={handleComplete} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white gap-2">
                                <CheckCircle className="h-4 w-4" /> Mark Complete
                            </Button>
                        ) : (
                            <div className="text-sm font-bold text-emerald-600 bg-emerald-500/10 py-2 rounded-lg animate-in fade-in zoom-in">
                                Goal Achieved! MashaAllah
                            </div>
                        )}

                        <Button variant="ghost" size="sm" onClick={() => setIsSet(false)} className="text-xs text-muted-foreground w-full">
                            <Pencil className="w-3 h-3 mr-1" /> Change Goal
                        </Button>
                    </div>
                ) : (
                    <div className="flex flex-col gap-3">
                        <Input
                            placeholder="e.g. Read Surah Mulk"
                            value={goal}
                            onChange={(e) => setGoal(e.target.value)}
                            className="bg-background/50"
                        />
                        <Button onClick={handleSet} variant="outline" className="w-full border-primary/20 hover:bg-primary/5">Set Goal</Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
