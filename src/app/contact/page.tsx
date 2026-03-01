"use client"
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Section from '../../components/Section'
import Input from '../../components/Input'
import Button from '../../components/Button'

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters')
})

export default function Contact() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema) })

  async function onSubmit(data: any) {
    await fetch('/api/contact', { method: 'POST', body: JSON.stringify(data), headers: { 'content-type': 'application/json' } })
    alert('Thanks for reaching out! We will get back to you soon.')
  }

  return (
    <Section className="py-24">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-black text-white mb-2">Get in Touch</h1>
          <p className="text-gray-400">Have questions about renting with RidefleetAZ? We're here to help.</p>
        </div>
        <div className="bg-dark-800 border border-primary-500/20 rounded-2xl p-8 shadow-card-lg">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input 
              label="Name" 
              placeholder="Your full name"
              {...register('name')} 
              error={errors.name?.message as string} 
            />
            <Input 
              label="Email" 
              type="email" 
              placeholder="you@example.com"
              {...register('email')} 
              error={errors.email?.message as string} 
            />
            <Input 
              label="Phone (optional)" 
              placeholder="+1 (555) 000-0000"
              {...register('phone')} 
            />
            <div>
              <label className="block text-sm font-semibold text-white mb-2">Message</label>
              <textarea 
                className="w-full bg-dark-700 border border-primary-500/30 text-white placeholder-gray-500 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-primary-400 transition resize-none" 
                rows={5} 
                placeholder="Tell us how we can help..."
                {...register('message')}
              ></textarea>
              {errors.message && <p className="mt-1 text-sm text-red-400">{String(errors.message.message)}</p>}
            </div>
            <Button type="submit" size="lg" className="w-full">Send Message</Button>
          </form>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl mb-2">📍</div>
            <h3 className="text-white font-semibold mb-1">Location</h3>
            <p className="text-gray-400 text-sm">Arizona</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">⏰</div>
            <h3 className="text-white font-semibold mb-1">Hours</h3>
            <p className="text-gray-400 text-sm">Mon–Fri 9AM–5PM AZ</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">📧</div>
            <h3 className="text-white font-semibold mb-1">Email</h3>
            <p className="text-primary-400 text-sm">support@ridefleetaz.com</p>
          </div>
        </div>
      </div>
    </Section>
  )
}
