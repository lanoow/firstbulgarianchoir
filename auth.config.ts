import type { NextAuthConfig } from "next-auth";

export default {
	providers: [],
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
  pages: {
    signIn: "/dashboard/login"
  }
} satisfies NextAuthConfig;
