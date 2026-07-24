import { Badge } from '@/components/ui/Badge';
import type { Category } from '@/types';

interface CategoryHeaderProps {
  category: Category;
}

export function CategoryHeader({ category }: CategoryHeaderProps) {
  return (
    <div
      className="relative overflow-hidden rounded-3xl py-16 px-8 text-center"
      style={{ backgroundColor: `${category.color}12` }}
    >
      {/* Background radial glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${category.color}60, transparent 70%)`,
        }}
        aria-hidden
      />

      <div className="relative">
        {/* Icon */}
        <div
          className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl text-4xl shadow-lg"
          style={{ backgroundColor: `${category.color}20`, border: `1px solid ${category.color}40` }}
        >
          {category.icon}
        </div>

        {/* Title */}
        <h1
          className="mb-3 text-3xl font-extrabold sm:text-4xl"
          style={{ color: category.color }}
        >
          {category.name}
        </h1>

        {/* Description */}
        <p className="mx-auto max-w-xl text-base text-slate-600 dark:text-slate-400">
          {category.description}
        </p>

        {/* Article count */}
        <div className="mt-4 inline-flex">
          <Badge
            className="text-sm px-4 py-1.5"
            style={{
              backgroundColor: `${category.color}18`,
              color: category.color,
            }}
          >
            {category.articleCount} articles
          </Badge>
        </div>
      </div>
    </div>
  );
}
