'use client'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'

import Header from './header'
import { Social } from './social'
import { BackButton } from './back-button.'

interface cardWapperProps {
    children: React.ReactNode
    headerLabel: string
    backButtonLabel: string
    backButtonHref: string
    showSocial?: boolean
    className?: string
}

export default function CardWrapper({
    children,
    headerLabel,
    backButtonHref,
    backButtonLabel,
    showSocial,
    ...className
}: cardWapperProps) {
    return (
        <div className={`flex justify-center items-center ${className}`}>
            <Card className="shadow-md w-[360px]">
                <CardHeader>
                    <Header label={headerLabel}></Header>
                </CardHeader>
                <CardContent>{children}</CardContent>
                {showSocial && (
                    <CardFooter>
                        <Social />
                    </CardFooter>
                )}
                <CardFooter>
                    <BackButton href={backButtonHref} label={backButtonLabel} />
                </CardFooter>
            </Card>
        </div>
    )
}
