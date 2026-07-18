import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ArticleCard } from '@/components/articles/ArticleCard';
import type { ArticleListItem } from '@/types';

interface FeaturedArticlesProps {
  articles: ArticleListItem[];
}

export function FeaturedArticles({ articles }: FeaturedArticlesProps) {
  if (articles.length === 0) return null;

  const [primary, ...rest] = articles;

  return (
    <section className="bg-white py-20 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section header */}
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="mb-1 text-sm font-medium text-brand-600 dark:text-brand-400">Featured</p>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
              Editor&apos;s Picks
            </h2>
          </div>
          <Link
            href="/articles?featured=true"
            className="flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400"
          >
            See all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Grid: 1 large + 2 stacked */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {primary && (
            <div className="lg:col-span-2">
              <ArticleCard article={primary} variant="featured" className="h-full" />
            </div>
          )}
          <div className="flex flex-col gap-6">
            {rest.slice(0, 2).map((article) => (
              <ArticleCard key={article.id} article={article} variant="default" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
