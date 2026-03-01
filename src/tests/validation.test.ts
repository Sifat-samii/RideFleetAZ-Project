import { z } from 'zod'

const phoneSchema = z.string().regex(/^\+?1?\d{10,14}$/)

test('phone normalization accepts E.164-ish', () => {
  const ok = phoneSchema.safeParse('+15555550123')
  expect(ok.success).toBe(true)
})
