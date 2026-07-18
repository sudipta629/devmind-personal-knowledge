import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { ShareButton } from '@/components/articles/ShareButton';
import { formatDate, formatReadingTime, formatNumber } from '@/lib/formatters';
import type { Article } from '@/types';

interface ArticleHeaderProps {
  article: Article;
}

export function ArticleHeader({ article }: ArticleHeaderProps) {
  return (
    <header className="mb-10">
      {/* Category */}
      <div className="mb-4">
        <Link href={`/categories/${article.categorySlug}`}>
          <Badge variant="category" className="text-sm px-3 py-1">
            {article.category}
          </Badge>
        </Link>
      </div>

      {/* Title */}
      <h1 className="mb-4 text-3xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl lg:text-5xl">
        {article.title}
      </h1>

      {/* Description */}
      <p className="mb-6 text-lg leading-relaxed text-slate-500 dark:text-slate-400">
        {article.description}
      </p>

      {/* Meta row */}
      <div className="flex flex-wrap items-center gap-4 border-y border-slate-100 py-4 dark:border-slate-800">
        {/* Author */}
        <div className="flex items-center gap-3">
          <Image
            src={article.author.avatar}
            alt={article.author.name}
            width={40}
            height={40}
            className="rounded-full ring-2 ring-brand-100 dark:ring-brand-900"
          />
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              {article.author.name}
            </p>
            <p className="text-xs text-slate-400">Author</p>
          </div>
        </div>

        <div className="h-8 w-px bg-slate-200 dark:bg-slate-700" />

        {/* Date */}
        <div className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
          <Calendar className="h-4 w-4" />
          {formatDate(article.publishedAt)}
        </div>

        {/* Reading time */}
        <div className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
          <Clock className="h-4 w-4" />
          {formatReadingTime(article.readingTime)}
        </div>

        {/* Views */}
        {article.views && (
          <div className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
            <Eye className="h-4 w-4" />
            {formatNumber(article.views)} views
          </div>
        )}

        {/* Share */}
        <div className="ml-auto">
          <ShareButton title={article.title} />
        </div>
      </div>

      {/* Tags */}
      <div className="mt-4 flex flex-wrap gap-2">
        {article.tags.map((tag) => (
          <Link key={tag} href={`/tags/${tag}`}>
            <Badge variant="tag">#{tag}</Badge>
          </Link>
        ))}
      </div>

      {/* Hero thumbnail */}
      <div className="relative mt-8 h-64 w-full overflow-hidden rounded-2xl sm:h-80 lg:h-96">
        <Image
          src={article.thumbnail}
          alt={article.title}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 1280px) 100vw, 1280px"
        />
        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/5" />
      </div>
    </header>
  );
}
