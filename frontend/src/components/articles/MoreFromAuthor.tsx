import Link from 'next/link';
import Image from 'next/image';
import type { Article } from '@/types';

export function MoreFromAuthor({ articles, authorName }: { articles: Article[], authorName: string }) {
  if (!articles || articles.length === 0) return null;

  return (
    <section className="mt-16 pt-16 border-t border-slate-100 dark:border-slate-800">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          More from {authorName}
        </h2>
        <Link 
          href={`/@${authorName}`}
          className="text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300"
        >
          View all
        </Link>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <article key={article.slug} className="group relative flex flex-col items-start justify-between">
            <Link href={`/articles/${article.slug}`} className="absolute inset-0 z-0" />
            
            <div className="relative z-10 w-full mb-4">
              <div className="aspect-[16/9] w-full rounded-2xl bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <Image
                  src={article.thumbnail}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>

            <div className="relative z-10 flex flex-1 flex-col justify-between w-full">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                    {article.category}
                  </span>
                  <span className="text-slate-300 dark:text-slate-700">•</span>
                  <time dateTime={article.publishedAt} className="text-xs font-medium text-slate-500">
                    {new Date(article.publishedAt).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </time>
                </div>
                
                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors line-clamp-2 mb-2">
                  {article.title}
                </h3>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
