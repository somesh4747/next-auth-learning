import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'

function ErrorPage() {
    return (
        <div className="flex justify-center items-center">
            <div className="bg-slate-300 rounded-md p-4 m-3 flex flex-col justify-center items-center text-black space-y-6">
                <h3>Opps! something went worng</h3>
                <ExclamationTriangleIcon className="text-red-800" />
                <Link href={'/login'}>
                    <Button variant={'link'} className="text-black">
                        back to login
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default ErrorPage
