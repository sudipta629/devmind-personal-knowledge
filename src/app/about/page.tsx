import Image from 'next/image';
import Link from 'next/link';
import { Mail, BookOpen, Code2, Layers, Brain } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { SITE_CONFIG } from '@/constants/site';
import { generateMetadata as genMeta } from '@/lib/seo';
import { getLatestArticles } from '@/services/articleService';
import { ArticleCard } from '@/components/articles/ArticleCard';
import { NewsletterSection } from '@/components/home/NewsletterSection';

export const metadata = genMeta({
  title: 'About',
  description: `Learn about ${SITE_CONFIG.author.name}, a Senior Software Engineer passionate about distributed systems, clean architecture, and teaching.`,
});

const skills = [
  { icon: Code2, label: 'Java & Spring Boot', level: 95 },
  { icon: Layers, label: 'System Design', level: 90 },
  { icon: Brain, label: 'Machine Learning & AI', level: 75 },
  { icon: BookOpen, label: 'Technical Writing', level: 85 },
];

const timeline = [
  { year: '2025', title: 'Started DevMind', desc: 'Launched this knowledge platform to share engineering insights.' },
  { year: '2022', title: 'Senior Software Engineer', desc: 'Joined a unicorn startup leading backend architecture for 10M+ users.' },
  { year: '2019', title: 'Software Engineer', desc: 'Built distributed systems at a fintech company handling billions in transactions.' },
  { year: '2017', title: 'B.Sc. Computer Science', desc: 'Graduated with honors from a top technical university.' },
];

export default async function AboutPage() {
  const { author } = SITE_CONFIG;
  const recentArticles = await getLatestArticles(3);

  return (
    <>
      <div className="mx-auto max-w-4xl px-4 py-24 pt-32 sm:px-6">
        {/* Hero */}
        <div className="mb-16 flex flex-col items-center gap-8 text-center sm:flex-row sm:text-left">
          <div className="relative shrink-0">
            <div className="absolute -inset-1.5 rounded-full bg-gradient-to-br from-brand-500 to-violet-600 blur opacity-40" />
            <Image
              src={author.avatar}
              alt={author.name}
              width={160}
              height={160}
              className="relative rounded-full ring-4 ring-white dark:ring-slate-900"
              priority
            />
          </div>
          <div>
            <p className="mb-1 text-sm font-medium text-brand-600 dark:text-brand-400">Senior Software Engineer</p>
            <h1 className="mb-3 text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
              {author.name}
            </h1>
            <p className="text-base leading-relaxed text-slate-600 dark:text-slate-400">{author.bio}</p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
              <a href={author.github} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm" className="gap-2">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" /></svg>
                  GitHub
                </Button>
              </a>
              <a href={author.twitter} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm" className="gap-2">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.264 5.633L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                  Twitter / X
                </Button>
              </a>
              <a href={author.linkedin} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm" className="gap-2">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                  LinkedIn
                </Button>
              </a>
              <a href={`mailto:${author.email}`}>
                <Button variant="primary" size="sm" className="gap-2">
                  <Mail className="h-4 w-4" />
                  Contact
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* Skills */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">Skills & Expertise</h2>
          <div className="space-y-4">
            {skills.map(({ icon: Icon, label, level }) => (
              <div key={label}>
                <div className="mb-1.5 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                    <Icon className="h-4 w-4 text-brand-500" />
                    {label}
                  </div>
                  <span className="text-xs text-slate-400">{level}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-brand-500 to-violet-500 transition-all duration-1000"
                    style={{ width: `${level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">Career Timeline</h2>
          <div className="relative space-y-6 pl-6 before:absolute before:left-2 before:top-2 before:h-full before:w-0.5 before:bg-slate-200 before:dark:bg-slate-800">
            {timeline.map((item) => (
              <div key={item.year} className="relative">
                <div className="absolute -left-4 mt-1 h-3 w-3 rounded-full border-2 border-brand-500 bg-white dark:bg-slate-950" />
                <div className="card p-4">
                  <div className="mb-1 flex items-center gap-2">
                    <span className="rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-bold text-brand-700 dark:bg-brand-900/30 dark:text-brand-300">
                      {item.year}
                    </span>
                    <h3 className="font-semibold text-slate-900 dark:text-slate-100">{item.title}</h3>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Articles */}
        <section className="mb-16">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Recent Articles</h2>
            <Link href="/articles" className="text-sm font-medium text-brand-600 dark:text-brand-400 hover:underline">
              View all →
            </Link>
          </div>
          <div className="space-y-4">
            {recentArticles.map((article) => (
              <ArticleCard key={article.id} article={article} variant="compact" />
            ))}
          </div>
        </section>
      </div>

      <NewsletterSection />
    </>
  );
}
