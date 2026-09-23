import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Delete Account",
    description: "Delete your Faith Journey Pro account and associated cloud data.",
    alternates: { canonical: "/account-deletion" },
};

export default function AccountDeletionLayout({ children }: { children: React.ReactNode }) {
    return children;
}
