import { ReactNode } from 'react';

interface TableBodyProps {
  children: ReactNode;
  className?: string;
}

export default function TableBody({
  children,
  className = ''
}: TableBodyProps) {
  return (
    <tbody className={`[&_tr:last-child]:border-0 ${className}`}>
      {children}
    </tbody>
  );
}
