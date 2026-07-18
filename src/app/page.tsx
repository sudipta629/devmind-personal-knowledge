import { HeroSection } from '@/components/home/HeroSection';
import { FeaturedArticles } from '@/components/home/FeaturedArticles';
import { BrowseCategories } from '@/components/home/BrowseCategories';
import { LatestArticles } from '@/components/home/LatestArticles';
import { PopularTopics } from '@/components/home/PopularTopics';
import { AboutSection } from '@/components/home/AboutSection';
import { NewsletterSection } from '@/components/home/NewsletterSection';
import { getFeaturedArticles, getLatestArticles } from '@/services/articleService';
import { getFeaturedCategories } from '@/services/categoryService';
import { getPopularTags } from '@/services/tagService';

export default async function HomePage() {
  const [featuredArticles, latestArticles, featuredCategories, popularTags] =
    await Promise.all([
      getFeaturedArticles(3),
      getLatestArticles(6),
      getFeaturedCategories(12),
      getPopularTags(20),
    ]);

  return (
    <>
      <HeroSection />
      <FeaturedArticles articles={featuredArticles} />
      <BrowseCategories categories={featuredCategories} />
      <LatestArticles articles={latestArticles} />
      <PopularTopics tags={popularTags} />
      <AboutSection />
      <NewsletterSection />
    </>
  );
}
