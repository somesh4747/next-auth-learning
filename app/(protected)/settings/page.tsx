// 'use client'
'use server'
import { auth, signOut } from '@/auth'
import { json } from 'stream/consumers'
import { Button } from '@/components/ui/button'

export default async function SettingsPage() {
    const session = await auth()

    return (
        <div className='' >
            {JSON.stringify(session)}
            <form action={ async () => {
                'use server'
                await signOut()
            }}>
                <Button type='submit'>Sign Out</Button>
            </form>
        </div>
    )
}
