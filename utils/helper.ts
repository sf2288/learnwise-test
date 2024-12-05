import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * A convenience function for tailwind-merge's `twMerge` and
 * clsx. It takes any number of class names, class objects, or
 * other values accepted by clsx, and returns the merged class
 * string.
 *
 * @param {...ClassValue[]} inputs - Values to be merged into
 * a single class string
 * @returns {string} The merged class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a URL by adding 'http://' if it doesn't contain http:// or https://
 * @param {string} href The URL to format
 * @returns {string} The formatted URL
 */
export const formatHref = (href: string) => {
  if (!href) return href;

  // Add 'http://' if href doesn't contain http:// or https://
  return href.startsWith('http://') || href.startsWith('https://')
    ? href
    : `http://${href}`;
};
