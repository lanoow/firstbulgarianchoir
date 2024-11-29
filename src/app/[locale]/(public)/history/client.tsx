"use client";

import { MinimalTiptapEditor } from "@/components/minimal-tiptap";
import { TooltipProvider } from "@/components/ui/tooltip";
import { History } from "@prisma/client";
import { Content } from "@tiptap/react";

const HistoryClient: React.FC<{ history: History }> = ({ history }) => {
	const content = history.content as Content;

	return (
		<TooltipProvider>
			<MinimalTiptapEditor
				output="json"
				preview={true}
				injectCSS={true}
				value={content}
			/>
		</TooltipProvider>
	)
}

export default HistoryClient;