import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function TermsPage() {
    return (
        <div className="min-h-screen flex flex-col bg-background font-sans">
            <Header />

            <main className="flex-grow container mx-auto px-4 py-16 md:py-24 max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-8 text-center">
                    Terms of Service
                </h1>

                <div className="prose prose-stone dark:prose-invert max-w-none space-y-8 bg-card/50 backdrop-blur-sm p-8 rounded-xl border border-border/50 shadow-sm">
                    <section>
                        <h2 className="text-2xl font-serif font-semibold text-primary mb-4">
                            1. Acceptance of Terms
                        </h2>
                        <p className="text-muted-foreground leading-relaxed">
                            By accessing and using FaithJourney.pro ("the Service"), you
                            accept and agree to be bound by the terms and provision of this
                            agreement. In addition, when using this Service's particular
                            services, you shall be subject to any posted guidelines or rules
                            applicable to such services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif font-semibold text-primary mb-4">
                            2. Description of Service
                        </h2>
                        <p className="text-muted-foreground leading-relaxed">
                            FaithJourney.pro is a digital Islamic utility application that
                            provides users with the Holy Quran, prayer times, Qibla direction,
                            and other spiritual tools. The Service is provided "as is" and is
                            intended for educational and spiritual purposes.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif font-semibold text-primary mb-4">
                            3. Accuracy of Data
                        </h2>
                        <p className="text-muted-foreground leading-relaxed">
                            While we strive to ensure the accuracy of prayer times, Qibla
                            direction, and Quranic text, technical errors or location-based
                            discrepancies may occur.
                        </p>
                        <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
                            <li>
                                <strong>Prayer Times:</strong> Calculations are based on
                                standard astronomical formulas. However, we strongly recommend
                                verifying timings with your local mosque, especially for fasting
                                (Sahur/Iftar).
                            </li>
                            <li>
                                <strong>Qibla Direction:</strong> The compass feature relies on
                                your device's sensors, which can be affected by magnetic interference.
                            </li>
                            <li>
                                <strong>Quranic Text:</strong> We source our text from reputable
                                digital repositories, but users are encouraged to report any
                                typos or errors they encounter.
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif font-semibold text-primary mb-4">
                            4. User Conduct
                        </h2>
                        <p className="text-muted-foreground leading-relaxed">
                            You agree to use the Service only for lawful purposes. You represent,
                            warrant, and agree that no materials of any kind submitted through
                            your account or otherwise posted or shared by you through the
                            Service will violate or infringe upon the rights of regarding any
                            third party, including copyright, trademark, privacy, publicity or
                            other personal or proprietary rights.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif font-semibold text-primary mb-4">
                            5. Intellectual Property
                        </h2>
                        <p className="text-muted-foreground leading-relaxed">
                            The content, organization, graphics, design, compilation, magnetic
                            translation, digital conversion and other matters related to the
                            Site are protected under applicable copyrights, trademarks and
                            other proprietary (including but not limited to intellectual
                            property) rights.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif font-semibold text-primary mb-4">
                            6. Disclaimer
                        </h2>
                        <p className="text-muted-foreground leading-relaxed">
                            THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS
                            WITHOUT ANY REPRESENTATION OR WARRANTY, WHETHER EXPRESS, IMPLIED
                            OR STATUTORY. FAITHJOURNEY.PRO SPECIFICALLY DISCLAIMS ANY IMPLIED
                            WARRANTIES OF TITLE, MERCHANTABILITY, FITNESS FOR A PARTICULAR
                            PURPOSE AND NON-INFRINGEMENT.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif font-semibold text-primary mb-4">
                            7. Changes to Terms
                        </h2>
                        <p className="text-muted-foreground leading-relaxed">
                            We reserve the right to modify these terms from time to time at our
                            sole discretion. Therefore, you should review this page periodically.
                            Your continued use of the Website or our service after any such change
                            constitutes your acceptance of the new Terms.
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
