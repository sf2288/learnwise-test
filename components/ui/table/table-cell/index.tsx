import { ReactNode } from "react";

interface TableCellProps {
  children: ReactNode;
  className?: string;
  isHeader?: boolean;
  colSpan?: number;
}

export default function TableCell({
  children,
  className = "",
  isHeader = false,
  colSpan,
}: TableCellProps) {
  const baseClass = "p-4";
  return isHeader ? (
    <th
      className={`${baseClass} py-2 px-4 align-middle text-muted-foreground pl-4 text-left font-medium ${className}`}
    >
      {children}
    </th>
  ) : (
    <td className={`${baseClass} ${className}`} colSpan={colSpan}>
      {children}
    </td>
  );
}
