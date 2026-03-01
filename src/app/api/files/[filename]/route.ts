import fs from 'fs'
import path from 'path'
import { NextResponse } from 'next/server'
import { isAdminAuthorized } from '../../../../lib/admin-auth'
import { getLocalFilePath } from '../../../../lib/uploads'

interface FileRouteContext {
  params: Promise<{ filename: string }>
}

export async function GET(req: Request, { params }: FileRouteContext) {
  const { filename } = await params
  if (!isAdminAuthorized(req)) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  const filepath = getLocalFilePath(filename)
  if (!filepath) {
    return NextResponse.json({ error: 'not found' }, { status: 404 })
  }

  const file = await fs.promises.readFile(filepath)
  const ext = path.extname(filename).replace('.', '')
  const contentType = ext === 'pdf' ? 'application/pdf' : `image/${ext}`
  return new NextResponse(file, { headers: { 'content-type': contentType } })
}
