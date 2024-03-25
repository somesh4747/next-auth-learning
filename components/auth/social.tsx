'use client'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import { Button } from '../ui/button'

export const Social = () => {
    return (
        <div className="flex  justify-center gap-2 w-full">
            <Button variant={'outline'}>
                <FcGoogle />
            </Button>
            <Button variant={'outline'}>
                <FaGithub />
            </Button>
        </div>
    )
}
