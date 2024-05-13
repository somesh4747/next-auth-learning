import { db } from '@/lib/db'

export const getTwoFactorConfimationByUserId = async (userid: string) => {
    try {
        const confirm = await db.twoFactorConfirmaitonModel.findUnique({
            where: {
                userId: userid,
            },
        })
        return confirm
    } catch {
        return null
    }
}
