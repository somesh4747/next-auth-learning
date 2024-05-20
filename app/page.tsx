import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { LoginButton } from '@/components/auth/login-button'

export default function Home() {
    
    return (
        <main className="p-3 flex flex-col items-center ">
            <div className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
                Authentication
            </div>
            <div className="flex justify-center items-center mt-7">
                <LoginButton>
                    <Button variant={'outline'}>
                        <Link href={'/'}>Login</Link>
                    </Button>
                </LoginButton>
            </div>
        </main>
    )
}
