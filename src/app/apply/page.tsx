"use client"
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Section from '../../components/Section'
import Button from '../../components/Button'
import Stepper from '../../components/Stepper'
import Input from '../../components/Input'

const Step1 = ({ onNext, value }: any) => (
  <div>
    <h2 className="text-2xl font-bold text-white mb-6">Are you ready to rent a vehicle now?</h2>
    <div className="flex gap-4">
      <button 
        className={`px-6 py-3 rounded-xl font-semibold transition ${
          value === true 
            ? 'bg-gradient-blue text-white shadow-glow' 
            : 'bg-dark-700 border border-primary-500/30 text-white hover:border-primary-400'
        }`} 
        onClick={() => onNext(true)}
      >
        Yes
      </button>
      <button 
        className={`px-6 py-3 rounded-xl font-semibold transition ${
          value === false 
            ? 'bg-gradient-blue text-white shadow-glow' 
            : 'bg-dark-700 border border-primary-500/30 text-white hover:border-primary-400'
        }`} 
        onClick={() => onNext(false)}
      >
        No
      </button>
    </div>
  </div>
)

const Step2 = ({ onNext, value }: any) => {
  const options = ['Uber','Lyft','DoorDash','Amazon Flex','Uber Eats','Multiple platforms']
  const [selected, setSelected] = useState<string[]>(value || [])
  function toggle(opt: string) {
    setSelected((s) => s.includes(opt) ? s.filter(x=>x!==opt) : [...s,opt])
  }
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">What will you use the vehicle for?</h2>
      <div className="grid grid-cols-2 gap-3 mb-6">
        {options.map(opt => (
          <button 
            key={opt} 
            className={`p-4 rounded-xl font-semibold transition text-left ${
              selected.includes(opt) 
                ? 'bg-gradient-blue text-white shadow-glow border border-primary-400' 
                : 'bg-dark-700 border border-primary-500/30 text-white hover:border-primary-400'
            }`} 
            onClick={() => toggle(opt)}
          >
            {opt}
          </button>
        ))}
      </div>
      <Button onClick={() => onNext(selected)} size="lg">Next</Button>
    </div>
  )
}

const Step3 = ({ onNext, defaultValues }: any) => {
  const schema = z.object({ 
    fullName: z.string().min(2, 'Name must be at least 2 characters'), 
    phone: z.string().min(7, 'Phone must be at least 7 digits'), 
    email: z.string().email('Invalid email address') 
  })
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(schema), defaultValues })
  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">Contact Information</h2>
      <Input 
        label="Full Name" 
        placeholder="John Doe"
        {...register('fullName')} 
        error={errors.fullName ? String(errors.fullName?.message) : undefined}
      />
      <Input 
        label="Phone" 
        placeholder="+1 (555) 000-0000"
        {...register('phone')} 
        error={errors.phone ? String(errors.phone?.message) : undefined}
      />
      <Input 
        label="Email" 
        type="email"
        placeholder="john@example.com"
        {...register('email')} 
        error={errors.email ? String(errors.email?.message) : undefined}
      />
      <Button type="submit" size="lg" className="w-full">Next</Button>
    </form>
  )
}

const Step4 = ({ onNext }: any) => {
  const [file, setFile] = useState<File | null>(null)
  const [consent, setConsent] = useState(false)
  const [fileName, setFileName] = useState<string>('')

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">Driver's License</h2>
      <div>
        <label className="block text-sm font-semibold text-white mb-2">Upload Driver's License (JPG, PNG, or PDF • Max 10MB)</label>
        <div className="relative">
          <input 
            type="file" 
            accept="image/*,application/pdf" 
            onChange={(e) => {
              const f = e.target.files?.[0]
              setFile(f ?? null)
              setFileName(f?.name ?? '')
            }}
            className="hidden"
            id="license-upload"
          />
          <label 
            htmlFor="license-upload"
            className="block w-full p-4 border-2 border-dashed border-primary-500/50 rounded-xl text-center cursor-pointer hover:border-primary-400 transition bg-dark-700"
          >
            {fileName ? (
              <div>
                <p className="text-primary-400 font-semibold">{fileName}</p>
                <p className="text-sm text-gray-400">Click to change</p>
              </div>
            ) : (
              <div>
                <p className="text-white font-semibold">📄 Click to upload or drag</p>
                <p className="text-sm text-gray-400">JPG, PNG, or PDF</p>
              </div>
            )}
          </label>
        </div>
      </div>
      <div className="flex items-start gap-3 p-4 bg-dark-700 rounded-xl border border-primary-500/30">
        <input 
          type="checkbox" 
          id="consent"
          checked={consent} 
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1 w-4 h-4 accent-primary-500"
        />
        <label htmlFor="consent" className="text-sm text-gray-300">
          I consent to RidefleetAZ storing my information for application review and future communications.
        </label>
      </div>
      <Button 
        onClick={() => onNext({ file })} 
        disabled={!file || !consent} 
        size="lg"
        className="w-full"
      >
        Submit Application
      </Button>
    </div>
  )
}

export default function ApplyPage() {
  const [step, setStep] = useState(1)
  const [data, setData] = useState<any>({})

  useEffect(() => {
    localStorage.removeItem('rfz-appl')
  }, [])

  async function handleSubmit(final: any) {
    const fd = new FormData()
    fd.append('readyNow', String(data.readyNow))
    fd.append('platforms', JSON.stringify(data.platforms || []))
    fd.append('fullName', data.fullName || '')
    fd.append('phone', data.phone || '')
    fd.append('email', data.email || '')
    if (final?.file) fd.append('license', final.file)

    const res = await fetch('/api/leads', { method: 'POST', body: fd })
    if (res.ok) {
      localStorage.removeItem('rfz-appl')
      setStep(5)
    } else {
      alert('Submission failed')
    }
  }

  return (
    <Section className="py-24">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <Stepper steps={["Ready?","Platform","Contact","License","Done"]} current={step-1} />
        </div>
        <div className="p-8 bg-dark-800 border border-primary-500/20 rounded-2xl shadow-card-lg">
          {step === 1 && <Step1 value={data.readyNow} onNext={(val:any)=>{ setData({...data, readyNow: val}); setStep(2)} } />}
          {step === 2 && <Step2 value={data.platforms} onNext={(val:any)=>{ setData({...data, platforms: val}); setStep(3)} } />}
          {step === 3 && <Step3 defaultValues={{ fullName: data.fullName, phone: data.phone, email: data.email }} onNext={(val:any)=>{ setData({...data, ...val}); setStep(4)} } />}
          {step === 4 && <Step4 onNext={async (val:any)=>{ await handleSubmit(val) }} />}
          {step === 5 && (
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-3">Thank you! 🎉</h2>
              <p className="text-gray-300 text-lg">Our team will review your information and contact you if you qualify.</p>
              <p className="text-gray-400 text-sm mt-4">Expected response: 24-48 hours</p>
            </div>
          )}
        </div>
        <div className="mt-6 text-center text-sm text-gray-400">
          <p>✓ No credit check · ✓ Maintenance included · ✓ Fast approval</p>
          <p className="mt-1">We support Uber, Lyft, DoorDash, Amazon Flex, Uber Eats, and more</p>
        </div>
      </div>    </Section>
  )
}