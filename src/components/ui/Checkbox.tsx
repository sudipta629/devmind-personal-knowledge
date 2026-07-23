import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            type="checkbox"
            ref={ref}
            className={cn(
              "w-4 h-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500",
              "dark:border-slate-600 dark:bg-slate-700 dark:ring-offset-slate-800 cursor-pointer",
              className
            )}
            {...props}
          />
        </div>
        {(label || error) && (
          <div className="ml-3 text-sm">
            {label && (
              <label htmlFor={props.id} className="font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
                {label}
              </label>
            )}
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          </div>
        )}
      </div>
    );
  }
);
Checkbox.displayName = 'Checkbox';
