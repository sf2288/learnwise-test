import { cn } from '@/utils/helper';
import { LabelHTMLAttributes, forwardRef } from 'react';

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  className?: string;
  required?: boolean; // Indicates if the label is for a required field
}

const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, required = false, children, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn('block text-sm font-medium', className)}
        {...props}
      >
        {children}
        {required && <span className="ml-1">*</span>}
      </label>
    );
  }
);

Label.displayName = 'Label';

export default Label;
