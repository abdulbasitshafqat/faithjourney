import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Duas and Daily Azkar",
  description: "Read authentic daily duas and azkar in Arabic with English translations for every occasion.",
};

export default function DuasLayout({ children }: { children: React.ReactNode }) {
  return children;
}
