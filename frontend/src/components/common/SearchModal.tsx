'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, X, Clock, Tag, TrendingUp } from 'lucide-react';
import { useSearch } from '@/hooks/useSearch';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';
import { formatReadingTime, formatDateShort } from '@/lib/formatters';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const POPULAR_SEARCHES = ['Spring Boot', 'System Design', 'Kafka', 'LLM', 'Interview'];

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { query, setQuery, results, isLoading, clearSearch } = useSearch();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      clearSearch();
    }
  }, [isOpen, clearSearch]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center pt-[10vh] px-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        className="relative w-full max-w-2xl animate-slide-down rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900"
        role="dialog"
        aria-modal="true"
        aria-label="Search articles"
      >
        {/* Search input */}
        <div className="flex items-center gap-3 border-b border-slate-100 p-4 dark:border-slate-800">
          <Search className="h-5 w-5 shrink-0 text-slate-400" />
          <input
            ref={inputRef}
            id="search-input"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles, topics, tags…"
            className="flex-1 bg-transparent text-base text-slate-900 placeholder-slate-400 outline-none dark:text-slate-100"
            autoComplete="off"
          />
          {query && (
            <button
              onClick={clearSearch}
              aria-label="Clear search"
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <button
            onClick={onClose}
            aria-label="Close search"
            className="ml-1 rounded-lg px-2 py-1 text-xs text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800"
          >
            Esc
          </button>
        </div>

        {/* Results / Default state */}
        <div className="max-h-[60vh] overflow-y-auto">
          {!query && (
            <div className="p-4">
              <p className="mb-3 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-slate-400">
                <TrendingUp className="h-3.5 w-3.5" />
                Popular searches
              </p>
              <div className="flex flex-wrap gap-2">
                {POPULAR_SEARCHES.map((s) => (
                  <button
                    key={s}
                    onClick={() => setQuery(s)}
                    className="rounded-full border border-slate-200 px-3 py-1 text-sm text-slate-600 transition-colors hover:border-brand-400 hover:text-brand-600 dark:border-slate-700 dark:text-slate-400 dark:hover:border-brand-500 dark:hover:text-brand-400"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-brand-500 border-t-transparent" />
            </div>
          )}

          {query && !isLoading && results.length === 0 && (
            <div className="py-12 text-center text-slate-500 dark:text-slate-400">
              <Search className="mx-auto mb-3 h-8 w-8 opacity-40" />
              <p className="font-medium">No results for &ldquo;{query}&rdquo;</p>
              <p className="mt-1 text-sm">Try different keywords or browse categories</p>
            </div>
          )}

          {results.length > 0 && (
            <ul className="divide-y divide-slate-100 dark:divide-slate-800" role="list">
              {results.map((article) => (
                <li key={article.id}>
                  <Link
                    href={`/articles/${article.slug}`}
                    onClick={onClose}
                    className="flex items-start gap-3 p-4 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  >
                    <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-lg">
                      <Image
                        src={article.thumbnail}
                        alt={article.title}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-900 dark:text-slate-100">
                        {article.title}
                      </p>
                      <p className="mt-0.5 line-clamp-1 text-xs text-slate-500 dark:text-slate-400">
                        {article.description}
                      </p>
                      <div className="mt-1.5 flex items-center gap-2 text-xs text-slate-400">
                        <Clock className="h-3 w-3" />
                        {formatReadingTime(article.readingTime)}
                        <span>·</span>
                        <Tag className="h-3 w-3" />
                        {article.category}
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {results.length > 0 && (
            <div className="border-t border-slate-100 px-4 py-3 text-center dark:border-slate-800">
              <Link
                href={`/search?q=${encodeURIComponent(query)}`}
                onClick={onClose}
                className="text-sm text-brand-600 hover:underline dark:text-brand-400"
              >
                See all {results.length} results →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
