import { ButtonHTMLAttributes, forwardRef } from "react";
import clsx from "clsx";
import ButtonLoader from "@/components/loaders/button-loader";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "destructive";
  size?: "default" | "sm" | "md" | "lg";
  className?: string;
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      loading,
      variant = "primary",
      size = "sm",
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "rounded-md text-sm font-medium focus:outline-none focus:ring-1 flex items-center justify-center gap-2";

    const variantStyles = clsx({
      "bg-primary text-primary-foreground hover:bg-primary/80 focus:ring-primary":
        variant === "primary",
      "bg-secondary text-secondary-foreground hover:bg-secondary/80 focus:ring-secondary":
        variant === "secondary",
      "bg-destructive text-destructive-foreground hover:bg-destructive/80 focus:ring-destructive":
        variant === "destructive",
      "border border-input bg-background hover:bg-accent hover:text-accent-foreground":
        variant === "outline",
    });

    const sizeStyles = clsx({
      "h-10 px-4 py-2": size === "default",
      "h-9 rounded-md px-3": size === "sm",
      "h-11 rounded-md px-8": size === "lg",
    });

    const disabledStyles = clsx({
      "disabled:opacity-50 disabled:cursor-not-allowed": disabled,
    });

    return (
      <button
        ref={ref}
        className={clsx(
          baseStyles,
          variantStyles,
          sizeStyles,
          disabledStyles,
          className
        )}
        {...props}
      >
        {children}
        {loading ? <ButtonLoader /> : null}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
