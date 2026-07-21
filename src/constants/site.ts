export const SITE_CONFIG = {
  name: 'Bappaditya Roy',
  title: 'Bappaditya Roy ',
  description:
    'A personal knowledge base covering software engineering, system design, AI, Java, Spring Boot, Microservices, Kafka, and more. Learn, explore, and grow.',
  url: 'https://bappaditya.dev',
  author: {
    name: 'Bappaditya Roy',
    bio: 'Software Engineer passionate about distributed systems, clean architecture, and teaching complex concepts simply.',
    avatar: '/images/avatar.jpg',
    github: 'https://github.com/bappadityaroy',
    twitter: 'https://twitter.com/bappadityaroy',
    linkedin: 'https://linkedin.com/in/bappadityaroy',
    email: 'hi@bappaditya.dev',
  },
  ogImage: '/og-image.png',
  twitterHandle: '@bappadityaroy',
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
