import { FileQuestion } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

interface EmptyStateProps {
  title?: string;
  description?: string;
  action?: {
    label: string;
    href: string;
  };
  icon?: React.ReactNode;
}

export function EmptyState({
  title = 'Nothing here yet',
  description = 'No content found. Check back later.',
  action,
  icon,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="mb-4 text-slate-300 dark:text-slate-600">
        {icon ?? <FileQuestion className="h-12 w-12" />}
      </div>
      <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-slate-500 dark:text-slate-400">{description}</p>
      {action && (
        <div className="mt-6">
          <Link href={action.href}>
            <Button variant="secondary">{action.label}</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
