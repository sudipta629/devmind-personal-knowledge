export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Articles', href: '/articles' },
  { label: 'Projects', href: '/projects' },
  { label: 'Interview', href: '/interview' },
  { label: 'About', href: '/about' },
] as const;

export const FOOTER_LINKS = {
  categories: [
    { label: 'Projects', href: '/projects' },
    { label: 'Interview Prep', href: '/interview' },
  ],
  pages: [
    { label: 'Home', href: '/' },
    { label: 'Articles', href: '/articles' },
    { label: 'About', href: '/about' },
  ],
} as const;
