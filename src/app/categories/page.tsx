import { generateMetadata as genMeta } from '@/lib/seo';
import { getCategories } from '@/services/categoryService';
import { CategoryCard } from '@/components/category/CategoryCard';

export const metadata = genMeta({
  title: 'All Categories',
  description: 'Browse all knowledge categories including technical, AI, system design, Java, and more.',
});

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="mx-auto max-w-7xl px-4 py-24 pt-32 sm:px-6">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
          All Categories
        </h1>
        <p className="mt-2 text-slate-500 dark:text-slate-400">
          {categories.length} categories covering the full spectrum of software engineering.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}
