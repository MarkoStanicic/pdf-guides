import * as React from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'accent' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  loading?: boolean
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', loading, children, disabled, asChild = false, ...props }, ref) => {
    const isDisabled = disabled || loading

    const buttonClasses = cn(
      // Base styles
      'inline-flex items-center justify-center rounded-md font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
      // Variants
      {
        'bg-trust-800 text-white hover:bg-trust-900 focus-visible:ring-trust-500': variant === 'default',
        'bg-primary-600 text-white hover:bg-primary-700 focus-visible:ring-primary-500 shadow-lg hover:shadow-xl transform hover:scale-105': variant === 'primary',
        'bg-accent-500 text-accent-950 hover:bg-accent-600 focus-visible:ring-accent-500 shadow-md': variant === 'accent',
        'bg-white text-trust-900 border-2 border-trust-200 hover:border-trust-300 hover:bg-trust-50 focus-visible:ring-trust-500': variant === 'secondary',
        'border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white focus-visible:ring-primary-500': variant === 'outline',
        'text-trust-600 hover:text-trust-900 hover:bg-trust-100 focus-visible:ring-trust-500': variant === 'ghost',
      },
      // Sizes
      {
        'h-8 px-3 text-sm': size === 'sm',
        'h-10 px-4': size === 'md',
        'h-12 px-6 text-lg': size === 'lg',
        'h-14 px-8 text-xl': size === 'xl',
      },
      className
    )

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement<any>, {
        ...props,
        className: cn(buttonClasses, (children as React.ReactElement<any>).props.className),
      })
    }

    return (
      <button
        className={buttonClasses}
        disabled={isDisabled}
        ref={ref}
        {...props}
      >
        {loading && (
          <svg
            className="mr-2 h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button }
