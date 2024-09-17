"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { SignUpSchema, SignUpSchemaType } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { register } from "@/lib/actions";

const SignUpClient = () => {
	const t = useTranslations();
	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);

	const form = useForm<SignUpSchemaType>({
		resolver: zodResolver(SignUpSchema),
		defaultValues: {
			name: "",
			email: "",
			password: ""
		}
	});

	const onSubmit = (values: SignUpSchemaType) => {
		setError(null);
		setSuccess(null);

		startTransition(() => {
			register(values)
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
				.catch(() => { setError("UNKNOWN_ERROR") });
		});
	}

	let errorMessage = null;

	switch (error) {
		case "ALREADY_SIGNED_IN":
			errorMessage = t("auth.errors.already_signed_in");
			break;
		case "EMAIL_ALREADY_IN_USE":
			errorMessage = t("auth.errors.email_already_in_use");
			break;
		case "INVALID_FIELDS":
			errorMessage = t("auth.errors.invalid_fields");
			break;
		case "UNKNOWN_ERROR":
			errorMessage = t("auth.errors.unknown_error");
			break;

		default:
			errorMessage = t("auth.errors.unknown_error");
			break;
	}

	return (
		<div className="flex items-center w-full min-h-screen">
			<div className="flex flex-col m-auto space-y-4">
				<Card className="w-full max-w-sm mx-auto">
					<CardHeader>
						<CardTitle className="text-2xl">{t("auth.signup.title")}</CardTitle>
						<CardDescription>
							{t("auth.signup.description")}
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Form {...form}>
							<form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
								<FormField
									control={form.control}
									name="name"
									render={({ field }) => (
										<FormItem>
											<FormLabel>{t("general.name")}</FormLabel>
											<FormControl>
												<Input
													type="text"
													placeholder="John Doe"
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
												<Input
													type="password"
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
					<Alert className="w-full max-w-sm mx-auto text-white bg-danger">
						<AlertTitle>{t("general.error")}</AlertTitle>
						<AlertDescription>{errorMessage}</AlertDescription>
					</Alert>
				)}

				{success && (
					<Alert className="w-full max-w-sm mx-auto text-white bg-success">
						<AlertTitle>{t("general.success")}</AlertTitle>
						<AlertDescription>{t("auth.success.account_created")}</AlertDescription>
					</Alert>
				)}
			</div>
		</div>
	)
}

export default SignUpClient;