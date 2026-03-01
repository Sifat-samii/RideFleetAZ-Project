import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters'),
  email: z.string().trim().email('Invalid email address'),
  phone: z.string().trim().optional(),
  message: z.string().trim().min(10, 'Message must be at least 10 characters')
})

export const applicationContactSchema = z.object({
  fullName: z.string().trim().min(2, 'Name must be at least 2 characters'),
  phone: z.string().trim().min(7, 'Phone must be at least 7 digits'),
  email: z.string().trim().email('Invalid email address')
})

export type ContactFormValues = z.infer<typeof contactSchema>
export type ApplicationContactValues = z.infer<typeof applicationContactSchema>
