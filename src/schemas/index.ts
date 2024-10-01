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

export const UpdateProfileSchema = z.object({
	name: z.string().optional(),
	email: z.string().email().optional(),
});

export type UpdateProfileSchemaType = z.infer<typeof UpdateProfileSchema>;

export const ChangePasswordSchema = z.object({
	oldPassword: z.string(),
	newPassword: z.string().regex(passwordRegex, 'Your password should contain at least one uppercase letter, one lowercase letter, and one number.').min(8),
});

export type ChangePasswordSchemaType = z.infer<typeof ChangePasswordSchema>;

export const EventSchema = z.object({
	titleBG: z.string(),
	titleEN: z.string().optional(),
	contentBG: z.string(),
	contentEN: z.string().optional(),
	locationBG: z.string(),
	locationEN: z.string().optional(),
	images: z.array(z.string()),
	date: z.date()
});

export type EventSchemaType = z.infer<typeof EventSchema>;

export const GallerySchema = z.object({
	mediaType: z.enum(['image', 'video']),
	media: z.string()
});

export type GallerySchemaType = z.infer<typeof GallerySchema>;

export const ContactUsSchema = z.object({
	name: z.string(),
	email: z.string().email(),
	phone: z.string().optional(),
	subject: z.string(),
	message: z.string()
});

export type ContactUsSchemaType = z.infer<typeof ContactUsSchema>;