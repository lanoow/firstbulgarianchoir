import { User } from "@prisma/client";

export type Locale = "bg" | "en";

export type UserRole = "USER" | "ADMIN";

export type SafeUser = Omit<
	User,
	"createdAt" | "updatedAt"
> & {
	createdAt: string;
	updatedAt: string;
}