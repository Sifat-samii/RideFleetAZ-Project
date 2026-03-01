"use client"

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Section from '../../components/Section'
import Button from '../../components/Button'
import Stepper from '../../components/Stepper'
import Input from '../../components/Input'
import { applicationContactSchema, type ApplicationContactValues } from '../../lib/validation'

interface ApplicationState extends Partial<ApplicationContactValues> {
  readyNow?: boolean
  platforms: string[]
}

interface Step1Props {
  onNext: (value: boolean) => void
  value?: boolean
}

interface Step2Props {
  onNext: (value: string[]) => void
  value: string[]
}

interface Step3Props {
  onNext: (value: ApplicationContactValues) => void
  defaultValues: Partial<ApplicationContactValues>
}

interface Step4Props {
  onNext: (value: { file: File }) => Promise<void>
}

const Step1 = ({ onNext, value }: Step1Props) => (
  <div>
    <h2 className="mb-6 text-2xl font-bold text-white">Are you ready to rent a vehicle now?</h2>
    <div className="flex gap-4">
      <button
        type="button"
        className={`rounded-xl px-6 py-3 font-semibold transition ${
          value === true
            ? 'bg-gradient-blue text-white shadow-glow'
            : 'border border-primary-500/30 bg-dark-700 text-white hover:border-primary-400'
        }`}
        onClick={() => onNext(true)}
      >
        Yes
      </button>
      <button
        type="button"
        className={`rounded-xl px-6 py-3 font-semibold transition ${
          value === false
            ? 'bg-gradient-blue text-white shadow-glow'
            : 'border border-primary-500/30 bg-dark-700 text-white hover:border-primary-400'
        }`}
        onClick={() => onNext(false)}
      >
        No
      </button>
    </div>
  </div>
)

const Step2 = ({ onNext, value }: Step2Props) => {
  const options = ['Uber', 'Lyft', 'DoorDash', 'Amazon Flex', 'Uber Eats', 'Multiple platforms']
  const [selected, setSelected] = useState<string[]>(value)

  function toggle(option: string) {
    setSelected((current) => (
      current.includes(option) ? current.filter((item) => item !== option) : [...current, option]
    ))
  }

  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold text-white">What will you use the vehicle for?</h2>
      <div className="mb-6 grid grid-cols-2 gap-3">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            className={`rounded-xl border p-4 text-left font-semibold transition ${
              selected.includes(option)
                ? 'border-primary-400 bg-gradient-blue text-white shadow-glow'
                : 'border-primary-500/30 bg-dark-700 text-white hover:border-primary-400'
            }`}
            onClick={() => toggle(option)}
          >
            {option}
          </button>
        ))}
      </div>
      <Button onClick={() => onNext(selected)} size="lg" disabled={selected.length === 0}>Next</Button>
    </div>
  )
}

const Step3 = ({ onNext, defaultValues }: Step3Props) => {
  const { register, handleSubmit, formState: { errors } } = useForm<ApplicationContactValues>({
    resolver: zodResolver(applicationContactSchema),
    defaultValues
  })

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-6">
      <h2 className="mb-6 text-2xl font-bold text-white">Contact Information</h2>
      <Input
        label="Full Name"
        placeholder="John Doe"
        {...register('fullName')}
        error={errors.fullName?.message}
      />
      <Input
        label="Phone"
        placeholder="+1 (555) 000-0000"
        {...register('phone')}
        error={errors.phone?.message}
      />
      <Input
        label="Email"
        type="email"
        placeholder="john@example.com"
        {...register('email')}
        error={errors.email?.message}
      />
      <Button type="submit" size="lg" className="w-full">Next</Button>
    </form>
  )
}

const Step4 = ({ onNext }: Step4Props) => {
  const [file, setFile] = useState<File | null>(null)
  const [consent, setConsent] = useState(false)
  const [fileName, setFileName] = useState('')

  return (
    <div className="space-y-6">
      <h2 className="mb-6 text-2xl font-bold text-white">Driver's License</h2>
      <div>
        <label className="mb-2 block text-sm font-semibold text-white">Upload Driver's License (JPG, PNG, or PDF, max 10MB)</label>
        <div className="relative">
          <input
            type="file"
            accept="image/*,application/pdf"
            onChange={(e) => {
              const nextFile = e.target.files?.[0] ?? null
              setFile(nextFile)
              setFileName(nextFile?.name ?? '')
            }}
            className="hidden"
            id="license-upload"
          />
          <label
            htmlFor="license-upload"
            className="block w-full cursor-pointer rounded-xl border-2 border-dashed border-primary-500/50 bg-dark-700 p-4 text-center transition hover:border-primary-400"
          >
            {fileName ? (
              <div>
                <p className="font-semibold text-primary-400">{fileName}</p>
                <p className="text-sm text-gray-400">Click to change</p>
              </div>
            ) : (
              <div>
                <p className="font-semibold text-white">Click to upload or drag</p>
                <p className="text-sm text-gray-400">JPG, PNG, or PDF</p>
              </div>
            )}
          </label>
        </div>
      </div>
      <div className="flex items-start gap-3 rounded-xl border border-primary-500/30 bg-dark-700 p-4">
        <input
          type="checkbox"
          id="consent"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1 h-4 w-4 accent-primary-500"
        />
        <label htmlFor="consent" className="text-sm text-gray-300">
          I consent to RideFleetAZ storing my information for application review and future communications.
        </label>
      </div>
      <Button
        onClick={() => file && onNext({ file })}
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
  const [data, setData] = useState<ApplicationState>({ platforms: [] })
  const [submitError, setSubmitError] = useState<string | null>(null)

  async function handleSubmit(final: { file: File }) {
    setSubmitError(null)

    const fd = new FormData()
    fd.append('readyNow', String(data.readyNow))
    fd.append('platforms', JSON.stringify(data.platforms))
    fd.append('fullName', data.fullName || '')
    fd.append('phone', data.phone || '')
    fd.append('email', data.email || '')
    fd.append('license', final.file)

    const res = await fetch('/api/leads', { method: 'POST', body: fd })
    if (res.ok) {
      setStep(5)
      return
    }

    setSubmitError('Submission failed. Please try again.')
  }

  return (
    <Section className="py-24">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8">
          <Stepper steps={['Ready?', 'Platform', 'Contact', 'License', 'Done']} current={step - 1} />
        </div>
        <div className="rounded-2xl border border-primary-500/20 bg-dark-800 p-8 shadow-card-lg">
          {step === 1 && <Step1 value={data.readyNow} onNext={(value) => { setData({ ...data, readyNow: value }); setStep(2) }} />}
          {step === 2 && <Step2 value={data.platforms} onNext={(value) => { setData({ ...data, platforms: value }); setStep(3) }} />}
          {step === 3 && <Step3 defaultValues={{ fullName: data.fullName, phone: data.phone, email: data.email }} onNext={(value) => { setData({ ...data, ...value }); setStep(4) }} />}
          {step === 4 && <Step4 onNext={handleSubmit} />}
          {step === 5 && (
            <div className="text-center">
              <h2 className="mb-3 text-3xl font-bold text-white">Thank you!</h2>
              <p className="text-lg text-gray-300">Our team will review your information and contact you if you qualify.</p>
              <p className="mt-4 text-sm text-gray-400">Expected response: 24-48 hours</p>
            </div>
          )}
          {submitError && <p className="mt-4 text-sm text-red-400">{submitError}</p>}
        </div>
        <div className="mt-6 text-center text-sm text-gray-400">
          <p>Fast approval, maintenance included, no credit check</p>
          <p className="mt-1">We support Uber, Lyft, DoorDash, Amazon Flex, Uber Eats, and more</p>
        </div>
      </div>
    </Section>
  )
}
