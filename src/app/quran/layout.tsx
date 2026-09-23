import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Read and Listen to the Quran",
  description: "Read all 114 surahs with Arabic text, English and Urdu translations, audio recitation, and reading progress.",
  alternates: { canonical: "/quran" },
};

export default function QuranLayout({ children }: { children: React.ReactNode }) {
  return children;
}
