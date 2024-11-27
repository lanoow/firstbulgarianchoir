import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import { SafeUser } from "@/types";
import { Eye, Mail } from "lucide-react";
import Link from "next/link";

const UserDialog: React.FC<{ user: SafeUser; }> = ({ user }) => {
	const t = useTranslations();

	return (
		<Sheet>
			<SheetTrigger>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Eye className="w-5 h-5 hover:opacity-70 transition" />
						</TooltipTrigger>
						<TooltipContent>{t("general.read")}</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>{`${t("general.user")} - ${user.email}`}</SheetTitle>
				</SheetHeader>
				<div className="flex flex-col space-y-4">
					<div>
						<Label>{t("general.name")}</Label>
						<Input value={user.name} readOnly autoFocus={false} />
					</div>

					<div className="relative">
						<Label>{t("general.email")}</Label>
						<Input value={user.email} readOnly autoFocus={false} />
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
					</div>

					<div>
						<Label>{t("general.role")}</Label>
						<Input value={user.role == "ADMIN" ? t("general.admin") : t("general.user")} readOnly autoFocus={false} />
					</div>
				</div>
				<SheetFooter className="mt-4">
					<SheetClose asChild>
						<Button type="button">
							{t("general.close")}
						</Button>
					</SheetClose>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	)
}

export default UserDialog;