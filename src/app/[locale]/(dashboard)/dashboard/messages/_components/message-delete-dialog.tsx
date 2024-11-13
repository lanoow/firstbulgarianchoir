"use client";

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
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
		<AlertDialog>
			<AlertDialogTrigger>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Trash className="w-5 h-5 hover:text-danger hover:opacity-70 transition" />
						</TooltipTrigger>
						<TooltipContent>{t("general.delete")}</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{`${t("general.delete")} - ${message.subject}`}</AlertDialogTitle>
					<AlertDialogDescription>{t("dashboard.descriptions.messages.delete")}</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter className="flex items-center space-x-4">
					<AlertDialogCancel disabled={isPending}>
						{t("general.cancel")}
					</AlertDialogCancel>
					<AlertDialogAction asChild>
						<Button onClick={() => handleDelete(message.id)} variant="destructive" disabled={isPending}>
							{t("general.delete")}
						</Button>
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}

export default MessageDeleteDialog;