# Sudipto — Personal Knowledge Website

A production-ready, scalable personal knowledge website built with **Next.js 15 App Router**, **TypeScript**, and **Tailwind CSS**. Inspired by Medium but focused on software engineering and technical education.

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Type-check
npm run type-check
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout (Navbar, Footer, ThemeProvider)
│   ├── page.tsx            # Home page
│   ├── articles/           # Article listing & detail pages
│   ├── categories/         # Category listing & detail pages
│   ├── tags/               # Tag detail pages
│   ├── search/             # Search page
│   ├── about/              # About page
│   ├── sitemap.ts          # Dynamic sitemap
│   └── robots.ts           # robots.txt
│
├── components/
│   ├── ui/                 # Primitive reusable UI (Button, Badge, Input, etc.)
│   ├── layout/             # Navbar, Footer, MobileMenu
│   ├── articles/           # Article-specific components
│   ├── home/               # Home page sections
│   ├── category/           # Category components
│   └── common/             # SearchModal, EmptyState
│
├── services/               # ⭐ API service layer (swap implementations for backend)
│   ├── articleService.ts   # getArticles, getArticleBySlug, getFeaturedArticles…
│   ├── categoryService.ts  # getCategories, getCategoryBySlug…
│   ├── tagService.ts       # getTags, getTagBySlug, getPopularTags…
│   └── searchService.ts    # searchArticles…
│
├── hooks/                  # Custom React hooks
│   ├── useSearch.ts        # Debounced search hook
│   ├── useTableOfContents.ts # Active heading tracker
│   ├── useScrollProgress.ts
│   └── useLocalStorage.ts
│
├── types/                  # TypeScript type definitions
│   ├── article.ts
│   ├── category.ts
│   └── tag.ts
│
├── constants/              # App-wide constants
│   ├── site.ts             # SITE_CONFIG (name, author, URLs)
│   ├── navigation.ts       # Nav links, footer links
│   └── categories.ts       # Category data
│
├── lib/                    # Utility functions
│   ├── utils.ts            # cn(), slugify(), truncate()
│   ├── formatters.ts       # formatDate(), formatReadingTime()
│   ├── seo.ts              # generateMetadata() helper
│   └── mockData.ts         # Mock articles, tags, authors
│
└── styles/                 # Global styles
```

---

## 🏗️ Architecture — Backend Integration Guide

> **All UI components are backend-agnostic.** When your backend is ready, only change the service implementations — no UI changes needed.

### How to connect a real API

1. Open the relevant service file, e.g. `src/services/articleService.ts`
2. Replace the mock data logic with a `fetch()` call:

```ts
// Before (mock)
export async function getArticles(filters: ArticleFilters): Promise<PaginatedArticles> {
  let articles = MOCK_ARTICLES.map(toListItem);
  // ... filtering logic
  return { articles, total, page, limit, totalPages };
}

// After (real API)
export async function getArticles(filters: ArticleFilters): Promise<PaginatedArticles> {
  const params = new URLSearchParams({ ...filters });
  const res = await fetch(`${process.env.API_URL}/articles?${params}`, {
    next: { revalidate: 60 },
  });
  return res.json();
}
```

That's it. Zero UI changes required.

---

## ✨ Features

| Feature | Status |
|---|---|
| Home page (hero, featured, categories, latest, topics, about, newsletter) | ✅ |
| All articles listing with pagination | ✅ |
| Article detail page with TOC | ✅ |
| Category pages | ✅ |
| Tag pages | ✅ |
| Search (debounced, URL-synced) | ✅ |
| About page with timeline & skills | ✅ |
| Dark / Light / System mode | ✅ |
| Responsive design (mobile → desktop) | ✅ |
| SEO (metadata, Open Graph, Twitter cards) | ✅ |
| Dynamic sitemap.xml | ✅ |
| robots.txt | ✅ |
| Sticky reading progress bar | ✅ |
| Scroll-tracked TOC (desktop sidebar + mobile collapsible) | ✅ |
| Share button (copy link + Twitter) | ✅ |
| Previous / Next article navigation | ✅ |
| Related articles | ✅ |
| Loading skeletons | ✅ |
| 404 page | ✅ |

---

## 🎨 Design System

- **Colors**: `brand-*` (indigo/violet) + semantic palette via Tailwind
- **Fonts**: Inter (body) + JetBrains Mono (code)  
- **Animations**: fade-in, slide-up, shimmer, hover lifts
- **Cards**: `card`, `card-hover` utility classes
- **Glass effect**: `glass` utility (backdrop blur)

---

## ⚙️ Configuration

Edit `src/constants/site.ts` to customize:

```ts
export const SITE_CONFIG = {
  name: 'Sudipto',           // Site name
  author: {
    name: 'Alex Chen',       // Your name
    bio: '...',              // Your bio
    github: '...',           // Your GitHub
    twitter: '...',          // Your Twitter
    linkedin: '...',         // Your LinkedIn
    email: '...',            // Your email
  },
  url: 'https://sudipto.dev', // Production URL
};
```

---

## 📦 Dependencies

| Package | Purpose |
|---|---|
| `next` | Framework |
| `react` / `react-dom` | UI library |
| `typescript` | Type safety |
| `tailwindcss` | Utility CSS |
| `@tailwindcss/typography` | Prose styles |
| `next-themes` | Dark mode |
| `lucide-react` | Icons |
| `clsx` + `tailwind-merge` | Class utilities |

---

## 🔮 Adding Articles

Currently articles are defined in `src/lib/mockData.ts`. To add a new article:

1. Add an entry to `MOCK_ARTICLES` in `src/lib/mockData.ts`
2. Include `slug`, `title`, `description`, `thumbnail`, `category`, `tags`, `tableOfContents`
3. The article will appear in all listings and category/tag pages automatically

When backend is ready: the mock data file is only consumed by `services/` — replace service implementations with API calls.

---

## 📄 License

MIT — feel free to use this as a template for your own knowledge site.
