'use client';
import LoginButton from '@/components/auth/LoginButton';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Sparkles, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -mr-48 -mt-48" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px] -ml-48 -mb-48" />

            <div className="w-full max-w-md relative z-10">
                <Link href="/" className="inline-block mb-8">
                    <Button variant="ghost" className="pl-0 hover:bg-transparent hover:text-primary">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
                    </Button>
                </Link>
                <Card className="border-primary/10 shadow-2xl bg-card/50 backdrop-blur-xl">
                    <CardHeader className="text-center space-y-4">
                        <div className="mx-auto bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center border border-primary/20">
                            <Sparkles className="w-8 h-8 text-primary" />
                        </div>
                        <CardTitle className="text-3xl font-serif font-bold text-primary">Welcome Back</CardTitle>
                        <CardDescription className="text-base text-muted-foreground">
                            Sign in to sync your bookmarks, track your progress, and continue your spiritual journey across devices.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 pt-6">
                        <LoginButton className="w-full h-14 text-lg font-medium shadow-md transition-all hover:scale-[1.02]" />
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">Or</span>
                            </div>
                        </div>
                        <p className="text-xs text-center text-muted-foreground leading-relaxed px-4">
                            By signing in, you agree to our Terms of Service and Privacy Policy. We never post anything to your social accounts.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
