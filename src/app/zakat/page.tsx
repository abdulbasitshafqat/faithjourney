"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Calculator } from "lucide-react";

export default function ZakatPage() {
    const [assets, setAssets] = useState({
        savings: 0,
        gold: 0,
        silver: 0,
        investments: 0,
        loans: 0, // Loans given to others (receivable)
        debts: 0, // Debts owed (deductible)
    });

    const [zakat, setZakat] = useState<number | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAssets((prev) => ({
            ...prev,
            [name]: parseFloat(value) || 0,
        }));
    };

    const calculateZakat = () => {
        const totalAssets =
            assets.savings +
            assets.gold +
            assets.silver +
            assets.investments +
            assets.loans;

        const netAssets = Math.max(0, totalAssets - assets.debts);

        // Nisab threshold (simplified for MVP, usually based on Gold/Silver rates)
        // Assuming a static Nisab for now or user should check locally.
        // Ideally, fetch live gold/silver prices.

        const zakatAmount = netAssets * 0.025;
        setZakat(zakatAmount);
    };

    return (
        <div className="min-h-screen flex flex-col bg-background font-sans">
            <Header />

            <main className="flex-grow container mx-auto px-4 py-24">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">
                        Zakat Calculator
                    </h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Calculate your annual Zakat obligation accurately.
                        Please consult with a scholar for specific rulings.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {/* Form */}
                    <Card className="bg-card/50 backdrop-blur-sm border-primary/10">
                        <CardHeader>
                            <CardTitle className="font-serif text-xl">Your Assets</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="savings">Cash & Savings</Label>
                                <Input
                                    id="savings"
                                    name="savings"
                                    type="number"
                                    placeholder="0.00"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="gold">Value of Gold</Label>
                                    <Input
                                        id="gold"
                                        name="gold"
                                        type="number"
                                        placeholder="0.00"
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="silver">Value of Silver</Label>
                                    <Input
                                        id="silver"
                                        name="silver"
                                        type="number"
                                        placeholder="0.00"
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="investments">Stocks & Investments</Label>
                                <Input
                                    id="investments"
                                    name="investments"
                                    type="number"
                                    placeholder="0.00"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="loans">Loans Given (Receivable)</Label>
                                <Input
                                    id="loans"
                                    name="loans"
                                    type="number"
                                    placeholder="0.00"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="debts">Debts Owed (Deductible)</Label>
                                <Input
                                    id="debts"
                                    name="debts"
                                    type="number"
                                    placeholder="0.00"
                                    onChange={handleInputChange}
                                />
                            </div>

                            <Button className="w-full bg-primary text-primary-foreground" onClick={calculateZakat}>
                                Calculate Zakat
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Result */}
                    <Card className="bg-primary/5 border-primary/20 h-fit">
                        <CardHeader>
                            <CardTitle className="font-serif text-xl flex items-center gap-2">
                                <Calculator className="h-5 w-5" />
                                Calculation Result
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="p-6 bg-background rounded-lg border border-primary/10 text-center">
                                <p className="text-sm text-muted-foreground mb-2">Total Zakat Payable</p>
                                <p className="text-4xl font-bold text-primary font-mono">
                                    {zakat !== null
                                        ? zakat.toLocaleString(undefined, { style: 'currency', currency: 'USD' })
                                        : "$0.00"}
                                </p>
                            </div>

                            <div className="space-y-2 text-sm text-muted-foreground">
                                <div className="flex justify-between">
                                    <span>Total Assets:</span>
                                    <span>
                                        {(
                                            assets.savings + assets.gold + assets.silver + assets.investments + assets.loans
                                        ).toLocaleString(undefined, { style: 'currency', currency: 'USD' })}
                                    </span>
                                </div>
                                <div className="flex justify-between text-red-500/80">
                                    <span>Total Liabilities:</span>
                                    <span>
                                        -{assets.debts.toLocaleString(undefined, { style: 'currency', currency: 'USD' })}
                                    </span>
                                </div>
                                <div className="border-t pt-2 flex justify-between font-semibold text-foreground">
                                    <span>Net Zakatable Assets:</span>
                                    <span>
                                        {Math.max(0,
                                            assets.savings + assets.gold + assets.silver + assets.investments + assets.loans - assets.debts
                                        ).toLocaleString(undefined, { style: 'currency', currency: 'USD' })}
                                    </span>
                                </div>
                            </div>

                            <div className="bg-yellow-500/10 p-4 rounded border border-yellow-500/20 text-xs text-yellow-700 dark:text-yellow-400">
                                <strong>Note:</strong> Zakat is only payable if your net assets meet or exceed the Nisab threshold (approx. value of 87.48g of gold or 612.36g of silver) and have been held for one lunar year.
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>

            <Footer />
        </div>
    );
}
