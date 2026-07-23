'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useFollow } from '@/contexts/FollowContext';
import { Button } from '@/components/ui/Button';
import { UserPlus, UserCheck } from 'lucide-react';
import { getAuthorProfile } from '@/services/authorService';
import type { Author } from '@/types';
import Link from 'next/link';

export function AuthorSection({ initialAuthor }: { initialAuthor: Author }) {
  const { user, openLoginModal } = useAuth();
  const { isUserFollowing, toggleFollow, initializeAuthorState, followersCount } = useFollow();
  const [author, setAuthor] = useState(initialAuthor);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch real author profile in case it changed
    getAuthorProfile(initialAuthor.name).then(profile => {
      if (profile) setAuthor(profile);
    });
  }, [initialAuthor]);

  useEffect(() => {
    if (author) {
      initializeAuthorState(author.id);
    }
  }, [author, initializeAuthorState]);

  const following = isUserFollowing(author.id);

  const handleFollow = async () => {
    if (!user) {
      openLoginModal();
      return;
    }
    setLoading(true);
    await toggleFollow(author.id);
    setLoading(false);
  };

  return (
    <div className="my-12 p-8 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <Link href={`/@${author.name}`}>
            <img src={author.avatar} alt={author.name} className="h-16 w-16 rounded-full object-cover ring-4 ring-white dark:ring-slate-950" />
          </Link>
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
              <Link href={`/@${author.name}`}>{author.name}</Link>
            </h3>
            <p className="text-sm text-slate-500 mb-1">@{author.name.toLowerCase().replace(/\s/g, '')}</p>
            <p className="text-xs font-medium text-slate-400">
              {followersCount(author.id).toLocaleString()} Followers
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" disabled className="opacity-50 cursor-not-allowed">
            Message
          </Button>
          <Button 
            onClick={handleFollow} 
            variant={following ? 'outline' : 'primary'}
            isLoading={loading}
            className={following ? 'text-green-600 border-green-200 hover:bg-green-50 hover:text-green-700 hover:border-green-300 dark:border-green-900/50 dark:text-green-500' : ''}
          >
            {following ? <><UserCheck className="w-4 h-4 mr-2" /> Following</> : <><UserPlus className="w-4 h-4 mr-2" /> Follow</>}
          </Button>
        </div>
      </div>
      {author.bio && (
        <p className="mt-6 text-slate-600 dark:text-slate-400 leading-relaxed">
          {author.bio}
        </p>
      )}
    </div>
  );
}
