'use client'
import CardWrapper from '@/components/auth/card-wrapper'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { RegisterSchema } from '@/schemas'

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { LoginErrorElememt } from '../login-error'
import { LoginSuccessElememt } from '../login-success'
import { useState, useTransition } from 'react'

import { register } from '@/actions/register'

export default function RegisterForm() {
    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: '',
            password: '',
            name: '',
        },
    })

    const [success, setSuccess] = useState<string | undefined>('')
    const [error, setError] = useState<string | undefined>('')

    const [isPending, startTransition] = useTransition()

    return (
        <CardWrapper
            headerLabel="Register New User"
            backButtonHref="/login"
            backButtonLabel="Already have an account"
            showSocial
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit((e) => {
                        //
                        setError('')
                        setSuccess('')
                        startTransition(() => {
                            register(e).then((data) => {
                                setError(data.error)
                                setSuccess(data.success)
                            })
                        })
                    })}
                >
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>

                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="yourName"
                                            type="text"
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
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
                                            placeholder="******"
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
                        <Button type="submit" className="w-full" disabled={isPending}>
                            Register new User
                        </Button>
                    </div>~
                </form>
            </Form>
        </CardWrapper>
    )
}
