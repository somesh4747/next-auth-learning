import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <section className=" mt-2 space-y-3">
            <nav className="flex gap-2 justify-center">
                <Link href={'/login'}>
                    <Button>Login</Button>
                </Link>

                <Button>LogOut</Button>
                <Button>
                    <Link href={'/'}>Back to Home</Link>
                </Button>
            </nav>

            {children}
        </section>
    )
}
