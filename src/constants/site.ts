export const SITE_CONFIG = {
  name: 'DevMind',
  title: 'DevMind — Software Engineering & Technical Education',
  description:
    'A personal knowledge base covering software engineering, system design, AI, Java, Spring Boot, Microservices, Kafka, and more. Learn, explore, and grow.',
  url: 'https://devmind.dev',
  author: {
    name: 'Alex Chen',
    bio: 'Senior Software Engineer with 8+ years of experience. Passionate about distributed systems, clean architecture, and teaching complex concepts simply.',
    avatar: '/images/avatar.jpg',
    github: 'https://github.com/alexchen',
    twitter: 'https://twitter.com/alexchen',
    linkedin: 'https://linkedin.com/in/alexchen',
    email: 'alex@devmind.dev',
  },
  ogImage: '/og-image.png',
  twitterHandle: '@alexchen',
  keywords: [
    'software engineering',
    'system design',
    'java',
    'spring boot',
    'microservices',
    'kafka',
    'artificial intelligence',
    'machine learning',
    'career',
    'interview preparation',
  ],
} as const;

export const PAGINATION = {
  defaultLimit: 9,
  featuredLimit: 3,
  relatedLimit: 3,
} as const;
