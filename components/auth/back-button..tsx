'use client '

import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'

interface backButtonProps {
    href: string
    label: string
}

export const BackButton = ({ href, label }: backButtonProps) => {
    const navigate = useRouter()
    return (
        <Button
            variant={'link'}
            onClick={() => {
                navigate.push(href)
            }}
        >
            {label}
        </Button>
    )
}
