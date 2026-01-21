"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Moon, Bell, Globe } from "lucide-react";
import { useTheme } from "next-themes";

export default function SettingsPage() {
    const { setTheme, theme } = useTheme();

    return (
        <div className="min-h-screen flex flex-col bg-background font-sans">
            <Navbar />

            <main className="flex-grow container mx-auto px-4 py-24">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">
                        Settings
                    </h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Customize your FaithJourney experience.
                    </p>
                </div>

                <div className="max-w-2xl mx-auto space-y-6">
                    {/* Appearance */}
                    <Card className="bg-card/50 backdrop-blur-sm border-primary/10">
                        <CardHeader>
                            <CardTitle className="font-serif text-xl flex items-center gap-2">
                                <Moon className="h-5 w-5" />
                                Appearance
                            </CardTitle>
                            <CardDescription>Manage how the app looks and feels.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base">Dark Mode</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Switch between light and dark themes.
                                    </p>
                                </div>
                                <Switch
                                    checked={theme === 'dark'}
                                    onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Notifications */}
                    <Card className="bg-card/50 backdrop-blur-sm border-primary/10">
                        <CardHeader>
                            <CardTitle className="font-serif text-xl flex items-center gap-2">
                                <Bell className="h-5 w-5" />
                                Notifications
                            </CardTitle>
                            <CardDescription>Manage your prayer alerts.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base">Prayer Times</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Receive notifications for each prayer.
                                    </p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base">Sunrise Alert</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Get notified before sunrise (Shurooq).
                                    </p>
                                </div>
                                <Switch />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Language */}
                    <Card className="bg-card/50 backdrop-blur-sm border-primary/10">
                        <CardHeader>
                            <CardTitle className="font-serif text-xl flex items-center gap-2">
                                <Globe className="h-5 w-5" />
                                Language & Region
                            </CardTitle>
                            <CardDescription>Set your preferred language and calculation methods.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base">Language</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Currently English is the primary language.
                                    </p>
                                </div>
                                <Button variant="outline" disabled>English</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>

            <Footer />
        </div>
    );
}
