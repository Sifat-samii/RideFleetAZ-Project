import React from 'react'
import clsx from 'clsx'

export default function Section({ children, className, bg }: { children: React.ReactNode; className?: string; bg?: 'white' | 'gray' | 'dark-800' | 'dark-900' }) {
  const bgClass = bg === 'gray' ? 'bg-gray-50' : bg === 'dark-800' ? 'bg-dark-800' : bg === 'dark-900' ? 'bg-dark-900' : 'bg-background'
  return (
    <section className={clsx(bgClass, 'py-16') + (className ? ' ' + className : '')}>
      <div className="max-w-5xl mx-auto px-4">{children}</div>
    </section>
  )
}
