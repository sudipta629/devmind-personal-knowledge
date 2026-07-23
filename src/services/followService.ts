const STORAGE_KEY = 'mock_follows';

function getStoredFollows(): Record<string, string[]> {
  if (typeof window === 'undefined') return {};
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : {};
}

function saveStoredFollows(follows: Record<string, string[]>) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(follows));
  }
}

export async function followAuthor(followerId: string, authorId: string): Promise<void> {
  const follows = getStoredFollows();
  if (!follows[followerId]) follows[followerId] = [];
  if (!follows[followerId].includes(authorId)) {
    follows[followerId].push(authorId);
    saveStoredFollows(follows);
  }
}

export async function unfollowAuthor(followerId: string, authorId: string): Promise<void> {
  const follows = getStoredFollows();
  if (follows[followerId]) {
    follows[followerId] = follows[followerId].filter(id => id !== authorId);
    saveStoredFollows(follows);
  }
}

export async function isFollowing(followerId: string, authorId: string): Promise<boolean> {
  const follows = getStoredFollows();
  return follows[followerId]?.includes(authorId) || false;
}

export async function getFollowersCount(authorId: string): Promise<number> {
  const follows = getStoredFollows();
  return Object.values(follows).filter(following => following.includes(authorId)).length;
}

export async function getFollowingCount(followerId: string): Promise<number> {
  const follows = getStoredFollows();
  return follows[followerId]?.length || 0;
}
