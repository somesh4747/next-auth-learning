'use server'

import { Resend } from 'resend'
import TwoFactorEmailTemplate from '@/components/mail/two-factor'

const resend = new Resend(process.env.RESEND_API_KEY)
const domain = process.env.NEXT_PUBLIC_DOMAIN

export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmLink = `${domain}/new-verification?token=${token}`
    await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'confirm your email',
        html: `<p>click <a href=${confirmLink}>here</a></p>`,
    })
}

export const sendPasswordResetMail = async (email: string, token: string) => {
    const confirmLink = `${domain}/reset-password?token=${token}`
    await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Reset your password',
        html: `<p>click <a href=${confirmLink}>here</a> to reset the password</p>`,
    })
}
export const sendTwoFactorMail = async (email: string, token: string) => {
    await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: '2FA Mail',
        react: TwoFactorEmailTemplate({ verificationCode: token, time: '5' }),
    })
}
