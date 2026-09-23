import ArticleView from "@/components/knowledge/ArticleView";
import { articles } from "@/lib/data/knowledge";
import type { Metadata } from "next";

export async function generateStaticParams() {
    return articles.map((article) => ({
        slug: article.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const article = articles.find((item) => item.slug === slug);
    if (!article) return { title: "Article Not Found" };

    return {
        title: article.title,
        description: article.description,
        alternates: { canonical: `/knowledge/${article.slug}` },
    };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    return <ArticleView slug={slug} />;
}
