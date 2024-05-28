import authConfig from './auth.config'
import NextAuth from 'next-auth'

const { auth } = NextAuth(authConfig)
import {
    DEFAULT_LOGIN_REDIRECT,
    authRoutes,
    apiRoutes,
    publicRoutes,
} from './routes'

export default auth((req) => {
    const { nextUrl } = req
    // console.log(req)

    // console.log(nextUrl.pathname)

    const isLoggedIn = !!req.auth

    const isAPIauthRoute = nextUrl.pathname.startsWith(apiRoutes)

    const isPubliRoute = publicRoutes.includes(nextUrl.pathname)

    const isAuthRoute = authRoutes.includes(nextUrl.pathname)

    if (isAPIauthRoute) return

    if (isAuthRoute) {
        if (isLoggedIn) {
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
        }

        return
    }

    if (!isLoggedIn && !isPubliRoute) {
        let callBackUrl = nextUrl.pathname

        if (nextUrl.search) {
            callBackUrl += nextUrl.search
        }

        const encodedUrl = encodeURIComponent(callBackUrl)
        return Response.redirect(
            new URL(`/login?callbackUrl=${encodedUrl}`, nextUrl)
        )
    }

    return
})

// Optionally, don't invoke Middleware on some paths
// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/(api|trpc)(.*)'],
}
