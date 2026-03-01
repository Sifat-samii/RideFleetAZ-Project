import React from 'react'
import clsx from 'clsx'

export default function Badge({ children, variant = 'primary' }: { children: React.ReactNode; variant?: 'primary' | 'accent' | 'neutral' }) {
  const colors = {
    primary: 'metallic-gold-surface text-dark-950 border-transparent',
    accent: 'metallic-gold-surface text-dark-950 border-transparent',
    neutral: 'bg-gray-700/50 text-gray-300 border border-gray-600'
  }
  return <span className={clsx('inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold', colors[variant])}>{children}</span>}
