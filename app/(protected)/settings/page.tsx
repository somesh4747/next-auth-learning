'use client'

import { useCurrentUser } from '@/hooks/use-current-user'

export default function SettingsPage() {
    const user = useCurrentUser()

    return <div className='text-balance w-[300px] h-[200px]' >{JSON.stringify(user)}</div>
}
