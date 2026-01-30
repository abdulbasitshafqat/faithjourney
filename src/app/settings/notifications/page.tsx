"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, Volume2, PlayCircle, Settings, CheckCircle } from "lucide-react";
import { useState } from "react";
import { scheduleAdhan, createAdhanChannel } from "@/lib/adhan-scheduler";
import { toast } from "@/hooks/use-toast";

export default function NotificationSettingsPage() {
    const [isScheduling, setIsScheduling] = useState(false);
    const [channelCreated, setChannelCreated] = useState(false);

    const handleSetup = async () => {
        try {
            await createAdhanChannel();
            setChannelCreated(true);
            toast({
                title: "Android Channel Created",
                description: "High priority Adhan channel registered.",
            });
        } catch (e: any) {
            toast({
                title: "Error",
                description: e.message || "Failed to create channel",
                variant: 'destructive',
            });
        }
    };

    const handleTest = async () => {
        setIsScheduling(true);
        try {
            await scheduleAdhan();
            toast({
                title: "Adhan Scheduled",
                description: "Test notification in 10 seconds. Minimize the app!",
            });
        } catch (e: any) {
            toast({
                title: "Scheduling Failed",
                description: e.message,
                variant: 'destructive',
            });
        } finally {
            setIsScheduling(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-background font-sans">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-24">
                <div className="max-w-2xl mx-auto space-y-8">
                    <div className="text-center space-y-4">
                        <div className="w-16 h-16 bg-primary/10 rounded-2xl mx-auto flex items-center justify-center">
                            <Bell className="h-8 w-8 text-primary" />
                        </div>
                        <h1 className="text-4xl font-serif font-black text-primary">Adhan Alerts</h1>
                        <p className="text-muted-foreground text-lg">
                            Configure how you want to be notified for prayer times.
                        </p>
                    </div>

                    <Card className="border-primary/10 shadow-lg">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 font-serif text-xl">
                                <Settings className="h-5 w-5 text-primary" />
                                Configuration
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl border border-border/50">
                                <div>
                                    <h3 className="font-bold text-foreground">1. Setup Channel (Android)</h3>
                                    <p className="text-sm text-muted-foreground">Required for custom sounds to play.</p>
                                </div>
                                <Button
                                    onClick={handleSetup}
                                    disabled={channelCreated}
                                    variant={channelCreated ? "secondary" : "default"}
                                >
                                    {channelCreated ? <CheckCircle className="h-4 w-4 mr-2" /> : null}
                                    {channelCreated ? "Ready" : "Initialize"}
                                </Button>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl border border-border/50">
                                <div>
                                    <h3 className="font-bold text-foreground">2. Test Adhan System</h3>
                                    <p className="text-sm text-muted-foreground">Schedules a full Adhan 10s from now.</p>
                                </div>
                                <Button
                                    onClick={handleTest}
                                    disabled={isScheduling}
                                    className="bg-emerald-600 hover:bg-emerald-700 text-white"
                                >
                                    {isScheduling ? "Scheduling..." : "Run Test"}
                                    <PlayCircle className="h-4 w-4 ml-2" />
                                </Button>
                            </div>

                            <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl text-sm text-amber-800 dark:text-amber-200">
                                <span className="font-bold block mb-1">Important:</span>
                                For this to work efficiently, ensure you have placed an <code>adhan.mp3</code> file in <code>android/app/src/main/res/raw/</code> and rebuilt the app.
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
            <Footer />
        </div>
    );
}
