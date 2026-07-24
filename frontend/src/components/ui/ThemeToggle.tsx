'use client';

import { useTheme } from 'next-themes';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className={cn('h-9 w-9 rounded-xl bg-slate-100 dark:bg-slate-800', className)} />
    );
  }

  const cycleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('system');
    else setTheme('light');
  };

  return (
    <button
      id="theme-toggle"
      onClick={cycleTheme}
      aria-label={`Current theme: ${theme}. Click to change.`}
      className={cn(
        'flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-200',
        'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900',
        'dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-100',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500',
        className
      )}
    >
      {theme === 'dark' ? (
        <Moon className="h-4 w-4" />
      ) : theme === 'system' ? (
        <Monitor className="h-4 w-4" />
      ) : (
        <Sun className="h-4 w-4" />
      )}
    </button>
  );
}
