"use client";

import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { EditUserSchema, EditUserSchemaType } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import { UserRole } from "@prisma/client";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { SafeUser } from "@/types";
import { Mail, Pen } from "lucide-react";
import { PasswordInput } from "@/components/ui/password-input";
import { changeDetails } from "@/lib/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

const UserEditDialog: React.FC<{ user: SafeUser; }> = ({ user }) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [isPending, startTransition] = useTransition();
	const t = useTranslations();
	const router = useRouter();

	const form = useForm<EditUserSchemaType>({
		resolver: zodResolver(EditUserSchema),
		defaultValues: {
			name: user.name,
			email: user.email,
			role: user.role,
			password: ""
		}
	});

	const onSubmit = async (data: EditUserSchemaType) => {
		startTransition(() => {
			toast.promise(changeDetails(user, data), {
				loading: t("general.loading"),
				success: t("success.changed_successfully"),
				error: (data) => {
					let errorMessage = t("errors.unknown_error");

					switch (data.error) {
						case "NOT_AUTHENTICATED":
							errorMessage = t("errors.not_authenticated");
							break;
						case "INVALID_FIELDS":
							errorMessage = t("errors.invalid_fields");
							break;
						case "NO_CHANGES":
							errorMessage = t("errors.no_changes");
							break;
						case "EMAIL_ALREADY_IN_USE":
							errorMessage = t("errors.email_already_in_use");
							break;
						case "UNKNOWN_ERROR":
							errorMessage = t("errors.unknown_error");
							break;

						default:
							errorMessage = t("errors.unknown_error");
							break;
					}

					return errorMessage;
				},
				finally: () => {
					setIsOpen(false);
					form.resetField("password");
					router.refresh();
				}
			});
		});
	};

	return (
		<Sheet open={isOpen} onOpenChange={setIsOpen}>
			<SheetTrigger>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Pen className="w-5 h-5 hover:opacity-70 transition" />
						</TooltipTrigger>
						<TooltipContent>{t("general.edit")}</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</SheetTrigger>
			<SheetContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-4">
						<SheetHeader>
							<SheetTitle>{`${t("general.edit")} - ${user.email}`}</SheetTitle>
						</SheetHeader>
						<div className="flex flex-col space-y-4">
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>{t("general.name")}</FormLabel>
										<FormControl>
											<Input
												required
												autoFocus
												disabled={isPending}
												placeholder="Kristiyan Tachev"
												{...field}
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
									<FormItem className="relative">
										<FormLabel>{t("general.email")}</FormLabel>
										<FormControl>
											<Input
												required
												disabled={isPending}
												placeholder="kristiyan@firstbulgarianchoir.com"
												{...field}
											/>
										</FormControl>
										<FormMessage />
										<TooltipProvider>
											<Tooltip>
												<TooltipTrigger asChild>
													<Button className="absolute right-0 top-6" variant="link" asChild>
														<Link href={`mailto:${user.email}`}>
															<Mail className="w-5 h-5" />
														</Link>
													</Button>
												</TooltipTrigger>
												<TooltipContent>
													{t("general.send_email")}
												</TooltipContent>
											</Tooltip>
										</TooltipProvider>
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="role"
								render={({ field }) => (
									<FormItem>
										<FormLabel>{t("general.role")}</FormLabel>
										<Select onValueChange={field.onChange} defaultValue={field.value}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder={t("dashboard.descriptions.users.chooseRole")} />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value={UserRole.USER}>{t("general.user")}</SelectItem>
												<SelectItem value={UserRole.ADMIN}>{t("general.admin")}</SelectItem>
											</SelectContent>
										</Select>
										<FormDescription>
											{t("dashboard.descriptions.users.roleDescription")}
										</FormDescription>
										<FormMessage />
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
												disabled={isPending}
												placeholder="********"
												{...field}
											/>
										</FormControl>
										<FormDescription>
											{t("dashboard.descriptions.users.passwordDescription")}
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<SheetFooter className="mt-4">
							<SheetClose asChild>
								<Button type="button" variant="outline">
									{t("general.close")}
								</Button>
							</SheetClose>
							<Button type="submit">
								{t("general.save")}
							</Button>
						</SheetFooter>
					</form>
				</Form>
			</SheetContent>
		</Sheet>
	)
}

export default UserEditDialog;