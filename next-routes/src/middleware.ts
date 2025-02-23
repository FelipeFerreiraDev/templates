import { MiddlewareConfig, NextRequest, NextResponse } from "next/server"

const publicRoutes = [
    { path: '/sign-in', whenAuthenticated: 'redirectTo' },
    { path: '/register', whenAuthenticated: 'redirectTo' },
    { path: '/pricing', whenAuthenticated: 'next' },
] as const

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = '/sign-in'

const privateRoutes = []

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname
    const publicRoute = publicRoutes.find(route => route.path === pathname)

    const authToken = request.cookies.get('token')

    if (!authToken && publicRoute) {
        return NextResponse.next();
    }

    if (!authToken && !publicRoute) {
        return NextResponse.redirect(new URL(REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE, request.url))
    }

    if (authToken && publicRoute && publicRoute.whenAuthenticated === 'redirectTo') {
        return NextResponse.redirect(new URL('/', request.url))
    }

    if (authToken && !publicRoute) {
        // TODO: check if user is valid and if token jwt is not expired
        // TODO: Checar se o usuário é válido e se o token jwt não expirou

        return NextResponse.next();
    }

    return NextResponse.next()
}

export const config: MiddlewareConfig = {
    matcher: [
        /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ]
}