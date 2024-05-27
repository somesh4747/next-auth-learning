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
import { useRef, useState, useTransition } from 'react'
import Link from 'next/link'
import { ReloadIcon } from '@radix-ui/react-icons'

import { twoFactorHandleFunction } from '@/actions/two-FA'

export default function LoginForm() {
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: '',
            code: '',
        },
    })

    const emailRef = useRef(null)

    const [isPending, setTrasition] = useTransition() // transition for login function
    const [success, setSuccess] = useState<string>('')
    const [error, setError] = useState<string>('')

    //managing states for two factor auth handing
    const [showTwofactor, setShowTwofactor] = useState<boolean>(false)
    const [is2FaPending, set2FaTransition] = useState(false)
    const [Second2fa, set2faSecond] = useState<number>(60) // timing for resend 2fa

    // handing oAuthLinkedAccountError through url params
    const params = useSearchParams()
    const providerEmailExisted =
        params.get('error') == 'OAuthAccountNotLinked'
            ? 'Email is already linked with another provider'
            : ''

    const callbackUrl = params.get('callbackUrl')

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
                            login(e, callbackUrl)
                                .then((data) => {
                                    if (data?.error) setError(data.error)

                                    if (data?.success) setSuccess(data.success)

                                    if (data?.twoFactorStatus) {
                                        setShowTwofactor(true)
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
                                            ref={emailRef}
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
                        {showTwofactor ? (
                            <>
                                <Button
                                    variant={'secondary'}
                                    disabled={is2FaPending}
                                    type="button"
                                    onClick={async () => {
                                        setSuccess('')
                                        setError('')

                                        //sending 2fa mail usign useRef due limitation of form handing
                                        if (!emailRef.current) return

                                        const email = emailRef.current.value

                                        twoFactorHandleFunction(email, '').then(
                                            (data) => {
                                                if (data?.error)
                                                    setError(data.error)

                                                if (data?.success)
                                                    setSuccess(data.success)
                                            }
                                        )
                                        //managing the whole timer for resend 2FA mail
                                        set2FaTransition(true)
                                        const interval = setInterval(() => {
                                            set2faSecond(
                                                (prevSec) => prevSec - 1
                                            )
                                        }, 1000)
                                        await new Promise((res) => {
                                            setTimeout(() => {
                                                res(true)
                                            }, 60000)
                                        })
                                        clearInterval(interval)
                                        set2FaTransition(false)
                                        set2faSecond(60)
                                    }}
                                >
                                    {is2FaPending ? (
                                        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                                    ) : (
                                        ''
                                    )}
                                    {is2FaPending ? (
                                        <>{Second2fa}s</>
                                    ) : (
                                        'Resend mail'
                                    )}
                                </Button>
                            </>
                        ) : (
                            <></>
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
