import clsx from "clsx";
import { ReactNode } from "react";

interface TableHeaderProps {
  children: ReactNode;
  className?: string;
}

export default function TableHead({
  className = "",
  ...props
}: TableHeaderProps) {
  return (
    <th
      className={clsx(
        "py-3 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
        className
      )}
      {...props}
    />
  );
}
