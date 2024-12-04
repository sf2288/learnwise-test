import clsx from "clsx";
import { TextareaHTMLAttributes, forwardRef } from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={clsx(
          "border border-input rounded-md px-3 py-2 text-sm placeholder-muted-foreground",
          "focus:outline-none focus:ring-1 focus:ring-ring focus:border-ring",
          "bg-background text-foreground disabled:opacity-50 disabled:cursor-not-allowed",
          className
        )}
        {...props}
      />
    );
  }
);

TextArea.displayName = "TextArea";

export default TextArea;
