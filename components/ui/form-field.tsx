import React from 'react';
import { cn } from '@/lib/utils';

interface FormFieldProps {
  children: React.ReactNode;
  className?: string;
}

export function FormField({ children, className }: FormFieldProps) {
  return (
    <div className={cn('space-y-2', className)}>
      {children}
    </div>
  );
}

interface FormLabelProps {
  children: React.ReactNode;
  className?: string;
  htmlFor?: string;
}

export function FormLabel({ children, className, htmlFor }: FormLabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        className
      )}
    >
      {children}
    </label>
  );
}

interface FormMessageProps {
  children: React.ReactNode;
  className?: string;
}

export function FormMessage({ children, className }: FormMessageProps) {
  return (
    <p className={cn('text-sm font-medium text-red-500', className)}>
      {children}
    </p>
  );
}
