"use client";

import { MinimalTiptapEditor } from "@/components/minimal-tiptap";
import { Skeleton } from "@/components/ui/skeleton";
import { TooltipProvider } from "@/components/ui/tooltip";
import { History } from "@prisma/client";
import { Content } from "@tiptap/react";
import { Suspense } from "react";

const HistoryOutput: React.FC<{ history: History }> = ({ history }) => {
	const content = history.content as Content;

	return (
		<div className="w-full max-w-screen-2xl">
			<Suspense fallback={
				<div className="flex flex-col">
					<Skeleton className="w-full h-8" />
					<Skeleton className="w-full h-4 mt-4 mb-2" />
					<Skeleton className="w-full h-4 mb-2" />
					<Skeleton className="w-full h-4 mb-2" />
					<Skeleton className="w-full h-4 mb-2" />
					<Skeleton className="w-1/2 h-4 mb-2" />
					<Skeleton className="w-full h-8 mt-8" />
					<Skeleton className="w-full h-4 mt-4 mb-2" />
					<Skeleton className="w-full h-4 mb-2" />
					<Skeleton className="w-full h-4 mb-2" />
					<Skeleton className="w-full h-4 mb-2" />
					<Skeleton className="w-1/2 h-4 mb-2" />
				</div>
			}>
				<TooltipProvider>
					<MinimalTiptapEditor
						output="html"
						preview={true}
						injectCSS={true}
						value={content}
					/>
				</TooltipProvider>
			</Suspense>
		</div>
	)
}

export default HistoryOutput;