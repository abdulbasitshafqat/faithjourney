import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
    title: "Privacy Policy",
    description: "How Faith Journey Pro handles account, location, preference, and usage data.",
    alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
    return (
        <div className="min-h-screen flex flex-col bg-background font-sans">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-16 md:py-24 max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-8 text-center">
                    Privacy Policy
                </h1>

                <div className="prose prose-stone dark:prose-invert max-w-none space-y-8 bg-card/50 backdrop-blur-sm p-8 rounded-xl border border-border/50 shadow-sm">
                    <section>
                        <h2 className="text-2xl font-serif font-semibold text-primary mb-4">1. Introduction</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            Faith Journey Pro respects your privacy. This policy explains the information used by our website and mobile app and the choices available to you.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif font-semibold text-primary mb-4">2. Information We Use</h2>
                        <div className="space-y-5 text-muted-foreground leading-relaxed">
                            <div>
                                <h3 className="font-semibold text-foreground mb-2">Account information</h3>
                                <p>If you create an account, Supabase Authentication processes your email address, login credentials, and authentication identifiers. Synced reading progress and streak data are associated with your account.</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground mb-2">Location</h3>
                                <p>The app requests approximate or precise location only when you use location-based prayer times, the Islamic calendar, or Qibla features. Location is used for the requested calculation and is not stored as a location history in our database.</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground mb-2">On-device preferences</h3>
                                <p>The app stores settings such as theme, prayer calculation method, notification preferences, bookmarks, reading position, and Tasbih counts locally on your device.</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground mb-2">Technical information</h3>
                                <p>Hosting and API providers may process standard request information such as IP address, device or browser type, timestamps, and diagnostic logs for security and reliability.</p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif font-semibold text-primary mb-4">3. How We Use Information</h2>
                        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                            <li>Provide prayer times, Qibla direction, reminders, and Islamic calendar information.</li>
                            <li>Synchronize account-backed reading progress and streaks across devices.</li>
                            <li>Remember preferences and improve reliability, security, and performance.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif font-semibold text-primary mb-4">4. Service Providers</h2>
                        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                            <li><strong>Supabase</strong> provides authentication and the account database.</li>
                            <li><strong>Vercel</strong> hosts the website and may process standard security and request logs.</li>
                            <li><strong>Prayer-time APIs</strong> receive the coordinates needed to calculate prayer times when you request that feature.</li>
                            <li><strong>Google</strong> processes sign-in information only when you choose Google Sign-In.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif font-semibold text-primary mb-4">5. Permissions and Your Choices</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            Location and notification permissions are optional and may be changed in your device settings. You can use most reading and learning features without creating an account. You may clear local app data by clearing the app&apos;s storage or uninstalling it.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif font-semibold text-primary mb-4">6. Account and Data Deletion</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            You can permanently delete your account and associated cloud data through our{" "}
                            <Link href="/account-deletion" className="text-primary underline underline-offset-4">account-deletion page</Link>.
                            Deletion removes the authentication account, profile, synced reading progress, and streak records. App preferences stored only on your device are cleared when deletion is completed from that device.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif font-semibold text-primary mb-4">7. Security and Changes</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            We use reasonable technical safeguards, but no Internet transmission or storage method is completely secure. Material changes to this policy will be posted on this page.
                        </p>
                    </section>

                    <section className="pt-8 border-t border-border/50">
                        <p className="text-sm text-muted-foreground">Last updated: September 23, 2026</p>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
}
