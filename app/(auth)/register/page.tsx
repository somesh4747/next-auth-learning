
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Register',
    description: 'Learning Next-auth'
}

import React from 'react'
import RegisterForm from '@/components/auth/register-form'

export default function RegisterPage() {
    return <RegisterForm />
}
