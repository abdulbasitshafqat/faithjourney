"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Moon, Bell, Globe, Clock, Calculator, ShieldCheck } from "lucide-react";
import { useTheme } from "next-themes";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { CALCULATION_METHODS } from "@/lib/api/prayer-times";
import { useMounted } from "@/hooks/use-mounted";

export default function SettingsPage() {
    const { setTheme, theme } = useTheme();
    const mounted = useMounted();

    // Settings state
    const [language, setLanguage] = useState("en");
    const [timeFormat, setTimeFormat] = useState("12h");
    const [method, setMethod] = useState("1");
    const [school, setSchool] = useState("1");
    const [notifications, setNotifications] = useState(true);
    const [sunriseAlert, setSunriseAlert] = useState(false);

    // Load settings from localStorage on mount
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedLanguage = localStorage.getItem("fj_language") || "en";
            const savedTimeFormat = localStorage.getItem("fj_timeFormat") || "12h";
            const savedMethod = localStorage.getItem("fj_method") || "1";
            const savedSchool = localStorage.getItem("fj_school") || "1";
            const savedNotifs = localStorage.getItem("fj_notifications") !== "false";
            const savedSunrise = localStorage.getItem("fj_sunriseAlert") === "true";

            setLanguage(savedLanguage);
            setTimeFormat(savedTimeFormat);
            setMethod(savedMethod);
            setSchool(savedSchool);
            setNotifications(savedNotifs);
            setSunriseAlert(savedSunrise);
        }
    }, []);

    // Save helpers
    const saveSetting = (key: string, value: string | boolean) => {
        localStorage.setItem(`fj_${key}`, value.toString());
    };

    if (!mounted) return null;

    return (
        <div className="min-h-screen flex flex-col bg-background font-sans">
            <Header />

            <main className="flex-grow container mx-auto px-4 py-24">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">
                        Settings
                    </h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Customize your FaithJourney experience.
                    </p>
                </div>

                <div className="max-w-2xl mx-auto space-y-6 pb-12">
                    {/* Appearance */}
                    <Card className="bg-card/50 backdrop-blur-sm border-primary/10 overflow-hidden">
                        <CardHeader className="bg-primary/5 border-b border-primary/5">
                            <CardTitle className="font-serif text-xl flex items-center gap-2">
                                <Moon className="h-5 w-5 text-primary" />
                                Appearance
                            </CardTitle>
                            <CardDescription>Manage how the app looks and feels.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6 pt-6">
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
                    <Card className="bg-card/50 backdrop-blur-sm border-primary/10 overflow-hidden">
                        <CardHeader className="bg-primary/5 border-b border-primary/5">
                            <CardTitle className="font-serif text-xl flex items-center gap-2">
                                <Bell className="h-5 w-5 text-primary" />
                                Notifications
                            </CardTitle>
                            <CardDescription>Manage your prayer alerts and spiritual reminders.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6 pt-6">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base">Prayer Times</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Receive notifications for each prayer.
                                    </p>
                                </div>
                                <Switch
                                    checked={notifications}
                                    onCheckedChange={(v) => {
                                        setNotifications(v);
                                        saveSetting("notifications", v);
                                    }}
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base">Sunrise Alert</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Get notified before sunrise (Shurooq).
                                    </p>
                                </div>
                                <Switch
                                    checked={sunriseAlert}
                                    onCheckedChange={(v) => {
                                        setSunriseAlert(v);
                                        saveSetting("sunriseAlert", v);
                                    }}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Language & Region */}
                    <Card className="bg-card/50 backdrop-blur-sm border-primary/10 overflow-hidden">
                        <CardHeader className="bg-primary/5 border-b border-primary/5">
                            <CardTitle className="font-serif text-xl flex items-center gap-2">
                                <Globe className="h-5 w-5 text-primary" />
                                Language & Region
                            </CardTitle>
                            <CardDescription>Set your preferred language and calculation methods.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6 pt-6">
                            {/* Language */}
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base">Primary Language</Label>
                                    <p className="text-sm text-muted-foreground">
                                        App interface and translation language.
                                    </p>
                                </div>
                                <Select value={language} onValueChange={(v) => {
                                    setLanguage(v);
                                    saveSetting("language", v);
                                }}>
                                    <SelectTrigger className="w-[140px]">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="en">English</SelectItem>
                                        <SelectItem value="ur">Urdu (اردو)</SelectItem>
                                        <SelectItem value="ar">Arabic (العربية)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Time Format */}
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-primary/60" />
                                        Time Format
                                    </Label>
                                    <p className="text-sm text-muted-foreground">
                                        Display prayer times in 12h or 24h format.
                                    </p>
                                </div>
                                <Select value={timeFormat} onValueChange={(v) => {
                                    setTimeFormat(v);
                                    saveSetting("timeFormat", v);
                                }}>
                                    <SelectTrigger className="w-[140px]">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="12h">12-Hour</SelectItem>
                                        <SelectItem value="24h">24-Hour</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Calculation Method */}
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base flex items-center gap-2">
                                        <Calculator className="h-4 w-4 text-primary/60" />
                                        Calculation Method
                                    </Label>
                                    <p className="text-sm text-muted-foreground">
                                        Standards for calculating prayer timings.
                                    </p>
                                </div>
                                <Select value={method} onValueChange={(v) => {
                                    setMethod(v);
                                    saveSetting("method", v);
                                }}>
                                    <SelectTrigger className="w-[220px] text-xs">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {CALCULATION_METHODS.map(m => (
                                            <SelectItem key={m.id} value={m.id.toString()} className="text-xs">
                                                {m.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* School / Madhab */}
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base flex items-center gap-2">
                                        <ShieldCheck className="h-4 w-4 text-primary/60" />
                                        Madhab (Asr Calculation)
                                    </Label>
                                    <p className="text-sm text-muted-foreground">
                                        Determines the start time of Asr prayer.
                                    </p>
                                </div>
                                <Select value={school} onValueChange={(v) => {
                                    setSchool(v);
                                    saveSetting("school", v);
                                }}>
                                    <SelectTrigger className="w-[140px]">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">Hanafi</SelectItem>
                                        <SelectItem value="0">Shafi / Maliki</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>

            <Footer />
        </div>
    );
}
