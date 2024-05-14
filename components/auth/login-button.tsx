'use client'

import { useRouter } from 'next/navigation'

interface loginButtonProps {
    children: React.ReactNode
    mode?: 'modal' | 'redirect'
    asChild?: boolean
}

export const LoginButton = ({
    children,
    mode = 'redirect',
    asChild,
}: loginButtonProps) => {
    const router = useRouter()
    return (
        <span
            className=""
            onClick={() => {
                router.push('/login')
            }}
        >
            {children}
        </span>
    )
}
