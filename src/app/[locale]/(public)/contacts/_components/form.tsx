"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ContactUsSchema, ContactUsSchemaType } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useTransition } from "react";
import { useForm } from "react-hook-form";

const ContactForm = () => {
	const t = useTranslations();
	const [isPending, startTransition] = useTransition();

	const form = useForm<ContactUsSchemaType>({
		resolver: zodResolver(ContactUsSchema),
		defaultValues: {
			name: "",
			email: "",
			phone: "",
			subject: "",
			message: ""
		}
	});

	const onSubmit = (values: ContactUsSchemaType) => {
		startTransition(() => {
			console.log(values);
		});
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col w-full gap-4">
				<div className="flex flex-col items-start w-full gap-4 lg:flex-row">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>
									{t("general.name")}
								</FormLabel>
								<FormControl>
									<Input
										{...field}
										disabled={isPending}
										placeholder={t("general.name")}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>
									{t("general.email")}
								</FormLabel>
								<FormControl>
									<Input
										{...field}
										disabled={isPending}
										placeholder={t("general.email")}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className="flex flex-col items-start w-full gap-4 lg:flex-row">
					<FormField
						control={form.control}
						name="phone"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>
									{t("general.phone")}
								</FormLabel>
								<FormControl>
									<Input
										{...field}
										disabled={isPending}
										placeholder={t("general.phone")}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="subject"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>
									{t("general.subject")}
								</FormLabel>
								<FormControl>
									<Input
										{...field}
										disabled={isPending}
										placeholder={t("general.subject")}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<FormField
					control={form.control}
					name="message"
					render={({ field }) => (
						<FormItem>
							<FormLabel>
								{t("general.message")}
							</FormLabel>
							<FormControl>
								<Textarea
									rows={6}
									{...field}
									disabled={isPending}
									placeholder={t("general.message")}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button>
					{t("general.send")}
				</Button>
			</form>
		</Form>
	)
}

export default ContactForm;