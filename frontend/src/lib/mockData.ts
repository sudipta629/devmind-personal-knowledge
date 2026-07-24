import type { Article, Author, Tag, Category } from '@/types';

export const MOCK_AUTHOR: Author = {
  id: '1',
  name: 'Alex Chen',
  avatar: 'https://ui-avatars.com/api/?name=Alex+Chen&background=6366f1&color=fff&size=256',
  bio: 'Senior Software Engineer with 8+ years of experience building distributed systems. Passionate about clean architecture, performance, and teaching complex concepts simply.',
  github: 'https://github.com/alexchen',
  twitter: 'https://twitter.com/alexchen',
  linkedin: 'https://linkedin.com/in/alexchen',
};

export const MOCK_CATEGORIES: Category[] = [
  { id: '1', slug: 'technology', name: 'Technology', description: 'Tech articles', icon: '💻', color: 'blue', articleCount: 0 },
  { id: '2', slug: 'programming', name: 'Programming', description: 'Coding articles', icon: '⌨️', color: 'green', articleCount: 0 },
  { id: '3', slug: 'career', name: 'Career', description: 'Career advice', icon: '🚀', color: 'purple', articleCount: 0 },
  { id: '4', slug: 'life', name: 'Life', description: 'Life thoughts', icon: '🌱', color: 'yellow', articleCount: 0 },
];

export const MOCK_TAGS: Tag[] = [
  { id: '1', slug: 'java', name: 'Java', articleCount: 18 },
  { id: '2', slug: 'spring-boot', name: 'Spring Boot', articleCount: 14 },
  { id: '3', slug: 'microservices', name: 'Microservices', articleCount: 12 },
  { id: '4', slug: 'kafka', name: 'Kafka', articleCount: 9 },
  { id: '5', slug: 'system-design', name: 'System Design', articleCount: 15 },
  { id: '6', slug: 'docker', name: 'Docker', articleCount: 10 },
  { id: '7', slug: 'kubernetes', name: 'Kubernetes', articleCount: 8 },
  { id: '8', slug: 'ai', name: 'AI', articleCount: 16 },
  { id: '9', slug: 'machine-learning', name: 'Machine Learning', articleCount: 13 },
  { id: '10', slug: 'llm', name: 'LLM', articleCount: 11 },
  { id: '11', slug: 'databases', name: 'Databases', articleCount: 12 },
  { id: '12', slug: 'postgresql', name: 'PostgreSQL', articleCount: 7 },
  { id: '13', slug: 'redis', name: 'Redis', articleCount: 8 },
  { id: '14', slug: 'design-patterns', name: 'Design Patterns', articleCount: 14 },
  { id: '15', slug: 'clean-code', name: 'Clean Code', articleCount: 10 },
  { id: '16', slug: 'interview', name: 'Interview', articleCount: 20 },
  { id: '17', slug: 'career', name: 'Career', articleCount: 9 },
  { id: '18', slug: 'productivity', name: 'Productivity', articleCount: 7 },
  { id: '19', slug: 'python', name: 'Python', articleCount: 8 },
  { id: '20', slug: 'rest-api', name: 'REST API', articleCount: 11 },
];

export const MOCK_ARTICLES: Article[] = [];
