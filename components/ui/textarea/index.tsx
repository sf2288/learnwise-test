import { cn } from '@/utils/helper';
import { TextareaHTMLAttributes, forwardRef } from 'react';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className = '', ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          'rounded-md border border-input px-3 py-2 text-sm placeholder-muted-foreground',
          'focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring',
          'bg-background text-foreground disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        {...props}
      />
    );
  }
);

TextArea.displayName = 'TextArea';

export default TextArea;
