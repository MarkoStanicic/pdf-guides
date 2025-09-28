import React from 'react'
import { Star, Shield } from 'lucide-react'
import { Testimonial } from '@/types'
import { cn, getInitials } from '@/lib/utils'

interface TestimonialsProps {
  testimonials: Testimonial[]
  title?: string
  description?: string
  className?: string
  layout?: 'grid' | 'carousel'
}

export function Testimonials({ 
  testimonials, 
  title, 
  description, 
  className,
  layout = 'grid'
}: TestimonialsProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={cn(
          'h-5 w-5',
          i < rating
            ? 'text-accent-500 fill-current'
            : 'text-trust-300'
        )}
      />
    ))
  }

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
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-white p-6 rounded-lg shadow-md border border-trust-200 relative"
          >
            {testimonial.verified && (
              <div className="absolute top-4 right-4">
                <div className="flex items-center text-xs text-success-600 bg-success-50 px-2 py-1 rounded-full">
                  <Shield className="h-3 w-3 mr-1" />
                  <span>Verified</span>
                </div>
              </div>
            )}
            
            <div className="flex items-center mb-4">
              {renderStars(testimonial.rating)}
            </div>
            
            <blockquote className="text-trust-700 mb-4 leading-relaxed">
              "{testimonial.content}"
            </blockquote>
            
            <div className="flex items-center">
              {testimonial.avatar ? (
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="h-10 w-10 rounded-full object-cover"
                />
              ) : (
                <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                  <span className="text-sm font-medium text-primary-700">
                    {getInitials(testimonial.name)}
                  </span>
                </div>
              )}
              
              <div className="ml-3">
                <p className="text-sm font-semibold text-trust-900">
                  {testimonial.name}
                </p>
                {testimonial.verified && (
                  <p className="text-xs text-success-600">Verified Purchase</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
