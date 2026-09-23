import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accurate Prayer Times",
  description: "Find daily Fajr, Dhuhr, Asr, Maghrib, and Isha times for your current location.",
  alternates: { canonical: "/prayer-times" },
};

export default function PrayerTimesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
