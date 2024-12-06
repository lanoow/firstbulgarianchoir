"use client";

import { MinimalTiptapEditor } from '@/components/minimal-tiptap';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Locale } from '@/types';

interface EventContentProps {
	locale: Locale;
	titleBG: string;
	titleEN: string | null;
}

const EventContent: React.FC<EventContentProps> = ({ locale, titleBG, titleEN}) => {
	return (
		<TooltipProvider>
			<MinimalTiptapEditor
				output="html"
				preview={true}
				value={locale === "bg" ? titleBG : (titleEN ? titleEN : titleBG)}
			/>
		</TooltipProvider>
	)
}

export default EventContent;