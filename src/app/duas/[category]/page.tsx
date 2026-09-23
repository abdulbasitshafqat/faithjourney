import { duaCategories } from "@/lib/data/duas";
import CategoryView from "@/components/duas/CategoryView";
import type { Metadata } from "next";

export async function generateStaticParams() {
    return Object.keys(duaCategories).map((category) => ({
        category: category,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
    const { category } = await params;
    const label = category.replace(/-/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());

    return {
        title: `${label} Duas`,
        description: `Read authentic ${label.toLowerCase()} duas in Arabic with English translations.`,
        alternates: { canonical: `/duas/${category}` },
    };
}

export default async function Page({ params }: { params: Promise<{ category: string }> }) {
    const { category } = await params;
    return <CategoryView categoryKey={category} />;
}
