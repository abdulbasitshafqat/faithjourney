import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-muted/30 border-t mt-auto">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-serif font-bold text-primary">
                            FaithJourney
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            Your comprehensive digital companion for spiritual growth, prayer, and knowledge.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-semibold mb-4">Features</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <Link href="/quran" className="hover:text-primary transition-colors">
                                    Holy Quran
                                </Link>
                            </li>
                            <li>
                                <Link href="/prayer-times" className="hover:text-primary transition-colors">
                                    Prayer Times
                                </Link>
                            </li>
                            <li>
                                <Link href="/tasbih" className="hover:text-primary transition-colors">
                                    Digital Tasbih
                                </Link>
                            </li>
                            <li>
                                <Link href="/qibla" className="hover:text-primary transition-colors">
                                    Qibla Compass
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="font-semibold mb-4">Resources</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <Link href="/duas" className="hover:text-primary transition-colors">
                                    Duas & Azkar
                                </Link>
                            </li>
                            <li>
                                <Link href="/names" className="hover:text-primary transition-colors">
                                    99 Names
                                </Link>
                            </li>
                            <li>
                                <Link href="/zakat" className="hover:text-primary transition-colors">
                                    Zakat Calculator
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="font-semibold mb-4">Legal</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <Link href="/privacy" className="hover:text-primary transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="hover:text-primary transition-colors">
                                    Terms of Service
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t mt-12 pt-8 text-center text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} FaithJourney.pro. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
