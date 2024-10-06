import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useTranslations } from "next-intl";
import { SafeMessage } from "@/types";
import { Eye } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const MessageDialog: React.FC<{ message: SafeMessage; }> = ({ message }) => {
	const t = useTranslations();

	return (
		<Dialog>
			<DialogTrigger>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Eye className="w-5 h-5 hover:opacity-70 transition" />
						</TooltipTrigger>
						<TooltipContent>{t("general.read")}</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{`${t("general.message")} - ${message.subject}`}</DialogTitle>
				</DialogHeader>
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
				<DialogFooter>
					<DialogClose asChild>
						<Button type="button">
							{t("general.close")}
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export default MessageDialog;