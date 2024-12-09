"use client";

import { MinimalTiptapEditor } from '@/components/minimal-tiptap';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Locale } from '@/types';

interface EventContentProps {
	locale: Locale;
	contentBG: string;
	contentEN: string | null;
}

const EventContent: React.FC<EventContentProps> = ({ locale, contentBG, contentEN }) => {
	return (
		<TooltipProvider>
			<MinimalTiptapEditor
				output="html"
				preview={true}
				value={
					locale === "bg" ? contentBG
						: (contentEN ? contentEN : contentBG)
				}
			/>
		</TooltipProvider>
	)
}

export default EventContent;