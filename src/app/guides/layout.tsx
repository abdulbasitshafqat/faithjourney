import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Practical Islamic Guides",
  description: "Step-by-step guides for Salah, Wudu, fasting, Zakat, Hajj, Umrah, and Janazah.",
};

export default function GuidesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
