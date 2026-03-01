import { beforeEach, describe, expect, it, vi } from 'vitest'
import { POST as contactHandler } from '../app/api/contact/route'
import { POST as adminLoginHandler } from '../app/api/admin/login/route'

vi.mock('../lib/contact-inquiries', () => ({
  createContactInquiry: vi.fn(async () => ({ id: 'contact_1' }))
}))

vi.mock('../lib/mailer', () => ({
  sendAdminEmail: vi.fn(async () => undefined)
}))

function makeRequest(body: unknown) {
  return new Request('http://localhost/api', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'content-type': 'application/json' }
  })
}

describe('API routes', () => {
  describe('contact', () => {
    it('rejects missing fields', async () => {
      const res = await contactHandler(makeRequest({}))
      expect(res.status).toBe(400)
    })

    it('accepts valid submission', async () => {
      process.env.ADMIN_EMAIL = 'a@b.com'
      process.env.SMTP_HOST = ''

      const res = await contactHandler(makeRequest({
        name: 'Test',
        email: 't@e.com',
        message: 'Hello there',
        phone: '+15555550123'
      }))

      expect(res.status).toBe(200)
      const json = await res.json()
      expect(json.ok).toBe(true)
    })
  })

  describe('admin login', () => {
    beforeEach(() => {
      process.env.ADMIN_PASSWORD = 'secret'
    })

    it('fails with wrong password', async () => {
      const req = makeRequest({ password: 'nope' })
      const res = await adminLoginHandler(req)
      expect(res.status).toBe(401)
    })

    it('succeeds with correct password', async () => {
      const req = makeRequest({ password: 'secret' })
      const res = await adminLoginHandler(req)
      expect(res.status).toBe(200)
      const cookie = res.headers.get('Set-Cookie')
      expect(cookie).toContain('rf_admin=1')
      expect(cookie).toContain('SameSite=Lax')
    })
  })
})
