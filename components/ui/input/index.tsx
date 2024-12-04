import { InputHTMLAttributes, forwardRef } from "react";
import clsx from "clsx";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={clsx(
          "w-full border border-input rounded-md px-3 py-2 text-sm placeholder-muted-foreground",
          "focus:outline-none focus:ring-1 focus:ring-ring focus:border-ring",
          "bg-background text-foreground disabled:opacity-50 disabled:cursor-not-allowed",
          className
        )}
        type={type}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
