"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { ResetPasswordSchema, ResetPasswordSchemaType } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
import { resetPassword } from "@/lib/actions";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import Logo from "@/components/logo";
import { redirect } from "next/navigation";
import { PasswordInput } from "@/components/ui/password-input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";

const ResetPasswordClient = () => {
	const t = useTranslations();
	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);

	const form = useForm<ResetPasswordSchemaType>({
		resolver: zodResolver(ResetPasswordSchema),
		defaultValues: {
			code: "",
			email: "",
			password: ""
		}
	});

	const onSubmit = (values: ResetPasswordSchemaType) => {
		setError(null);
		setSuccess(null);

		startTransition(() => {
			resetPassword(values)
				.then((callback) => {
					if (callback?.error) {
						setError(callback.error);
					}

					if (callback?.success) {
						setSuccess(callback.success);
						redirect("/login/");
					}
				})
				.catch(() => { setError(t("errors.unknown_error")) });
		});
	}

	let errorMessage = null;

	switch (error) {
		case "ALREADY_SIGNED_IN":
			errorMessage = t("errors.already_signed_in");
			break;
		case "USER_NOT_FOUND":
			errorMessage = t("errors.user_not_found");
			break;
		case "INVALID_FIELDS":
			errorMessage = t("errors.invalid_fields");
			break;
		case "UNKNOWN_ERROR":
			errorMessage = t("errors.unknown_error");
			break;

		default:
			errorMessage = t("errors.unknown_error");
			break;
	}

	return (
		<div className="flex items-center w-full min-h-screen">
			<div className="flex flex-col items-center m-auto space-y-4">
				<Logo link="/" />

				<Card className="w-full max-w-sm mx-auto">
					<CardHeader>
						<CardTitle className="text-2xl">{t("auth.resetPassword.title")}</CardTitle>
						<CardDescription>
							{t("auth.resetPassword.description")}
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Form {...form}>
							<form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
								<FormField
									control={form.control}
									name="code"
									render={({ field }) => (
										<FormItem>
											<FormLabel>{t("general.code")}</FormLabel>
											<FormControl>
												<InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS} {...field}>
													<InputOTPGroup>
														<InputOTPSlot index={0} />
														<InputOTPSlot index={1} />
														<InputOTPSlot index={2} />
														<InputOTPSlot index={3} />
														<InputOTPSlot index={4} />
														<InputOTPSlot index={5} />
													</InputOTPGroup>
												</InputOTP>
											</FormControl>
											<FormDescription>
												{t("auth.resetPassword.code_description")}
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel>{t("general.email")}</FormLabel>
											<FormControl>
												<Input
													type="email"
													placeholder="johndoe@example.com"
													required
													disabled={isPending}
													{...field}
												/>
											</FormControl>
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="password"
									render={({ field }) => (
										<FormItem>
											<FormLabel>{t("general.newPassword")}</FormLabel>
											<FormControl>
												<PasswordInput
													required
													disabled={isPending}
													{...field}
												/>
											</FormControl>
										</FormItem>
									)}
								/>

								<Button className="w-full" disabled={isPending}>
									{t("general.continue")}
								</Button>
							</form>
						</Form>
					</CardContent>
				</Card>

				{error && (
					<Alert className="w-full max-w-sm mx-auto text-white bg-red-500">
						<AlertTitle>{t("general.error")}</AlertTitle>
						<AlertDescription>{errorMessage}</AlertDescription>
					</Alert>
				)}

				{success && (
					<Alert className="w-full max-w-sm mx-auto text-white bg-green-500">
						<AlertTitle>{t("general.success")}</AlertTitle>
						<AlertDescription>{t("success.email_sent")}</AlertDescription>
					</Alert>
				)}
			</div>
		</div>
	)
}

export default ResetPasswordClient;