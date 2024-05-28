import { put } from '@vercel/blob'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (request: NextRequest) => {
    const form = await request.formData()
    const file = form.get('file') as File
    const blob = await put(file.name, file, { access: 'public' })

    console.log(blob)
    return Response.json(blob)
}
