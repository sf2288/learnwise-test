import { twMerge } from 'tailwind-merge';

/**
 * A container component that centers its children and applies a set of
 * predefined flexbox styles. It allows additional CSS classes to be passed
 * via the `className` prop for further customization.
 *
 * @param children - The content to be displayed inside the container.
 * @param className - Optional additional CSS classes to apply to the container.
 */
export default function Container({
  children,
  className = ''
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const containerClasses = twMerge(
    'container mx-auto flex justify-between items-center',
    className
  );
  return <div className={containerClasses}>{children}</div>;
}
