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
  const base = 'inline-flex items-center justify-center font-semibold rounded-xl transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-900'
  const sizeClasses = size === 'sm' ? 'px-3 py-1.5 text-sm' : size === 'lg' ? 'px-8 py-4 text-lg' : 'px-6 py-3'
  const variants: Record<string, string> = {
    primary: 'bg-primary-500 text-white hover:bg-primary-600 shadow-glow',
    outline: 'border-2 border-primary-500 text-primary-400 hover:bg-primary-500/10',
    secondary: 'bg-accent-500 text-white hover:bg-accent-600'
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