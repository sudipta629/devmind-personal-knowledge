export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  articleCount: number;
  featured?: boolean;
}

export interface CategoryWithArticles extends Category {
  articles: import('./article').ArticleListItem[];
}
