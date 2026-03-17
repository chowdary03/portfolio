import Link from 'next/link';

interface BackToHomeProps {
  align?: 'left' | 'center';
  className?: string;
}

export function BackToHome({ align = 'left', className = '' }: BackToHomeProps) {
  const alignClass = align === 'center' ? 'text-center' : '';
  return (
    <p className={`${alignClass} ${className}`.trim()}>
      <Link
        href="/"
        className="text-sm font-medium text-accent hover:text-accent-hover underline-offset-2 hover:underline"
      >
        ← Back to home
      </Link>
    </p>
  );
}
