import { prisma } from './prisma'

export interface CreateContactInquiryInput {
  name: string
  email: string
  phone?: string
  message: string
}

export function createContactInquiry(data: CreateContactInquiryInput) {
  return prisma.contactInquiry.create({ data })
}
