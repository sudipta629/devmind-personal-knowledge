const STORAGE_KEY = 'mock_likes';

function getStoredLikes(): Record<string, string[]> {
  if (typeof window === 'undefined') return {};
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : {};
}

function saveStoredLikes(likes: Record<string, string[]>) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(likes));
  }
}

export async function likeArticle(userId: string, articleSlug: string): Promise<void> {
  const likes = getStoredLikes();
  if (!likes[articleSlug]) likes[articleSlug] = [];
  if (!likes[articleSlug].includes(userId)) {
    likes[articleSlug].push(userId);
    saveStoredLikes(likes);
  }
}

export async function unlikeArticle(userId: string, articleSlug: string): Promise<void> {
  const likes = getStoredLikes();
  if (likes[articleSlug]) {
    likes[articleSlug] = likes[articleSlug].filter(id => id !== userId);
    saveStoredLikes(likes);
  }
}

export async function hasLiked(userId: string, articleSlug: string): Promise<boolean> {
  const likes = getStoredLikes();
  return likes[articleSlug]?.includes(userId) || false;
}

export async function getLikeCount(articleSlug: string): Promise<number> {
  const likes = getStoredLikes();
  return likes[articleSlug]?.length || 0;
}
