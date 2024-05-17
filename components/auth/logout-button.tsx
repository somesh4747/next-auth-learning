import { Children } from 'react'
import { Button } from '../ui/button'
import { signOut } from 'next-auth/react'

interface LogoutButtonProps {
    children: React.ReactNode
}

export const LogoutButton = ({ children }: LogoutButtonProps) => {
    return <span onClick={() => signOut()}>{children}</span>
}
