"use client"

import { useState } from 'react'
import Section from './Section'
import Input from './Input'
import Button from './Button'

export default function AdminLoginClient() {
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const res = await fetch('/api/admin/login', {
      method: 'POST',
      body: JSON.stringify({ password }),
      headers: { 'content-type': 'application/json' }
    })

    if (res.ok) {
      window.location.reload()
      return
    }

    setError('Invalid password')
    setLoading(false)
  }

  return (
    <Section className="flex min-h-screen items-center justify-center py-24">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-primary-500/20 bg-dark-800 p-8 shadow-card-lg">
          <h1 className="mb-2 text-3xl font-bold text-white">Admin Access</h1>
          <p className="mb-6 text-gray-400">Enter password to manage leads</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={error ?? undefined}
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
