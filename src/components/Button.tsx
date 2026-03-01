import React from 'react'
import clsx from 'clsx'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'secondary'
  loading?: boolean
  as?: React.ElementType
  size?: 'sm' | 'md' | 'lg'
  [key: string]: any
}

export default function Button({ variant = 'primary', loading, disabled, className, children, as: Component = 'button', size = 'md', ...props }: ButtonProps) {
  const base = 'inline-flex items-center justify-center font-semibold rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-900'
  const sizeClasses = size === 'sm' ? 'px-2 py-1 text-sm' : size === 'lg' ? 'px-6 py-3 text-lg' : 'px-4.5 py-2'
  const variants: Record<string, string> = {
    primary: 'metallic-gold-surface text-dark-950 hover:brightness-110 shadow-glow',
    outline: 'border-2 border-primary-400/70 bg-primary-900/10 text-primary-100 hover:bg-primary-500/12 hover:text-primary-50',
    secondary: 'metallic-gold-surface text-dark-950 hover:brightness-105 shadow-glow'
  }
  return (
    <Component
      className={clsx(base, sizeClasses, variants[variant], disabled && 'opacity-50 cursor-not-allowed', className)}
      disabled={Component === 'button' ? disabled || loading : undefined}
      {...props}
    >
      {loading && <svg className="animate-spin h-5 w-5 mr-2 text-current" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /></svg>}      {children}
    </Component>
  )
}
