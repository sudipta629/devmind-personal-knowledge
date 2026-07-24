import type { User } from '@/types';
import { authService } from './authService';

export const profileService = {
  async getProfile(): Promise<User | null> {
    return authService.getProfile();
  },

  async updateProfile(updates: Partial<User>): Promise<User> {
    return authService.updateProfile(updates);
  },

  async uploadAvatar(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  },

  async uploadCover(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  }
};
