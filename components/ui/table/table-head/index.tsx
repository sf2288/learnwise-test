import { cn } from '@/utils/helper';
import { ReactNode } from 'react';

interface TableHeaderProps {
  children: ReactNode;
  className?: string;
}

export default function TableHead({
  className = '',
  ...props
}: TableHeaderProps) {
  return (
    <th
      className={cn(
        'px-4 py-3 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0',
        className
      )}
      {...props}
    />
  );
}
