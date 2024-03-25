import { Button } from '@/components/ui/button'

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <section className=" mt-2 space-y-3">
            <nav className="flex gap-2 justify-center">
                <Button>Login</Button>
                <Button>LogOut</Button>
            </nav>

            {children}
        </section>
    )
}
