'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { followAuthor, unfollowAuthor, isFollowing, getFollowersCount, getFollowingCount } from '@/services/followService';

interface FollowState {
  followers: Record<string, number>;
  followingCount: number;
  followingMap: Record<string, boolean>; // authorId -> boolean
}

interface FollowContextType {
  followersCount: (authorId: string) => number;
  followingCount: number;
  isUserFollowing: (authorId: string) => boolean;
  toggleFollow: (authorId: string) => Promise<void>;
  initializeAuthorState: (authorId: string) => void;
}

const FollowContext = createContext<FollowContextType | undefined>(undefined);

export function FollowProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  
  const [state, setState] = useState<FollowState>({
    followers: {},
    followingCount: 0,
    followingMap: {}
  });

  // Whenever the logged-in user changes, update their following count
  useEffect(() => {
    if (user) {
      getFollowingCount(user.id).then(count => {
        setState(prev => ({ ...prev, followingCount: count }));
      });
    } else {
      setState(prev => ({ ...prev, followingCount: 0, followingMap: {} }));
    }
  }, [user]);

  const initializeAuthorState = (authorId: string) => {
    Promise.all([
      getFollowersCount(authorId),
      user ? isFollowing(user.id, authorId) : Promise.resolve(false)
    ]).then(([fCount, isF]) => {
      setState(prev => ({
        ...prev,
        followers: { ...prev.followers, [authorId]: fCount },
        followingMap: { ...prev.followingMap, [authorId]: isF }
      }));
    });
  };

  const toggleFollow = async (authorId: string) => {
    if (!user) return;
    
    const currentlyFollowing = state.followingMap[authorId] || false;
    const currentFollowers = state.followers[authorId] || 0;
    
    // Optimistic UI update
    setState(prev => ({
      ...prev,
      followingMap: { ...prev.followingMap, [authorId]: !currentlyFollowing },
      followers: { ...prev.followers, [authorId]: currentlyFollowing ? currentFollowers - 1 : currentFollowers + 1 },
      followingCount: currentlyFollowing ? prev.followingCount - 1 : prev.followingCount + 1
    }));

    try {
      if (currentlyFollowing) {
        await unfollowAuthor(user.id, authorId);
      } else {
        await followAuthor(user.id, authorId);
      }
    } catch (e) {
      // Revert on failure
      setState(prev => ({
        ...prev,
        followingMap: { ...prev.followingMap, [authorId]: currentlyFollowing },
        followers: { ...prev.followers, [authorId]: currentFollowers },
        followingCount: currentlyFollowing ? prev.followingCount + 1 : prev.followingCount - 1
      }));
      console.error(e);
    }
  };

  const getFollowersCountSafe = (authorId: string) => state.followers[authorId] || 0;
  const isUserFollowingSafe = (authorId: string) => state.followingMap[authorId] || false;

  return (
    <FollowContext.Provider value={{
      followersCount: getFollowersCountSafe,
      followingCount: state.followingCount,
      isUserFollowing: isUserFollowingSafe,
      toggleFollow,
      initializeAuthorState
    }}>
      {children}
    </FollowContext.Provider>
  );
}

export function useFollow() {
  const context = useContext(FollowContext);
  if (context === undefined) {
    throw new Error('useFollow must be used within a FollowProvider');
  }
  return context;
}
