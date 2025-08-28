interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  'aria-label'?: string
}

export default function LoadingSpinner({ 
  size = 'md', 
  className = '',
  'aria-label': ariaLabel = 'Loading content'
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-12 w-12', 
    lg: 'h-16 w-16'
  }

  return (
    <div className={`flex items-center justify-center py-12 ${className}`}>
      <div 
        className={`animate-spin rounded-full border-b-2 border-red-500 ${sizeClasses[size]}`}
        role="status"
        aria-label={ariaLabel}
      >
        <span className="sr-only">{ariaLabel}</span>
      </div>
    </div>
  )
}