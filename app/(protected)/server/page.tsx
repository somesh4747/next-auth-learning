'use server'

import { ShowUserInfo } from '@/components/user-info'
import { currentUser } from '@/lib/auth'

async function ServerComponentForProtectedRoute() {
    const user = await currentUser() // this is getting the user session from 'server lib'
    if (!user) return null
    return <ShowUserInfo label={'Server Component'} user={user} />
}

export default ServerComponentForProtectedRoute
