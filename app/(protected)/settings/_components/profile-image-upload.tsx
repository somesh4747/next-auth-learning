'use client'
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

import { LoginSuccessElememt } from '../../../../components/login-success'
import { LoginErrorElememt } from '../../../../components/login-error'
import { ReactElement, useState, useTransition } from 'react'
import { useSession } from 'next-auth/react'
import { uploadProfilePicture } from '@/actions/settings'

interface dialogButtonProps {
    triggerText: string | undefined | null | ReactElement
    dialogTitle?: string
    dialogDescription?: string
}
export function DialogForProfilePictureUpdate({
    triggerText,
    dialogDescription,
    dialogTitle,
}: dialogButtonProps) {
    const [success, setSuccess] = useState<string | undefined>('')
    const [error, setError] = useState<string | undefined>('')
    const [isPending, setTransition] = useTransition()
    const { update } = useSession()
    const [fileState, setFile] = useState<File>()

    return (
        <Dialog>
            <DialogTrigger asChild>{triggerText}</DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{dialogTitle}</DialogTitle>
                    <DialogDescription>{dialogDescription}</DialogDescription>
                </DialogHeader>

                <form
                    onSubmit={async (e) => {
                        setSuccess('')
                        setError('')
                        e.preventDefault()
                        const file: File | undefined = fileState
                        if (!file) return null
                        const imageData = new FormData()
                        imageData.set('file', file)
                        setTransition(() => {
                            uploadProfilePicture(imageData).then((data) => {
                                if (data?.success) setSuccess(data?.success)
                                if (data?.error) setError(data?.error)
 
                                update() //// for client session update
                            })
                        })

                        //++++++++++ experimental for api/photo-upload (without server actions) +++++++++
                        // try {
                        //     const res = await fetch('api/photo-upload', {
                        //         method: 'POST',
                        //         body: imageData,
                        //     })
                        //     if (!res.ok) {
                        //         setError('something went wrong')
                        //     }
                        // } catch (e: any) {
                        //     // Handle errors here
                        //     // console.error(e)
                        // }
                        // +++++++++++++++++++++++++++++ experimental ++++++++++++++++++++++++++++
                    }}
                    className="flex flex-col gap-4 "
                >
                    <Input
                        type="file"
                        onChange={(e) => {
                            setFile(e.target.files?.[0])
                        }}
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
            </DialogContent>
        </Dialog>
    )
}
