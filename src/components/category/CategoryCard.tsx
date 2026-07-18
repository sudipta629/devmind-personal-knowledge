import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Category } from '@/types';

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group flex items-start gap-4 rounded-2xl border border-slate-100 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:shadow-card-hover dark:border-slate-800 dark:bg-slate-900"
    >
      {/* Icon */}
      <div
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl transition-transform duration-300 group-hover:scale-110"
        style={{ backgroundColor: `${category.color}18` }}
      >
        {category.icon}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3
          className="mb-1 font-semibold text-slate-900 dark:text-slate-100 transition-colors"
          style={{ color: undefined }}
        >
          {category.name}
        </h3>
        <p className="line-clamp-2 text-sm text-slate-500 dark:text-slate-400">
          {category.description}
        </p>
        <p className="mt-2 text-xs font-medium" style={{ color: category.color }}>
          {category.articleCount} articles
        </p>
      </div>

      <ArrowRight className="h-4 w-4 shrink-0 text-slate-300 transition-all group-hover:translate-x-1 group-hover:text-brand-500 dark:text-slate-600" />
    </Link>
  );
}
