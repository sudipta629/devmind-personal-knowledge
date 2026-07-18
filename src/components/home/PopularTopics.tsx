import Link from 'next/link';
import { TrendingUp } from 'lucide-react';
import type { Tag } from '@/types';

interface PopularTopicsProps {
  tags: Tag[];
}

export function PopularTopics({ tags }: PopularTopicsProps) {
  return (
    <section className="bg-slate-50 py-20 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-10">
          <p className="mb-1 flex items-center gap-1.5 text-sm font-medium text-brand-600 dark:text-brand-400">
            <TrendingUp className="h-4 w-4" />
            Trending
          </p>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
            Popular Topics
          </h2>
        </div>

        <div className="flex flex-wrap gap-3">
          {tags.map((tag, i) => {
            // Vary the sizes for a tag-cloud effect
            const isLarge = tag.articleCount >= 15;
            const isMedium = tag.articleCount >= 10 && tag.articleCount < 15;

            return (
              <Link
                key={tag.id}
                href={`/tags/${tag.slug}`}
                className={`group flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 font-medium text-slate-600 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-400 hover:bg-brand-50 hover:text-brand-700 hover:shadow-sm dark:border-slate-700 dark:bg-slate-950 dark:text-slate-400 dark:hover:border-brand-500 dark:hover:bg-brand-900/20 dark:hover:text-brand-300 ${
                  isLarge ? 'text-base' : isMedium ? 'text-sm' : 'text-xs'
                }`}
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <span>#{tag.name}</span>
                <span className="rounded-full bg-slate-100 px-1.5 py-0.5 text-xs text-slate-400 group-hover:bg-brand-100 group-hover:text-brand-600 dark:bg-slate-800 dark:group-hover:bg-brand-900/30">
                  {tag.articleCount}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
