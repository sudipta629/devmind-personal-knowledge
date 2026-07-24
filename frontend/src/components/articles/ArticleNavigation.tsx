import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import type { ArticleListItem } from '@/types';
import { cn } from '@/lib/utils';

interface ArticleNavigationProps {
  previous: ArticleListItem | null;
  next: ArticleListItem | null;
}

export function ArticleNavigation({ previous, next }: ArticleNavigationProps) {
  if (!previous && !next) return null;

  return (
    <nav
      className="mt-12 grid grid-cols-1 gap-4 border-t border-slate-100 pt-8 dark:border-slate-800 sm:grid-cols-2"
      aria-label="Article navigation"
    >
      {previous ? (
        <NavCard article={previous} direction="previous" />
      ) : (
        <div />
      )}
      {next && <NavCard article={next} direction="next" />}
    </nav>
  );
}

function NavCard({
  article,
  direction,
}: {
  article: ArticleListItem;
  direction: 'previous' | 'next';
}) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className={cn(
        'group flex items-center gap-4 rounded-2xl border border-slate-100 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-card-hover dark:border-slate-800 dark:hover:border-brand-800',
        direction === 'next' && 'sm:flex-row-reverse sm:text-right'
      )}
    >
      {direction === 'previous' ? (
        <ChevronLeft className="h-5 w-5 shrink-0 text-slate-400 transition-transform group-hover:-translate-x-1" />
      ) : (
        <ChevronRight className="h-5 w-5 shrink-0 text-slate-400 transition-transform group-hover:translate-x-1" />
      )}
      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg">
        <Image
          src={article.thumbnail}
          alt={article.title}
          fill
          className="object-cover"
          sizes="48px"
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-slate-400 mb-0.5">
          {direction === 'previous' ? '← Previous' : 'Next →'}
        </p>
        <p className="line-clamp-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
          {article.title}
        </p>
      </div>
    </Link>
  );
}
