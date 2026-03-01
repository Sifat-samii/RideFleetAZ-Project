import fs from 'fs'
import path from 'path'
import crypto from 'crypto'

const UPLOAD_DIR = process.env.UPLOAD_DIR || path.join(process.cwd(), 'uploads')
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true })

export async function saveLocalFile(buffer: Buffer, originalName: string) {
  const ext = path.extname(originalName)
  const id = crypto.randomBytes(12).toString('hex')
  const filename = `${id}${ext}`
  const filepath = path.join(UPLOAD_DIR, filename)
  await fs.promises.writeFile(filepath, buffer)
  return { filename, path: filepath }
}

export function getLocalFilePath(filename: string) {
  const filepath = path.join(UPLOAD_DIR, filename)
  if (!fs.existsSync(filepath)) return null
  return filepath
}

export const s3Adapter = async function uploadToS3() {
  // Skeleton: implement using AWS SDK v2 or v3 in production
  throw new Error('S3 adapter not implemented — configure AWS SDK in /src/lib/uploads.ts')
}
