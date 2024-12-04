import { Icons } from '@/components/Icons';
import { cn } from '@/utils/helper';
import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'destructive';
  size?: 'default' | 'sm' | 'md' | 'lg';
  className?: string;
  loading?: boolean;
}

// Spinner icon for loading state
const SpinnerIcon = Icons['spinner'];

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      loading,
      variant = 'primary',
      size = 'sm',
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    // Base styles for the button
    const baseStyles =
      'rounded-md text-sm font-medium focus:outline-none focus:ring-1 flex items-center justify-center gap-2';

    // Styles based on the variant
    const variantStyles = {
      primary:
        'bg-primary text-primary-foreground hover:bg-primary/80 focus:ring-primary',
      secondary:
        'bg-secondary text-secondary-foreground hover:bg-secondary/80 focus:ring-secondary',
      destructive:
        'bg-destructive text-destructive-foreground hover:bg-destructive/80 focus:ring-destructive',
      outline:
        'border border-input bg-background hover:bg-accent hover:text-accent-foreground'
    };

    // Styles based on the size
    const sizeStyles = {
      default: 'h-10 px-4 py-2',
      sm: 'h-9 rounded-md px-3',
      md: 'h-10 rounded-md px-3',
      lg: 'h-11 rounded-md px-8'
    };

    // Disabled styles
    const disabledStyles = disabled
      ? 'disabled:opacity-50 disabled:cursor-not-allowed'
      : '';

    // Merging all styles using twMerge to avoid conflicts
    const buttonClasses = cn(
      baseStyles,
      variantStyles[variant], // Select the variant styles dynamically
      sizeStyles[size], // Select the size styles dynamically
      disabledStyles, // Disabled state styles
      className // External className passed via props
    );

    return (
      <button ref={ref} className={buttonClasses} {...props}>
        {children}
        {loading && <SpinnerIcon className="animate-spin" />}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
