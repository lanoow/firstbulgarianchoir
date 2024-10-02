"use client";

import { MinimalTiptapEditor } from "@/components/editor";
import { TooltipProvider } from "@/components/ui/tooltip";

const HistoryClient: React.FC<{ content: string; }> = ({ content }) => {
	return (
		<TooltipProvider>
			<MinimalTiptapEditor
				editable={false}
				content={content}
				renderOnly={true}
				immediatelyRender={false}
			/>
		</TooltipProvider>
	)
}

export default HistoryClient;