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

interface dialogButtonProrps {
    triggerText: string | undefined | null
    dialogTitle?: string
    dialogDescription?: string
}
import { userNameChange } from '@/actions/settings'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { userNameUpdateSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { LoginSuccessElememt } from '@/components/login-success'
import { LoginErrorElememt } from '@/components/login-error'
import { useState, useTransition } from 'react'
import { useSession } from 'next-auth/react'

export function DialogForNameUpdate({
    triggerText,
    dialogDescription,
    dialogTitle,
}: dialogButtonProrps) {
    const form = useForm<z.infer<typeof userNameUpdateSchema>>({
        resolver: zodResolver(userNameUpdateSchema),
        defaultValues: {
            name: '',
        },
    })

    const [success, setSuccess] = useState<string | undefined>('')
    const [error, setError] = useState<string | undefined>('')

    const [isPending, setTransition] = useTransition()

    const { update } = useSession()

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
                                userNameChange(e)
                                    .then((data) => {
                                        if (data.success)
                                            setSuccess(data.success)

                                        if (data.error) setError(data.error)
                                    })
                                    .then(() => {
                                        update() //for session update
                                    })
                            })
                        })}
                        className="flex flex-col gap-4 "
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="md:flex-center gap-4">
                                    <FormLabel>Username</FormLabel>

                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="text"
                                            className="col-span-3"
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
