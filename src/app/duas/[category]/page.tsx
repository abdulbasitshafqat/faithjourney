import { duaCategories } from "@/lib/data/duas";
import CategoryView from "@/components/duas/CategoryView";

export async function generateStaticParams() {
    return Object.keys(duaCategories).map((category) => ({
        category: category,
    }));
}

export default async function Page({ params }: { params: Promise<{ category: string }> }) {
    const { category } = await params;
    return <CategoryView categoryKey={category} />;
}
