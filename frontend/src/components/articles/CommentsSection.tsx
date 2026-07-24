'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getComments, addComment, deleteComment, likeComment, type Comment } from '@/services/commentService';
import { Button } from '@/components/ui/Button';
import { Heart, Trash2, Reply } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import Image from 'next/image';

export function CommentsSection({ articleSlug }: { articleSlug: string }) {
  const { user, openLoginModal } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getComments(articleSlug).then(setComments);
  }, [articleSlug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return openLoginModal();
    if (!newComment.trim()) return;

    setLoading(true);
    try {
      const added = await addComment({
        articleSlug,
        userId: user.id,
        userName: user.fullName,
        userAvatar: user.avatar || '',
        content: newComment.trim()
      });
      setComments([added, ...comments]);
      setNewComment('');
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!user) return;
    if (confirm('Are you sure you want to delete this comment?')) {
      await deleteComment(id, user.id);
      setComments(comments.filter(c => c.id !== id));
    }
  };

  const handleLike = async (id: string) => {
    if (!user) return openLoginModal();
    await likeComment(id);
    setComments(comments.map(c => c.id === id ? { ...c, likes: c.likes + 1 } : c));
  };

  return (
    <div id="comments-section" className="mt-16 pt-16 border-t border-slate-100 dark:border-slate-800">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">
        Comments ({comments.length})
      </h2>

      {user ? (
        <form onSubmit={handleSubmit} className="mb-10 flex gap-4">
          <Image src={user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150'} alt="" width={40} height={40} className="h-10 w-10 rounded-full object-cover shrink-0" />
          <div className="flex-1">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="What are your thoughts?"
              className="w-full min-h-[100px] p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none resize-y text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
            />
            <div className="mt-3 flex justify-end">
              <Button type="submit" isLoading={loading} disabled={!newComment.trim()}>
                Post Comment
              </Button>
            </div>
          </div>
        </form>
      ) : (
        <div className="mb-10 p-6 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
          <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">Join the conversation</h3>
          <p className="text-sm text-slate-500 mb-4">You need to be logged in to leave a comment.</p>
          <Button onClick={openLoginModal}>Log in to comment</Button>
        </div>
      )}

      <div className="space-y-8">
        {comments.map(comment => (
          <div key={comment.id} className="flex gap-4 group">
            <Image src={comment.userAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150'} alt="" width={40} height={40} className="h-10 w-10 rounded-full object-cover shrink-0" />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-slate-900 dark:text-white">{comment.userName}</span>
                  <span className="text-xs text-slate-500">{formatDistanceToNow(new Date(comment.createdAt))} ago</span>
                </div>
              </div>
              <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed mb-3">
                {comment.content}
              </p>
              <div className="flex items-center gap-4">
                <button onClick={() => handleLike(comment.id)} className="flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  <Heart className="h-4 w-4" /> {comment.likes || 0}
                </button>
                <button className="flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  <Reply className="h-4 w-4" /> Reply
                </button>
                {user?.id === comment.userId && (
                  <button onClick={() => handleDelete(comment.id)} className="flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100">
                    <Trash2 className="h-4 w-4" /> Delete
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
        {comments.length === 0 && (
          <p className="text-center text-slate-500 dark:text-slate-400 py-8">
            No comments yet. Be the first to share your thoughts!
          </p>
        )}
      </div>
    </div>
  );
}
