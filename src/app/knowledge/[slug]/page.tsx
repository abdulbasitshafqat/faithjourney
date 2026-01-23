import ArticleView from "@/components/knowledge/ArticleView";
import { articles } from "@/lib/data/knowledge";

export async function generateStaticParams() {
    return articles.map((article) => ({
        slug: article.slug,
    }));
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    return <ArticleView slug={slug} />;
}
