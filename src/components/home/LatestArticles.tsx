import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ArticleGrid } from '@/components/articles/ArticleGrid';
import type { ArticleListItem } from '@/types';

interface LatestArticlesProps {
  articles: ArticleListItem[];
}

export function LatestArticles({ articles }: LatestArticlesProps) {
  return (
    <section className="bg-white py-20 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="mb-1 text-sm font-medium text-brand-600 dark:text-brand-400">Fresh</p>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
              Latest Articles
            </h2>
          </div>
          <Link
            href="/articles"
            className="flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <ArticleGrid articles={articles} columns={3} />
      </div>
    </section>
  );
}
