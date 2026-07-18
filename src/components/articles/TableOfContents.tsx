'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronUp, List } from 'lucide-react';
import { useTableOfContents } from '@/hooks/useTableOfContents';
import { cn } from '@/lib/utils';
import type { TOCItem } from '@/types';

interface TableOfContentsProps {
  items: TOCItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  if (!items || items.length === 0) return null;

  return (
    <>
      {/* Desktop: sticky sidebar */}
      <div className="hidden xl:block">
        <DesktopTOC items={items} />
      </div>

      {/* Mobile: collapsible */}
      <div className="xl:hidden">
        <MobileTOC items={items} />
      </div>
    </>
  );
}

function DesktopTOC({ items }: { items: TOCItem[] }) {
  const { activeId } = useTableOfContents(items);

  return (
    <nav aria-label="Table of contents" className="sticky top-24">
      <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
        <List className="h-3.5 w-3.5" />
        On this page
      </p>
      <ul className="space-y-1">
        {items.map((item) => (
          <TOCItemComponent key={item.id} item={item} activeId={activeId} />
        ))}
      </ul>
    </nav>
  );
}

function MobileTOC({ items }: { items: TOCItem[] }) {
  const { activeId } = useTableOfContents(items);
  const [open, setOpen] = useState(false);

  const activeItem = items.find((i) => i.id === activeId);

  return (
    <div className="mb-8 rounded-xl border border-slate-200 dark:border-slate-800">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between p-4 text-sm font-medium text-slate-700 dark:text-slate-300"
        aria-expanded={open}
      >
        <span className="flex items-center gap-2">
          <List className="h-4 w-4 text-slate-400" />
          {activeItem ? activeItem.title : 'Table of Contents'}
        </span>
        {open ? (
          <ChevronUp className="h-4 w-4 text-slate-400" />
        ) : (
          <ChevronDown className="h-4 w-4 text-slate-400" />
        )}
      </button>

      {open && (
        <nav className="border-t border-slate-100 p-4 dark:border-slate-800" aria-label="Table of contents">
          <ul className="space-y-1">
            {items.map((item) => (
              <TOCItemComponent key={item.id} item={item} activeId={activeId} onSelect={() => setOpen(false)} />
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}

function TOCItemComponent({
  item,
  activeId,
  onSelect,
}: {
  item: TOCItem;
  activeId: string;
  onSelect?: () => void;
}) {
  const isActive = item.id === activeId;

  return (
    <li>
      <a
        href={`#${item.id}`}
        onClick={onSelect}
        className={cn(
          'block rounded-lg px-3 py-1.5 text-sm transition-all duration-200',
          item.level === 3 && 'ml-4 text-xs',
          isActive
            ? 'bg-brand-50 font-medium text-brand-700 dark:bg-brand-900/30 dark:text-brand-300'
            : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200'
        )}
      >
        {item.title}
      </a>
      {item.children && item.children.length > 0 && (
        <ul className="mt-1 space-y-1">
          {item.children.map((child) => (
            <TOCItemComponent key={child.id} item={child} activeId={activeId} onSelect={onSelect} />
          ))}
        </ul>
      )}
    </li>
  );
}
