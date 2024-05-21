import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { userEmailChange, userNameChange } from '@/actions/settings'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../../../../components/ui/form'
import { userEmailUpdateSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { LoginSuccessElememt } from '../../../../components/login-success'
import { LoginErrorElememt } from '../../../../components/login-error'
import { useState, useTransition } from 'react'

interface dialogButtonProps {
    triggerText: string | undefined | null
    dialogTitle?: string
    dialogDescription?: string
}
export function DialogForEmailUpdate({
    triggerText,
    dialogDescription,
    dialogTitle,
}: dialogButtonProps) {
    const form = useForm<z.infer<typeof userEmailUpdateSchema>>({
        resolver: zodResolver(userEmailUpdateSchema),
        defaultValues: {
            email: '',
        },
    })

    const [success, setSuccess] = useState<string | undefined>('')
    const [error, setError] = useState<string | undefined>('')
    const [isPending, setTransition] = useTransition()

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">{triggerText}</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{dialogTitle}</DialogTitle>
                    <DialogDescription>{dialogDescription}</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit((e) => {
                            setTransition(() => {
                                userEmailChange(e).then((data) => {
                                    if (data.success) setSuccess(data.success)

                                    if (data.error) setError(data.error)
                                })
                            })
                        })}
                        className="flex flex-col gap-4 "
                    >
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="md:flex-center gap-4">
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="email"
                                            className="col-span-3"
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div>
                            <LoginSuccessElememt message={success} />
                            <LoginErrorElememt message={error} />
                        </div>
                        <DialogFooter>
                            <Button type="submit" disabled={isPending}>
                                Save changes
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
