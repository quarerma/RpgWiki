"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { CarouselItem } from "@/lib/wiki/load-carousel"
import { Button } from "@/components/ui/button"

interface WikiImageCarouselProps {
  items: CarouselItem[]
  initialIndex: number
  pageTitle: string
}

export function WikiImageCarousel({
  items,
  initialIndex,
  pageTitle,
}: WikiImageCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(initialIndex)
  const current = items[activeIndex]
  const hasMultiple = items.length > 1

  function goTo(index: number) {
    setActiveIndex((index + items.length) % items.length)
  }

  return (
    <div>
      {current.label ? (
        <p className="bg-secondary border border-border my-1 text-center text-sm italic text-muted-foreground">
          {current.label}
        </p>
      ) : null}
      <div className="relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={current.url}
          alt={current.label || pageTitle}
          className="h-auto w-full object-cover"
        />
        {hasMultiple ? (
          <>
            <Button
              type="button"
              variant="secondary"
              size="icon"
              className="absolute left-1 top-1/2 h-8 w-8 -translate-y-1/2 opacity-80 bg-secondary border border-border rounded-full"
              onClick={() => goTo(activeIndex - 1)}
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="icon"
              className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2 opacity-80 bg-secondary border border-border rounded-full"
              onClick={() => goTo(activeIndex + 1)}
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </>
        ) : null}
      </div>
      {hasMultiple ? (
        <div className="mt-2  mb-2 flex justify-center gap-1.5">
          {items.map((item, index) => (
            <button
              key={item.url}
              type="button"
              className={cn(
                "h-2 w-2 rounded-full transition-colors",
                index === activeIndex
                  ? "bg-foreground"
                  : "bg-muted-foreground/40 hover:bg-muted-foreground/70"
              )}
              onClick={() => goTo(index)}
              aria-label={`Go to image ${index + 1}`}
              aria-current={index === activeIndex ? "true" : undefined}
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}
