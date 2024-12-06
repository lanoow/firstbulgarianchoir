import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useTranslations } from "next-intl";
import { SafeMessage } from "@/types";
import { Eye } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const MessageSheet: React.FC<{ message: SafeMessage; }> = ({ message }) => {
	const t = useTranslations();

	return (
		<Sheet>
			<SheetTrigger>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Eye className="size-5 transition hover:opacity-70" />
						</TooltipTrigger>
						<TooltipContent>{t("general.read")}</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>{`${t("general.message")} - ${message.subject}`}</SheetTitle>
				</SheetHeader>
				<div className="flex flex-col space-y-4">
					<div>
						<Label>{t("general.name")}</Label>
						<Input value={message.name} readOnly autoFocus={false} />
					</div>

					<div>
						<Label>{t("general.email")}</Label>
						<Input value={message.email} readOnly autoFocus={false} />
					</div>

					{message.phone && (
						<div>
							<Label>{t("general.phone")}</Label>
							<Input value={message.phone} readOnly autoFocus={false} />
						</div>
					)}

					<div>
						<Label>{t("general.subject")}</Label>
						<Input value={message.subject} readOnly autoFocus={false} />
					</div>

					<div>
						<Label>{t("general.message")}</Label>
						<Textarea value={message.message} readOnly autoFocus={false} />
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

export default MessageSheet;