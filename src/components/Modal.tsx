import React from 'react'

interface ModalProps {
  open: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
}

export default function Modal({ open, onClose, title, children }: ModalProps) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-dark-800 border border-primary-500/30 rounded-2xl shadow-card-lg max-w-lg w-full p-6 mx-4 relative">
        {title && <h2 className="text-xl font-bold text-white mb-4">{title}</h2>}
        {children}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl transition">×</button>
      </div>
    </div>
  )
}
