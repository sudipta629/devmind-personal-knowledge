import { searchArticles } from '@/services/searchService';
import { ArticleCard } from '@/components/articles/ArticleCard';
import { Search } from 'lucide-react';
import Link from 'next/link';

interface SearchPageProps {
  searchParams: Promise<{ q?: string; page?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q, page } = await searchParams;
  const query = q || '';
  const currentPage = Number(page) || 1;

  const results = query ? await searchArticles(query, currentPage) : null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-6">
            Search Articles
          </h1>
          <form action="/search" method="GET" className="relative">
            <input
              type="text"
              name="q"
              defaultValue={query}
              placeholder="Search for articles, topics, or authors..."
              className="w-full h-14 pl-12 pr-4 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-brand-500 outline-none text-lg text-slate-900 dark:text-white shadow-sm"
              autoComplete="off"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors">
              Search
            </button>
          </form>
        </div>

        {results && (
          <div className="animate-in fade-in slide-in-from-bottom-4">
            <div className="mb-6">
              <h2 className="text-lg font-medium text-slate-700 dark:text-slate-300">
                Found {results.total} results for <span className="text-slate-900 dark:text-white font-bold">&quot;{query}&quot;</span>
              </h2>
            </div>

            {results.articles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {results.articles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 mt-8">
                <Search className="h-12 w-12 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">No matches found</h3>
                <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                  We couldn't find any articles matching your search. Try checking your spelling or using more general terms.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
