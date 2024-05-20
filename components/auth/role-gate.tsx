'use client'
import { useCurrentUserRole } from '@/hooks/use-current-user-role'
import { userRole } from '@prisma/client'
import { LoginErrorElememt } from '../login-error'

interface roleUserProps {
    children: React.ReactNode
    allowedRole: userRole
}

export const RoleGate = ({ children, allowedRole }: roleUserProps) => {
    const role = useCurrentUserRole()

    if (role !== allowedRole) {
        return (
            <LoginErrorElememt message="You dont have permission to view this page" />
        )
    }

    return <>{children}</>
}
