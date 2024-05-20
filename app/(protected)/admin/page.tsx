'use client'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { RoleGate } from '@/components/auth/role-gate'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'

function AdminPage() {
    const { toast } = useToast()
    const handleApiRoute = () => {
        fetch('/api/admin').then((res) => {
            if (res.ok) {
                toast({
                    title: 'User is ADMIN',
                    description: 'Can access API Route',
                })
            } else {
                toast({
                    title: 'User is not ADMIN',
                    description: "Can't access API Route",
                    variant: 'destructive',
                })
            }
        })
    }
    return (
        <div className="flex justify-center items-center">
            <Card className="w-[600px] flex flex-col gap-4 pt-5 justify-center items-center">
                <RoleGate allowedRole={'ADMIN'}>
                    <CardHeader>
                        <p className="text-4xl md:text-6xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
                            Admin
                        </p>
                    </CardHeader>
                </RoleGate>
                <CardContent>
                    <div className="flex justify-between items-center gap-3">
                        <p>API Route button</p>
                        <Button onClick={handleApiRoute} variant={'default'}>
                            API route
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default AdminPage
