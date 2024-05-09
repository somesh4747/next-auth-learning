'use client'

import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import { Button } from '../ui/button'
import { signIn } from 'next-auth/react'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'

export const Social = () => {
    const onClickLoginProvider = (provider: 'google' | 'github') => {
        signIn(provider, {
            callbackUrl: DEFAULT_LOGIN_REDIRECT,
        })
    }

    return (
        <div className="flex justify-center gap-2 w-full">
            <Button
                variant={'outline'}
                className="grow"
                onClick={() => onClickLoginProvider('google')}
            >
                <FcGoogle />
            </Button>
            <Button
                variant={'outline'}
                className="grow"
                onClick={() => onClickLoginProvider('github')}
            >
                <FaGithub />
            </Button>
        </div>
    )
}
