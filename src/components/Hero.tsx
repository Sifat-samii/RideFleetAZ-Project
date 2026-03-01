import React from 'react'

interface HeroProps {
  title: string
  subtitle?: string
  image?: string
  children?: React.ReactNode
}

export default function Hero({ title, subtitle, image, children }: HeroProps) {
  return (
    <div className="relative w-full min-h-screen bg-gradient-dark flex items-center justify-center overflow-hidden">
      {image && (
        <div className="absolute inset-0 opacity-40">
          <img src={image} alt="" className="w-full h-full object-cover" />
        </div>
      )}
      <div className="relative z-10 text-center px-4 max-w-4xl">
        <h1 className="text-6xl md:text-8xl font-black text-white mb-4 tracking-tight">{title}</h1>
        {subtitle && <p className="text-xl text-gray-300 mb-8">{subtitle}</p>}
        {children}
      </div>
    </div>
  )
}
