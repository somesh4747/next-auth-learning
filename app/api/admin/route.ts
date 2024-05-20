import { NextResponse } from 'next/server'
import { currentUser } from '@/lib/auth'
import { userRole } from '@prisma/client'

export const GET = async () => {
    const user = await currentUser()

    if (user?.role === userRole.ADMIN) {
        return new NextResponse(null, { status: 200 })
    }

    return new NextResponse(null, { status: 403 })
}
