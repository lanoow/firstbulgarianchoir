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
import { useTransition } from "react";
import { SafeUser } from "@/types";
import { Pen } from "lucide-react";

const UserEditDialog: React.FC<{ user: SafeUser; }> = ({ user }) => {
	const t = useTranslations();
	const [isPending, startTransition] = useTransition();

	const form = useForm<EditUserSchemaType>({
		resolver: zodResolver(EditUserSchema),
		defaultValues: {
			name: user.name,
			email: user.email,
			role: user.role
		}
	});

	const onSubmit = async (data: EditUserSchemaType) => {
		startTransition(() => {
			console.log(data);
		});
	};

	return (
		<Sheet>
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
									<FormItem>
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