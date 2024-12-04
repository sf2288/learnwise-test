import { cn } from '@/utils/helper';
import { ReactNode } from 'react';

interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

export default function CardFooter({
  className = '',
  ...props
}: CardFooterProps) {
  return <div className={cn('flex items-center', className)} {...props} />;
}
