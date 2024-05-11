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

import { resetPageScheme } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import { useSearchParams } from 'next/navigation'
import { passwordReset, resetMailSend } from '@/actions/pass-reset'

function sendResetMailPage() {
    const [isPending, setTrasition] = useTransition()
    const [success, setSuccess] = useState<string | null>('')
    const [error, setError] = useState<string>('')

    const param = useSearchParams()

    const form = useForm<z.infer<typeof resetPageScheme>>({
        resolver: zodResolver(resetPageScheme),
        defaultValues: {
            email: '',
        },
    })

    return (
        <CardWrapper
            backButtonLabel="back to login"
            backButtonHref="/login"
            headerLabel="Email for Resetting password"
        >
            <FormProvider {...form}>
                <form
                    onSubmit={form.handleSubmit((e) => {
                        //
                        setTrasition(() => {
                            resetMailSend(e.email).then((data) => {
                                setSuccess(data?.success)
                                setError(data?.error)
                            })
                        })
                    })}
                >
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Enter your Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="email"
                                            type="email"
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

export default sendResetMailPage
