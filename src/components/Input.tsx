import React from 'react'
import clsx from 'clsx'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export default function Input({ label, error, className, ...props }: InputProps) {
  return (
    <div className="flex flex-col">
      {label && <label className="mb-2 text-sm font-semibold text-white">{label}</label>}
      <input
        className={clsx('bg-dark-700 border border-primary-500/30 text-white placeholder-gray-500 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-primary-400 transition', error && 'border-red-500', className)}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-400">{error}</p>}    </div>
  )
}