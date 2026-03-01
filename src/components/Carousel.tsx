"use client"
import React, { useState } from 'react'

interface CarouselProps {
  items: { id: string; image: string; title: string; description: string }[]
}

export default function Carousel({ items }: CarouselProps) {
  const [current, setCurrent] = useState(0)

  const next = () => setCurrent((current + 1) % items.length)
  const prev = () => setCurrent((current - 1 + items.length) % items.length)

  return (
    <div className="relative w-full">
      <div className="flex items-center justify-center gap-8">
        <button onClick={prev} className="text-4xl text-white hover:text-primary-400 transition">«</button>
        <div className="flex-1 flex justify-center">
          <img src={items[current].image} alt={items[current].title} className="max-h-96 object-contain" />
        </div>
        <button onClick={next} className="text-4xl text-white hover:text-primary-400 transition">»</button>
      </div>
      <div className="text-center mt-6">
        <h3 className="text-2xl font-bold text-white">{items[current].title}</h3>
        <p className="text-gray-400 mt-2">{items[current].description}</p>
      </div>
    </div>
  )
}
