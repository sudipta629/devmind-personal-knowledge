'use client';

import { useEffect, useState } from 'react';
import { useFollow } from '@/contexts/FollowContext';

interface ProfileFollowersCountProps {
  authorId: string;
  initialCount: number;
}

export function ProfileFollowersCount({ authorId, initialCount }: ProfileFollowersCountProps) {
  const { followersCount, initializeAuthorState } = useFollow();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    initializeAuthorState(authorId);
    setMounted(true);
  }, [authorId, initializeAuthorState]);

  const count = mounted ? followersCount(authorId) : initialCount;

  return <>{count.toLocaleString()}</>;
}
