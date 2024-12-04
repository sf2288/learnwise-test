import { twMerge } from 'tailwind-merge';

export default function Container({
  children,
  className = ''
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const containerClasses = twMerge(
    'container mx-auto flex justify-between items-center',
    className // External className passed via props
  );
  return <div className={containerClasses}>{children}</div>;
}
