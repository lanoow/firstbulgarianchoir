"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardHeader from "@/components/dashboard-header";
import { MinimalTiptapEditor } from "@/components/editor";
import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
import { updateHistory } from "@/lib/actions";
import { useTranslations } from "next-intl";
import { Content } from "@tiptap/react";
import { toast } from "sonner";

export type historyObject = {
	language: string;
	content: Content;
}

const HistoryClient: React.FC<{
	historyBGContent: string;
	historyENContent: string;
}> = ({ historyBGContent, historyENContent }) => {
	const [isPending, startTransition] = useTransition();
	const [historyBG, setHistoryBG] = useState<Content>(historyBGContent);
	const [historyEN, setHistoryEN] = useState<Content>(historyENContent);
	const t = useTranslations();

	const content = [
		{
			language: "bg",
			content: historyBG,
		},
		{
			language: "en",
			content: historyEN,
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

					return t("general.error", { description: errorMessage });
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
					<MinimalTiptapEditor
						value={historyBG}
						onChange={setHistoryBG}
						throttleDelay={1000}
						className="w-full"
						editorContentClassName="p-4"
						output="html"
						placeholder={t("dashboard.startTyping")}
						autofocus={true}
						immediatelyRender={false}
						editable={!isPending}
						injectCSS={true}
						editorClassName="focus:outline-none"
					/>
				</TabsContent>
				<TabsContent value="historyEN">
					<MinimalTiptapEditor
						value={historyEN}
						onChange={setHistoryEN}
						throttleDelay={1000}
						className="w-full"
						editorContentClassName="p-4"
						output="html"
						placeholder={t("dashboard.startTyping")}
						autofocus={true}
						immediatelyRender={false}
						editable={!isPending}
						injectCSS={true}
						editorClassName="focus:outline-none"
					/>
				</TabsContent>
			</Tabs>
		</div>
	)
}

export default HistoryClient;