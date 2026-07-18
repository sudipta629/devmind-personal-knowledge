import Link from 'next/link';
import Image from 'next/image';
import { Clock, Calendar, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { formatDate, formatReadingTime } from '@/lib/formatters';
import { cn } from '@/lib/utils';
import type { ArticleListItem } from '@/types';

interface ArticleCardProps {
  article: ArticleListItem;
  variant?: 'default' | 'featured' | 'compact';
  className?: string;
}

export function ArticleCard({ article, variant = 'default', className }: ArticleCardProps) {
  if (variant === 'featured') {
    return <FeaturedArticleCard article={article} className={className} />;
  }

  if (variant === 'compact') {
    return <CompactArticleCard article={article} className={className} />;
  }

  return <DefaultArticleCard article={article} className={className} />;
}

function DefaultArticleCard({
  article,
  className,
}: {
  article: ArticleListItem;
  className?: string;
}) {
  return (
    <article
      className={cn(
        'card-hover group flex flex-col overflow-hidden',
        className
      )}
    >
      {/* Thumbnail */}
      <Link href={`/articles/${article.slug}`} className="relative block overflow-hidden" tabIndex={-1}>
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={article.thumbnail}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        {/* Category */}
        <div className="mb-2">
          <Link href={`/categories/${article.categorySlug}`}>
            <Badge variant="category">{article.category}</Badge>
          </Link>
        </div>

        {/* Title */}
        <h2 className="mb-2 line-clamp-2 text-base font-bold leading-snug text-slate-900 transition-colors group-hover:text-brand-600 dark:text-slate-100 dark:group-hover:text-brand-400">
          <Link href={`/articles/${article.slug}`}>{article.title}</Link>
        </h2>

        {/* Description */}
        <p className="mb-4 line-clamp-2 flex-1 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
          {article.description}
        </p>

        {/* Tags */}
        <div className="mb-4 flex flex-wrap gap-1.5">
          {article.tags.slice(0, 3).map((tag) => (
            <Link key={tag} href={`/tags/${tag}`}>
              <Badge variant="tag">#{tag}</Badge>
            </Link>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Image
              src={article.author.avatar}
              alt={article.author.name}
              width={28}
              height={28}
              className="rounded-full ring-2 ring-white dark:ring-slate-900"
            />
            <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
              {article.author.name}
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {formatReadingTime(article.readingTime)}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

function FeaturedArticleCard({
  article,
  className,
}: {
  article: ArticleListItem;
  className?: string;
}) {
  return (
    <article
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-2xl',
        className
      )}
    >
      {/* Full-bleed image */}
      <div className="relative h-72 w-full overflow-hidden rounded-2xl">
        <Image
          src={article.thumbnail}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Content over image */}
        <div className="absolute inset-0 flex flex-col justify-end p-6">
          <Link href={`/categories/${article.categorySlug}`} className="mb-2 w-fit">
            <Badge className="bg-white/20 text-white backdrop-blur-sm border border-white/30">
              {article.category}
            </Badge>
          </Link>
          <h2 className="mb-2 text-xl font-bold leading-snug text-white drop-shadow line-clamp-2">
            <Link href={`/articles/${article.slug}`}>{article.title}</Link>
          </h2>
          <p className="line-clamp-2 text-sm text-white/80">{article.description}</p>
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-white/70">
              <Clock className="h-3 w-3" />
              {formatReadingTime(article.readingTime)}
              <span>·</span>
              <Calendar className="h-3 w-3" />
              {formatDate(article.publishedAt)}
            </div>
            <Link
              href={`/articles/${article.slug}`}
              className="flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm hover:bg-white/30 transition-colors"
            >
              Read <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

function CompactArticleCard({
  article,
  className,
}: {
  article: ArticleListItem;
  className?: string;
}) {
  return (
    <article className={cn('group flex gap-4', className)}>
      <Link href={`/articles/${article.slug}`} className="relative block shrink-0" tabIndex={-1}>
        <div className="relative h-20 w-20 overflow-hidden rounded-xl">
          <Image
            src={article.thumbnail}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="80px"
          />
        </div>
      </Link>
      <div className="flex-1 min-w-0">
        <Badge variant="category" className="mb-1 text-[10px]">
          {article.category}
        </Badge>
        <h3 className="line-clamp-2 text-sm font-semibold text-slate-900 group-hover:text-brand-600 dark:text-slate-100 dark:group-hover:text-brand-400 transition-colors">
          <Link href={`/articles/${article.slug}`}>{article.title}</Link>
        </h3>
        <div className="mt-1 flex items-center gap-2 text-xs text-slate-400">
          <Clock className="h-3 w-3" />
          {formatReadingTime(article.readingTime)}
          <span>·</span>
          {formatDate(article.publishedAt)}
        </div>
      </div>
    </article>
  );
}
