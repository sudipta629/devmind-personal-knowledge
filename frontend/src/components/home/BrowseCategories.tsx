import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Category } from '@/types';

interface BrowseCategoriesProps {
  categories: Category[];
}

export function BrowseCategories({ categories }: BrowseCategoriesProps) {
  return (
    <section className="bg-slate-50 py-20 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="mb-1 text-sm font-medium text-brand-600 dark:text-brand-400">Topics</p>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
              Browse Categories
            </h2>
          </div>
          <Link
            href="/categories"
            className="flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400"
          >
            All categories <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Category grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="group flex flex-col items-center rounded-2xl border border-slate-100 bg-white p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:shadow-card-hover dark:border-slate-800 dark:bg-slate-950 dark:hover:border-transparent"
              style={{
                '--hover-color': category.color,
              } as React.CSSProperties}
            >
              <div
                className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl text-2xl transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: `${category.color}18` }}
              >
                {category.icon}
              </div>
              <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                {category.name}
              </h3>
              <p className="mt-0.5 text-xs text-slate-400">
                {category.articleCount} articles
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
