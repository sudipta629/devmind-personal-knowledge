export interface UserStats {
  totalArticles: number;
  totalViews: number;
  followers: number;
  following: number;
}

export interface User {
  id: string;
  fullName: string;
  username: string;
  email: string;
  avatar?: string;
  bio?: string;
  phone?: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  website?: string;
  location?: string;
  skills?: string[];
  education?: string[];
  experience?: string[];
  stats: UserStats;
}
