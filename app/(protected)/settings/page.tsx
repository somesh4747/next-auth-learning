'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { useToast } from '@/components/ui/use-toast'

import { useCurrentUser } from '@/hooks/use-current-user'
import { userTwoFactorChange } from '@/actions/settings'

import { DialogForNameUpdate } from '@/app/(protected)/settings/_components/name-update-dialog'
import { DialogForEmailUpdate } from '@/app/(protected)/settings/_components/email-update-dialog'

import { useTransition } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { FaUser } from 'react-icons/fa'
import { DialogForProfilePictureUpdate } from '@/app/(protected)/settings/_components/profile-image-upload'
import { DeleteUserAccountDialog } from '@/app/(protected)/settings/_components/delete-account-dialog'

export default function SettingsPage() {
    const { toast } = useToast()
    const user = useCurrentUser()

    const { update } = useSession() // for client session update

    const [isPending, setTransition] = useTransition()

    return (
        <div className="flex justify-center items-center">
            <Card className="">
                <CardHeader className="custom-text">
                    <CardTitle className="text-5xl md:text-7xl">
                        Settings Page
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex space-y-4 flex-col items-center justify-center">
                    <div
                        id="name"
                        className="flex justify-between items-center w-full"
                    >
                        <p>Name</p>
                        <div className="">
                            <DialogForNameUpdate
                                triggerText={user?.name}
                                dialogTitle="Edit User Name"
                            />
                        </div>
                    </div>
                    {user?.isOauth ? (
                        ''
                    ) : (
                        <>
                            <div
                                id="email"
                                className="flex justify-between items-center w-full"
                            >
                                <p>Mail</p>
                                <div>
                                    <DialogForEmailUpdate
                                        triggerText={user?.email}
                                        dialogTitle="Edit Email "
                                    />
                                </div>
                            </div>
                            <div
                                id="resetPassword"
                                className="flex justify-between items-center w-full"
                            >
                                <p>Password</p>
                                <div>
                                    <Link
                                        href={'/reset'}
                                        className="hover:underline "
                                    >
                                        Reset Password?
                                    </Link>
                                </div>
                            </div>

                            <div
                                id="twoFactor"
                                className="flex justify-between items-center w-full"
                            >
                                <p>Two Factor Auth</p>
                                <Switch
                                    disabled={isPending}
                                    defaultChecked={user?.isTwofactorEnabled}
                                    onCheckedChange={() => {
                                        setTransition(() => {
                                            userTwoFactorChange(
                                                !user?.isTwofactorEnabled
                                            ).then((data) => {
                                                update() // for client session update
                                                if (data) {
                                                    toast({
                                                        title: 'Two Factor is On',
                                                        description:
                                                            'have to enter OTP during Login',
                                                    })
                                                } else {
                                                    toast({
                                                        title: 'Two Factor is Off',
                                                        description:
                                                            'That might be a security issue',
                                                        variant: 'destructive',
                                                    })
                                                }
                                            })
                                        })
                                    }}
                                />
                            </div>
                        </>
                    )}
                    <div
                        id="image"
                        className="flex justify-between items-center w-full"
                    >
                        <p>Image</p>
                        {user?.image ? (
                            <div className="cursor-pointer">
                                <DialogForProfilePictureUpdate
                                    triggerText={
                                        <Avatar title="change image">
                                            <AvatarImage
                                                src={user?.image || ''}
                                            />
                                            <AvatarFallback className="bg-green-500 ">
                                                <FaUser className="text-white" />
                                            </AvatarFallback>
                                        </Avatar>
                                    }
                                    dialogTitle="new photo upload"
                                />
                            </div>
                        ) : (
                            <div>
                                <DialogForProfilePictureUpdate
                                    triggerText={'Upload Image'}
                                    dialogTitle="new photo upload"
                                />
                            </div>
                        )}
                    </div>
                    <div
                        id="name"
                        className="flex justify-between items-center w-full"
                    >
                        <p>Account</p>
                        <div className="">
                            <DeleteUserAccountDialog userId={user?.id} />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
