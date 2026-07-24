'use client';

import { useState, useEffect, useRef } from 'react';
import type { TOCItem } from '@/types';

export function useTableOfContents(items: TOCItem[]) {
  const [activeId, setActiveId] = useState<string>('');
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (items.length === 0) return;

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      }
    };

    observerRef.current = new IntersectionObserver(handleIntersect, {
      rootMargin: '-20% 0% -70% 0%',
      threshold: 0,
    });

    const allIds = items.flatMap((item) => [
      item.id,
      ...(item.children?.map((c) => c.id) ?? []),
    ]);

    allIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, [items]);

  return { activeId };
}
