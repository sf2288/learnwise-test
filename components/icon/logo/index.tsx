import { cn } from '@/utils/helper';
import React from 'react';

interface IconProps {
  className?: string;
}

/**
 * A reusable SVG component for a logo icon.
 *
 * @param {string} [className] - Additional CSS classes to apply to the SVG element.
 * @returns {ReactElement} A React SVG element representing the logo icon.
 */
const LogoIcon: React.FC<IconProps> = ({
  className = 'stroke-primary-foreground'
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('size-6', className)}
    >
      <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
    </svg>
  );
};
export default LogoIcon;
