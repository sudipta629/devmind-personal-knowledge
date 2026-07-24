import { ArticleCard } from '@/components/articles/ArticleCard';
import { EmptyState } from '@/components/common/EmptyState';
import { cn } from '@/lib/utils';
import type { ArticleListItem } from '@/types';

interface ArticleGridProps {
  articles: ArticleListItem[];
  variant?: 'default' | 'compact';
  columns?: 2 | 3;
  emptyMessage?: string;
  className?: string;
}

export function ArticleGrid({
  articles,
  variant = 'default',
  columns = 3,
  emptyMessage,
  className,
}: ArticleGridProps) {
  if (articles.length === 0) {
    return (
      <EmptyState
        title="No articles found"
        description={emptyMessage ?? 'There are no articles here yet. Check back soon!'}
        action={{ label: 'Browse all articles', href: '/articles' }}
      />
    );
  }

  if (variant === 'compact') {
    return (
      <div className={cn('space-y-6', className)}>
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} variant="compact" />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        'grid grid-cols-1 gap-6',
        columns === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3',
        className
      )}
    >
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} variant="default" />
      ))}
    </div>
  );
}
