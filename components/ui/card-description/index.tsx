import { ReactNode } from 'react';

interface CardDescriptionProps {
  children: ReactNode;
  className?: string;
}

export default function CardDescription({
  children,
  className = ''
}: CardDescriptionProps) {
  return (
    <p className={`text-sm text-muted-foreground ${className}`}>{children}</p>
  );
}
