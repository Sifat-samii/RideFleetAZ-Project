import React from 'react'

interface HeroProps {
  title: string
  subtitle?: string
  image?: string
  children?: React.ReactNode
}

export default function Hero({ title, subtitle, image, children }: HeroProps) {
  return (
    <div className="relative w-full min-h-screen bg-gradient-to-b from-dark-900 to-dark-950 flex items-center justify-center overflow-hidden">
      {image && (
        <>
          <div className="absolute inset-0 opacity-55 scale-85">
            <img src={image} alt="" className="w-full h-full object-cover" />
          </div>
          <div 
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(3, 5, 11, 0.04) 0%, rgba(3, 5, 11, 0.32) 55%, rgba(3, 5, 11, 0.72) 100%)'
            }}
          ></div>
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to right, rgba(3, 5, 11, 0.5) 0%, rgba(3, 5, 11, 0.16) 20%, rgba(3, 5, 11, 0.16) 80%, rgba(3, 5, 11, 0.5) 100%), linear-gradient(180deg, transparent 0%, transparent 68%, rgba(3, 5, 11, 0.42) 100%)'
            }}
          ></div>
        </>
      )}
      <div className="relative z-10 text-center px-4 max-w-4xl">
        <h1 className="text-6xl md:text-8xl font-black text-white mb-4 tracking-tight">{title}</h1>
        {subtitle && <p className="text-xl text-gray-300 mb-8">{subtitle}</p>}
        {children}
      </div>
    </div>
  )
}
