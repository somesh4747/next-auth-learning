'use client'

import { ShowUserInfo } from '@/components/user-info'
import { useCurrentUser } from '@/hooks/use-current-user'

function ClientComponentForProtectedRoute() {
    const user = useCurrentUser()

    return <ShowUserInfo user={user} label="Client Component" />
}

export default ClientComponentForProtectedRoute
