import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { LoginButton } from '@/components/auth/login-button'

export default function Home() {
    return (
        <main className="p-3 flex flex-col items-center">
            <div className="text-5xl text-gray-700 drop-shadow-lg ">
                Authentication
            </div>
            <div className="flex justify-center items-center mt-7">
                <LoginButton >
                    <Button variant={'outline'}>
                        <Link href={'/'}>Login</Link>
                    </Button>
                </LoginButton>
            </div>
        </main>
    )
}
