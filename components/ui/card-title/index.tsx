import { ReactNode } from "react";

interface CardTitleProps {
  children: ReactNode;
  className?: string;
}

export default function CardTitle({
  children,
  className = "",
}: CardTitleProps) {
  return (
    <h2
      className={`text-2xl font-semibold leading-none tracking-tight ${className}`}
    >
      {children}
    </h2>
  );
}
