import type { Author } from '@/types';
import { MOCK_AUTHOR } from '@/lib/mockData';

const STORAGE_KEY = 'mock_authors';

function getStoredAuthors(): Record<string, Author> {
  if (typeof window === 'undefined') return { 'sudipto': MOCK_AUTHOR };
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) return JSON.parse(stored);
  const initial = { 'sudipto': MOCK_AUTHOR };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
  return initial;
}

function saveStoredAuthors(authors: Record<string, Author>) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(authors));
  }
}

export async function getAuthorProfile(username: string): Promise<Author | null> {
  const authors = getStoredAuthors();
  return authors[username.toLowerCase()] || null;
}

export async function updateAuthorProfile(username: string, updates: Partial<Author>): Promise<Author> {
  const authors = getStoredAuthors();
  const lower = username.toLowerCase();
  if (!authors[lower]) throw new Error('Author not found');
  authors[lower] = { ...authors[lower], ...updates };
  saveStoredAuthors(authors);
  return authors[lower];
}
