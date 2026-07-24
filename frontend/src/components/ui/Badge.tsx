import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'category' | 'tag' | 'outline';
  className?: string;
  style?: React.CSSProperties;
}

const variantClasses: Record<NonNullable<BadgeProps['variant']>, string> = {
  default:
    'bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300',
  category:
    'bg-violet-50 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300',
  tag:
    'bg-slate-100 text-slate-600 hover:bg-brand-50 hover:text-brand-700 transition-colors cursor-pointer dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-brand-900/30 dark:hover:text-brand-300',
  outline:
    'border border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-400',
};

export function Badge({ children, variant = 'default', className, style }: BadgeProps) {
  return (
    <span
      style={style}
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
