'use client'

import CardWrapper from '@/components/auth/card-wrapper'
import { LoginErrorElememt } from '@/components/login-error'
import { LoginSuccessElememt } from '@/components/login-success'
import { Button } from '@/components/ui/button'
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { useState, useTransition } from 'react'
import { Form, useForm, FormProvider } from 'react-hook-form'

import { passwordResetSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import { useSearchParams } from 'next/navigation'
import { passwordReset } from '@/actions/pass-reset'
import { useRouter } from 'next/navigation'

function PasswordResetPage() {
    const [isPending, setTrasition] = useTransition()
    const [success, setSuccess] = useState<string>('')
    const [error, setError] = useState<string>('')
    const router = useRouter()

    const param = useSearchParams()

    const form = useForm<z.infer<typeof passwordResetSchema>>({
        resolver: zodResolver(passwordResetSchema),
        defaultValues: {
            password: '',
            confirmPassword: '',
        },
    })

    return (
        <CardWrapper
            backButtonLabel="back to login"
            backButtonHref="/login"
            headerLabel="Reset password"
        >
            <FormProvider {...form}>
                <form
                    onSubmit={form.handleSubmit((e) => {
                        //
                        const token = param.get('token')

                        if (!token) {
                            setError('no valid token')
                            return null
                        }

                        setTrasition(() => {
                            passwordReset(token, e.confirmPassword).then(
                                (data) => {
                                    setSuccess(data?.success)
                                    if (data.success) router.push('/dashboard')
                                    setError(data?.error)
                                }
                            )
                        })
                    })}
                >
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>

                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="****"
                                            type="password"
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>confirm Password</FormLabel>

                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="****"
                                            type="password"
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <LoginErrorElememt message={error} />
                        <LoginSuccessElememt message={success} />
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isPending}
                        >
                            Reset
                        </Button>
                    </div>
                </form>
            </FormProvider>
        </CardWrapper>
    )
}

export default PasswordResetPage
