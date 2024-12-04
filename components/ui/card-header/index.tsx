import { ReactNode } from "react";

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

export default function CardHeader({
  children,
  className = "",
}: CardHeaderProps) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}
