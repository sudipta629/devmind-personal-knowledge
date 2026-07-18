export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Technical', href: '/categories/technical' },
  { label: 'AI', href: '/categories/artificial-intelligence' },
  { label: 'Psychology', href: '/categories/psychology' },
  { label: 'Interview', href: '/categories/interview-preparation' },
  { label: 'Projects', href: '/categories/projects' },
  { label: 'About', href: '/about' },
] as const;

export const FOOTER_LINKS = {
  categories: [
    { label: 'Technical', href: '/categories/technical' },
    { label: 'Artificial Intelligence', href: '/categories/artificial-intelligence' },
    { label: 'System Design', href: '/categories/system-design' },
    { label: 'Java', href: '/categories/java' },
    { label: 'Spring Boot', href: '/categories/spring-boot' },
    { label: 'Microservices', href: '/categories/microservices' },
    { label: 'Psychology', href: '/categories/psychology' },
    { label: 'Interview Prep', href: '/categories/interview-preparation' },
  ],
  pages: [
    { label: 'Home', href: '/' },
    { label: 'All Articles', href: '/articles' },
    { label: 'Categories', href: '/categories' },
    { label: 'About', href: '/about' },
    { label: 'Search', href: '/search' },
  ],
} as const;
