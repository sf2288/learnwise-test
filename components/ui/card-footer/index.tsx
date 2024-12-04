import clsx from "clsx";
import { ReactNode } from "react";

interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

export default function CardFooter({
  className = "",
  ...props
}: CardFooterProps) {
  return <div className={clsx("flex items-center", className)} {...props} />;
}
