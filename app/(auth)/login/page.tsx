import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Login',
    description: 'Learning Next-auth'
}
import LoginForm from '@/components/auth/login-form'
import React from 'react'

function LoginComponent() {
    return (
        <>
            <LoginForm />
        </>
    )
}

export default LoginComponent
