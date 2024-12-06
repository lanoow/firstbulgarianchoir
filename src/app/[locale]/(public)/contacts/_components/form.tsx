"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import { Textarea } from "@/components/ui/textarea";
import { createMessage } from "@/lib/actions";
import { ContactUsSchema, ContactUsSchemaType } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

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
			toast.promise(createMessage(values), {
				loading: t("general.loading"),
				success: t("success.message_sent"),
				error: t("general.error")
			});

			form.reset();
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
										placeholder={t("contacts.enterYourName")}
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
										placeholder={t("contacts.enterYourEmail")}
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
									{/* <Input
										{...field}
										disabled={isPending}
										placeholder={t("general.phone")}
									/> */}
									<PhoneInput
										{...field}
										defaultCountry="BG"
										disabled={isPending}
										placeholder={t("contacts.enterYourPhone")}
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
										placeholder={t("contacts.enterSubject")}
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
									placeholder={t("contacts.enterMessage")}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button disabled={isPending}>
					{t("general.send")}
				</Button>
			</form>
		</Form>
	)
}

export default ContactForm;