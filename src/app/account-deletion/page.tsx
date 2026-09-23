"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";
import { Loader2, ShieldAlert, Trash2 } from "lucide-react";

export default function AccountDeletionPage() {
    const [email, setEmail] = useState<string | null>(null);
    const [checking, setChecking] = useState(true);
    const [confirming, setConfirming] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => {
            setEmail(data.user?.email ?? null);
            setChecking(false);
        });
    }, []);

    const deleteAccount = async () => {
        setDeleting(true);
        setMessage(null);

        const { error } = await supabase.rpc("delete_own_account");
        if (error) {
            setMessage("We could not delete the account. Please sign in again and retry.");
            setDeleting(false);
            return;
        }

        await supabase.auth.signOut();
        Object.keys(localStorage)
            .filter((key) => key.startsWith("fj_"))
            .forEach((key) => localStorage.removeItem(key));
        setEmail(null);
        setConfirming(false);
        setDeleting(false);
        setMessage("Your Faith Journey account and associated cloud data have been deleted.");
    };

    return (
        <div className="min-h-screen flex flex-col bg-background font-sans">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-20 md:py-28">
                <Card className="max-w-2xl mx-auto border-primary/10 bg-card/70">
                    <CardHeader>
                        <div className="h-12 w-12 rounded-full bg-destructive/10 text-destructive flex items-center justify-center mb-3">
                            <ShieldAlert className="h-6 w-6" />
                        </div>
                        <CardTitle className="font-serif text-3xl">Delete your account</CardTitle>
                        <CardDescription className="text-base">
                            Permanently remove your Faith Journey account and its synced profile, reading progress, and streak data.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {checking ? (
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Loader2 className="h-4 w-4 animate-spin" /> Checking your account…
                            </div>
                        ) : email ? (
                            <>
                                <div className="rounded-xl border bg-muted/30 p-4 text-sm">
                                    Signed in as <strong>{email}</strong>
                                </div>
                                {!confirming ? (
                                    <Button variant="destructive" onClick={() => setConfirming(true)}>
                                        <Trash2 className="mr-2 h-4 w-4" /> Start account deletion
                                    </Button>
                                ) : (
                                    <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-5 space-y-4">
                                        <p className="font-medium">This cannot be undone.</p>
                                        <p className="text-sm text-muted-foreground">
                                            Your account and all associated cloud records will be permanently deleted. Local app preferences on this device will also be cleared.
                                        </p>
                                        <div className="flex flex-wrap gap-3">
                                            <Button variant="destructive" onClick={deleteAccount} disabled={deleting}>
                                                {deleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                                Delete my account and data
                                            </Button>
                                            <Button variant="outline" onClick={() => setConfirming(false)} disabled={deleting}>
                                                Cancel
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="space-y-4">
                                <p className="text-muted-foreground">
                                    Sign in to verify ownership before requesting permanent deletion.
                                </p>
                                <Button asChild>
                                    <Link href="/auth">Sign in to delete my account</Link>
                                </Button>
                            </div>
                        )}
                        {message && (
                            <p role="status" className="rounded-xl border bg-muted/30 p-4 text-sm">{message}</p>
                        )}
                        <p className="text-xs text-muted-foreground">
                            This page is the public account-deletion resource for Faith Journey Pro on Google Play.
                        </p>
                    </CardContent>
                </Card>
            </main>
            <Footer />
        </div>
    );
}
