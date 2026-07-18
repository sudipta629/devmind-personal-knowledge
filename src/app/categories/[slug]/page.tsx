import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { generateMetadata as genMeta } from '@/lib/seo';
import { getCategoryBySlug, getAllCategorySlugs } from '@/services/categoryService';
import { getArticles } from '@/services/articleService';
import { CategoryHeader } from '@/components/category/CategoryHeader';
import { ArticleGrid } from '@/components/articles/ArticleGrid';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllCategorySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return {};
  return genMeta({
    title: category.name,
    description: category.description,
  });
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;

  const [category, { articles }] = await Promise.all([
    getCategoryBySlug(slug),
    getArticles({ category: slug, limit: 50 }),
  ]);

  if (!category) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-24 pt-28 sm:px-6">
      <CategoryHeader category={category} />
      <div className="mt-12">
        <ArticleGrid
          articles={articles}
          columns={3}
          emptyMessage={`No articles in ${category.name} yet. Check back soon!`}
        />
      </div>
    </div>
  );
}
