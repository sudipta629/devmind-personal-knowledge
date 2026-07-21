'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Search, Menu, X, BookOpen } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { SearchModal } from '@/components/common/SearchModal';
import { MobileMenu } from '@/components/layout/MobileMenu';
import { NAV_LINKS } from '@/constants/navigation';
import { cn } from '@/lib/utils';

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Close mobile menu on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
        setSearchOpen(false);
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-300',
          scrolled
            ? 'glass border-b border-slate-200/60 shadow-sm dark:border-slate-800/60'
            : 'bg-transparent'
        )}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group focus-ring rounded-lg">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-violet-600 shadow-sm group-hover:shadow-glow transition-shadow">
              <BookOpen className="h-4 w-4 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-[#CCE5FF]">
              Bappaditya Roy
            </span>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden items-center gap-1 lg:flex" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    'rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 focus-ring',
                    pathname === link.href || pathname.startsWith(link.href + '/')
                      ? 'bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100'
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            <button
              id="search-trigger"
              onClick={() => setSearchOpen(true)}
              aria-label="Open search"
              className={cn(
                'flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-200 focus-ring',
                'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900',
                'dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-100'
              )}
            >
              <Search className="h-4 w-4" />
            </button>

            <ThemeToggle />

            {/* Mobile menu button */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              className={cn(
                'flex h-9 w-9 items-center justify-center rounded-xl lg:hidden',
                'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900',
                'dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-100',
                'focus-ring transition-all duration-200'
              )}
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      {/* Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
