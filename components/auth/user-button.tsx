'use client'

import { useCurrentUser } from '@/hooks/use-current-user'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { FaUser } from 'react-icons/fa'
import { LogoutButton } from './logout-button'

export const UserButton = () => {
    const user = useCurrentUser()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar>
                    <AvatarImage src={user?.image || ''} />
                    <AvatarFallback className="bg-green-500">
                        <FaUser className="text-white" />
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <LogoutButton>
                    <DropdownMenuItem>Signout</DropdownMenuItem>
                </LogoutButton>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
