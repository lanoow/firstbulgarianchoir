import { UserRole } from "@prisma/client";
import * as z from "zod";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

export const LoginSchema = z.object({
	email: z.string().email('Please enter a valid email address.'),
	password: z.string().min(1, 'Please enter a password.'),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;

export const SignUpSchema = z.object({
	name: z.string(),
	email: z.string().email(),
	password: z.string()
		.min(8, 'Your password should be at least 8 characters!')
		.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/, {
			message: 'Your password should contain at least one uppercase letter, one lowercase letter, and one number.'
		}),
});

export type SignUpSchemaType = z.infer<typeof SignUpSchema>;

export const ChangePasswordSchema = z.object({
	oldPassword: z.string(),
	newPassword: z.string().regex(passwordRegex, 'Your password should contain at least one uppercase letter, one lowercase letter, and one number.').min(8),
});

export type ChangePasswordSchemaType = z.infer<typeof ChangePasswordSchema>;

export const EventSchema = z.object({
	titleBG: z.string(),
	titleEN: z.optional(z.string()),
	contentBG: z.string(),
	contentEN: z.optional(z.string()),
	locationBG: z.string(),
	locationEN: z.optional(z.string()),
	cover: z.any(),
	date: z.date()
});

export type EventSchemaType = z.infer<typeof EventSchema>;

export const ContactUsSchema = z.object({
	name: z.string(),
	email: z.string().email(),
	phone: z.string().optional(),
	subject: z.string(),
	message: z.string()
});

export type ContactUsSchemaType = z.infer<typeof ContactUsSchema>;

export const EditUserSchema = z.object({
	name: z.string(),
	email: z.string().email(),
	role: z.enum([UserRole.ADMIN, UserRole.USER]),
	password: z.string().optional()
});

export type EditUserSchemaType = z.infer<typeof EditUserSchema>;

export const ForgotPasswordSchema = z.object({
	email: z.string().email()
});

export type ForgotPasswordSchemaType = z.infer<typeof ForgotPasswordSchema>;

export const ResetPasswordSchema = z.object({
	code: z.string().min(6, {
		message: "Your code should be 6 characters long."
	}).max(6, {
		message: "Your code should be 6 characters long."
	}),
	email: z.string().email(),
	password: z.string().regex(passwordRegex, 'Your password should contain at least one uppercase letter, one lowercase letter, and one number.').min(8)
});

export type ResetPasswordSchemaType = z.infer<typeof ResetPasswordSchema>;