"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MinimalTiptapEditor } from "@/components/minimal-tiptap";
import DashboardHeader from "@/components/dashboard-header";
import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
import { updateHistory } from "@/lib/actions";
import { useTranslations } from "next-intl";
import { Content } from "@tiptap/react";
import { toast } from "sonner";

export type historyObject = {
	language: string;
	content: string;
}

const HistoryClient: React.FC<{ bulgarian: string; english: string }> = ({ bulgarian, english }) => {
	const [isPending, startTransition] = useTransition();
	const [bgContent, setBgContent] = useState<Content>(bulgarian);
	const [enContent, setEnContent] = useState<Content>(english);
	const t = useTranslations();

	const content = [
		{
			language: "bg",
			content: bgContent,
		},
		{
			language: "en",
			content: enContent,
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
					<MinimalTiptapEditor
						output="html"
						editable={true}
						autofocus={true}
						injectCSS={true}
						value={bgContent}
						onChange={setBgContent}
						throttleDelay={500}
						className="w-full bg-white"
						editorClassName="focus:outline-none"
						editorContentClassName="p-5 [&_.ProseMirror]:min-h-72"
						placeholder={t("dashboard.startTyping")}
					/>
				</TabsContent>
				<TabsContent value="historyEN">
					<MinimalTiptapEditor
						output="html"
						editable={true}
						autofocus={true}
						injectCSS={true}
						value={enContent}
						onChange={setEnContent}
						throttleDelay={500}
						className="w-full bg-white"
						editorClassName="focus:outline-none"
						editorContentClassName="p-5 [&_.ProseMirror]:min-h-72"
						placeholder={t("dashboard.startTyping")}
					/>
				</TabsContent>
			</Tabs>
		</div>
	)
}

export default HistoryClient;