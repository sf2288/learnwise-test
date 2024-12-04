import { ReactNode } from 'react';

interface TableRowProps {
  children: ReactNode;
  className?: string;
  alternate?: boolean;
}

export default function TableRow({
  children,
  className = '',
  alternate = false
}: TableRowProps) {
  return (
    <tr
      className={`border-b transition-colors hover:bg-muted/80 data-[state=selected]:bg-muted ${
        alternate ? 'even:bg-muted/50' : ''
      } ${className}`}
    >
      {children}
    </tr>
  );
}
