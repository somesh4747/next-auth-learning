import { extendedUser } from '@/next-auth'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

interface userInfoProps {
    user?: extendedUser
    label: string
}

export const ShowUserInfo = ({ user, label }: userInfoProps) => {
    return (
        <div className="flex justify-center items-center">
            <Card className="inline-block ">
                <CardHeader className="text-2xl text-center">
                    <CardTitle>{label}</CardTitle>
                </CardHeader>
                <CardContent className="flex space-y-4 flex-col items-center justify-center">
                    <div className="w-full" id="userId">
                        <p className="truncate font-mono bg-slate-700 p-2 rounded-sm">
                            ID : {user?.id}
                        </p>
                    </div>
                    <div className="w-full" id="name">
                        <p className="truncate font-mono bg-slate-700 p-2 rounded-sm">
                            Name : {user?.name}
                        </p>
                    </div>
                    <div className="w-full" id="email">
                        <p className="truncate font-mono bg-slate-700 p-2 rounded-sm">
                            Email : {user?.email}
                        </p>
                    </div>
                    <div className="w-full" id="role">
                        <p className="truncate font-mono bg-slate-700 p-2 rounded-sm">
                            Role : {user?.role}
                        </p>
                    </div>
                    <div className="w-full" id="isTwofactorEnabled">
                        <p className="truncate font-mono bg-slate-700 p-2 rounded-sm">
                            2FA status : {user?.isTwofactorEnabled ? 'ON' : 'OFF'} 
                        </p>
                    </div>
                    
                  
                    
                </CardContent>
            </Card>
        </div>
    )
}
