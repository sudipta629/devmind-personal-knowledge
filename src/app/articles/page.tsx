import { generateMetadata as genMeta } from '@/lib/seo';
import { getArticles } from '@/services/articleService';
import { ArticleGrid } from '@/components/articles/ArticleGrid';

export const metadata = genMeta({
  title: 'All Articles',
  description: 'Browse all articles on software engineering, system design, AI, Java, Microservices, and more.',
  url: '/articles',
});

interface ArticlesPageProps {
  searchParams: Promise<{ category?: string; tag?: string; page?: string }>;
}

export default async function ArticlesPage({ searchParams }: ArticlesPageProps) {
  const params = await searchParams;
  const page = Number(params.page ?? 1);

  const { articles, total, totalPages } = await getArticles({
    category: params.category,
    tag: params.tag,
    page,
    limit: 9,
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-24 pt-32 sm:px-6">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
          All Articles
        </h1>
        <p className="mt-2 text-slate-500 dark:text-slate-400">
          {total} articles — exploring software engineering from the ground up.
        </p>
      </div>

      <ArticleGrid articles={articles} columns={3} />

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-12 flex items-center justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <a
              key={i}
              href={`?page=${i + 1}`}
              className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                page === i + 1
                  ? 'bg-brand-600 text-white'
                  : 'border border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800'
              }`}
            >
              {i + 1}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
