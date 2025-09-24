import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'white' | 'gray';
  text?: string;
  className?: string;
}

export default function LoadingSpinner({
  size = 'md',
  color = 'primary',
  text,
  className
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-8 w-8 border-2',
    md: 'h-12 w-12 border-3',
    lg: 'h-16 w-16 border-4',
    xl: 'h-20 w-20 border-4'
  };

  const colorClasses = {
    primary: 'border-green-600',
    white: 'border-white',
    gray: 'border-gray-600'
  };

  return (
    <div className={cn('flex flex-col items-center justify-center', className)}>
      <div className="relative">
        <div className={cn(
          'rounded-full border-gray-200',
          sizeClasses[size]
        )} />
        <div className={cn(
          'absolute top-0 rounded-full border-t-transparent animate-spin',
          sizeClasses[size],
          colorClasses[color]
        )} />
      </div>
      {text && (
        <p className={cn(
          'mt-4 text-sm',
          color === 'white' ? 'text-white' : 'text-gray-600'
        )}>
          {text}
        </p>
      )}
    </div>
  );
}