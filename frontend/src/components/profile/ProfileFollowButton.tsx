'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { UserPlus, UserCheck } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useFollow } from '@/contexts/FollowContext';

interface ProfileFollowButtonProps {
  authorId: string;
}

export function ProfileFollowButton({ authorId }: ProfileFollowButtonProps) {
  const { user, openLoginModal } = useAuth();
  const { isUserFollowing, toggleFollow, initializeAuthorState } = useFollow();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    initializeAuthorState(authorId);
  }, [authorId, initializeAuthorState]);

  const following = isUserFollowing(authorId);

  // If viewing our own profile, hide follow button
  if (user?.id === authorId) {
    return null;
  }

  const handleFollow = async () => {
    if (!user) {
      openLoginModal();
      return;
    }
    setLoading(true);
    await toggleFollow(authorId);
    setLoading(false);
  };

  return (
    <Button 
      onClick={handleFollow} 
      variant={following ? 'outline' : 'primary'}
      isLoading={loading}
      className={`gap-2 rounded-xl ${following ? 'text-green-600 border-green-200 hover:bg-green-50 hover:text-green-700 hover:border-green-300 dark:border-green-900/50 dark:text-green-500' : ''}`}
    >
      {following ? (
        <><UserCheck className="w-4 h-4" /> Following</>
      ) : (
        <><UserPlus className="w-4 h-4" /> Follow</>
      )}
    </Button>
  );
}
