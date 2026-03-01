import React from 'react'
import clsx from 'clsx'

interface StepperProps {
  steps: string[]
  current: number
}

export default function Stepper({ steps, current }: StepperProps) {
  return (
    <div className="flex items-center space-x-2">
      {steps.map((label, idx) => (
        <div key={idx} className="flex items-center">
          <div className={clsx('w-8 h-8 flex items-center justify-center rounded-full font-semibold transition', idx <= current ? 'bg-gradient-blue text-white shadow-glow' : 'bg-dark-700 border border-primary-500/30 text-gray-400')}>{idx+1}</div>
          {idx < steps.length - 1 && <div className={clsx('flex-1 h-0.5 mx-2 transition', idx < current ? 'bg-primary-500' : 'bg-primary-500/20')}></div>}        </div>
      ))}
    </div>
  )
}