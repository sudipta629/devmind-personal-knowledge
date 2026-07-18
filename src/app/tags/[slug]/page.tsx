import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { generateMetadata as genMeta } from '@/lib/seo';
import { getTagBySlug, getAllTagSlugs } from '@/services/tagService';
import { getArticles } from '@/services/articleService';
import { ArticleGrid } from '@/components/articles/ArticleGrid';
import { Badge } from '@/components/ui/Badge';

interface TagPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllTagSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tag = await getTagBySlug(slug);
  if (!tag) return {};
  return genMeta({
    title: `#${tag.name}`,
    description: `Browse all articles tagged with ${tag.name}.`,
  });
}

export default async function TagPage({ params }: TagPageProps) {
  const { slug } = await params;

  const [tag, { articles }] = await Promise.all([
    getTagBySlug(slug),
    getArticles({ tag: slug, limit: 50 }),
  ]);

  if (!tag) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-24 pt-32 sm:px-6">
      <div className="mb-10 text-center">
        <Badge variant="tag" className="mb-4 text-base px-4 py-1.5">
          #{tag.name}
        </Badge>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
          Articles tagged &ldquo;{tag.name}&rdquo;
        </h1>
        <p className="mt-2 text-slate-500 dark:text-slate-400">
          {tag.articleCount} articles found
        </p>
      </div>

      <ArticleGrid
        articles={articles}
        columns={3}
        emptyMessage={`No articles with tag ${tag.name} yet.`}
      />
    </div>
  );
}
