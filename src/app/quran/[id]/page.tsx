import SurahView from "@/components/quran/SurahView";

export async function generateStaticParams() {
    return Array.from({ length: 114 }, (_, i) => ({
        id: (i + 1).toString(),
    }));
}

export default async function SurahPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return <SurahView id={Number(id)} />;
}
