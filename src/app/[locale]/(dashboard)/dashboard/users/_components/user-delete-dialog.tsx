"use client";

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { deleteEvent } from "@/lib/actions";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Trash } from "lucide-react";
import { SafeUser } from "@/types";
import { toast } from "sonner";

const UserDeleteDialog: React.FC<{ user: SafeUser; }> = ({ user }) => {
	const t = useTranslations();
	const [isPending, startTransition] = useTransition();
	const router = useRouter();

	const handleDelete = (userId: string) => {
		startTransition(() => {
			toast.promise(deleteEvent(userId), {
				loading: t("general.loading"),
				success: t("success.user_deleted"),
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
							<Trash className="size-5 hover:text-destructive hover:opacity-70 transition" />
						</TooltipTrigger>
						<TooltipContent>{t("general.delete")}</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{`${t("general.delete")} - ${user.email}`}</AlertDialogTitle>
					<AlertDialogDescription>{t("dashboard.descriptions.users.delete")}</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter className="flex items-center space-x-4">
					<AlertDialogCancel disabled={isPending}>
						{t("general.cancel")}
					</AlertDialogCancel>
					<AlertDialogAction onClick={() => handleDelete(user.id)} variant="destructive" disabled={isPending}>
						{t("general.delete")}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}

export default UserDeleteDialog;