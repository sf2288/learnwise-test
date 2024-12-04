import { cn } from '@/utils/helper';
import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          'w-full rounded-md border border-input px-3 py-2 text-sm placeholder-muted-foreground',
          'focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring',
          'bg-background text-foreground disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        type={type}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export default Input;
