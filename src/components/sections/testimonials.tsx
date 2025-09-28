"use client"
import React, { useCallback, useMemo, useRef } from 'react'
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

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={cn(
          'h-5 w-5',
          i < rating ? 'text-accent-500 fill-current' : 'text-trust-300'
        )}
      />
    ))
  }

  return (
    <div
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
          // eslint-disable-next-line @next/next/no-img-element
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
  )
}

export function Testimonials({
  testimonials,
  title,
  description,
  className,
  layout = 'grid',
}: TestimonialsProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)

  const scrollByAmount = useMemo(() => {
    // Scroll roughly one viewport width for larger screens, slightly less for mobile
    if (typeof window === 'undefined') return 0
    const vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
    if (vw >= 1024) return vw * 0.7
    if (vw >= 640) return vw * 0.8
    return vw * 0.9
  }, [])

  const handlePrev = useCallback(() => {
    const el = containerRef.current
    if (!el) return
    el.scrollBy({ left: -scrollByAmount, behavior: 'smooth' })
  }, [scrollByAmount])

  const handleNext = useCallback(() => {
    const el = containerRef.current
    if (!el) return
    el.scrollBy({ left: scrollByAmount, behavior: 'smooth' })
  }, [scrollByAmount])

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
      {layout === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
        </div>
      ) : (
        <div className="relative">
          {/* Controls */}
          <div className="pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center justify-between">
            <button
              type="button"
              aria-label="Previous testimonials"
              onClick={handlePrev}
              className="pointer-events-auto ml-2 md:ml-4 rounded-full bg-white/90 border border-trust-200 shadow hover:bg-white transition p-2"
            >
              <span className="sr-only">Previous</span>
              {/* Using a Star rotated as a simple arrow replacement to avoid new icon imports */}
              <span className="block h-5 w-5 rotate-180 text-trust-700">➜</span>
            </button>
            <button
              type="button"
              aria-label="Next testimonials"
              onClick={handleNext}
              className="pointer-events-auto mr-2 md:mr-4 rounded-full bg-white/90 border border-trust-200 shadow hover:bg-white transition p-2"
            >
              <span className="sr-only">Next</span>
              <span className="block h-5 w-5 text-trust-700">➜</span>
            </button>
          </div>

          {/* Track */}
          <div
            ref={containerRef}
            role="region"
            aria-roledescription="carousel"
            aria-label="Customer testimonials"
            className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4"
          >
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="snap-start shrink-0 w-[85%] sm:w-[60%] lg:w-[33.333%]"
              >
                <TestimonialCard testimonial={t} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
