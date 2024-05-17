import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { SessionProvider } from 'next-auth/react'
import { auth } from '@/auth'
import Navbar from './_components/navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Settings Page',
    description: 'Learning NEXT_AUTH',
}

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const session = await auth()
    return (
        <SessionProvider session={session}>
            <html lang="en" className="dark">
                <body className={inter.className}>
                    <Navbar />
                    {children}
                </body>
            </html>
        </SessionProvider>
    )
}
