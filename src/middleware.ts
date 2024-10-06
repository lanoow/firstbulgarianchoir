import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';
import authConfig from "../auth.config";
import {routing} from './i18n/routing';
import NextAuth from "next-auth";

const handleI18nRouting = createMiddleware(routing);

const { auth } = NextAuth(authConfig);

export default auth(async function middleware(req: NextRequest) {
	return handleI18nRouting(req);
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|avif|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",

    // Always run for API and tRPC routes
    "/(api|trpc)/:path*",
    
    // mine
    "/(en|bg)/:path*",
    "/dashboard/:path*"
  ]
};