'use client'
import React, { useState } from 'react'
import CardWrapper from '@/components/auth/card-wrapper'
import { Button } from '@/components/ui/button'
import { PulseLoader } from 'react-spinners'
import { useSearchParams } from 'next/navigation'
import { EmailVerification } from '@/actions/verification-action'
import { LoginErrorElememt } from '@/components/login-error'
import { LoginSuccessElememt } from '@/components/login-success'

function varificationPage() {
    const params = useSearchParams()
    const token = params.get('token')
    console.log(token)
    const [success, setSuccess] = useState<string>('')
    const [error, setError] = useState<string>('')

    return (
        <div>
            <CardWrapper
                headerLabel="Verify your email"
                backButtonHref="/login"
                backButtonLabel="Back to login"
            >
                <PulseLoader
                    color="#ffff"
                    cssOverride={{}}
                    speedMultiplier={3}
                />
                <Button
                    className="w-full"
                    onClick={() => {
                        if (!token) return null

                        EmailVerification(token).then((data) => {
                            setSuccess(data?.success)
                            setError(data?.error)
                        })
                    }}
                >
                    Verify
                </Button>
                <LoginSuccessElememt message={success} />
                <LoginErrorElememt message={error} />
            </CardWrapper>
        </div>
    )
}

export default varificationPage
