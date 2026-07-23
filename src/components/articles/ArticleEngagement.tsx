'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { likeArticle, hasLiked, getLikeCount, unlikeArticle } from '@/services/likeService';
import { addBookmark, removeBookmark, isBookmarked } from '@/services/bookmarkService';
import { shareArticle } from '@/services/shareService';
import { Heart, Bookmark, Share2, MessageCircle, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Article } from '@/types';

export function ArticleEngagement({ article }: { article: Article }) {
  const { user, openLoginModal } = useAuth();
  
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(article.views || 0); // Using views as initial mock for likes if undefined
  const [bookmarked, setBookmarked] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const [animateHeart, setAnimateHeart] = useState(false);

  useEffect(() => {
    if (user) {
      hasLiked(user.id, article.slug).then(setLiked);
      isBookmarked(user.id, article.slug).then(setBookmarked);
    }
    getLikeCount(article.slug).then(count => {
      // Mock initial count + real likes
      setLikes((article.views ? Math.floor(article.views / 10) : 12) + count); 
    });
  }, [user, article.slug]);

  const handleLike = async () => {
    if (!user) return openLoginModal();
    if (isLiking) return;
    
    setIsLiking(true);
    try {
      if (liked) {
        await unlikeArticle(user.id, article.slug);
        setLiked(false);
        setLikes(prev => prev - 1);
      } else {
        await likeArticle(user.id, article.slug);
        setLiked(true);
        setLikes(prev => prev + 1);
        setAnimateHeart(true);
        setTimeout(() => setAnimateHeart(false), 1000);
      }
    } finally {
      setIsLiking(false);
    }
  };

  const handleBookmark = async () => {
    if (!user) return openLoginModal();
    if (bookmarked) {
      await removeBookmark(user.id, article.slug);
      setBookmarked(false);
    } else {
      await addBookmark(user.id, article.slug);
      setBookmarked(true);
    }
  };

  const handleShare = () => {
    shareArticle(article.title, article.description, window.location.href);
  };

  const scrollToComments = () => {
    const el = document.getElementById('comments-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex items-center justify-between py-6 border-y border-slate-100 dark:border-slate-800 my-8">
      <div className="flex items-center gap-6">
        <button 
          onClick={handleLike} 
          className={cn(
            "flex items-center gap-2 group transition-colors",
            liked ? "text-red-500" : "text-slate-500 hover:text-red-500 dark:text-slate-400"
          )}
        >
          <div className="relative">
            <Heart className={cn("h-6 w-6 transition-transform", liked ? "fill-current" : "", animateHeart ? "animate-ping absolute inset-0 opacity-50" : "relative")} />
            {animateHeart && <Heart className="h-6 w-6 fill-current absolute inset-0 text-red-500 scale-110" />}
          </div>
          <span className="font-medium text-sm">{likes}</span>
        </button>

        <button 
          onClick={scrollToComments}
          className="flex items-center gap-2 text-slate-500 hover:text-brand-600 dark:text-slate-400 transition-colors group"
        >
          <MessageCircle className="h-6 w-6 group-hover:fill-brand-100 dark:group-hover:fill-brand-900/30 transition-colors" />
          <span className="font-medium text-sm">Comment</span>
        </button>
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={handleBookmark}
          className={cn(
            "p-2 rounded-full transition-colors",
            bookmarked 
              ? "text-brand-600 bg-brand-50 dark:bg-brand-900/20 dark:text-brand-400" 
              : "text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300"
          )}
        >
          <Bookmark className={cn("h-5 w-5", bookmarked && "fill-current")} />
        </button>

        <button 
          onClick={handleShare}
          className="p-2 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300 transition-colors"
        >
          <Share2 className="h-5 w-5" />
        </button>

        <button 
          className="p-2 rounded-full text-slate-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-500 transition-colors"
          title="Report Article"
        >
          <AlertTriangle className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
