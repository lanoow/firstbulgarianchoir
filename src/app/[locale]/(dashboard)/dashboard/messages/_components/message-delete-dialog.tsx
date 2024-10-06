"use client";

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { deleteMessage } from "@/lib/actions";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { SafeMessage } from "@/types";
import { useTransition } from "react";
import { Trash } from "lucide-react";
import { toast } from "sonner";

const MessageDeleteDialog: React.FC<{ message: SafeMessage; }> = ({ message }) => {
	const t = useTranslations();
	const [isPending, startTransition] = useTransition();
	const router = useRouter();

	const handleDelete = (messageId: string) => {
		startTransition(() => {
			toast.promise(deleteMessage(messageId), {
				loading: t("general.loading"),
				success: t("success.message_deleted"),
				error: t("general.error")
			});

			router.refresh();
		});
	}

	return (
		<Dialog>
			<DialogTrigger>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Trash className="w-5 h-5 hover:text-danger hover:opacity-70 transition" />
						</TooltipTrigger>
						<TooltipContent>{t("general.delete")}</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{`${t("general.delete")} - ${message.subject}`}</DialogTitle>
					<DialogDescription>{t("dashboard.descriptions.messages.delete")}</DialogDescription>
				</DialogHeader>
				<DialogFooter className="flex items-center space-x-4">
					<DialogClose asChild>
						<Button type="button" disabled={isPending}>
							{t("general.cancel")}
						</Button>
					</DialogClose>
					<Button onClick={() => handleDelete(message.id)} variant="destructive" disabled={isPending}>
						{t("general.delete")}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export default MessageDeleteDialog;