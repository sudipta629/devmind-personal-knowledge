import { notFound } from 'next/navigation';
import { getTagBySlug, getAllTagSlugs } from '@/services/tagService';
import { getArticles } from '@/services/articleService';
import { ArticleCard } from '@/components/articles/ArticleCard';
import { Hash } from 'lucide-react';
import type { Metadata } from 'next';

interface TagPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllTagSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tag = await getTagBySlug(slug);
  if (!tag) return {};
  
  return {
    title: `Articles tagged with #${tag.name}`,
    description: `Browse all articles tagged with ${tag.name}`,
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const { slug } = await params;
  const tag = await getTagBySlug(slug);
  
  if (!tag) notFound();

  // For tag filtering, we map the slug to the tag name (or just use the slug if your getArticles supports it)
  // Assuming our mock getArticles uses the raw tag name based on how it's stored.
  const results = await getArticles({ tag: tag.name, limit: 20 });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-12">
          <div className="inline-flex items-center gap-3">
            <div className="p-3 bg-slate-100 dark:bg-slate-900 rounded-xl text-slate-500 dark:text-slate-400">
              <Hash className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
                {tag.name}
              </h1>
              <div className="mt-1 text-sm font-medium text-slate-500">
                {results.total} {results.total === 1 ? 'Article' : 'Articles'}
              </div>
            </div>
          </div>
        </div>

        {results.articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {results.articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
            <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">No articles found</h3>
            <p className="text-slate-500 dark:text-slate-400">
              There are currently no articles tagged with this topic.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
