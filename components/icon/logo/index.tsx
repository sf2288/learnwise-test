import React from 'react';

interface IconProps {
  className?: string;
}

const LogoIcon: React.FC<IconProps> = ({
  className = 'stroke-primary-foreground'
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`size-6 ${className}`} // Combine passed className with default classes
  >
    <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
  </svg>
);

export default LogoIcon;
