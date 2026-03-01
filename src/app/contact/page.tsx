"use client"

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Section from '../../components/Section'
import Input from '../../components/Input'
import Button from '../../components/Button'
import { contactSchema, type ContactFormValues } from '../../lib/validation'

export default function Contact() {
  const [serverMessage, setServerMessage] = useState<string | null>(null)
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema)
  })

  async function onSubmit(data: ContactFormValues) {
    setServerMessage(null)

    const res = await fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'content-type': 'application/json' }
    })

    if (!res.ok) {
      setServerMessage('Your message could not be sent. Please try again.')
      return
    }

    reset()
    setServerMessage('Thanks for reaching out. We will get back to you soon.')
  }

  return (
    <Section className="py-24">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-black text-white">Get in Touch</h1>
          <p className="text-gray-400">Have questions about renting with RideFleetAZ? We're here to help.</p>
        </div>
        <div className="rounded-2xl border border-primary-500/20 bg-dark-800 p-8 shadow-card-lg">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              label="Name"
              placeholder="Your full name"
              {...register('name')}
              error={errors.name?.message}
            />
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              {...register('email')}
              error={errors.email?.message}
            />
            <Input
              label="Phone (optional)"
              placeholder="+1 (555) 000-0000"
              {...register('phone')}
            />
            <div>
              <label className="mb-2 block text-sm font-semibold text-white">Message</label>
              <textarea
                className="w-full resize-none rounded-xl border border-primary-500/30 bg-dark-700 p-3 text-white placeholder-gray-500 transition focus:outline-none focus:ring-2 focus:ring-primary-400"
                rows={5}
                placeholder="Tell us how we can help..."
                {...register('message')}
              />
              {errors.message && <p className="mt-1 text-sm text-red-400">{errors.message.message}</p>}
            </div>
            <Button type="submit" size="lg" className="w-full" loading={isSubmitting}>
              Send Message
            </Button>
            {serverMessage && <p className="text-sm text-primary-300">{serverMessage}</p>}
          </form>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="text-center">
            <div className="mb-2 text-3xl">📍</div>
            <h3 className="mb-1 font-semibold text-white">Location</h3>
            <p className="text-sm text-gray-400">Arizona</p>
          </div>
          <div className="text-center">
            <div className="mb-2 text-3xl">⏰</div>
            <h3 className="mb-1 font-semibold text-white">Hours</h3>
            <p className="text-sm text-gray-400">Mon-Fri 9AM-5PM AZ</p>
          </div>
          <div className="text-center">
            <div className="mb-2 text-3xl">📧</div>
            <h3 className="mb-1 font-semibold text-white">Email</h3>
            <p className="text-sm text-primary-400">support@ridefleetaz.com</p>
          </div>
        </div>
      </div>
    </Section>
  )
}
