"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardHeader from "@/components/dashboard-header";
import { Button } from "@/components/ui/button";
import Editor from "@/components/editor/editor";
import { updateHistory } from "@/lib/actions";
import { useTranslations } from "next-intl";
import { useTransition } from "react";
import { toast } from "sonner";

export type historyObject = {
	language: string;
	content: any;
}

const HistoryClient = () => {
	const [isPending, startTransition] = useTransition();
	const t = useTranslations();

	const content = [
		{
			language: "bg",
			content: "bg",
		},
		{
			language: "en",
			content: "en",
		}
	] as historyObject[];

	const save = () => {
		startTransition(() => {
			toast.promise(updateHistory(content), {
				loading: t("general.loading"),
				success: t("success.content_updated"),
				error: (data) => {
					let errorMessage = t("errors.unknown_error");

					switch (data.error) {
						case "NOT_AUTHENTICATED":
							errorMessage = t("errors.not_authenticated");
							break;
						case "INVALID_FIELDS":
							errorMessage = t("errors.invalid_fields");
							break;
						case "UNKNOWN_ERROR":
							errorMessage = t("errors.unknown_error");
							break;
					}

					return errorMessage;
				}
			});
		});
	};

	return (
		<div className="flex flex-col space-y-4">
			<DashboardHeader
				title={t("navigation.history")}
				subtitle={t("dashboard.descriptions.history.index")}
				actions={
					<Button onClick={() => save()} disabled={isPending}>
						{t("general.save")}
					</Button>
				}
			/>

			<Tabs defaultValue="historyBG">
				<TabsList>
					<TabsTrigger value="historyBG">
						{t("general.bulgarian")}
					</TabsTrigger>
					<TabsTrigger value="historyEN">
						{t("general.english")}
					</TabsTrigger>
				</TabsList>
				<TabsContent value="historyBG">
					<Editor />
				</TabsContent>
				<TabsContent value="historyEN">
					en
				</TabsContent>
			</Tabs>
		</div>
	)
}

export default HistoryClient;