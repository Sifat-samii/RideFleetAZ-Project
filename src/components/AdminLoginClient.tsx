"use client"
import { useState } from 'react'
import Section from './Section'
import Input from './Input'
import Button from './Button'

export default function AdminLoginClient() {
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      body: JSON.stringify({ password }),
      headers: { 'content-type': 'application/json' }
    })
    
    if (res.ok) {
      window.location.reload()
    } else {
      alert('Invalid password')
    }
    setLoading(false)
  }

  return (
    <Section className="py-24 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="bg-dark-800 border border-primary-500/20 shadow-card-lg rounded-2xl p-8">
          <h1 className="text-3xl font-bold text-white mb-2">Admin Access</h1>
          <p className="text-gray-400 mb-6">Enter password to manage leads</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input 
              type="password" 
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" size="lg" className="w-full" loading={loading}>
              Sign In
            </Button>
          </form>
        </div>
      </div>
    </Section>
  )
}
