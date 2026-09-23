import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Islamic Knowledge Library",
  description: "Explore accessible articles on Islamic faith, practice, history, and spirituality.",
};

export default function KnowledgeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
