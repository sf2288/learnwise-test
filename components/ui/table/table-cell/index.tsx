import { ReactNode } from 'react';

interface TableCellProps {
  children: ReactNode;
  className?: string;
  isHeader?: boolean;
  colSpan?: number;
}

export default function TableCell({
  children,
  className = '',
  isHeader = false,
  colSpan
}: TableCellProps) {
  const baseClass = 'p-4';
  return isHeader ? (
    <th
      className={`${baseClass} px-4 py-2 text-left align-middle font-medium text-muted-foreground ${className}`}
    >
      {children}
    </th>
  ) : (
    <td className={`${baseClass} ${className}`} colSpan={colSpan}>
      {children}
    </td>
  );
}
