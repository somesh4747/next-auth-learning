'use client'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import { Button } from '../ui/button'

export const Social = () => {
    return (
        <div className="flex justify-center gap-2 w-full">
            <Button variant={'outline'} className='grow'>
                <FcGoogle />
            </Button>
            <Button variant={'outline'} className='grow'>
                <FaGithub />
            </Button>
        </div>
    )
}
