import { notFound } from 'next/navigation';
import { getCategoryBySlug, getAllCategorySlugs } from '@/services/categoryService';
import { getArticles } from '@/services/articleService';
import { ArticleCard } from '@/components/articles/ArticleCard';
import type { Metadata } from 'next';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllCategorySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return {};
  
  return {
    title: `${category.name} Articles`,
    description: category.description || `Browse articles about ${category.name}`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  
  if (!category) notFound();

  const results = await getArticles({ category: slug, limit: 20 });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-12">
          <div className="inline-flex items-center justify-center p-4 bg-brand-50 dark:bg-brand-900/30 rounded-2xl mb-6">
            <span className="text-4xl">{category.icon}</span>
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
            {category.name}
          </h1>
          {category.description && (
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
              {category.description}
            </p>
          )}
          <div className="mt-4 text-sm font-medium text-slate-500">
            {results.total} {results.total === 1 ? 'Article' : 'Articles'}
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
              There are currently no articles in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
