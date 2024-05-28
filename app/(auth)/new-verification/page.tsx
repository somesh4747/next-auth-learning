'use client'
//this is for email verification

import React, { useState } from 'react'
import CardWrapper from '@/components/auth/card-wrapper'
import { Button } from '@/components/ui/button'
import { PulseLoader } from 'react-spinners'
import { useSearchParams } from 'next/navigation'
import { EmailVerification } from '@/actions/verification-action'
import { LoginErrorElememt } from '@/components/login-error'
import { LoginSuccessElememt } from '@/components/login-success'

import { useRouter } from 'next/navigation'

function VarificationPage() {
    const params = useSearchParams()
    const token = params.get('token')

    const [success, setSuccess] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [verifyStatus, setVerifyStatus] = useState<boolean>(false)

    const router = useRouter()

    return (
        <div>
            <CardWrapper
                headerLabel="Verify your email"
                backButtonHref="/login"
                backButtonLabel="Back to login"
            >
                <div className="flex flex-col items-center space-y-5">
                    {verifyStatus ? (
                        <PulseLoader
                            color="#ffff"
                            cssOverride={{}}
                            speedMultiplier={1}
                        />
                    ) : (
                        <>
                            <Button
                                className="w-full"
                                onClick={() => {
                                    if (!token) return null

                                    setVerifyStatus(true)
                                    EmailVerification(token).then((data) => {
                                        if (data?.success) {
                                            setVerifyStatus(false)
                                            setSuccess(data?.success)
                                            router.push('/login')
                                        }

                                        if (data?.error) {
                                            setVerifyStatus(false)
                                            setError(data?.error)
                                        }
                                    })
                                }}
                            >
                                Verify
                            </Button>
                            <LoginSuccessElememt message={success} />
                            <LoginErrorElememt message={error} />
                        </>
                    )}
                </div>
            </CardWrapper>
        </div>
    )
}

export default VarificationPage
