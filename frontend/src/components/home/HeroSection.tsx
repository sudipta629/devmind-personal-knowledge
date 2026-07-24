import Link from 'next/link';
import { ArrowRight, BookOpen, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { SITE_CONFIG } from '@/constants/site';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white pb-16 pt-32 dark:bg-slate-950">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid opacity-50" aria-hidden />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-brand-400/20 via-violet-400/10 to-transparent blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-sm font-medium text-brand-700 dark:border-brand-800 dark:bg-brand-900/30 dark:text-brand-300">
          <Sparkles className="h-3.5 w-3.5" />
          Software Engineering &amp; Technical Education
        </div>

        {/* Heading */}
        <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
          Learn, Build, and{' '}
          <span className="text-gradient">Grow</span>{' '}
          as an Engineer
        </h1>

        {/* Sub-heading */}
        <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-slate-500 dark:text-slate-400 sm:text-xl">
          Hi, I&apos;m <strong className="font-semibold text-slate-800 dark:text-slate-200">{SITE_CONFIG.author.name}</strong>.
          I write in-depth articles about system design, Java, microservices, AI, and everything
          in between to help engineers level up.
        </p>

        {/* CTAs */}
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link href="/articles">
            <Button size="lg" variant="primary" className="w-full sm:w-auto gap-2">
              <BookOpen className="h-5 w-5" />
              Read Articles
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <a
            href={SITE_CONFIG.author.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" /></svg>
              GitHub
            </Button>
          </a>
        </div>

        {/* Stats */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-slate-500 dark:text-slate-400">
          {[
            { label: 'Articles Published', value: '150+' },
            { label: 'Monthly Readers', value: '50k+' },
            { label: 'Categories', value: '13' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</div>
              <div className="text-xs">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
