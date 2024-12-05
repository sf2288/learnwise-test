import { cn, formatHref } from '@/utils/helper';
import Link from 'next/link';
import { ReactNode } from 'react';

interface CustomLinkProps {
  href: string;
  isExternal?: boolean;
  format?: boolean;
  children: ReactNode;
  className?: string;
  target?: '_self' | '_blank' | '_parent' | '_top';
  download?: boolean;
  onClick?: () => void;
}

/**
 * CustomLink component renders an anchor or Next.js Link element.
 *
 * @param {string} href - The URL the link points to.
 * @param {boolean} [isExternal=false] - Indicates if the link is external.
 * @param {ReactNode} children - The content inside the link.
 * @param {string} [className=''] - Optional CSS classes to apply.
 * @param {'_self' | '_blank' | '_parent' | '_top'} [target='_blank'] - Specifies where to open the link.
 * @param {boolean} [download=false] - Specifies if the link should download a resource.
 * @param {() => void} [onClick] - Optional click handler.
 * @param {boolean} [format=false] - Flag to format the href.
 * @param {object} rest - Additional props to pass to the link element.
 * @returns {JSX.Element} A rendered anchor or Link element based on the props.
 */
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
