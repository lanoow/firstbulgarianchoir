"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { LoginSchema, LoginSchemaType } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { login } from "@/lib/actions";
import { PasswordInput } from "@/components/ui/password-input";
import Link from "next/link";
import Logo from "@/components/logo";

const LoginClient = () => {
	const t = useTranslations();
	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);

	const form = useForm<LoginSchemaType>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: "",
			password: ""
		}
	});

	const onSubmit = (values: LoginSchemaType) => {
		setError(null);
		setSuccess(null);

		startTransition(() => {
			login(values)
				.then((callback) => {
					if (callback?.error) {
						form.reset();
						setError(callback.error);
					}

					if (callback?.success) {
						form.reset();
						setSuccess(callback.success);
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
		case "INVALID_CREDENTIALS":
			errorMessage = t("errors.invalid_credentials");
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
						<CardTitle className="text-2xl">{t("auth.login.title")}</CardTitle>
						<CardDescription>
							{t("auth.login.description")}
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Form {...form}>
							<form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
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
											<FormLabel>{t("general.password")}</FormLabel>
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
					<CardFooter className="flex flex-col items-center">
						<Button variant="link">
							<Link href="/signup">
								{t("auth.signup.button")}
							</Link>
						</Button>
					</CardFooter>
				</Card>

				{error && (
					<Alert className="w-full max-w-sm mx-auto text-white bg-danger">
						<AlertTitle>{t("general.error")}</AlertTitle>
						<AlertDescription>{errorMessage}</AlertDescription>
					</Alert>
				)}

				{success && (
					<Alert className="w-full max-w-sm mx-auto text-white bg-success">
						<AlertTitle>{t("general.success")}</AlertTitle>
						<AlertDescription>{t("success.signed_in")}</AlertDescription>
					</Alert>
				)}
			</div>
		</div>
	)
}

export default LoginClient;