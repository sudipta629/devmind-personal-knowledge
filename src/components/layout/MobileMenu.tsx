'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { NAV_LINKS } from '@/constants/navigation';
import { X, LayoutDashboard, LogOut } from 'lucide-react';
import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const { user, openLoginModal, openRegisterModal } = useAuth();

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
          'fixed inset-y-0 right-0 z-50 w-72 bg-white shadow-2xl transition-transform duration-300 dark:bg-slate-900 lg:hidden',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div className="flex items-center justify-between border-b border-slate-100 p-5 dark:border-slate-800">
          <span className="text-lg font-bold text-slate-900 dark:text-white">Navigation</span>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

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
            
            {user && (
              <li>
                <Link
                  href="/dashboard"
                  onClick={onClose}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors duration-200 mt-2 border-t border-slate-100 dark:border-slate-800 pt-3',
                    pathname.startsWith('/dashboard')
                      ? 'bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100'
                  )}
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>
              </li>
            )}
          </ul>
        </nav>

        {!user ? (
          <div className="p-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
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
        ) : (
          <div className="p-4 border-t border-slate-100 dark:border-slate-800 mt-auto absolute bottom-14 left-0 right-0">
             <button
              onClick={() => { onClose(); useAuth().logout(); }}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 border-t border-slate-100 p-4 dark:border-slate-800">
          <p className="text-center text-xs text-slate-400">
            © 2025 Sudipta. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
}
