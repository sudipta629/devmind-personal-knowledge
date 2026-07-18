'use client';

import { useScrollProgress } from '@/hooks/useScrollProgress';

export function ScrollProgressBar() {
  const progress = useScrollProgress();

  return (
    <div
      className="fixed left-0 top-0 z-[60] h-1 bg-gradient-to-r from-brand-500 to-violet-500 transition-all duration-150"
      style={{ width: `${progress}%` }}
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
    />
  );
}
