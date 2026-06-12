'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

/* Crossfading photo slideshow for service sections — autoplays, pauses on
   hover/touch, dot navigation, optional per-slide label badge. Built for the
   client's own job photos ("Make slideshow if you can" — v3 edits doc). */

export type Slide = { src: string; label?: string }

export default function Slideshow({ slides, interval = 3800 }: { slides: Slide[]; interval?: number }) {
  const [active, setActive] = useState(0)
  const paused = useRef(false)

  useEffect(() => {
    const id = setInterval(() => {
      if (!paused.current) setActive((a) => (a + 1) % slides.length)
    }, interval)
    return () => clearInterval(id)
  }, [slides.length, interval])

  return (
    <div
      className="absolute inset-0"
      onMouseEnter={() => { paused.current = true }}
      onMouseLeave={() => { paused.current = false }}
      onTouchStart={() => { paused.current = true }}
      onTouchEnd={() => { paused.current = false }}
    >
      {slides.map((s, i) => (
        <div
          key={s.src}
          aria-hidden={i !== active}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${i === active ? 'opacity-100' : 'opacity-0'}`}
        >
          <Image
            src={s.src}
            alt={s.label ?? `Brighton Road project photo ${i + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority={i === 0}
          />
          {s.label && (
            <span className="absolute top-4 left-4 bg-gray-900/80 text-white text-xs font-bold uppercase tracking-wide px-3 py-1.5 rounded-full backdrop-blur-sm">
              {s.label}
            </span>
          )}
        </div>
      ))}

      {/* dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setActive(i)}
            className={`h-2.5 rounded-full transition-all duration-300 ${i === active ? 'w-6 bg-white' : 'w-2.5 bg-white/50 hover:bg-white/80'}`}
          />
        ))}
      </div>
    </div>
  )
}
