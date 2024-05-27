import { NextRequest, NextResponse } from 'next/server'

export const POST = async (request: NextRequest) => {
    const data = await request.formData()

    const file = data.get('file') as File

    if (!file) return NextResponse.json({ success: 'success' })

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // console.log(buffer)
}
