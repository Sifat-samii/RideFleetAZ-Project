import { describe, expect, it } from 'vitest'
import { applicationContactSchema, contactSchema } from '../lib/validation'

describe('validation schemas', () => {
  it('accepts valid contact payloads', () => {
    const result = contactSchema.safeParse({
      name: 'Test User',
      email: 'test@example.com',
      phone: '+15555550123',
      message: 'I would like to learn more about rentals.'
    })

    expect(result.success).toBe(true)
  })

  it('rejects incomplete application contact details', () => {
    const result = applicationContactSchema.safeParse({
      fullName: 'A',
      phone: '123',
      email: 'nope'
    })

    expect(result.success).toBe(false)
  })
})
