import type { Tag } from '@/types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export async function getTags(): Promise<Tag[]> {
  try {
    const res = await fetch(`${API_BASE}/tags`, { cache: 'no-store' });
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error('Failed to fetch tags:', error);
    return [];
  }
}

export async function getTagBySlug(slug: string): Promise<Tag | null> {
  const tags = await getTags();
  return tags.find((t) => t.slug === slug) ?? null;
}

export async function getPopularTags(limit = 10): Promise<Tag[]> {
  const tags = await getTags();
  return [...tags].sort((a, b) => b.articleCount - a.articleCount).slice(0, limit);
}

export async function getAllTagSlugs(): Promise<string[]> {
  const tags = await getTags();
  return tags.map((t) => t.slug);
}
