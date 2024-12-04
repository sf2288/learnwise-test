import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`rounded-md border bg-card shadow-sm ${className}`}>
      {children}
    </div>
  );
}
