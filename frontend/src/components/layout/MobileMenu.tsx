'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { NAV_LINKS } from '@/constants/navigation';
import { X, LayoutDashboard, LogOut, BookOpen, PenTool, Bookmark, Settings, FileText, Trash2, Edit, User as UserIcon } from 'lucide-react';
import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const DASHBOARD_LINKS = [
  { id: 'home', label: 'Dashboard Home', href: '/dashboard?tab=home', icon: LayoutDashboard },
  { id: 'write', label: 'Write Article', href: '/write', icon: Edit },
  { id: 'my-articles', label: 'My Articles', href: '/dashboard?tab=my-articles', icon: BookOpen },
  { id: 'drafts', label: 'Draft Articles', href: '/dashboard?tab=drafts', icon: PenTool },
  { id: 'published', label: 'Published Articles', href: '/dashboard?tab=published', icon: FileText },
  { id: 'bookmarks', label: 'Bookmarks', href: '/dashboard?tab=bookmarks', icon: Bookmark },
  { id: 'analytics', label: 'Analytics', href: '/dashboard?tab=analytics', icon: LayoutDashboard },
  { id: 'profile', label: 'Profile Settings', href: '/dashboard?tab=settings', icon: Settings },
];

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const { user, loading, openLoginModal, openRegisterModal, logout } = useAuth();

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity duration-300 lg:hidden',
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={cn(
          'fixed inset-y-0 right-0 z-50 w-72 bg-white shadow-2xl transition-transform duration-300 dark:bg-slate-900 lg:hidden flex flex-col',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div className="flex items-center justify-between border-b border-slate-100 p-5 dark:border-slate-800 shrink-0">
          <span className="text-lg font-bold text-slate-900 dark:text-white">Navigation</span>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <nav className="p-4">
            <ul className="space-y-1" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={onClose}
                  className={cn(
                    'flex w-full items-center rounded-xl px-4 py-3 text-sm font-medium transition-colors duration-200',
                    pathname === link.href || pathname.startsWith(link.href + '/')
                      ? 'bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100'
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            {!loading && user && (
              <li className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800">
                <span className="px-4 text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2 block">Dashboard</span>
                <ul className="space-y-1">
                  {DASHBOARD_LINKS.map((link) => {
                    const Icon = link.icon;
                    return (
                      <li key={link.id}>
                        <Link
                          href={link.href}
                          onClick={onClose}
                          className={cn(
                            'flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors duration-200',
                            pathname === link.href || (pathname === '/dashboard' && link.href.includes('tab=home'))
                              ? 'bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300'
                              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100'
                          )}
                        >
                          <Icon className="h-4 w-4" />
                          {link.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
            )}
          </ul>
        </nav>
        </div>

        {!loading && !user && (
          <div className="p-4 border-t border-slate-100 dark:border-slate-800 space-y-2 shrink-0">
            <button
              onClick={() => { onClose(); openLoginModal(); }}
              className="w-full rounded-xl px-4 py-3 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 transition-colors"
            >
              Login
            </button>
            <button
              onClick={() => { onClose(); openRegisterModal(); }}
              className="w-full rounded-xl px-4 py-3 text-sm font-medium text-white bg-brand-600 hover:bg-brand-700 transition-colors"
            >
              Register
            </button>
          </div>
        )}

        {!loading && user && (
          <div className="p-4 border-t border-slate-100 dark:border-slate-800 shrink-0">
             <button
              onClick={() => { onClose(); logout(); }}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        )}

        <div className="flex items-center justify-between border-t border-slate-100 p-4 dark:border-slate-800 shrink-0">
          <p className="text-xs text-slate-400">
            © 2025 Sudipto.
          </p>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-slate-500">Theme</span>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </>
  );
}
