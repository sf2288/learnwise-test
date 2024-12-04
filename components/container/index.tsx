export default function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`container mx-auto flex justify-between items-center ${className}`}
    >
      {children}
    </div>
  );
}
