export interface Comment {
  id: string;
  articleSlug: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  createdAt: string;
  likes: number;
}

const STORAGE_KEY = 'mock_comments';

function getStoredComments(): Comment[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

function saveStoredComments(comments: Comment[]) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(comments));
  }
}

export async function getComments(articleSlug: string): Promise<Comment[]> {
  return getStoredComments()
    .filter(c => c.articleSlug === articleSlug)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function addComment(comment: Omit<Comment, 'id' | 'createdAt' | 'likes'>): Promise<Comment> {
  const comments = getStoredComments();
  const newComment: Comment = {
    ...comment,
    id: Math.random().toString(36).substr(2, 9),
    createdAt: new Date().toISOString(),
    likes: 0
  };
  comments.push(newComment);
  saveStoredComments(comments);
  return newComment;
}

export async function deleteComment(id: string, userId: string): Promise<void> {
  let comments = getStoredComments();
  comments = comments.filter(c => !(c.id === id && c.userId === userId));
  saveStoredComments(comments);
}

export async function likeComment(id: string): Promise<void> {
  const comments = getStoredComments();
  const comment = comments.find(c => c.id === id);
  if (comment) {
    comment.likes += 1;
    saveStoredComments(comments);
  }
}
