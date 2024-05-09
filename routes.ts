/**
 * public routes which can be accessed from anywhere
 */

export const publicRoutes = ['/']

/**
 * routes for authentication
 */

export const authRoutes = ['/login', '/register', '/error', 'api/auth/error']

/**
 * api authentication routes
 */
export const apiRoutes = '/api/auth'

export const DEFAULT_LOGIN_REDIRECT = '/settings'
