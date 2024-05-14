'use client'
import CardWrapper from '@/components/auth/card-wrapper'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { LoginSchema } from '@/schemas'

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { LoginErrorElememt } from '../login-error'
import { LoginSuccessElememt } from '../login-success'
import { login } from '@/actions/login'
import { useState, useTransition } from 'react'
import Link from 'next/link'

export default function LoginForm() {
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: '',
            code: '',
        },
    })

    const [isPending, setTrasition] = useTransition()
    const [success, setSuccess] = useState<string>('')
    const [showTwofactor, setshowTwofactor] = useState<boolean>(false)

    const [error, setError] = useState<string>('')
    const params = useSearchParams()
    const providerEmailExisted =
        params.get('error') == 'OAuthAccountNotLinked'
            ? 'Email is already linked with another provider'
            : ''

    return (
        <CardWrapper
            headerLabel="Welcome back!!"
            backButtonHref="/register"
            backButtonLabel="Don't have an account"
            showSocial
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit((e) => {
                        //
                        setError('')
                        setSuccess('')
                        setTrasition(() => {
                            login(e)
                                .then((data) => {
                                    if (data?.error) setError(data.error)

                                    if (data?.success) setSuccess(data.success)

                                    if (data?.twoFactorStatus) {
                                        setshowTwofactor(true)
                                    }
                                })
                                .catch(() => setError('something went wrong'))
                        })
                    })}
                >
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>

                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="somesh@email.com"
                                            type="email"
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
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
                        <br />
                        <Link href={'/reset'} className="hover:underline ">
                            Reset Password?
                        </Link>

                        {showTwofactor ? (
                            <>
                                <FormField
                                    control={form.control}
                                    name="code"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>code</FormLabel>

                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="123456"
                                                    type="number"
                                                    disabled={isPending}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </>
                        ) : (
                            ''
                        )}

                        <LoginSuccessElememt message={success} />
                        <LoginErrorElememt
                            message={error || providerEmailExisted}
                        />
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isPending}
                        >
                            {showTwofactor ? 'Authenticate' : 'Login'}
                        </Button>
                    </div>
                </form>
            </Form>
        </CardWrapper>
    )
}
