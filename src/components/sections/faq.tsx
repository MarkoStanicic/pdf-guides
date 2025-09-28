'use client'

import React, { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { FAQItem } from '@/types'
import { cn } from '@/lib/utils'

interface FAQProps {
  items: FAQItem[]
  title?: string
  description?: string
  className?: string
}

export function FAQ({ items, title, description, className }: FAQProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set())

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems)
    if (openItems.has(id)) {
      newOpenItems.delete(id)
    } else {
      newOpenItems.add(id)
    }
    setOpenItems(newOpenItems)
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
      
      <div className="max-w-3xl mx-auto">
        <div className="divide-y divide-trust-200">
          {items.map((item) => {
            const isOpen = openItems.has(item.id)
            
            return (
              <div key={item.id} className="py-6">
                <button
                  onClick={() => toggleItem(item.id)}
                  className="flex w-full items-start justify-between text-left"
                >
                  <span className="text-base font-semibold leading-7 text-trust-900 pr-6">
                    {item.question}
                  </span>
                  <span className="ml-6 flex h-7 items-center flex-shrink-0">
                    {isOpen ? (
                      <ChevronUp className="h-6 w-6 text-trust-600" />
                    ) : (
                      <ChevronDown className="h-6 w-6 text-trust-600" />
                    )}
                  </span>
                </button>
                
                {isOpen && (
                  <div className="mt-4 pr-12">
                    <div className="text-base leading-7 text-trust-600">
                      {item.answer.split('\n').map((paragraph, index) => (
                        <p key={index} className={index > 0 ? 'mt-4' : ''}>
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
