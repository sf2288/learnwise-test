import Link from "next/link";
import { ReactNode } from "react";

interface CustomLinkProps {
  href: string;
  isExternal?: boolean; // Determines if the link is external
  children: ReactNode;
  className?: string;
  target?: "_self" | "_blank" | "_parent" | "_top"; // Restricts to valid targets
  download?: boolean; // Specifies if the link should download a resource
  onClick?: () => void; // Optional click handler
}

export default function CustomLink({
  href,
  isExternal = false,
  children,
  className = "",
  target = "_blank",
  download = false,
  onClick,
  ...rest
}: CustomLinkProps) {
  if (isExternal) {
    return (
      <a
        href={href}
        target={target}
        onClick={onClick}
        download={download}
        className={className}
        rel="noopener noreferrer"
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      passHref
      href={href}
      onClick={onClick}
      className={className}
      {...rest}
    >
      {children}
    </Link>
  );
}
