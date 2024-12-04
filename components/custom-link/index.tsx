import { cn, formatHref } from '@/utils/helper';
import Link from 'next/link';
import { ReactNode } from 'react';

interface CustomLinkProps {
  href: string;
  isExternal?: boolean; // Determines if the link is external
  format?: boolean; // Optional flag to format the href
  children: ReactNode;
  className?: string;
  target?: '_self' | '_blank' | '_parent' | '_top'; // Restricts to valid targets
  download?: boolean; // Specifies if the link should download a resource
  onClick?: () => void; // Optional click handler
}

export default function CustomLink({
  href,
  isExternal = false,
  children,
  className = '',
  target = '_blank',
  download = false,
  onClick,
  format = false,
  ...rest
}: CustomLinkProps) {
  // Add 'http://' if href doesn't contain http:// or https://
  const formattedHref = format ? formatHref(href) : href;
  const linkClasses = cn(className);
  if (isExternal) {
    return (
      <a
        href={formattedHref}
        target={target}
        onClick={onClick}
        download={download}
        className={linkClasses}
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
      href={formattedHref}
      onClick={onClick}
      className={linkClasses}
      {...rest}
    >
      {children}
    </Link>
  );
}
