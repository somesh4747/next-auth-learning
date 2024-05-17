'use client'

import { UserButton } from '@/components/auth/user-button'
import { Button } from '@/components/ui/button'
import { useCurrentUser } from '@/hooks/use-current-user'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Navbar = () => {
    const user = useCurrentUser()
    const path = usePathname()
    return (
        <>
            <nav className="flex gap-1 justify-between items-center p-3 rounded-md  ">
                <div className="flex gap-1">
                    <Button asChild
                        variant={path === '/settings' ? 'default' : 'secondary'}
                    >
                        <Link href={'/settings'}>Settings</Link>
                    </Button>
                    <Button asChild variant={path === '/client' ? 'default' : 'secondary'}>
                        <Link href={'/client'}>Client</Link>
                    </Button>
                    <Button asChild variant={path === '/server' ? 'default' : 'secondary'}>
                        <Link href={'/server'}>Server</Link>
                    </Button>
                    <Button asChild variant={path === '/admin' ? 'default' : 'secondary'}>
                        <Link href={'/admin'}>Admin</Link>
                    </Button>
                </div>
                <div>
                    <UserButton />
                </div>
            </nav>
        </>
    )
}

export default Navbar
