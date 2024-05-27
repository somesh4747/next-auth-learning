import { ThemeToggle } from '@/components/theme-button'
import { Button } from '@/components/ui/button'

import Link from 'next/link'
import { ThemeProvider } from '@/components/theme-provider'

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className=" mt-2 space-y-3">
            <nav className="flex gap-2 justify-center">
                <Link href={'/login'}>
                    <Button>Login</Button>
                </Link>

                <Button>LogOut</Button>

                <Link href={'/'}>
                    <Button>Back to home</Button>
                </Link>
                <ThemeToggle />
            </nav>
            <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem
                // disableTransitionOnChange
            >
                {children}
            </ThemeProvider>
        </div>
    )
}
