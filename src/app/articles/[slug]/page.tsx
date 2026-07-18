import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { generateMetadata as genMeta } from '@/lib/seo';
import { getArticleBySlug, getAllArticleSlugs, getRelatedArticles, getArticleNavigation } from '@/services/articleService';
import { ArticleHeader } from '@/components/articles/ArticleHeader';
import { TableOfContents } from '@/components/articles/TableOfContents';
import { RelatedArticles } from '@/components/articles/RelatedArticles';
import { ArticleNavigation } from '@/components/articles/ArticleNavigation';
import { SITE_CONFIG } from '@/constants/site';
import { ScrollProgressBar } from '@/components/articles/ScrollProgressBar';

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return {};

  return genMeta({
    title: article.title,
    description: article.description,
    image: article.thumbnail,
    url: `${SITE_CONFIG.url}/articles/${article.slug}`,
    type: 'article',
    publishedTime: article.publishedAt,
    tags: article.tags,
  });
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;

  const [article, relatedArticles, navigation] = await Promise.all([
    getArticleBySlug(slug),
    getRelatedArticles(slug),
    getArticleNavigation(slug),
  ]);

  if (!article) notFound();

  const tocItems = article.tableOfContents ?? [];

  return (
    <>
      <ScrollProgressBar />

      <div className="mx-auto max-w-7xl px-4 pt-24 pb-16 sm:px-6">
        <div className="flex gap-12">
          {/* TOC — Left sidebar (desktop) */}
          {tocItems.length > 0 && (
            <aside className="hidden xl:block w-64 shrink-0">
              <TableOfContents items={tocItems} />
            </aside>
          )}

          {/* Main content */}
          <article className="min-w-0 flex-1">
            <ArticleHeader article={article} />

            {/* Mobile TOC */}
            {tocItems.length > 0 && <TableOfContents items={tocItems} />}

            {/* Article body */}
            <div className="prose-article">
              <ArticleBody article={article} />
            </div>

            <ArticleNavigation previous={navigation.previous} next={navigation.next} />
          </article>
        </div>

        <RelatedArticles articles={relatedArticles} />
      </div>
    </>
  );
}

// Inline article body — replace with MDX rendering when content is added
function ArticleBody({ article }: { article: Awaited<ReturnType<typeof getArticleBySlug>> & {} }) {
  if (!article) return null;

  return (
    <div className="space-y-6">
      {(article.tableOfContents ?? []).map((section) => (
        <section key={section.id}>
          <h2 id={section.id} className="scroll-mt-24 text-2xl font-bold text-slate-900 dark:text-slate-100">
            {section.title}
          </h2>
          <p className="mt-4 leading-relaxed text-slate-600 dark:text-slate-400">
            This section covers <strong>{section.title}</strong> in detail. Content will be loaded
            from MDX files or your backend API. The architecture is already set up to render
            full rich-text content here — replace this component with your MDX renderer.
          </p>
          <div className="my-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-400" />
                <div className="h-3 w-3 rounded-full bg-yellow-400" />
                <div className="h-3 w-3 rounded-full bg-green-400" />
              </div>
              <span className="text-xs text-slate-400 font-mono">example.java</span>
            </div>
            <pre className="font-mono text-sm text-slate-700 dark:text-slate-300 overflow-x-auto">
              <code>{`// ${section.title} example
@RestController
@RequestMapping("/api")
public class ExampleController {
    
    @GetMapping("/hello")
    public ResponseEntity<String> hello() {
        return ResponseEntity.ok("Hello, DevMind!");
    }
}`}</code>
            </pre>
          </div>
        </section>
      ))}
      {(article.tableOfContents ?? []).length === 0 && (
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          {article.description} Full article content will be rendered here from MDX files or your backend API.
        </p>
      )}
    </div>
  );
}
