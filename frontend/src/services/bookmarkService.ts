import type { Article } from '@/types';
import { getArticleBySlug } from './articleService';

const STORAGE_KEY = 'mock_bookmarks';

function getStoredBookmarks(): Record<string, string[]> {
  if (typeof window === 'undefined') return {};
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : {};
}

function saveStoredBookmarks(bookmarks: Record<string, string[]>) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
  }
}

export async function addBookmark(userId: string, articleSlug: string): Promise<void> {
  const bookmarks = getStoredBookmarks();
  if (!bookmarks[userId]) bookmarks[userId] = [];
  if (!bookmarks[userId].includes(articleSlug)) {
    bookmarks[userId].push(articleSlug);
    saveStoredBookmarks(bookmarks);
  }
}

export async function removeBookmark(userId: string, articleSlug: string): Promise<void> {
  const bookmarks = getStoredBookmarks();
  if (bookmarks[userId]) {
    bookmarks[userId] = bookmarks[userId].filter(slug => slug !== articleSlug);
    saveStoredBookmarks(bookmarks);
  }
}

export async function isBookmarked(userId: string, articleSlug: string): Promise<boolean> {
  const bookmarks = getStoredBookmarks();
  return bookmarks[userId]?.includes(articleSlug) || false;
}

export async function getUserBookmarks(userId: string): Promise<Article[]> {
  const bookmarks = getStoredBookmarks()[userId] || [];
  const articles: Article[] = [];
  for (const slug of bookmarks) {
    const article = await getArticleBySlug(slug);
    if (article) articles.push(article);
  }
  return articles;
}
