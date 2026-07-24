import { ArticleCard } from '@/components/articles/ArticleCard';
import type { ArticleListItem } from '@/types';

interface RelatedArticlesProps {
  articles: ArticleListItem[];
}

export function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (articles.length === 0) return null;

  return (
    <section className="mt-16 border-t border-slate-100 pt-12 dark:border-slate-800">
      <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-slate-100">
        Related Articles
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} variant="default" />
        ))}
      </div>
    </section>
  );
}
