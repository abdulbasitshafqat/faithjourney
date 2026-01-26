"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function AuthPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            if (error) throw error;
            router.push("/");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { error } = await supabase.auth.signUp({
                email,
                password,
            });
            if (error) throw error;
            alert("Please check your email for the confirmation link.");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 font-sans bg-background">
            {/* Left Panel - Visual & Quote */}
            <div className="hidden md:flex flex-col justify-between bg-primary/5 p-12 text-primary relative overflow-hidden">
                <div className="relative z-10">
                    <h1 className="text-3xl font-serif font-bold tracking-tight">Faith Journey Pro</h1>
                    <p className="mt-2 text-primary/80">Your companion for spiritual growth.</p>
                </div>

                <div className="relative z-10 max-w-md">
                    <blockquote className="text-2xl font-serif italic leading-relaxed">
                        "Instruct them to pray, for perveristy and evil deeds are restrained by prayer."
                    </blockquote>
                    <p className="mt-4 font-medium opacity-80">- Quran 29:45 (Tafsir)</p>
                </div>

                {/* Decorative Pattern Background */}
                <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: "url('/pattern.svg')", backgroundSize: "300px" }} />
            </div>

            {/* Right Panel - Auth Forms */}
            <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16 relative">
                <div className="absolute top-4 right-4 md:hidden">
                    {/* Mobile Header Link/Close */}
                </div>

                <div className="mx-auto w-full max-w-sm space-y-6">
                    <div className="space-y-2 text-center md:text-left">
                        <h2 className="text-3xl font-serif font-bold tracking-tight">Welcome Back</h2>
                        <p className="text-muted-foreground">Enter your email to sign in to your account</p>
                    </div>

                    <Tabs defaultValue="login" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 mb-8 bg-muted/50 p-1 rounded-xl">
                            <TabsTrigger value="login" className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all text-sm font-medium">Login</TabsTrigger>
                            <TabsTrigger value="signup" className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all text-sm font-medium">Sign Up</TabsTrigger>
                        </TabsList>

                        <TabsContent value="login" className="space-y-4 animate-in fade-in-50 slide-in-from-left-2 duration-300">
                            <form onSubmit={handleLogin} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="name@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="h-11 rounded-xl bg-muted/30 border-primary/10 focus:border-primary/30"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="password">Password</Label>
                                        <Button variant="link" className="px-0 font-normal h-auto text-xs text-muted-foreground" type="button">Forgot password?</Button>
                                    </div>
                                    <Input
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="h-11 rounded-xl bg-muted/30 border-primary/10 focus:border-primary/30"
                                    />
                                </div>
                                {error && <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">{error}</div>}
                                <Button type="submit" className="w-full h-11 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all shadow-lg shadow-primary/20" disabled={loading}>
                                    {loading ? <span className="animate-pulse">Signing in...</span> : "Sign In"}
                                </Button>
                            </form>
                        </TabsContent>

                        <TabsContent value="signup" className="space-y-4 animate-in fade-in-50 slide-in-from-right-2 duration-300">
                            <div className="bg-primary/5 p-4 rounded-xl border border-primary/10 mb-4">
                                <p className="text-xs text-primary/80 text-center">Creating an account allows you to sync your bookmarks, tracking, and custom duas across devices.</p>
                            </div>
                            <form onSubmit={handleSignup} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="signup-email">Email</Label>
                                    <Input
                                        id="signup-email"
                                        type="email"
                                        placeholder="name@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="h-11 rounded-xl bg-muted/30 border-primary/10 focus:border-primary/30"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="signup-password">Password</Label>
                                    <Input
                                        id="signup-password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="h-11 rounded-xl bg-muted/30 border-primary/10 focus:border-primary/30"
                                    />
                                    <p className="text-[10px] text-muted-foreground">Must be at least 6 characters</p>
                                </div>
                                {error && <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">{error}</div>}
                                <Button type="submit" className="w-full h-11 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all shadow-lg shadow-primary/20" disabled={loading}>
                                    {loading ? <span className="animate-pulse">Creating Account...</span> : "Create Account"}
                                </Button>
                            </form>
                        </TabsContent>
                    </Tabs>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-muted" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">Or continue as guest</span>
                        </div>
                    </div>
                    <Button variant="outline" className="w-full h-11 rounded-xl border-dashed" onClick={() => router.push('/')}>
                        Skip for now
                    </Button>
                </div>
            </div>

        </div>
    );
}
