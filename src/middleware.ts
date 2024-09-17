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
		"/((?!api|static|.*\\..*|_next|favicon.ico|logo.png|robots.txt).*)",
		"/(en|bg)/:path*",
		"/dashboard/:path*"
	]
}