import type { User } from '@/types';

const MOCK_USER_KEY = 'mock_user_data';

export const authService = {
  async register(data: Partial<User>): Promise<User> {
    const newUser: User = {
      id: Math.random().toString(36).substring(7),
      fullName: data.fullName || '',
      username: data.username || '',
      email: data.email || '',
      phone: data.phone || '',
      avatar: data.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(data.fullName || 'User')}&background=random`,
      stats: {
        totalArticles: 0,
        totalViews: 0,
        followers: 0,
        following: 0,
      },
    };
    if (typeof window !== 'undefined') {
      localStorage.setItem(MOCK_USER_KEY, JSON.stringify(newUser));
    }
    return newUser;
  },

  async login(identifier: string): Promise<User> {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(MOCK_USER_KEY);
      if (stored) {
        return JSON.parse(stored) as User;
      }
    }
    // Fallback if no user is registered locally
    const fallbackUser: User = {
      id: 'default-1',
      fullName: 'Test User',
      username: identifier,
      email: identifier.includes('@') ? identifier : `${identifier}@example.com`,
      avatar: `https://ui-avatars.com/api/?name=Test+User&background=6366f1&color=fff`,
      stats: {
        totalArticles: 5,
        totalViews: 1250,
        followers: 42,
        following: 10,
      },
    };
    if (typeof window !== 'undefined') {
      localStorage.setItem(MOCK_USER_KEY, JSON.stringify(fallbackUser));
    }
    return fallbackUser;
  },

  async logout(): Promise<void> {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(MOCK_USER_KEY);
    }
  },

  async getProfile(): Promise<User | null> {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(MOCK_USER_KEY);
      if (stored) {
        return JSON.parse(stored) as User;
      }
    }
    return null;
  },

  async updateProfile(updates: Partial<User>): Promise<User> {
    const current = await this.getProfile();
    if (!current) throw new Error('Not logged in');
    const updated = { ...current, ...updates };
    if (typeof window !== 'undefined') {
      localStorage.setItem(MOCK_USER_KEY, JSON.stringify(updated));
    }
    return updated;
  }
};
