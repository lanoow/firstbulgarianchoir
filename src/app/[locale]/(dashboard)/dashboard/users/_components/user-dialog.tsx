import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import { SafeUser } from "@/types";
import { Eye } from "lucide-react";

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

					<div>
						<Label>{t("general.email")}</Label>
						<Input value={user.email} readOnly autoFocus={false} />
					</div>

					<div>
						<Label>{t("general.role")}</Label>
						<Input value={user.role} readOnly autoFocus={false} />
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