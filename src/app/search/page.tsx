'use client';

import { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { ArticleGrid } from '@/components/articles/ArticleGrid';
import { ArticleGridSkeleton } from '@/components/ui/Skeleton';
import { useSearch } from '@/hooks/useSearch';

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get('q') ?? '';
  const { query, setQuery, results, isLoading } = useSearch(initialQuery);

  useEffect(() => {
    if (query !== initialQuery) {
      const params = new URLSearchParams();
      if (query) params.set('q', query);
      router.replace(`/search?${params.toString()}`, { scroll: false });
    }
  }, [query, initialQuery, router]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-24 pt-32 sm:px-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
          Search Articles
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          Search across all articles by title, topic, or tags.
        </p>
      </div>

      {/* Search input */}
      <div className="mb-10 max-w-xl">
        <Input
          id="search-page-input"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search articles…"
          icon={<Search className="h-4 w-4" />}
          autoFocus
        />
      </div>

      {/* Results */}
      {isLoading ? (
        <ArticleGridSkeleton count={6} />
      ) : query ? (
        <>
          {results.length > 0 && (
            <p className="mb-6 text-sm text-slate-500 dark:text-slate-400">
              Found {results.length} result{results.length !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;
            </p>
          )}
          <ArticleGrid
            articles={results}
            columns={3}
            emptyMessage={`No articles found for "${query}". Try different keywords.`}
          />
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center text-slate-400">
          <Search className="mb-4 h-12 w-12 opacity-30" />
          <p className="text-lg font-medium text-slate-600 dark:text-slate-400">
            Start typing to search articles
          </p>
          <p className="mt-1 text-sm">Search by title, topic, category, or tags</p>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense>
      <SearchContent />
    </Suspense>
  );
}
