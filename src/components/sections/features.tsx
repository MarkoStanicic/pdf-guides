import React from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Feature {
  title: string
  description?: string
  icon?: React.ReactNode
}

interface FeaturesProps {
  features: (string | Feature)[]
  title?: string
  description?: string
  className?: string
  showCheckmark?: boolean
  columns?: 1 | 2 | 3
}

export function Features({ 
  features, 
  title, 
  description, 
  className,
  showCheckmark = true,
  columns = 2 
}: FeaturesProps) {
  const normalizedFeatures: Feature[] = features.map(feature => 
    typeof feature === 'string' 
      ? { title: feature } 
      : feature
  )

  return (
    <div className={cn('py-12', className)}>
      {(title || description) && (
        <div className="text-center mb-12">
          {title && (
            <h2 className="text-3xl font-bold tracking-tight text-trust-900 sm:text-4xl">
              {title}
            </h2>
          )}
          {description && (
            <p className="mt-4 text-lg leading-8 text-trust-600 max-w-3xl mx-auto">
              {description}
            </p>
          )}
        </div>
      )}
      
      <div className={cn(
        'grid gap-6',
        {
          'grid-cols-1': columns === 1,
          'grid-cols-1 md:grid-cols-2': columns === 2,
          'grid-cols-1 md:grid-cols-2 lg:grid-cols-3': columns === 3,
        }
      )}>
        {normalizedFeatures.map((feature, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="flex-shrink-0 mt-1">
              {feature.icon || (showCheckmark && (
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-success-100">
                  <Check className="h-4 w-4 text-success-600" />
                </div>
              ))}
            </div>
            <div>
              <h3 className="text-base font-semibold text-trust-900">
                {feature.title}
              </h3>
              {feature.description && (
                <p className="mt-1 text-sm text-trust-600">
                  {feature.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
