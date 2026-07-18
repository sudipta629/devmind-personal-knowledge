import Link from 'next/link';
import { Home, Search } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-6 text-8xl font-black text-gradient select-none">404</div>
      <h1 className="mb-3 text-2xl font-bold text-slate-900 dark:text-white">
        Page not found
      </h1>
      <p className="mb-8 max-w-md text-slate-500 dark:text-slate-400">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
        Try browsing our articles or searching for what you need.
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Link href="/">
          <Button variant="primary" className="gap-2">
            <Home className="h-4 w-4" />
            Go Home
          </Button>
        </Link>
        <Link href="/search">
          <Button variant="outline" className="gap-2">
            <Search className="h-4 w-4" />
            Search Articles
          </Button>
        </Link>
      </div>
    </div>
  );
}
