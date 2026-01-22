import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

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
                        <h2 className="text-2xl font-serif font-semibold text-primary mb-4">
                            1. Introduction
                        </h2>
                        <p className="text-muted-foreground leading-relaxed">
                            At FaithJourney.pro, we respect your privacy and are committed to protecting it.
                            This Privacy Policy explains how we handle your data when you use our website
                            and related services (collectively, the &quot;Service&quot;).
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif font-semibold text-primary mb-4">
                            2. Data We Collect
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-semibold text-foreground mb-2">Location Data</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    To provide accurate Prayer Times and Qibla direction, we may request access
                                    to your device&apos;s geolocation. This data is processed locally on your device
                                    or sent directly to our calculation APIs. We do not store your precise
                                    location history on our servers.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground mb-2">Local Preferences</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    We use your browser&apos;s Local Storage to save your preferences, such as:
                                    <ul className="list-disc pl-6 mt-2 space-y-1">
                                        <li>Theme settings (Dark/Light mode)</li>
                                        <li>Font size preferences</li>
                                        <li>Tasbih counts</li>
                                        <li>Bookmarked verses or hadiths</li>
                                    </ul>
                                </p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif font-semibold text-primary mb-4">
                            3. How We Use Your Data
                        </h2>
                        <p className="text-muted-foreground leading-relaxed">
                            We generally use the information to maintain and improve the Service, including:
                        </p>
                        <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
                            <li>Calculating accurate prayer times for your specific location.</li>
                            <li>Determining the Qibla direction relative to your position.</li>
                            <li>Persisting your app experience (bookmarks, readings history) across sessions.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif font-semibold text-primary mb-4">
                            4. Third-Party Services
                        </h2>
                        <p className="text-muted-foreground leading-relaxed">
                            We may use third-party services that collect, monitor, and analyze data to help us improve the Service.
                        </p>
                        <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
                            <li>
                                <strong>Vercel:</strong> Our hosting provider may collect basic usage logs for performance monitoring and security.
                            </li>
                            <li>
                                <strong>APIs:</strong> External APIs (such as for Quranic text or Hijri dates) are used to fetch content. Requests to these services may include your IP address as part of standard internet traffic.
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif font-semibold text-primary mb-4">
                            5. Data Security
                        </h2>
                        <p className="text-muted-foreground leading-relaxed">
                            We strive to use commercially acceptable means to protect your Personal Data.
                            However, please remember that no method of transmission over the Internet, or
                            method of electronic storage, is 100% secure.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif font-semibold text-primary mb-4">
                            6. Changes to This Policy
                        </h2>
                        <p className="text-muted-foreground leading-relaxed">
                            We may update our Privacy Policy from time to time. We will notify you of any
                            changes by posting the new Privacy Policy on this page. You are advised to
                            review this Privacy Policy periodically for any changes.
                        </p>
                    </section>

                    <section className="pt-8 border-t border-border/50">
                        <p className="text-sm text-muted-foreground">
                            Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </p>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
}
