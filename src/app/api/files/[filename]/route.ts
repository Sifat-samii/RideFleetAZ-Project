import { NextResponse } from 'next/server'
import { getLocalFilePath } from '../../../../lib/uploads'
import fs from 'fs'
import path from 'path'

export async function GET(req: Request, { params }: any) {
  const { filename } = params
  if (!process.env.ADMIN_PASSWORD) return NextResponse.json({ error: 'no admin' }, { status: 403 })

  // Admin downloads should include ?admin_password=...
  const url = new URL(req.url)
  const pw = url.searchParams.get('admin_password')
  if (pw !== process.env.ADMIN_PASSWORD) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const filepath = getLocalFilePath(filename)
  if (!filepath) return NextResponse.json({ error: 'not found' }, { status: 404 })

  const file = await fs.promises.readFile(filepath)
  const ext = path.extname(filename).replace('.', '')
  const contentType = ext === 'pdf' ? 'application/pdf' : `image/${ext}`
  return new NextResponse(file, { headers: { 'content-type': contentType } })
}
