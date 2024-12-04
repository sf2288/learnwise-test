import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatHref = (href: string) => {
  if (!href) return href;

  // Add 'http://' if href doesn't contain http:// or https://
  return href.startsWith('http://') || href.startsWith('https://')
    ? href
    : `http://${href}`;
};
