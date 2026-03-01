import { describe, it, expect, beforeEach } from 'vitest'
import { POST as contactHandler } from '../app/api/contact/route'
import { POST as adminLoginHandler } from '../app/api/admin/login/route'

function makeRequest(body: any) {
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
      // mock prisma and mailer or ignore since they may throw
      process.env.ADMIN_EMAIL = 'a@b.com'
      process.env.SMTP_HOST = ''
      const res = await contactHandler(makeRequest({ name: 'Test', email: 't@e.com', message: 'Hello' }))
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
      const res: any = await adminLoginHandler(req)
      expect(res.status).toBe(401)
    })
    it('succeeds with correct password', async () => {
      const req = makeRequest({ password: 'secret' })
      const res: any = await adminLoginHandler(req)
      expect(res.status).toBe(200)
      const cookie = res.headers.get('Set-Cookie')
      expect(cookie).toContain('rf_admin=1')
    })
  })
})
